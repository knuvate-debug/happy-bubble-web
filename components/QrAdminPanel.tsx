"use client";

import { useEffect, useState } from "react";
import { sessions } from "@/lib/sessions";
import { buildQrTargets } from "@/lib/qrRoutes";

function getOrigin() {
  if (typeof window === "undefined") return "";
  return window.location.origin;
}

function copyText(value: string) {
  if (typeof navigator !== "undefined" && navigator.clipboard) {
    navigator.clipboard.writeText(value).catch(() => {});
  }
}

export function QrAdminPanel() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(getOrigin());
  }, []);

  return (
    <section className="mt-8 hbe-card rounded-[40px] p-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">
            QR Operations
          </p>
          <h2 className="mt-2 text-3xl font-black text-hbe-navy">Preview / Production QR</h2>
          <p className="mt-2 max-w-2xl font-bold text-hbe-navy/65">
            교재 삽입 전, preview URL과 production URL을 분리해서 확인합니다.
          </p>
        </div>
        <div className="rounded-[24px] bg-hbe-cream p-4 text-sm font-black text-hbe-navy">
          Current origin<br />
          <span className="font-bold text-hbe-navy/70">{origin || "local"}</span>
        </div>
      </div>

      <div className="mt-6 rounded-[28px] bg-hbe-sky/70 p-5">
        <h3 className="text-xl font-black text-hbe-navy">QR Rule</h3>
        <div className="mt-3 grid gap-2 text-sm font-bold text-hbe-navy/70 sm:grid-cols-2 lg:grid-cols-4">
          <p>P1 → Bubble Theater</p>
          <p>P2 → Bubble Game</p>
          <p>P3 → Singing Bubble</p>
          <p>P4 → Mission / S15 Report</p>
        </div>
      </div>

      <div className="mt-6 space-y-8">
        {sessions.map((session) => {
          const targets = buildQrTargets(session.id, session.number);
          const isOpen = session.status === "open";

          return (
            <article key={session.id} className="rounded-[32px] bg-white/78 p-5 shadow-bubble">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-black text-hbe-green">
                    Session {session.number}
                  </p>
                  <h3 className="text-2xl font-black text-hbe-navy">
                    {session.title}
                  </h3>
                  <p className="text-sm font-bold text-hbe-navy/60">{session.theme}</p>
                </div>
                <div className={`rounded-full px-4 py-2 text-sm font-black ${
                  isOpen ? "bg-hbe-green text-white" : "bg-hbe-lilac text-hbe-navy"
                }`}>
                  {session.status}
                </div>
              </div>

              <div className="mt-5 overflow-x-auto">
                <table className="w-full min-w-[980px] border-separate border-spacing-y-3 text-left">
                  <thead>
                    <tr className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">
                      <th className="px-3">Part</th>
                      <th className="px-3">Label</th>
                      <th className="px-3">Production URL</th>
                      <th className="px-3">Preview URL</th>
                      <th className="px-3">Production File</th>
                      <th className="px-3">Preview File</th>
                    </tr>
                  </thead>
                  <tbody>
                    {targets.map((target) => {
                      const productionUrl = `${origin}${target.productionPath}`;
                      const previewUrl = `${origin}${target.previewPath}`;

                      return (
                        <tr key={`${session.id}-${target.part}`} className="bg-hbe-bg">
                          <td className="px-3 py-4 font-black">{target.part}</td>
                          <td className="px-3 py-4 font-bold">{target.label}</td>
                          <td className="px-3 py-4">
                            <button
                              onClick={() => copyText(productionUrl)}
                              className="hbe-focus rounded-full bg-white px-3 py-2 text-left text-xs font-bold text-hbe-navy shadow-sm"
                              title="Copy production URL"
                            >
                              {target.productionPath}
                            </button>
                          </td>
                          <td className="px-3 py-4">
                            <button
                              onClick={() => copyText(previewUrl)}
                              className="hbe-focus rounded-full bg-hbe-cream px-3 py-2 text-left text-xs font-bold text-hbe-navy shadow-sm"
                              title="Copy preview URL"
                            >
                              {target.previewPath}
                            </button>
                          </td>
                          <td className="px-3 py-4 text-xs font-black">{target.fileName}</td>
                          <td className="px-3 py-4 text-xs font-black">{target.previewFileName}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {!isOpen ? (
                <p className="mt-3 rounded-[22px] bg-hbe-lilac/70 p-4 text-sm font-bold text-hbe-navy/70">
                  이 세션은 아직 coming soon입니다. Production QR은 생성하더라도 교재 최종 삽입 전에는 사용하지 않습니다.
                </p>
              ) : (
                <p className="mt-3 rounded-[22px] bg-hbe-green/10 p-4 text-sm font-bold text-hbe-navy/70">
                  이 세션은 open 상태입니다. Production QR 검수 후 교재에 삽입할 수 있습니다.
                </p>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
