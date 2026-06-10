import Link from "next/link";
import type { Session } from "@/lib/types";

function getStatusLabel(status: Session["status"]) {
  if (status === "open") return "Open";
  if (status === "preview") return "Preview";
  if (status === "locked") return "Locked";
  return "Coming Soon";
}

function getBubbleClasses(status: Session["status"]) {
  if (status === "open") {
    return {
      bubble: "bg-hbe-sky border-hbe-green shadow-[0_18px_45px_rgba(93,166,54,0.22)] hover:-translate-y-2",
      badge: "bg-hbe-green text-white",
      ring: "bg-hbe-gold/80"
    };
  }

  if (status === "preview") {
    return {
      bubble: "bg-hbe-sky/75 border-hbe-navy/30 shadow-bubble hover:-translate-y-1",
      badge: "bg-hbe-navy text-white",
      ring: "bg-hbe-sky"
    };
  }

  if (status === "locked") {
    return {
      bubble: "bg-white/55 border-hbe-navy/10 opacity-70",
      badge: "bg-slate-200 text-slate-600",
      ring: "bg-slate-100"
    };
  }

  return {
    bubble: "bg-hbe-lilac/75 border-white/75 shadow-[0_12px_28px_rgba(27,79,138,0.08)]",
    badge: "bg-white/75 text-hbe-navy/60",
    ring: "bg-hbe-cream"
  };
}

export function BubbleNode({
  session,
  index
}: {
  session: Session;
  index: number;
}) {
  const classes = getBubbleClasses(session.status);
  const href = session.status === "open" ? `/sessions/${session.id}` : `/sessions/${session.id}`;
  const isOpen = session.status === "open";

  return (
    <Link
      href={href}
      className={`hbe-focus group relative block rounded-full border-4 p-4 text-center transition ${classes.bubble}`}
      aria-label={`Session ${session.number} ${session.title} ${getStatusLabel(session.status)}`}
    >
      <div className={`absolute -right-2 -top-2 h-10 w-10 rounded-full ${classes.ring}`} />
      <div className="relative mx-auto flex aspect-square min-h-32 w-full max-w-48 flex-col items-center justify-center rounded-full bg-white/58 p-5 backdrop-blur-sm">
        <span className="text-xs font-black uppercase tracking-wide text-hbe-green">
          S{String(session.number).padStart(2, "0")}
        </span>
        <h2 className="mt-2 text-2xl font-black leading-tight text-hbe-navy">
          {session.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-xs font-bold text-hbe-navy/62">
          {session.theme}
        </p>
        <span className={`mt-4 rounded-full px-3 py-1 text-xs font-black ${classes.badge}`}>
          {getStatusLabel(session.status)}
        </span>
      </div>

      {isOpen ? (
        <div className="absolute inset-0 -z-10 rounded-full bg-hbe-gold/25 blur-2xl transition group-hover:bg-hbe-gold/35" />
      ) : null}

      <span className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full bg-white px-3 py-1 text-xs font-black text-hbe-navy/50 shadow-sm sm:inline-flex">
        Bubble {index + 1}
      </span>
    </Link>
  );
}
