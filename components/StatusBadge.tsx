export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    open: "bg-hbe-green text-white",
    published: "bg-hbe-green text-white",
    ready: "bg-hbe-gold text-hbe-navy",
    coming_soon: "bg-hbe-lilac text-hbe-navy",
    draft: "bg-hbe-lilac text-hbe-navy",
    empty: "bg-slate-200 text-slate-700",
    locked: "bg-slate-300 text-slate-700"
  };

  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${styles[status] ?? styles.empty}`}>
      {status}
    </span>
  );
}
