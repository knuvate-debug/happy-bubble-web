import { AppHeader } from "@/components/AppHeader";

type Mode = "child" | "teacher" | "admin" | "parent";

const modeClass: Record<Mode, string> = {
  child: "max-w-6xl",
  teacher: "max-w-7xl",
  admin: "max-w-[1440px]",
  parent: "max-w-6xl"
};

export function ModeShell({
  children,
  mode = "child"
}: {
  children: React.ReactNode;
  mode?: Mode;
}) {
  return (
    <main className={`hbe-page min-h-screen mode-${mode}`}>
      <AppHeader />
      <section className={`mx-auto px-5 pb-16 ${modeClass[mode]}`}>
        {children}
      </section>
    </main>
  );
}
