import { Button, Reveal, ReadTicks, Spotlight, cx } from "./ui/primitives";

export function PricingCard({
  name,
  audience,
  price,
  unit,
  items,
  cta,
  delay = 0,
  highlight = false,
}: {
  name: string;
  audience: string;
  price: string;
  unit: string;
  items: string[];
  cta: { label: string; href: string; variant: "primary" | "secondary"; external?: boolean };
  delay?: number;
  /** Visual emphasis only — no "popular"/"recommended" claim is made. */
  highlight?: boolean;
}) {
  return (
    // Reveal owns the entrance transform; the inner element owns the hover lift.
    <Reveal as="article" delay={delay} className="h-full">
      <div
        className={cx(
          "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-7 transition-[transform,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1",
          highlight
            ? "border-accent/40 bg-[linear-gradient(180deg,rgb(50_191_165/0.08),var(--color-card)_38%)] shadow-[0_20px_50px_-30px_rgb(50_191_165/0.45)] hover:border-accent/60"
            : "border-line bg-card hover:border-[#4a4e68]",
        )}
      >
        {highlight && (
          <span aria-hidden className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
        )}
        <Spotlight size={360} />
        <h3 className={cx("relative text-[12px] font-medium tracking-[0.08em]", highlight ? "text-accent" : "text-muted")}>{name}</h3>
        <p className="relative mt-3 min-h-[3rem] text-[15px] leading-relaxed text-muted">{audience}</p>
        <p className="relative mt-6">
          <span className="block text-[2.25rem] font-medium leading-tight tracking-[-0.03em] text-fg">{price}</span>
          {/* keep the line even when empty so CTAs align across cards */}
          <span className="mt-1 block min-h-5 text-[13px] text-subtle">{unit}</span>
        </p>
        <Button href={cta.href} variant={cta.variant} icon={cta.external ? "external" : "arrow"} className="relative mt-7 w-full">
          {cta.label}
        </Button>
        <hr className="relative my-7 border-line-soft" />
        <ul className="relative space-y-3">
          {items.map((it) => (
            <li key={it} className="flex gap-2.5 text-[14px] leading-snug text-muted">
              <ReadTicks />
              {it}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
