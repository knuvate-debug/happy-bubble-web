import { Badge } from "./Badge";
import { Button } from "./Button";

export function ParentReviewCard({
  title,
  description,
  href,
  action,
  tone = "info"
}: {
  title: string;
  description: string;
  href: string;
  action: string;
  tone?: "open" | "ready" | "soon" | "info" | "warning" | "navy";
}) {
  return (
    <article className="hbe-card rounded-[36px] p-6 transition hover:-translate-y-1">
      <Badge tone={tone}>{action}</Badge>
      <h2 className="mt-4 text-2xl font-black text-hbe-navy">{title}</h2>
      <p className="mt-3 min-h-14 font-bold text-hbe-navy/68">{description}</p>
      <div className="mt-5">
        <Button href={href} variant="soft" className="w-full">
          Open
        </Button>
      </div>
    </article>
  );
}
