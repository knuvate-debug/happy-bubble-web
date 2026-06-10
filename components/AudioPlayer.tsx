export function AudioPlayer({
  src,
  title
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="rounded-[32px] bg-white/80 p-6 shadow-bubble">
      <h2 className="text-2xl font-black text-hbe-navy">{title}</h2>
      <audio className="mt-5 w-full" controls src={src}>
        {title}
      </audio>
      <p className="mt-3 text-sm font-bold text-hbe-navy/65">
        음원이 보이지 않으면 파일이 public/assets 폴더에 있는지 확인해 주세요.
      </p>
    </div>
  );
}
