import type { ComponentType, SVGProps } from "react";
import { motion } from "framer-motion";
import { EASE, Reveal, cx } from "./ui/primitives";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

export type TimelineStep = { number: string; name: string; tagline?: string; body: string; icon?: Icon };

/** A hairline that draws itself across (or down) when it scrolls into view. */
function DrawLine({ className, axis = "x", duration = 1.2 }: { className: string; axis?: "x" | "y"; duration?: number }) {
  return (
    <motion.span
      aria-hidden
      className={cx(className, axis === "x" ? "origin-left" : "origin-top")}
      initial={axis === "x" ? { scaleX: 0 } : { scaleY: 0 }}
      whileInView={axis === "x" ? { scaleX: 1 } : { scaleY: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration, ease: EASE }}
    />
  );
}

/**
 * Four-column numbered process with thin separators (desktop),
 * vertical timeline (mobile). Used for "process" and "getting started".
 */
export function ProcessTimeline({ steps, variant = "columns" }: { steps: TimelineStep[]; variant?: "columns" | "timeline" }) {
  if (variant === "columns") {
    return (
      <ol className="relative grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
        {/* a brighter hairline sweeps across the top border, step by step */}
        <DrawLine className="absolute -top-px left-0 right-0 hidden h-px bg-muted/60 lg:block" duration={1.6} />
        {steps.map((s, i) => (
          <Reveal
            as="li"
            key={s.number}
            delay={0.15 + i * 0.12}
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
      <DrawLine axis="y" className="absolute bottom-2 left-[19px] top-2 w-px bg-line lg:hidden" duration={1.4} />
      <DrawLine className="absolute left-0 right-0 top-[19px] hidden h-px bg-line lg:block" duration={1.4} />
      {steps.map((s, i) => (
        <Reveal
          as="li"
          key={s.number}
          delay={0.2 + i * 0.18}
          className="relative grid grid-cols-[40px_1fr] gap-x-5 pb-10 last:pb-0 lg:block lg:pb-0"
        >
          <motion.span
            className="relative z-10 grid size-10 place-items-center rounded-full border border-line bg-surface text-[13px] font-medium tabular-nums text-fg"
            initial={{ scale: 0.6, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: 0.2 + i * 0.18, ease: EASE }}
          >
            {s.number}
          </motion.span>
          <div className="lg:mt-7">
            <h3 className="text-lg font-medium text-fg">{s.name}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
