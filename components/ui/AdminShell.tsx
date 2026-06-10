import Link from "next/link";
import { ModeShell } from "./ModeShell";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/qa", label: "Launch QA" },
  { href: "/admin/classroom-report", label: "Classroom Report" },
  { href: "/admin/game-report", label: "Game Report" },
  { href: "/admin/s1-ready", label: "S1 Ready" },
  { href: "/admin/s1-assets", label: "S1 Assets" },
  { href: "/sessions", label: "Student View" },
  { href: "/teacher/s01", label: "Teacher S1" }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <ModeShell mode="admin">
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hbe-card h-fit rounded-[36px] p-5 lg:sticky lg:top-5">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            Admin Mode
          </p>
          <h2 className="mt-3 text-2xl font-black text-hbe-navy">Operations</h2>
          <nav className="mt-5 grid gap-2">
            {adminLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hbe-focus rounded-full bg-white/70 px-4 py-3 text-sm font-black text-hbe-navy transition hover:bg-hbe-cream"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 rounded-[24px] bg-hbe-sky/70 p-4">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/55">Rule</p>
            <p className="mt-2 text-sm font-bold text-hbe-navy/70">
              S1 open. S2~S15 coming soon. Preview links are for internal QA only.
            </p>
          </div>
        </aside>
        <section>{children}</section>
      </div>
    </ModeShell>
  );
}
