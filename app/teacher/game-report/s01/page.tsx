import Link from "next/link";
import { GameReportPanel } from "@/components/game/GameReportPanel";
import { ModeShell } from "@/components/ui/ModeShell";

export default function TeacherS01GameReportPage() {
  return (
    <ModeShell mode="teacher">
      <GameReportPanel sessionId="s01" audience="teacher" />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/teacher/s01"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Teacher Board
        </Link>
        <Link
          href="/game/s01"
          className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Game Pack
        </Link>
        <Link
          href="/teacher/report/s01"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Classroom Report
        </Link>
      </div>
    </ModeShell>
  );
}
