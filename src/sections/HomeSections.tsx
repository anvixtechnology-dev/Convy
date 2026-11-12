import { Fragment, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  Fingerprint,
  GitBranch,
  History,
  Inbox,
  KeyRound,
  Link2,
  Megaphone,
  ShieldCheck,
  Eye,
  UsersRound,
} from "lucide-react";
import {
  benefits,
  features,
  finalCta,
  gettingStarted,
  hero,
  industries,
  journeys,
  process,
  security,
  workspace,
  type Feature,
} from "../content/site";
import { pricing } from "../content/pricing";
import { faq } from "../content/faq";
import { moduleAnchor } from "../content/types";
import { LINKS } from "../config/links";
import {
  Button,
  Eyebrow,
  PreviewCaption,
  Reveal,
  SectionHeading,
  SmartLink,
  TextLink,
  cx, MaskReveal, ReadTicks, stagger } from "../components/ui/primitives";
import { DashboardPreview } from "../components/DashboardPreview";
import { FeatureColumn, FeatureListRow, FeatureRow } from "../components/FeatureCard";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { IndustryCard } from "../components/IndustryCard";
import { PricingCard } from "../components/PricingCard";
import { FAQAccordion } from "../components/FAQAccordion";
import { AISummaryMini, CampaignMini, InboxMini, TemplateMini, UsersMini, WorkflowMini } from "../components/MiniPreviews";

const ease = [0.22, 1, 0.36, 1] as const;
/** Load-time fade-and-rise used for the hero copy. */
const rise = (delay: number, y = 14) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease },
});
const openConvyIcon = LINKS.openConvyIsExternal ? "external" : "arrow";

/* ================================================================== */
/* 01 HERO                                                            */
/* ================================================================== */
/** Splits a line into words that each rise out of their own mask. */
function RisingWords({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className="block">
      {text.split(" ").map((w, i, all) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className={cx("inline-block", className)}
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: delay + i * 0.07, ease }}
            >
              {w}
            </motion.span>
          </span>
          {/* real space between masked words (kept outside the clip) */}
          {i < all.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
}

export function HeroSection() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* soft radial lighting behind the product preview */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-20%] h-[760px] w-[900px] rounded-full bg-[radial-gradient(closest-side,rgb(50_191_165/0.16),rgb(50_191_165/0.05)_55%,transparent)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 0.2 }}
      />
      <div className="container-page relative grid gap-14 pb-20 pt-14 sm:pt-20 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-14 lg:pb-28 lg:pt-24">
        <div className="lg:pt-4">
          <motion.div {...rise(0)}>
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </motion.div>
          <h1 id="hero-title" className="text-[2.75rem] font-medium leading-[1.04] tracking-[-0.035em] text-fg sm:text-[3.5rem] lg:text-hero">
            <RisingWords text={hero.titleLine1} delay={0.1} />
            <RisingWords text={hero.titleLine2} delay={0.28} className="text-shimmer" />
          </h1>
          <motion.p {...rise(0.4)} className="mt-7 text-lg leading-relaxed text-muted">{hero.description}</motion.p>
          <motion.div {...rise(0.5)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={LINKS.openConvy} icon={openConvyIcon} className="h-12 px-6">
              {hero.primaryCta}
            </Button>
            <Button href="/platform" variant="secondary" className="h-12 px-6">
              {hero.secondaryCta}
            </Button>
          </motion.div>
          <ul className="mt-10 space-y-3 border-t border-line pt-6">
            {hero.highlights.map((h, i) => (
              <motion.li key={h} {...rise(0.62 + i * 0.08, 8)} className="flex items-start gap-3 text-[14px] text-fg/90">
                <ReadTicks />
                {h}
              </motion.li>
            ))}
          </ul>
          <motion.p {...rise(0.9, 8)} className="mt-7 text-[14px] text-subtle">
            {hero.demoPrompt}{" "}
            <SmartLink href={LINKS.bookDemo} className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
              {hero.demoLink}
            </SmartLink>
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="min-w-0 origin-top-left"
        >
          {/* very slow float — a few pixels, paused for reduced motion */}
          <motion.div
            animate={reduce ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
          >
            <DashboardPreview className="lg:w-[820px] lg:max-w-none" />
          </motion.div>
          <PreviewCaption>{hero.previewLabel}</PreviewCaption>
        </motion.div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 02 BENEFITS                                                        */
/* ================================================================== */
const benefitIcons = [Inbox, UsersRound, Megaphone];

export function BenefitsSection() {
  return (
    <section aria-labelledby="benefits-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="benefits-title" eyebrow={benefits.eyebrow} title={benefits.titleLine1} titleAccent={benefits.titleLine2} className="mb-16" />
        <ul className="grid border-t border-line md:grid-cols-3">
          {benefits.items.map((b, i) => {
            const I = benefitIcons[i];
            return (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 0.08}
                className={cx("border-b border-line py-9 md:border-b-0 md:py-10", i > 0 && "md:border-l md:pl-10", i < 2 && "md:pr-10")}
              >
                <I className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-7 text-[1.25rem] font-medium tracking-[-0.015em] text-fg">{b.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{b.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 03 PROCESS                                                         */
/* ================================================================== */
const processIcons = [Link2, UsersRound, GitBranch, Eye];

export function ProcessSection() {
  return (
    <section aria-labelledby="process-title" className="bg-band py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="process-title" eyebrow={process.eyebrow} title={process.title} description={process.description} className="mb-16" />
        <ProcessTimeline steps={process.steps.map((s, i) => ({ ...s, icon: processIcons[i] }))} />
      </div>
    </section>
  );
}

/* ================================================================== */
/* 04 PRODUCT WORKSPACE                                               */
/* variant "overview" (Home): open divided rows, no previews          */
/* variant "showcase" (Product): alternating content + preview rows   */
/* ================================================================== */
const byKey = Object.fromEntries(features.map((x) => [x.key, x])) as Record<Feature["key"], Feature>;

/** Highlights the module currently in view (IntersectionObserver, no scroll listeners). */
function useActiveModule() {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = features.map((x) => document.getElementById(moduleAnchor[x.key])).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function ModuleNav({ sticky = false }: { sticky?: boolean }) {
  const active = useActiveModule();
  return (
    <nav
      aria-label="Product modules"
      className={cx(sticky && "lg:sticky lg:top-[84px] lg:z-20 lg:-mx-8 lg:border-b lg:border-line lg:bg-page/80 lg:px-8 lg:py-3 lg:backdrop-blur-md")}
    >
      <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[14px]">
        {features.map((x) => {
          const isActive = active === moduleAnchor[x.key];
          return (
            <li key={x.key} className="relative">
              <a
                href={`#${moduleAnchor[x.key]}`}
                aria-current={isActive ? "location" : undefined}
                className={cx("transition-colors", isActive ? "text-fg" : "text-muted hover:text-fg")}
              >
                <span className="mr-1.5 tabular-nums text-subtle">{x.number}</span>
                {x.nav}
              </a>
              {isActive && (
                <motion.span
                  layoutId={sticky ? "module-indicator-sticky" : "module-indicator"}
                  className="absolute -bottom-1 left-0 right-0 h-px bg-accent"
                  transition={{ duration: 0.35, ease }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function AvailabilityNote() {
  return <p className="mt-12 max-w-[820px] text-[14px] leading-relaxed text-subtle">{workspace.availabilityNote}</p>;
}

export function WorkspaceSection({
  headingLevel = "h2",
  variant = "overview",
}: {
  headingLevel?: "h1" | "h2";
  variant?: "overview" | "showcase";
}) {
  return (
    <section id="workspace" aria-labelledby="workspace-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading
          as={headingLevel}
          id="workspace-title"
          eyebrow={workspace.eyebrow}
          title={workspace.titleLine1}
          titleAccent={workspace.titleLine2}
          description={workspace.description}
          className="mb-12"
        />
        <ModuleNav sticky={variant === "showcase"} />

        {variant === "overview" ? (
          <div className="mt-14 border-b border-line">
            {features.map((x) => (
              <FeatureListRow key={x.key} feature={x} />
            ))}
          </div>
        ) : (
          <>
            <div className="mt-20 lg:mt-28">
              <FeatureRow feature={byKey.inbox} preview={<InboxMini />} />
              <FeatureRow feature={byKey.templates} preview={<TemplateMini />} reverse />
              <FeatureRow feature={byKey.campaigns} preview={<CampaignMini />} />
              <FeatureRow feature={byKey.users} preview={<UsersMini />} reverse />
              <FeatureRow feature={byKey.ai} preview={<AISummaryMini detailed />} />
              <FeatureRow feature={byKey.workflows} preview={<WorkflowMini />} reverse />
            </div>
            <div className="grid gap-x-10 gap-y-12 pt-8 md:grid-cols-3">
              <FeatureColumn feature={byKey.flows} />
              <FeatureColumn feature={byKey.catalogs} />
              <FeatureColumn feature={byKey.wallet} />
            </div>
            <PreviewCaption>Product previews are illustrative and use demo data.</PreviewCaption>
          </>
        )}

        <AvailabilityNote />
      </div>
    </section>
  );
}

/* ================================================================== */
/* 05 CUSTOMER JOURNEYS                                               */
/* ================================================================== */
const journeyPreview = {
  templates: <TemplateMini />,
  campaigns: <CampaignMini />,
  ai: <AISummaryMini />,
  workflows: <WorkflowMini />,
} as const;

function ProcessLine({ steps }: { steps: string[] }) {
  return (
    <ol aria-label="Process" className="flex flex-wrap items-center gap-y-1 text-[14px]">
      {steps.map((p, k) => (
        <li key={p} className="flex items-center">
          {k > 0 && <span aria-hidden className="mx-2.5 text-subtle">→</span>}
          <span className="text-fg/90">{p}</span>
        </li>
      ))}
    </ol>
  );
}

/** compact = no previews (Product page, where previews already appear above). */
export function JourneysSection({ compact = false }: { compact?: boolean }) {
  return (
    <section aria-labelledby="journeys-title" className="bg-band py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="journeys-title" eyebrow={journeys.eyebrow} title={journeys.title} description={journeys.description} className="mb-16 lg:mb-20" />
        <div className={cx(compact && "border-b border-line")}>
          {journeys.items.map((j, i) =>
            compact ? (
              <Reveal as="article" key={j.number} className="grid gap-6 border-t border-line py-12 lg:grid-cols-12 lg:gap-8">
                <div className="lg:col-span-5">
                  <p className="text-[13px] text-subtle">
                    <span className="tabular-nums">{j.number}</span> – {j.label}
                  </p>
                  <h3 className="mt-3 text-[1.5rem] font-medium leading-snug tracking-[-0.02em] text-fg">{j.title}</h3>
                </div>
                <div className="lg:col-span-6 lg:col-start-7">
                  <p className="text-[15px] leading-relaxed text-muted">{j.body}</p>
                  <div className="mt-6">
                    <ProcessLine steps={j.process} />
                  </div>
                  <TextLink href={`/product#${moduleAnchor[j.key]}`} className="mt-6">
                    {j.link}
                  </TextLink>
                </div>
              </Reveal>
            ) : (
              <Reveal
                as="article"
                key={j.number}
                className="grid gap-12 py-16 first:pt-0 last:pb-0 lg:grid-cols-12 lg:items-center lg:gap-8 lg:py-24"
              >
                <div className={cx("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                  <p className="text-[13px] text-subtle">
                    <span className="tabular-nums">{j.number}</span> – {j.label}
                  </p>
                  <h3 className="mt-4 text-[1.75rem] font-medium leading-[1.2] tracking-[-0.02em] text-fg">{j.title}</h3>
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{j.body}</p>
                  <div className="mt-7">
                    <ProcessLine steps={j.process} />
                  </div>
                  <TextLink href={`/product#${moduleAnchor[j.key]}`} className="mt-7">
                    {j.link}
                  </TextLink>
                </div>
                <MaskReveal
                  from={i % 2 === 1 ? "left" : "right"}
                  className={cx("min-w-0 lg:col-span-7", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6 lg:pl-8")}
                >
                  {journeyPreview[j.key as keyof typeof journeyPreview]}
                </MaskReveal>
              </Reveal>
            ),
          )}
        </div>
        {!compact && <PreviewCaption>Product previews are illustrative and use demo data.</PreviewCaption>}
      </div>
    </section>
  );
}

/* ================================================================== */
/* 06 INDUSTRIES — editorial grid, hairlines only                     */
/* ================================================================== */
export function IndustriesSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="industries" aria-labelledby="industries-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              as={headingLevel}
              id="industries-title"
              eyebrow={industries.eyebrow}
              title={industries.titleLine1}
              titleAccent={industries.titleLine2}
              description={industries.description}
            />
          </div>
        </div>
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7 lg:col-start-6">
          {industries.items.map((it, i) => (
            <IndustryCard key={it.id} {...it} delay={stagger(i % 2, 0.08)} className={cx(i === 4 && "sm:col-span-2")} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 07 GETTING STARTED                                                 */
/* ================================================================== */
export function GettingStartedSection() {
  return (
    <section id="get-started" aria-labelledby="start-title" className="bg-band py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="start-title" eyebrow={gettingStarted.eyebrow} title={gettingStarted.title} className="mb-16" />
        <ProcessTimeline variant="timeline" steps={gettingStarted.steps} />
      </div>
    </section>
  );
}

/* ================================================================== */
/* 08 SECURITY                                                        */
/* ================================================================== */
const securityIcons = [ShieldCheck, KeyRound, History];

export function SecuritySection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="security" aria-labelledby="security-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading as={headingLevel} id="security-title" eyebrow={security.eyebrow} title={security.title} description={security.description} />
          <p className="mt-8 flex max-w-[440px] items-start gap-3 text-[14px] leading-relaxed text-subtle">
            <Fingerprint className="mt-0.5 size-4 shrink-0" strokeWidth={1.5} aria-hidden />
            {security.note}
          </p>
        </div>
        <ul className="lg:col-span-6 lg:col-start-7">
          {security.items.map((s, i) => {
            const I = securityIcons[i];
            return (
              <Reveal as="li" key={s.name} delay={stagger(i, 0.08)} className="grid grid-cols-[28px_1fr] gap-x-4 border-t border-line py-8 last:border-b">
                <I className="mt-1 size-[18px] text-muted" strokeWidth={1.5} aria-hidden />
                <div>
                  <h3 className="text-[1.125rem] font-medium text-fg">{s.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 09 PRICING — cards kept: they genuinely aid comparison             */
/* ================================================================== */
export function PricingSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="pricing" aria-labelledby="pricing-title" className="bg-band py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading as={headingLevel} id="pricing-title" eyebrow={pricing.eyebrow} title={pricing.title} description={pricing.description} className="mb-16" />
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pricing.plans.map((p, i) => (
            <PricingCard
              key={p.id}
              {...p}
              delay={stagger(i, 0.08)}
              highlight={p.id === "growth"}
              cta={
                p.id === "enterprise"
                  ? { label: "Book a demo", href: LINKS.bookDemo, variant: "secondary" }
                  : { label: "Open Convy", href: LINKS.openConvy, variant: "primary", external: LINKS.openConvyIsExternal }
              }
            />
          ))}
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {pricing.notes.map((n) => (
            <p key={n} className="text-[14px] leading-relaxed text-subtle">
              {n}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 10 FAQ                                                             */
/* ================================================================== */
export function FAQSection({ headingLevel = "h2" }: { headingLevel?: "h1" | "h2" }) {
  return (
    <section id="faq" aria-labelledby="faq-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading as={headingLevel} id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        </div>
        <div className="lg:col-span-8">
          <FAQAccordion items={faq.items} />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* 11 FINAL CTA — full-width band, no floating panel                  */
/* ================================================================== */
export function FinalCtaSection() {
  return (
    <section aria-labelledby="cta-title" className="border-t border-line bg-surface py-24 lg:py-32">
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
        <div className="lg:col-span-7">
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <h2 id="cta-title" className="text-[2rem] font-medium leading-[1.12] tracking-[-0.028em] text-fg sm:text-[2.5rem] lg:text-section">
            {finalCta.title}
          </h2>
          <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-muted">{finalCta.description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
          <Button href={LINKS.openConvy} icon={openConvyIcon} className="h-12 px-6">
            {finalCta.primaryCta}
          </Button>
          <Button href={LINKS.bookDemo} variant="secondary" className="h-12 px-6">
            {finalCta.secondaryCta}
          </Button>
        </div>
        <p className="max-w-[640px] text-[15px] leading-relaxed text-subtle lg:col-span-7">{finalCta.support}</p>
      </div>
    </section>
  );
}
