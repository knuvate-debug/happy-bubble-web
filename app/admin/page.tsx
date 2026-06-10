import Link from "next/link";
import { AdminShell } from "@/components/ui/AdminShell";
import { StatusBadge } from "@/components/StatusBadge";
import { AdminDashboard } from "@/components/AdminDashboard";
import { QrAdminPanel } from "@/components/QrAdminPanel";
import { AssetAdminPanel } from "@/components/AssetAdminPanel";
import { sessions } from "@/lib/sessions";
import { getSessionContents } from "@/lib/sessionContents";
import { getBubbleGameSession } from "@/game/data/bubbleGameSessions";

function qrUrl(sessionId: string, part: "P1" | "P2" | "P3" | "P4") {
  if (part === "P1") return `/theater/${sessionId}`;
  if (part === "P2") return `/game/${sessionId}`;
  if (part === "P3") return `/singing/${sessionId}`;
  if (sessionId === "s15") return "/report/s15";
  return `/mission/${sessionId}`;
}

export default function AdminPage() {
  return (
    <AdminShell>
      <section className="hbe-card rounded-[40px] p-8">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">Admin Mode</p>
        <h1 className="mt-4 text-5xl font-black text-hbe-navy">Happy Bubble Admin</h1>
        <p className="mt-4 text-lg font-bold text-hbe-navy/70">
          세션과 콘텐츠 상태를 확인합니다. 이 MVP는 read-only입니다.
        </p>
        <Link
          href="/admin/qa"
          className="hbe-focus mt-6 inline-flex rounded-full bg-hbe-green px-6 py-3 font-black text-white shadow-bubble"
        >
          Open Launch QA
        </Link>
      </section>

      <section className="mt-8 overflow-x-auto rounded-[32px] bg-white/80 p-4 shadow-bubble">
        <table className="w-full min-w-[900px] border-separate border-spacing-y-3 text-left">
          <thead>
            <tr className="text-sm text-hbe-navy/60">
              <th className="px-3">Session</th>
              <th className="px-3">Title</th>
              <th className="px-3">Status</th>
              <th className="px-3">Game</th>
              <th className="px-3">Contents</th>
              <th className="px-3">QR</th>
              <th className="px-3">Preview</th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => {
              const contents = getSessionContents(session.id);
              const game = getBubbleGameSession(session.id);
              return (
                <tr key={session.id} className="rounded-[24px] bg-hbe-bg">
                  <td className="px-3 py-4 font-black">S{String(session.number).padStart(2, "0")}</td>
                  <td className="px-3 py-4">
                    <p className="font-black">{session.title}</p>
                    <p className="text-sm font-bold text-hbe-navy/60">{session.theme}</p>
                  </td>
                  <td className="px-3 py-4"><StatusBadge status={session.status} /></td>
                  <td className="px-3 py-4 text-sm font-black text-hbe-navy/75">
                    {game ? game.template : "—"}
                  </td>
                  <td className="px-3 py-4">
                    <div className="flex flex-wrap gap-2">
                      {contents.length ? contents.map((content) => (
                        <span key={content.contentType} className="rounded-full bg-white px-3 py-1 text-xs font-black">
                          {content.contentType}: {content.status}
                        </span>
                      )) : <span className="text-sm font-bold text-hbe-navy/55">empty</span>}
                    </div>
                  </td>
                  <td className="px-3 py-4 text-sm font-bold">
                    P1 {qrUrl(session.id, "P1")}<br />
                    P2 {qrUrl(session.id, "P2")}<br />
                    P3 {qrUrl(session.id, "P3")}<br />
                    P4 {qrUrl(session.id, "P4")}
                  </td>
                  <td className="px-3 py-4 text-sm font-bold">
                    /game/{session.id}?preview=true<br />
                    /teacher/{session.id}?preview=true
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <AssetAdminPanel />

      <QrAdminPanel />

      <AdminDashboard />
    </AdminShell>
  );
}
