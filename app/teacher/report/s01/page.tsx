import Link from "next/link";
import { ClassroomReportPanel } from "@/components/classroom/ClassroomReportPanel";
import { ModeShell } from "@/components/ui/ModeShell";

export default function TeacherS01ReportPage() {
  return (
    <ModeShell mode="teacher">
      <ClassroomReportPanel sessionId="s01" />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/teacher/s01"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Teacher Board
        </Link>
        <Link
          href="/classroom/s01/presenter"
          className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Presenter View
        </Link>
        <Link
          href="/admin"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Admin
        </Link>
      </div>
    </ModeShell>
  );
}
