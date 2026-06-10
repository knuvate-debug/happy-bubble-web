import Link from "next/link";

const toneClass = {
  theater: "bg-hbe-sky",
  game: "bg-hbe-cream",
  singing: "bg-hbe-lilac",
  mission: "bg-hbe-peach"
} as const;

const activities = [
  {
    id: "theater",
    action: "Watch",
    part: "P1 Theater",
    text: "이야기로 먼저 만나기",
    href: "/theater/s01",
    tone: "theater"
  },
  {
    id: "game",
    action: "Play",
    part: "P2 Game",
    text: "소리 듣고 버블 톡!",
    href: "/game/s01",
    tone: "game"
  },
  {
    id: "singing",
    action: "Sing",
    part: "P3 Singing",
    text: "노래로 다시 반복하기",
    href: "/singing/s01",
    tone: "singing"
  },
  {
    id: "mission",
    action: "Mission",
    part: "P4 Mission",
    text: "Worksheet와 카드 보기",
    href: "/mission/s01",
    tone: "mission"
  }
] as const;

export function ActivityBubbleGrid() {
  return (
    <section className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {activities.map((activity) => (
        <Link
          key={activity.id}
          href={activity.href}
          className={`hbe-focus group relative min-h-48 overflow-hidden rounded-[40px] p-6 shadow-bubble transition hover:-translate-y-2 ${toneClass[activity.tone]}`}
        >
          <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/35" />
          <div className="absolute bottom-4 right-6 h-12 w-12 rounded-full bg-white/35" />

          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.18em] text-hbe-navy/50">
                {activity.part}
              </p>
              <h2 className="mt-4 text-4xl font-black text-hbe-navy">
                {activity.action}
              </h2>
              <p className="mt-3 font-bold text-hbe-navy/68">
                {activity.text}
              </p>
            </div>
            <p className="mt-8 text-right text-4xl font-black text-hbe-navy transition group-hover:translate-x-1">
              →
            </p>
          </div>
        </Link>
      ))}
    </section>
  );
}
