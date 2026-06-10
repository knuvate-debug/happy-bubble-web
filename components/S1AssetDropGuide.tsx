"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type AssetStatus = {
  id: string;
  label: string;
  kind: string;
  required: boolean;
  path: string;
  usedIn: string[];
  note: string;
  exists: boolean;
  sizeBytes: number;
};

type AssetResponse = {
  ok: boolean;
  ready: boolean;
  assets: AssetStatus[];
  summary: {
    total: number;
    required: number;
    missingRequired: number;
    optional: number;
  };
};

function formatSize(bytes: number) {
  if (!bytes) return "—";
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export function S1AssetDropGuide() {
  const [data, setData] = useState<AssetResponse | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch("/api/s1-assets", { cache: "no-store" });
      setData((await response.json()) as AssetResponse);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  const requiredAssets = data?.assets.filter((asset) => asset.required) ?? [];
  const optionalAssets = data?.assets.filter((asset) => !asset.required) ?? [];

  return (
    <section className="space-y-7">
      <header className="rounded-[48px] bg-white/78 p-7 shadow-bubble">
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
              S1 Asset Drop Guide
            </p>
            <h1 className="mt-3 text-5xl font-black text-hbe-navy">
              S1 파일 넣는 위치
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-bold text-hbe-navy/68">
              실제 수업 전 필요한 영상, 음원, PDF를 정확한 경로와 파일명으로 넣었는지 확인합니다.
            </p>
          </div>

          <div className={`rounded-[32px] p-6 text-center shadow-bubble ${data?.ready ? "bg-hbe-green text-white" : "bg-hbe-gold/80 text-hbe-navy"}`}>
            <p className="text-xs font-black uppercase tracking-wide opacity-75">Asset Status</p>
            <p className="mt-2 text-3xl font-black">{data?.ready ? "Ready" : "Missing"}</p>
            <p className="mt-1 text-sm font-bold opacity-80">
              {data ? `${data.summary.missingRequired} required missing` : "checking"}
            </p>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <button
            onClick={load}
            className="hbe-focus rounded-full bg-hbe-green px-5 py-3 font-black text-white shadow-bubble"
          >
            Refresh
          </button>
          <Link href="/teacher/s1-ready" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
            S1 Ready
          </Link>
          <Link href="/admin/qa" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
            Launch QA
          </Link>
        </div>
      </header>

      {loading ? (
        <section className="hbe-card rounded-[36px] p-6">
          <p className="font-bold text-hbe-navy/70">Asset 상태를 확인하고 있어요.</p>
        </section>
      ) : null}

      <section className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
          Required Files
        </p>
        <div className="mt-5 grid gap-3">
          {requiredAssets.map((asset) => (
            <article key={asset.id} className="rounded-[28px] bg-hbe-bg p-5">
              <div className="flex flex-col justify-between gap-3 lg:flex-row lg:items-center">
                <div>
                  <h2 className="text-2xl font-black text-hbe-navy">{asset.label}</h2>
                  <p className="mt-2 text-sm font-bold text-hbe-navy/62">{asset.note}</p>
                  <p className="mt-2 rounded-full bg-white px-4 py-2 text-xs font-black text-hbe-navy/65">
                    public{asset.path}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`rounded-full px-4 py-2 text-sm font-black ${asset.exists ? "bg-hbe-green text-white" : "bg-hbe-gold text-hbe-navy"}`}>
                    {asset.exists ? "Ready" : "Missing"}
                  </span>
                  <span className="rounded-full bg-white px-4 py-2 text-sm font-black text-hbe-navy">
                    {formatSize(asset.sizeBytes)}
                  </span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {asset.usedIn.map((item) => (
                  <span key={item} className="rounded-full bg-white/80 px-3 py-1 text-xs font-black text-hbe-navy/55">
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-5 lg:grid-cols-2">
        <div className="rounded-[40px] bg-hbe-cream p-6 shadow-bubble">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-navy/55">
            Upload Rule
          </p>
          <div className="mt-4 space-y-3 text-sm font-bold leading-relaxed text-hbe-navy/72">
            <p>1. 파일명은 그대로 유지합니다.</p>
            <p>2. public 폴더 아래 정확한 경로에 넣습니다.</p>
            <p>3. 업로드 후 npm run audit:hbe:assets를 실행합니다.</p>
            <p>4. /teacher/s1-ready와 /admin/s1-ready에서 Ready 상태를 확인합니다.</p>
          </div>
        </div>

        <div className="rounded-[40px] bg-white/78 p-6 shadow-bubble">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            Optional Game Polish
          </p>
          <div className="mt-4 space-y-3">
            {optionalAssets.map((asset) => (
              <div key={asset.id} className="rounded-[24px] bg-hbe-bg p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-black text-hbe-navy">{asset.label}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${asset.exists ? "bg-hbe-green text-white" : "bg-white text-hbe-navy/55"}`}>
                    {asset.exists ? "Ready" : "Optional"}
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-hbe-navy/50">public{asset.path}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
