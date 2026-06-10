import Link from "next/link";
import { S1AssetDropGuide } from "@/components/S1AssetDropGuide";
import { AdminShell } from "@/components/ui/AdminShell";

export default function AdminS1AssetsPage() {
  return (
    <AdminShell>
      <S1AssetDropGuide />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin/s1-ready" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
          S1 Ready
        </Link>
        <Link href="/admin/qa" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Launch QA
        </Link>
      </div>
    </AdminShell>
  );
}
