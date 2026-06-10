export function Card({
  children,
  className = "",
  padded = true
}: {
  children: React.ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section className={`hbe-card rounded-[40px] ${padded ? "p-6 sm:p-8" : ""} ${className}`}>
      {children}
    </section>
  );
}
