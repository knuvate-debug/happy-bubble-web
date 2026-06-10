import Link from "next/link";
import { S1AssetDropGuide } from "@/components/S1AssetDropGuide";
import { ModeShell } from "@/components/ui/ModeShell";

export default function TeacherS1AssetsPage() {
  return (
    <ModeShell mode="teacher">
      <S1AssetDropGuide />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/teacher/s1-ready" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
          S1 Ready
        </Link>
        <Link href="/teacher/s01" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Teacher Board
        </Link>
      </div>
    </ModeShell>
  );
}
