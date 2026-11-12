/**
 * Open (card-free) feature layouts.
 *  - FeatureRow       : alternating content + product preview (Product page)
 *  - FeatureListRow   : divided horizontal row, no preview (Home overview)
 *  - FeatureColumn    : compact open column (preview-module band)
 */
import type { ComponentType, ReactNode, SVGProps } from "react";
import { FileText, GitBranch, Inbox, Megaphone, Package, ScrollText, SquareStack, Users, Wallet } from "lucide-react";
import type { Feature } from "../content/site";
import type { ModuleKey } from "../content/types";
import { moduleAnchor } from "../content/types";
import { MaskReveal, ReadTicks, Reveal, Spotlight, StatusTag, cx } from "./ui/primitives";

type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

export const moduleIcons: Record<ModuleKey, Icon> = {
  inbox: Inbox,
  templates: FileText,
  campaigns: Megaphone,
  users: Users,
  ai: ScrollText,
  flows: SquareStack,
  catalogs: Package,
  wallet: Wallet,
  workflows: GitBranch,
};

function Category({ feature }: { feature: Feature }) {
  const I = moduleIcons[feature.key];
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] text-subtle">
      <span className="inline-flex items-center gap-2">
        <I className="size-4 text-muted transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg] group-hover:text-accent" strokeWidth={1.5} aria-hidden />
        <span className="tabular-nums">{feature.number}</span>
        <span className="text-muted">{feature.nav}</span>
      </span>
      {feature.status && <StatusTag>{feature.status}</StatusTag>}
    </p>
  );
}

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-3">
      {items.map((f) => (
        <li key={f} className="flex gap-3 text-[15px] leading-relaxed text-muted">
          <ReadTicks />
          {f}
        </li>
      ))}
    </ul>
  );
}

export function FeatureRow({ feature, preview, reverse = false }: { feature: Feature; preview: ReactNode; reverse?: boolean }) {
  return (
    <Reveal
      as="article"
      id={moduleAnchor[feature.key]}
      className="group grid scroll-mt-36 gap-12 py-20 first:pt-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-28"
    >
      <div className={cx("lg:col-span-5", reverse && "lg:order-2 lg:col-start-8")}>
        <Category feature={feature} />
        <h3 className="mt-5 text-[1.75rem] font-medium leading-[1.2] tracking-[-0.02em] text-fg">{feature.title}</h3>
        <p className="mt-4 max-w-[460px] text-[16px] leading-relaxed text-muted">{feature.description}</p>
        <div className="mt-8">
          <Ticks items={feature.features} />
        </div>
      </div>
      <MaskReveal from={reverse ? "left" : "right"} className={cx("min-w-0 lg:col-span-7", reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-6 lg:pl-8")}>
        {preview}
      </MaskReveal>
    </Reveal>
  );
}

export function FeatureListRow({ feature }: { feature: Feature }) {
  return (
    <Reveal as="article" id={moduleAnchor[feature.key]} className="group relative grid scroll-mt-28 gap-6 border-t border-line py-10 lg:grid-cols-12 lg:gap-8">
      <Spotlight size={520} />
      <div className="lg:col-span-3">
        <Category feature={feature} />
      </div>
      <div className="lg:col-span-4">
        <h3 className="text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-fg">{feature.title}</h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{feature.description}</p>
      </div>
      <div className="lg:col-span-5 lg:pl-4">
        <Ticks items={feature.features} />
      </div>
    </Reveal>
  );
}

export function FeatureColumn({ feature }: { feature: Feature }) {
  return (
    <Reveal as="article" id={moduleAnchor[feature.key]} className="group scroll-mt-36 border-t border-line pt-8">
      <Category feature={feature} />
      <h3 className="mt-5 text-[1.25rem] font-medium leading-snug tracking-[-0.015em] text-fg">{feature.title}</h3>
      <p className="mt-3 text-[15px] leading-relaxed text-muted">{feature.description}</p>
      <div className="mt-6">
        <Ticks items={feature.features} />
      </div>
    </Reveal>
  );
}
