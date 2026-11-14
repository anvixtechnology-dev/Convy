import { useId, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, cx } from "./ui/primitives";

/**
 * Accessible accordion: native buttons with aria-expanded/controls,
 * ArrowUp/ArrowDown/Home/End move focus between questions.
 * Answers open with a smooth height transition; the chevron rotates.
 */
export function FAQAccordion({ items, defaultOpen = 0 }: { items: Array<{ q: string; a: string }>; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const base = useId();

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const next = { ArrowDown: i === last ? 0 : i + 1, ArrowUp: i === 0 ? last : i - 1, Home: 0, End: last }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    refs.current[next]?.focus();
  };

  return (
    <div className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${base}-q${i}`;
        const panelId = `${base}-a${i}`;
        return (
          <div key={it.q} className="relative border-b border-line">
            {/* active-question marker */}
            <span
              aria-hidden
              className={cx(
                "absolute -left-4 top-6 h-6 w-px origin-top bg-accent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:-left-6",
                isOpen ? "scale-y-100" : "scale-y-0",
              )}
            />
            <h3>
              <button
                ref={(el) => {
                  refs.current[i] = el;
                }}
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => onKey(e, i)}
                className="group flex w-full items-center gap-6 py-6 text-left"
              >
                <span className={cx("flex-1 text-[17px] font-medium transition-colors duration-200", isOpen ? "text-fg" : "text-fg/80 group-hover:text-fg")}>
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className={cx(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,color,border-color,background-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isOpen ? "rotate-180 border-accent/50 bg-accent/10 text-accent" : "border-line text-muted group-hover:border-[#4D343B] group-hover:text-fg",
                  )}
                >
                  <ChevronDown className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { duration: 0.35, ease: EASE }, opacity: { duration: 0.25 } }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[760px] pb-7 pr-14 text-[15px] leading-relaxed text-muted">{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
