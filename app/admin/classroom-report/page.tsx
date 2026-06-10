import Link from "next/link";
import { ClassroomReportPanel } from "@/components/classroom/ClassroomReportPanel";
import { AdminShell } from "@/components/ui/AdminShell";

export default function AdminClassroomReportPage() {
  return (
    <AdminShell>
      <ClassroomReportPanel sessionId="s01" />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/admin"
          className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Admin Overview
        </Link>
        <Link
          href="/admin/qa"
          className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Launch QA
        </Link>
      </div>
    </AdminShell>
  );
}
