import { Badge } from "./Badge";
import { Button } from "./Button";

export function ChildHero({
  sessionNumber,
  title,
  subtitle,
  theme,
  primaryHref
}: {
  sessionNumber: number;
  title: string;
  subtitle: string;
  theme: string;
  primaryHref: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[48px] bg-white/80 p-7 shadow-bubble sm:p-10">
      <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-hbe-sky/80" />
      <div className="absolute bottom-8 right-10 hidden h-32 w-32 rounded-full bg-hbe-lilac/80 sm:block" />
      <div className="absolute bottom-12 right-32 hidden h-20 w-20 rounded-full bg-hbe-cream sm:block" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Badge tone="open">Session {sessionNumber}</Badge>
          <h1 className="mt-5 text-6xl font-black leading-none text-hbe-navy sm:text-7xl">
            {title}
          </h1>
          <p className="mt-5 text-2xl font-black text-hbe-navy/75">{subtitle}</p>
          <p className="mt-2 text-base font-bold text-hbe-navy/55">{theme}</p>
          <div className="mt-8">
            <Button href={primaryHref} size="xl">
              Start Bubble
            </Button>
          </div>
        </div>

        <div className="relative mx-auto flex h-72 w-full max-w-sm items-center justify-center">
          <div className="absolute h-64 w-64 rounded-full bg-hbe-sky shadow-bubble" />
          <div className="absolute h-44 w-44 rounded-full bg-hbe-cream" />
          <div className="absolute h-28 w-28 rounded-full bg-hbe-gold/90" />
          <p className="relative text-center text-5xl font-black text-hbe-navy">
            {title}
          </p>
        </div>
      </div>
    </section>
  );
}
