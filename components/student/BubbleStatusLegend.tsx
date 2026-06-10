const items = [
  {
    label: "Open",
    description: "지금 할 수 있는 버블",
    className: "bg-hbe-green"
  },
  {
    label: "Coming Soon",
    description: "곧 열릴 버블",
    className: "bg-hbe-lilac"
  },
  {
    label: "Preview",
    description: "교사용 검수 버블",
    className: "bg-hbe-sky"
  }
];

export function BubbleStatusLegend() {
  return (
    <section className="rounded-[32px] bg-white/70 p-5 shadow-bubble">
      <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
        Bubble Status
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3 rounded-[24px] bg-hbe-bg/70 p-4">
            <span className={`h-6 w-6 rounded-full ${item.className}`} />
            <div>
              <p className="font-black text-hbe-navy">{item.label}</p>
              <p className="text-xs font-bold text-hbe-navy/58">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
