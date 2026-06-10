import Link from "next/link";
import type { Session } from "@/lib/types";
import { StatusBadge } from "./StatusBadge";

export function SessionCard({ session }: { session: Session }) {
  const href = session.status === "open" ? `/sessions/${session.id}` : `/sessions/${session.id}`;

  return (
    <Link href={href} className="hbe-focus block rounded-[32px] hbe-card p-5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black text-hbe-green">Session {session.number}</p>
          <h2 className="mt-2 text-2xl font-black text-hbe-navy">{session.title}</h2>
          <p className="mt-1 font-bold text-hbe-navy/70">{session.subtitle}</p>
          <p className="mt-3 text-sm font-bold text-hbe-navy/55">{session.theme}</p>
        </div>
        <StatusBadge status={session.status} />
      </div>
    </Link>
  );
}
