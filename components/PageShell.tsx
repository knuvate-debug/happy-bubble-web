import { AppHeader } from "./AppHeader";
import { ModeShell } from "./ui/ModeShell";

export function PageShell({
  children,
  narrow = false
}: {
  children: React.ReactNode;
  narrow?: boolean;
}) {
  if (narrow) {
    return (
      <main className="hbe-page min-h-screen">
        <AppHeader />
        <section className="mx-auto max-w-3xl px-5 pb-16">
          {children}
        </section>
      </main>
    );
  }

  return <ModeShell mode="child">{children}</ModeShell>;
}
