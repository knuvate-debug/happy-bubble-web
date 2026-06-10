import Link from "next/link";
import { LaunchQaPanel } from "@/components/LaunchQaPanel";
import { PageShell } from "@/components/PageShell";

export default function AdminQaPage() {
  return (
    <PageShell>
      <LaunchQaPanel />

      <div className="mt-8">
        <Link
          href="/admin"
          className="hbe-focus inline-flex rounded-full bg-white px-6 py-3 font-black text-hbe-navy shadow-bubble"
        >
          Back to Admin
        </Link>
      </div>
    </PageShell>
  );
}
