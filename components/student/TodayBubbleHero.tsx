import Link from "next/link";

export function TodayBubbleHero({
  eyebrow = "Today’s Bubble",
  title,
  subtitle,
  theme,
  primaryHref,
  secondaryHref = "/teacher/s01"
}: {
  eyebrow?: string;
  title: string;
  subtitle: string;
  theme: string;
  primaryHref: string;
  secondaryHref?: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-[52px] bg-white/78 p-7 shadow-bubble sm:p-10">
      <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-hbe-sky/85" />
      <div className="absolute bottom-8 right-12 hidden h-44 w-44 rounded-full bg-hbe-lilac/75 sm:block" />
      <div className="absolute bottom-16 right-48 hidden h-24 w-24 rounded-full bg-hbe-gold/75 lg:block" />
      <div className="absolute left-8 top-10 h-20 w-20 rounded-full bg-hbe-cream/80" />

      <div className="relative z-10 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
            {eyebrow}
          </p>
          <h1 className="mt-4 text-7xl font-black leading-none text-hbe-navy sm:text-8xl">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-2xl font-black text-hbe-navy/76">
            {subtitle}
          </p>
          <p className="mt-2 text-base font-bold text-hbe-navy/55">
            {theme}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primaryHref}
              className="hbe-focus inline-flex min-h-16 items-center justify-center rounded-full bg-hbe-green px-8 py-4 text-xl font-black text-white shadow-bubble transition hover:-translate-y-1"
            >
              Start Bubble
            </Link>
            <Link
              href={secondaryHref}
              className="hbe-focus inline-flex min-h-16 items-center justify-center rounded-full bg-white px-8 py-4 text-xl font-black text-hbe-navy shadow-bubble transition hover:-translate-y-1"
            >
              Teacher Board
            </Link>
          </div>
        </div>

        <div className="relative mx-auto flex h-80 w-full max-w-md items-center justify-center">
          <div className="absolute h-72 w-72 rounded-full border-8 border-white/75 bg-hbe-sky shadow-bubble" />
          <div className="absolute h-52 w-52 rounded-full bg-hbe-cream" />
          <div className="absolute h-36 w-36 rounded-full bg-hbe-gold/85" />
          <div className="relative text-center">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-navy/55">Sound Bubble</p>
            <p className="mt-2 text-6xl font-black text-hbe-navy">{title}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
