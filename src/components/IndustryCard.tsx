import { ArrowRight, Building2, CalendarCheck, GraduationCap, Layers, ShoppingBag } from "lucide-react";
import { Reveal, cx } from "./ui/primitives";

const icons = {
  "real-estate": Building2,
  retail: ShoppingBag,
  appointments: CalendarCheck,
  education: GraduationCap,
  agencies: Layers,
} as const;

/** Renders "A → b → c" as a quiet step line; plain sentences render as text. */
function Path({ text }: { text: string }) {
  if (!text.includes("→")) return <p className="text-[14px] text-fg/90">{text}</p>;
  const steps = text.split("→").map((s) => s.trim());
  return (
    <ol aria-label={text} className="flex flex-wrap items-center gap-y-1 text-[14px]">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center">
          {i > 0 && <ArrowRight aria-hidden className="mx-2 size-3.5 shrink-0 text-subtle" />}
          <span className={i === steps.length - 1 ? "text-fg" : "text-muted"}>{s}</span>
        </li>
      ))}
    </ol>
  );
}

/** Open editorial item: a top hairline, no box. */
export function IndustryCard({
  id,
  name,
  body,
  path,
  className,
  delay = 0,
}: {
  id: string;
  name: string;
  body: string;
  path: string;
  className?: string;
  delay?: number;
}) {
  const I = icons[id.replace(/^platform-/, "") as keyof typeof icons] ?? Layers;
  return (
    <Reveal as="article" id={id} delay={delay} className={cx("flex scroll-mt-28 flex-col border-t border-line pt-8", className)}>
      <h3 className="flex items-center gap-3 text-[1.2rem] font-medium tracking-[-0.01em] text-fg">
        <I className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden />
        {name}
      </h3>
      <p className="mt-3 max-w-[420px] text-[15px] leading-relaxed text-muted">{body}</p>
      <div className="mt-6">
        <Path text={path} />
      </div>
    </Reveal>
  );
}
