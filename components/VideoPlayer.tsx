export function VideoPlayer({
  src,
  title
}: {
  src: string;
  title: string;
}) {
  return (
    <div className="rounded-[32px] bg-hbe-navy/5 p-4">
      <video className="aspect-video w-full rounded-[24px] bg-black" controls playsInline src={src}>
        {title}
      </video>
      <p className="mt-3 text-sm font-bold text-hbe-navy/65">
        영상이 보이지 않으면 파일이 public/assets 폴더에 있는지 확인해 주세요.
      </p>
    </div>
  );
}
