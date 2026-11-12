import { useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cx } from "./ui/primitives";

/**
 * Accessible accordion: native buttons with aria-expanded/controls,
 * ArrowUp/ArrowDown/Home/End move focus between questions.
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
          <div key={it.q} className="border-b border-line">
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
                <span className={cx("flex-1 text-[17px] font-medium transition-colors", isOpen ? "text-fg" : "text-fg/90 group-hover:text-fg")}>
                  {it.q}
                </span>
                <span
                  aria-hidden
                  className={cx(
                    "grid size-8 shrink-0 place-items-center rounded-full border transition-[transform,color,border-color] duration-150",
                    isOpen ? "rotate-45 border-[#4a4e68] text-fg" : "border-line text-muted group-hover:border-[#4a4e68]",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            {isOpen && (
                <motion.div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="max-w-[760px] pb-7 pr-14 text-[15px] leading-relaxed text-muted">{it.a}</p>
                </motion.div>
              )}
          </div>
        );
      })}
    </div>
  );
}
