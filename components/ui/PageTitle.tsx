export function PageTitle({
  eyebrow,
  title,
  description,
  align = "left"
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <section className={align === "center" ? "text-center" : ""}>
      {eyebrow ? (
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="mt-4 text-4xl font-black leading-tight text-hbe-navy sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className={`mt-4 text-lg font-bold text-hbe-navy/70 ${align === "center" ? "mx-auto max-w-3xl" : "max-w-3xl"}`}>
          {description}
        </p>
      ) : null}
    </section>
  );
}
