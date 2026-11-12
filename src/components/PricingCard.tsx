import { Button, Reveal, cx, ReadTicks } from "./ui/primitives";

export function PricingCard({
  name,
  audience,
  price,
  unit,
  items,
  cta,
  delay = 0,
}: {
  name: string;
  audience: string;
  price: string;
  unit: string;
  items: string[];
  cta: { label: string; href: string; variant: "primary" | "secondary"; external?: boolean };
  delay?: number;
}) {
  return (
    <Reveal
      as="article"
      delay={delay}
      className={cx(
        "flex h-full flex-col rounded-2xl border border-line bg-card p-7 transition-[transform,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-[#4a4e68]",
      )}
    >
      <h3 className="text-[12px] font-medium tracking-[0.08em] text-muted">{name}</h3>
      <p className="mt-3 min-h-[3rem] text-[15px] leading-relaxed text-muted">{audience}</p>
      <p className="mt-6">
        <span className="block text-[2.25rem] font-medium leading-tight tracking-[-0.03em] text-fg">{price}</span>
        {/* keep the line even when empty so CTAs align across cards */}
        <span className="mt-1 block min-h-5 text-[13px] text-subtle">{unit}</span>
      </p>
      <Button
        href={cta.href}
        variant={cta.variant}
        icon={cta.external ? "external" : undefined}
        className="mt-7 w-full"
      >
        {cta.label}
      </Button>
      <hr className="my-7 border-line-soft" />
      <ul className="space-y-3">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 text-[14px] leading-snug text-muted">
            <ReadTicks />
            {it}
          </li>
        ))}
      </ul>
    </Reveal>
  );
}
