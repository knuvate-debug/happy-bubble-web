import Link from "next/link";
import { GameReportPanel } from "@/components/game/GameReportPanel";
import { AdminShell } from "@/components/ui/AdminShell";

export default function AdminGameReportPage() {
  return (
    <AdminShell>
      <GameReportPanel sessionId="s01" audience="admin" />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Admin Overview
        </Link>
        <Link
          href="/admin/classroom-report"
          className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Classroom Report
        </Link>
      </div>
    </AdminShell>
  );
}
