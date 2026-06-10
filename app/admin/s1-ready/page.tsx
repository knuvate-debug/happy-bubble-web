import Link from "next/link";
import { S1TeachingReadyPanel } from "@/components/S1TeachingReadyPanel";
import { AdminShell } from "@/components/ui/AdminShell";

export default function AdminS1ReadyPage() {
  return (
    <AdminShell>
      <S1TeachingReadyPanel />

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/admin" className="hbe-focus rounded-full bg-white px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Admin Overview
        </Link>
        <Link href="/admin/qa" className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 font-black text-hbe-navy shadow-bubble">
          Launch QA
        </Link>
      </div>
    </AdminShell>
  );
}
