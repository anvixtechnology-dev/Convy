import type { ComponentType, SVGProps } from "react";
import { Reveal, cx } from "./ui/primitives";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

export type TimelineStep = { number: string; name: string; tagline?: string; body: string; icon?: Icon };

/**
 * Four-column numbered process with thin separators (desktop),
 * vertical timeline (mobile). Used for "process" and "getting started".
 */
export function ProcessTimeline({ steps, variant = "columns" }: { steps: TimelineStep[]; variant?: "columns" | "timeline" }) {
  if (variant === "columns") {
    return (
      <ol className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.number}
            delay={i * 0.08}
            className={cx(
              "border-b border-line py-8 sm:pr-8 lg:border-b-0 lg:py-10",
              i > 0 && "lg:border-l lg:pl-8",
              i % 2 === 1 && "sm:border-l sm:pl-8 lg:pl-8",
            )}
          >
            <div className="flex items-center justify-between">
              {s.icon && <s.icon className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden />}
              <span className="text-[13px] font-medium tabular-nums text-subtle">{s.number}</span>
            </div>
            <h3 className="mt-8 text-[1.375rem] font-medium tracking-[-0.015em] text-fg">{s.name}</h3>
            {s.tagline && <p className="mt-2 font-medium text-fg/90">{s.tagline}</p>}
            <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </Reveal>
        ))}
      </ol>
    );
  }

  return (
    <ol className="relative grid lg:grid-cols-4 lg:gap-8">
      <span aria-hidden className="absolute bottom-2 left-[19px] top-2 w-px bg-line lg:hidden" />
      <span aria-hidden className="absolute left-0 right-0 top-[19px] hidden h-px bg-line lg:block" />
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.number}
          delay={0.1 + i * 0.1}
          className="relative grid grid-cols-[40px_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          <span
            className={cx(
              "relative z-10 grid size-10 place-items-center rounded-full border bg-page text-[13px] font-medium tabular-nums",
              "border-line text-fg",
            )}
          >
            {s.number}
          </span>
          <div className="lg:mt-7">
            <h3 className="text-lg font-medium text-fg">{s.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
