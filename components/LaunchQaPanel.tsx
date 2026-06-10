"use client";

import { useEffect, useMemo, useState } from "react";

type QaSeverity = "critical" | "warning" | "info";
type QaStatus = "unchecked" | "checking" | "pass" | "fail" | "warning";

type QaCheckItem = {
  id: string;
  group: string;
  title: string;
  description: string;
  severity: QaSeverity;
  expected: string;
  route?: string;
  expectedText?: string;
  forbiddenText?: string;
  method?: "HEAD" | "GET";
};

type QaSummary = {
  ok: boolean;
  supabaseConfigured: boolean;
  checks: QaCheckItem[];
  generatedAt: string;
};

function badgeClass(status: QaStatus) {
  if (status === "pass") return "bg-hbe-green text-white";
  if (status === "fail") return "bg-hbe-peach text-hbe-navy";
  if (status === "warning") return "bg-hbe-gold text-hbe-navy";
  if (status === "checking") return "bg-hbe-gold text-hbe-navy";
  return "bg-hbe-lilac text-hbe-navy";
}

function severityClass(severity: QaSeverity) {
  if (severity === "critical") return "bg-hbe-peach text-hbe-navy";
  if (severity === "warning") return "bg-hbe-gold text-hbe-navy";
  return "bg-hbe-sky text-hbe-navy";
}

async function checkRoute(check: QaCheckItem): Promise<QaStatus> {
  if (!check.route) return "warning";

  const shouldReadText = check.method === "GET" || check.expectedText || check.forbiddenText;

  try {
    const response = await fetch(check.route, {
      method: shouldReadText ? "GET" : "HEAD",
      cache: "no-store"
    });

    if (response.status === 404) return "fail";
    if (!response.ok) return "warning";

    if (shouldReadText) {
      const text = await response.text();

      if (check.expectedText && !text.includes(check.expectedText)) {
        return "fail";
      }

      if (check.forbiddenText && text.includes(check.forbiddenText)) {
        return "fail";
      }
    }

    return "pass";
  } catch {
    return "fail";
  }
}

export function LaunchQaPanel() {
  const [summary, setSummary] = useState<QaSummary | null>(null);
  const [statuses, setStatuses] = useState<Record<string, QaStatus>>({});
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  async function load() {
    setLoading(true);
    const response = await fetch("/api/qa-summary", { cache: "no-store" });
    const data = (await response.json()) as QaSummary;
    setSummary(data);

    const initial: Record<string, QaStatus> = {};
    for (const check of data.checks) {
      initial[check.id] = "unchecked";
    }
    setStatuses(initial);
    setLoading(false);
  }

  async function runChecks() {
    if (!summary) return;
    setRunning(true);

    for (const check of summary.checks) {
      setStatuses((value) => ({ ...value, [check.id]: "checking" }));
      const status = await checkRoute(check);
      setStatuses((value) => ({ ...value, [check.id]: status }));
    }

    setRunning(false);
  }

  useEffect(() => {
    load();
  }, []);

  const stats = useMemo(() => {
    const values = Object.values(statuses);
    return {
      total: values.length,
      pass: values.filter((value) => value === "pass").length,
      fail: values.filter((value) => value === "fail").length,
      warning: values.filter((value) => value === "warning").length,
      unchecked: values.filter((value) => value === "unchecked").length,
      checking: values.filter((value) => value === "checking").length
    };
  }, [statuses]);

  const grouped = useMemo(() => {
    const map = new Map<string, QaCheckItem[]>();
    for (const check of summary?.checks ?? []) {
      const list = map.get(check.group) ?? [];
      list.push(check);
      map.set(check.group, list);
    }
    return Array.from(map.entries());
  }, [summary]);

  return (
    <section className="space-y-6">
      <div className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
          Launch QA
        </p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">
          Pre-Launch Quality Check
        </h1>
        <p className="mt-4 max-w-3xl text-lg font-bold text-hbe-navy/70">
          라우트, asset, QR, Supabase 설정 상태를 한 번에 점검합니다.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          <div className="rounded-[24px] bg-hbe-sky p-4">
            <p className="text-xs font-black text-hbe-navy/60">Total</p>
            <p className="text-3xl font-black text-hbe-navy">{stats.total}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-green p-4 text-white">
            <p className="text-xs font-black text-white/80">Pass</p>
            <p className="text-3xl font-black">{stats.pass}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-peach p-4">
            <p className="text-xs font-black text-hbe-navy/60">Fail</p>
            <p className="text-3xl font-black text-hbe-navy">{stats.fail}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-gold p-4">
            <p className="text-xs font-black text-hbe-navy/60">Warning</p>
            <p className="text-3xl font-black text-hbe-navy">{stats.warning}</p>
          </div>
          <div className="rounded-[24px] bg-hbe-lilac p-4">
            <p className="text-xs font-black text-hbe-navy/60">Unchecked</p>
            <p className="text-3xl font-black text-hbe-navy">{stats.unchecked}</p>
          </div>
          <div className="rounded-[24px] bg-white p-4">
            <p className="text-xs font-black text-hbe-navy/60">Supabase</p>
            <p className="text-lg font-black text-hbe-navy">
              {summary?.supabaseConfigured ? "Ready" : "Not set"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            onClick={runChecks}
            disabled={loading || running}
            className="hbe-focus rounded-full bg-hbe-green px-6 py-4 font-black text-white shadow-bubble disabled:opacity-50"
          >
            {running ? "Checking..." : "Run QA Checks"}
          </button>
          <button
            onClick={load}
            disabled={running}
            className="hbe-focus rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble disabled:opacity-50"
          >
            Reload Checklist
          </button>
        </div>

        {!summary?.supabaseConfigured ? (
          <div className="mt-6 rounded-[24px] bg-hbe-cream p-5">
            <h2 className="text-xl font-black text-hbe-navy">Supabase not configured</h2>
            <p className="mt-2 font-bold text-hbe-navy/70">
              게임은 작동하지만 기록 저장 검수는 완료 상태가 아닙니다. Vercel 환경변수를 확인하세요.
            </p>
          </div>
        ) : null}
      </div>

      {grouped.map(([group, checks]) => (
        <section key={group} className="overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
          <h2 className="px-3 py-3 text-2xl font-black text-hbe-navy">{group}</h2>
          <table className="w-full min-w-[980px] border-separate border-spacing-y-3 text-left">
            <thead>
              <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                <th className="px-3">Status</th>
                <th className="px-3">Severity</th>
                <th className="px-3">Check</th>
                <th className="px-3">Expected</th>
                <th className="px-3">Route</th>
                <th className="px-3">Open</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => {
                const status = statuses[check.id] ?? "unchecked";
                return (
                  <tr key={check.id} className="bg-hbe-bg">
                    <td className="px-3 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${badgeClass(status)}`}>
                        {status}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-black ${severityClass(check.severity)}`}>
                        {check.severity}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <p className="font-black">{check.title}</p>
                      <p className="mt-1 text-xs font-bold text-hbe-navy/60">{check.description}</p>
                    </td>
                    <td className="px-3 py-4 text-sm font-bold">{check.expected}</td>
                    <td className="px-3 py-4 text-xs font-bold">{check.route ?? "—"}</td>
                    <td className="px-3 py-4">
                      {check.route ? (
                        <a
                          href={check.route}
                          target="_blank"
                          className="hbe-focus rounded-full bg-hbe-sky px-3 py-2 text-xs font-black text-hbe-navy"
                        >
                          Open
                        </a>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      ))}
    </section>
  );
}
