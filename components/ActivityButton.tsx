import Link from "next/link";

export function ActivityButton({
  href,
  label,
  subLabel
}: {
  href: string;
  label: string;
  subLabel?: string;
}) {
  return (
    <Link
      href={href}
      className="hbe-focus flex min-h-24 flex-col justify-center rounded-[28px] border-2 border-hbe-navy/10 bg-white/80 p-5 shadow-bubble transition hover:-translate-y-1 hover:bg-hbe-cream"
    >
      <span className="text-lg font-black text-hbe-navy">{label}</span>
      {subLabel ? <span className="mt-1 text-sm font-bold text-hbe-navy/65">{subLabel}</span> : null}
    </Link>
  );
}
