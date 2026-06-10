import Link from "next/link";
import { S1TeachingReadyPanel } from "@/components/S1TeachingReadyPanel";
import { ModeShell } from "@/components/ui/ModeShell";

export default function TeacherS1ReadyPage() {
  return (
    <ModeShell mode="teacher">
      <S1TeachingReadyPanel />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/teacher/s01" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Teacher Board
        </Link>
        <Link href="/admin/qa" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Launch QA
        </Link>
      </div>
    </ModeShell>
  );
}
