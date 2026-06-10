export function CharacterSlot({
  label = "Character Art Coming Soon"
}: {
  label?: string;
}) {
  return (
    <div className="flex min-h-56 items-center justify-center rounded-[40px] border-4 border-dashed border-hbe-navy/12 bg-white/55 p-6 text-center">
      <div>
        <div className="mx-auto h-24 w-24 rounded-full bg-hbe-sky shadow-bubble" />
        <p className="mt-4 text-sm font-black uppercase tracking-wide text-hbe-navy/45">{label}</p>
      </div>
    </div>
  );
}
