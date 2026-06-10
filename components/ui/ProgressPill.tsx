export function ProgressPill({
  label,
  active
}: {
  label: string;
  active: boolean;
}) {
  return (
    <div className={`rounded-full px-4 py-2 text-sm font-black ${
      active ? "bg-hbe-green text-white" : "bg-white/75 text-hbe-navy/55"
    }`}>
      {label}
    </div>
  );
}
