import Link from "next/link";
import type { ClassroomSlideAction } from "@/lib/classroomSlides";

const toneClass: Record<NonNullable<ClassroomSlideAction["tone"]>, string> = {
  primary: "bg-hbe-green text-white",
  secondary: "bg-hbe-navy text-white",
  soft: "bg-white text-hbe-navy",
  warning: "bg-hbe-gold text-hbe-navy"
};

export function SlideActionButton({ action }: { action: ClassroomSlideAction }) {
  return (
    <Link
      href={action.href}
      className={`hbe-focus inline-flex min-h-14 items-center justify-center rounded-full px-6 py-3 text-center font-black shadow-bubble transition hover:-translate-y-1 ${
        toneClass[action.tone ?? "primary"]
      }`}
      target={action.href.startsWith("/assets") ? "_blank" : undefined}
    >
      {action.label}
    </Link>
  );
}
