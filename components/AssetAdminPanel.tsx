"use client";

import { useEffect, useMemo, useState } from "react";

type AssetCheckItem = {
  sessionId: string;
  sessionNumber: number;
  sessionTitle: string;
  sessionStatus: string;
  contentType: string;
  contentStatus: string;
  label: string;
  url: string;
  assetUrl: string | null;
  requiredForPilot: boolean;
  note: string;
};

type RequiredAsset = {
  label: string;
  localPath: string;
  webUrl: string;
  type: string;
};

type AssetStatus = "unchecked" | "checking" | "ok" | "missing" | "error";

function statusClass(status: AssetStatus) {
  if (status === "ok") return "bg-hbe-green text-white";
  if (status === "missing" || status === "error") return "bg-hbe-peach text-hbe-navy";
  if (status === "checking") return "bg-hbe-gold text-hbe-navy";
  return "bg-hbe-lilac text-hbe-navy";
}

function absoluteUrl(path: string) {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

async function checkUrl(path: string): Promise<AssetStatus> {
  try {
    const response = await fetch(path, { method: "HEAD", cache: "no-store" });
    if (response.ok) return "ok";
    if (response.status === 404) return "missing";
    return "error";
  } catch {
    return "error";
  }
}

export function AssetAdminPanel() {
  const [assets, setAssets] = useState<AssetCheckItem[]>([]);
  const [required, setRequired] = useState<RequiredAsset[]>([]);
  const [statuses, setStatuses] = useState<Record<string, AssetStatus>>({});
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/asset-manifest", { cache: "no-store" });
      const data = await response.json();
      setAssets(data.assets ?? []);
      setRequired(data.requiredS1Assets ?? []);
    } finally {
      setLoading(false);
    }
  }

  async function checkRequiredAssets() {
    const next: Record<string, AssetStatus> = {};
    for (const item of required) {
      next[item.webUrl] = "checking";
    }
    setStatuses((value) => ({ ...value, ...next }));

    for (const item of required) {
      const status = await checkUrl(item.webUrl);
      setStatuses((value) => ({ ...value, [item.webUrl]: status }));
    }
  }

  useEffect(() => {
    load();
  }, []);

  const missingRequired = useMemo(() => {
    return required.filter((item) => statuses[item.webUrl] === "missing" || statuses[item.webUrl] === "error");
  }, [required, statuses]);

  return (
    <section className="mt-8 hbe-card rounded-[40px] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">
            Asset Check
          </p>
          <h2 className="mt-2 text-3xl font-black text-hbe-navy">Content Asset Verification</h2>
          <p className="mt-2 max-w-2xl font-bold text-hbe-navy/65">
            S1 필수 파일과 세션 콘텐츠 asset URL을 확인합니다.
          </p>
        </div>
        <button
          onClick={checkRequiredAssets}
          disabled={!required.length}
          className="hbe-focus rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-bubble disabled:opacity-50"
        >
          Check S1 Assets
        </button>
      </div>

      {loading ? (
        <p className="mt-6 font-bold text-hbe-navy/70">Asset manifest를 불러오고 있어요.</p>
      ) : null}

      {!loading ? (
        <>
          <div className="mt-6 rounded-[28px] bg-hbe-cream p-5">
            <h3 className="text-xl font-black text-hbe-navy">S1 Required Files</h3>
            <p className="mt-2 text-sm font-bold text-hbe-navy/70">
              Check 버튼을 누르면 현재 배포 URL 기준으로 파일이 실제 접근 가능한지 확인합니다.
            </p>

            {missingRequired.length ? (
              <div className="mt-4 rounded-[22px] bg-hbe-peach p-4">
                <p className="font-black text-hbe-navy">Missing or inaccessible files</p>
                <ul className="mt-2 list-inside list-disc text-sm font-bold text-hbe-navy/70">
                  {missingRequired.map((item) => (
                    <li key={item.webUrl}>{item.localPath}</li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                    <th className="px-3">Label</th>
                    <th className="px-3">Type</th>
                    <th className="px-3">Local Path</th>
                    <th className="px-3">Web URL</th>
                    <th className="px-3">Status</th>
                    <th className="px-3">Open</th>
                  </tr>
                </thead>
                <tbody>
                  {required.map((item) => {
                    const status = statuses[item.webUrl] ?? "unchecked";
                    return (
                      <tr key={item.webUrl} className="bg-white/78">
                        <td className="px-3 py-4 font-black">{item.label}</td>
                        <td className="px-3 py-4 text-sm font-bold">{item.type}</td>
                        <td className="px-3 py-4 text-xs font-bold">{item.localPath}</td>
                        <td className="px-3 py-4 text-xs font-bold">{item.webUrl}</td>
                        <td className="px-3 py-4">
                          <span className={`rounded-full px-3 py-1 text-xs font-black ${statusClass(status)}`}>
                            {status}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <a
                            href={item.webUrl}
                            target="_blank"
                            className="hbe-focus rounded-full bg-hbe-sky px-3 py-2 text-xs font-black text-hbe-navy"
                          >
                            Open
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
            <h3 className="px-3 py-3 text-2xl font-black text-hbe-navy">Session Content Assets</h3>
            <table className="w-full min-w-[1000px] border-separate border-spacing-y-3 text-left">
              <thead>
                <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                  <th className="px-3">Session</th>
                  <th className="px-3">Status</th>
                  <th className="px-3">Content</th>
                  <th className="px-3">Content Status</th>
                  <th className="px-3">Route URL</th>
                  <th className="px-3">Asset URL</th>
                  <th className="px-3">Pilot</th>
                  <th className="px-3">Note</th>
                </tr>
              </thead>
              <tbody>
                {assets.map((item) => (
                  <tr key={`${item.sessionId}-${item.contentType}`} className="bg-hbe-bg">
                    <td className="px-3 py-4">
                      <p className="font-black">S{String(item.sessionNumber).padStart(2, "0")}</p>
                      <p className="text-xs font-bold text-hbe-navy/60">{item.sessionTitle}</p>
                    </td>
                    <td className="px-3 py-4 text-sm font-black">{item.sessionStatus}</td>
                    <td className="px-3 py-4 font-black">{item.contentType}</td>
                    <td className="px-3 py-4 text-sm font-black">{item.contentStatus}</td>
                    <td className="px-3 py-4 text-xs font-bold">{item.url}</td>
                    <td className="px-3 py-4 text-xs font-bold">{item.assetUrl ?? "—"}</td>
                    <td className="px-3 py-4">
                      {item.requiredForPilot ? (
                        <span className="rounded-full bg-hbe-gold px-3 py-1 text-xs font-black text-hbe-navy">
                          required
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-hbe-navy/50">—</span>
                      )}
                    </td>
                    <td className="px-3 py-4 text-xs font-bold text-hbe-navy/60">{item.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 rounded-[28px] bg-hbe-sky/70 p-5">
            <h3 className="text-xl font-black text-hbe-navy">Asset URL Rule</h3>
            <p className="mt-2 font-bold text-hbe-navy/70">
              코드에서는 <code className="rounded bg-white px-2 py-1">/public</code>을 쓰지 않습니다.
              웹 URL은 항상 <code className="rounded bg-white px-2 py-1">/assets/...</code>로 시작합니다.
            </p>
          </div>
        </>
      ) : null}
    </section>
  );
}
