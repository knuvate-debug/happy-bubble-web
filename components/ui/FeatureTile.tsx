import Link from "next/link";

const toneClass = {
  sky: "bg-hbe-sky",
  cream: "bg-hbe-cream",
  peach: "bg-hbe-peach",
  lilac: "bg-hbe-lilac"
} as const;

export function FeatureTile({
  href,
  label,
  subLabel,
  action,
  tone = "sky"
}: {
  href: string;
  label: string;
  subLabel: string;
  action: string;
  tone?: keyof typeof toneClass;
}) {
  return (
    <Link
      href={href}
      className={`hbe-focus group block min-h-40 rounded-[36px] p-6 shadow-bubble transition hover:-translate-y-1 ${toneClass[tone]}`}
    >
      <div className="flex h-full flex-col justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-hbe-navy/55">{action}</p>
          <h2 className="mt-3 text-3xl font-black text-hbe-navy">{label}</h2>
          <p className="mt-2 font-bold text-hbe-navy/68">{subLabel}</p>
        </div>
        <p className="mt-6 text-right text-3xl font-black text-hbe-navy transition group-hover:translate-x-1">
          →
        </p>
      </div>
    </Link>
  );
}
