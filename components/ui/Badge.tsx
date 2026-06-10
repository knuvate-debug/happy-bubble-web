type BadgeTone = "open" | "ready" | "soon" | "info" | "warning" | "navy";

const toneClass: Record<BadgeTone, string> = {
  open: "bg-hbe-green text-white",
  ready: "bg-hbe-gold text-hbe-navy",
  soon: "bg-hbe-lilac text-hbe-navy",
  info: "bg-hbe-sky text-hbe-navy",
  warning: "bg-hbe-peach text-hbe-navy",
  navy: "bg-hbe-navy text-white"
};

export function Badge({
  children,
  tone = "info",
  className = ""
}: {
  children: React.ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${toneClass[tone]} ${className}`}>
      {children}
    </span>
  );
}
