import { AppHeader } from "./AppHeader";

export function PageShell({
  children,
  narrow = false
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  return (
    <main className="hbe-page min-h-screen">
      <AppHeader />
      <section className={`mx-auto px-5 pb-16 ${narrow ? "max-w-3xl" : "max-w-6xl"}`}>
        {children}
      </section>
    </main>
  );
}
