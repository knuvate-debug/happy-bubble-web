import Link from "next/link";

type ButtonVariant = "primary" | "secondary" | "soft" | "ghost" | "warning";
type ButtonSize = "sm" | "md" | "lg" | "xl";

const variantClass: Record<ButtonVariant, string> = {
  primary: "bg-hbe-green text-white shadow-bubble hover:-translate-y-1",
  secondary: "bg-hbe-navy text-white shadow-bubble hover:-translate-y-1",
  soft: "bg-white/85 text-hbe-navy shadow-bubble hover:-translate-y-1",
  ghost: "bg-white/45 text-hbe-navy hover:bg-white/75",
  warning: "bg-hbe-gold text-hbe-navy shadow-bubble hover:-translate-y-1"
};

const sizeClass: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-3 text-base",
  lg: "px-6 py-4 text-lg",
  xl: "px-8 py-5 text-2xl"
};

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  disabled?: boolean;
}) {
  const classes = [
    "hbe-focus inline-flex items-center justify-center rounded-full font-black transition disabled:pointer-events-none disabled:opacity-50",
    variantClass[variant],
    sizeClass[size],
    className
  ].join(" ");

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
