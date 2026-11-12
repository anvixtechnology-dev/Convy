/**
 * Platform page — content from content/platform.ts (approved Platform page copy),
 * rendered in the shared dark design system.
 */
import { GitBranch, History, KeyRound, Link2, ShieldCheck, Eye, UsersRound } from "lucide-react";
import {
  ai,
  automation,
  availabilityNote,
  finalCta,
  foundations,
  gettingStarted,
  hero,
  industries,
  intro,
  process,
  teams,
  workspace,
  type Availability,
  type ModuleId,
} from "../content/platform";
import { LINKS } from "../config/links";
import { Button, Eyebrow, PreviewCaption, Reveal, SectionHeading, StatusPill, cx, ReadTicks, stagger } from "../components/ui/primitives";
import { DashboardPreview } from "../components/DashboardPreview";
import { ProcessTimeline } from "../components/ProcessTimeline";
import { IndustryCard } from "../components/IndustryCard";
import { moduleIcons } from "../components/FeatureCard";
import { AISummaryMini, WorkflowMini } from "../components/MiniPreviews";
import { motion } from "framer-motion";

const status: Record<Availability, string | null> = {
  standard: null,
  "ai-enabled": "AI · WHEN ENABLED",
  preview: "PREVIEW",
  configured: "CONFIGURED WORKFLOWS",
};
const moduleKey: Record<ModuleId, keyof typeof moduleIcons> = {
  inbox: "inbox",
  templates: "templates",
  campaigns: "campaigns",
  users: "users",
  ai: "ai",
  flows: "flows",
  catalogs: "catalogs",
  wallet: "wallet",
  workflows: "workflows",
};
const H2 = "text-[2rem] font-medium leading-[1.12] tracking-[-0.025em] text-fg sm:text-[2.375rem] lg:text-section";

/* 01 Hero */
export function PlatformHero() {
  return (
    <section aria-labelledby="platform-hero-title" className="relative overflow-hidden">
      
      <div className="container-page relative pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mx-auto max-w-[880px] text-center">
          <Eyebrow className="justify-center">{hero.eyebrow}</Eyebrow>
          <h1 id="platform-hero-title" className="text-[2.6rem] font-medium leading-[1.05] tracking-[-0.035em] text-fg sm:text-[3.4rem] lg:text-hero">
            {hero.titleLead} <span className="text-accent">{hero.titleAccent}</span>
          </h1>
          <p className="mx-auto mt-7 max-w-[680px] text-lg leading-relaxed text-fg/90">{hero.lead}</p>
          <p className="mx-auto mt-4 max-w-[620px] leading-relaxed text-muted">{hero.body}</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button href="#platform-workspace" icon="arrow" className="h-12 px-6">{hero.primaryCta}</Button>
            <Button href={LINKS.bookDemo} variant="secondary" className="h-12 px-6">{hero.secondaryCta}</Button>
          </div>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-7 gap-y-3">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-start gap-2 text-[14px] text-muted">
                <ReadTicks />
                {h}
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }} className="mx-auto mt-16 max-w-[1040px]">
          <DashboardPreview />
          <PreviewCaption />
        </motion.div>
      </div>
    </section>
  );
}

/* 02 Introduction */
export function PlatformIntro() {
  return (
    <section aria-labelledby="platform-intro-title" className="py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{intro.eyebrow}</Eyebrow>
            <h2 id="platform-intro-title" className={H2}>{intro.title}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            {intro.paragraphs.map((p) => (
              <p key={p} className="mb-5 text-lg leading-relaxed text-muted">{p}</p>
            ))}
            <p className="mt-8 text-[1.3rem] font-medium leading-snug text-fg">{intro.closing}</p>
          </Reveal>
        </div>
        <ul className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {intro.benefits.map((b, i) => (
            <Reveal as="li" key={b.title} delay={i * 0.06} className={cx("border-b border-line py-8 sm:pr-8 lg:border-b-0", i > 0 && "lg:border-l lg:pl-8", i % 2 === 1 && "sm:border-l sm:pl-8")}>
              <h3 className="text-[17px] font-medium text-fg">{b.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{b.body}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* 03 How it works */
const stepIcons = [Link2, UsersRound, GitBranch, Eye];
export function PlatformProcess() {
  return (
    <section aria-labelledby="platform-process-title" className="bg-surface py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="platform-process-title" eyebrow={process.eyebrow} title={process.title} description={process.description} className="mb-16" />
        <ProcessTimeline steps={process.steps.map((s, i) => ({ number: s.number, name: s.name, tagline: s.tagline, body: s.body, icon: stepIcons[i] }))} />
      </div>
    </section>
  );
}

/* 04 Connected workspace */
export function PlatformWorkspace() {
  const ids = Object.keys(workspace.modules) as ModuleId[];
  return (
    <section id="platform-workspace" aria-labelledby="platform-ws-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="platform-ws-title" eyebrow={workspace.eyebrow} title={workspace.title} description={workspace.description} className="mb-16" />
        {/* Open icon-and-text list: top hairlines only, no boxes */}
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {ids.map((id, i) => {
            const m = workspace.modules[id];
            const I = moduleIcons[moduleKey[id]];
            const s = status[m.availability];
            return (
              <Reveal key={id} delay={stagger(i % 3, 0.08)} className="border-t border-line pt-7">
                <h3 className="flex items-center gap-3 text-[1.125rem] font-medium text-fg">
                  <I className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden />
                  {m.name}
                </h3>
                {s && <p className="mt-2"><StatusPill>{s}</StatusPill></p>}
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{m.body}</p>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* 05 Teams */
export function PlatformTeams() {
  return (
    <section aria-labelledby="platform-teams-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{teams.eyebrow}</Eyebrow>
          <h2 id="platform-teams-title" className={H2}>{teams.title}</h2>
          <p className="mt-6 text-[1.25rem] font-medium leading-snug text-fg">{teams.lead}</p>
          <p className="mt-4 text-lg leading-relaxed text-muted">{teams.body}</p>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {teams.groups.map((g) => (
              <li key={g.name} className="border-t border-line pt-7">
                <span className="flex items-center gap-2.5">
                  <span aria-hidden className="size-2 rounded-full bg-accent-2" />
                  <h3 className="text-lg font-medium text-fg">{g.name}</h3>
                </span>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{g.body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

/* 06 Workflow automation */
export function PlatformAutomation() {
  return (
    <section aria-labelledby="platform-auto-title" className="bg-surface py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="platform-auto-title" eyebrow={automation.eyebrow} title={automation.title} />
          <Reveal>
            {automation.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-[16px] leading-relaxed text-muted">{p}</p>
            ))}
            <h3 className="mt-10 text-[12px] font-medium uppercase tracking-[0.08em] text-subtle">{automation.elementsLabel}</h3>
            <ul className="mt-4 space-y-2.5">
              {automation.elements.map((el) => (
                <li key={el} className="flex gap-2.5 text-[15px] text-fg/90">
                  <ReadTicks />
                  {el}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
          <WorkflowMini />
          <div className="mt-5 border-t border-line pt-5">
            <p className="text-[14px] text-fg/90">
              <span className="text-subtle">{automation.journeyLabel}</span> {automation.journey.join(" → ")}
            </p>
            <p className="mt-2 text-[13px] text-subtle">{automation.note}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* 07 AI */
export function PlatformAI() {
  return (
    <section aria-labelledby="platform-ai-title" className="py-24 lg:py-32">
      <div className="container-page grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <SectionHeading id="platform-ai-title" eyebrow={ai.eyebrow} title={ai.title} />
          <Reveal>
            {ai.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-muted">{p}</p>
            ))}
            <h3 className="mt-10 text-[12px] font-medium uppercase tracking-[0.08em] text-subtle">{ai.capabilitiesLabel}</h3>
            <ul className="mt-4 divide-y divide-line border-y border-line">
              {ai.capabilities.map((c) => (
                <li key={c} className="flex items-start gap-3 py-3 text-[15px] text-fg/90">
                  <ReadTicks />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-8 border-l-2 border-line pl-4 text-[15px] leading-relaxed text-fg/90">{ai.responsibility}</p>
          </Reveal>
        </div>
        <Reveal delay={0.1} className="min-w-0 lg:col-span-6 lg:col-start-7">
          <AISummaryMini detailed />
          <PreviewCaption />
        </Reveal>
      </div>
    </section>
  );
}

/* 08 Industries */
export function PlatformIndustries() {
  return (
    <section aria-labelledby="platform-ind-title" className="bg-surface py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="platform-ind-title" eyebrow={industries.eyebrow} title={industries.title} description={industries.description} className="mb-16" />
        <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {industries.items.map((it, i) => (
            <IndustryCard
              key={it.id}
              delay={stagger(i % 3, 0.08)}
              id={`platform-${it.id}`}
              name={it.name}
              body={it.body}
              path={it.journey.join(" → ")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* 09 Foundations */
const foundationIcons = [ShieldCheck, KeyRound, History];
export function PlatformFoundations() {
  return (
    <section aria-labelledby="platform-found-title" className="py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="platform-found-title" eyebrow={foundations.eyebrow} title={foundations.title} description={foundations.description} className="mb-16" />
        <ul className="grid border-t border-line md:grid-cols-3">
          {foundations.items.map((f, i) => {
            const I = foundationIcons[i];
            return (
              <Reveal as="li" key={f.name} delay={i * 0.08} className={cx("border-b border-line py-9 md:border-b-0", i > 0 && "md:border-l md:pl-10", i < 2 && "md:pr-10")}>
                <I className="size-[18px] text-muted" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-6 text-lg font-medium text-fg">{f.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{f.body}</p>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* 10 Getting started */
export function PlatformGettingStarted() {
  return (
    <section aria-labelledby="platform-start-title" className="bg-surface py-24 lg:py-32">
      <div className="container-page">
        <SectionHeading id="platform-start-title" eyebrow={gettingStarted.eyebrow} title={gettingStarted.title} className="mb-16" />
        <ProcessTimeline variant="timeline" steps={gettingStarted.steps} />
      </div>
    </section>
  );
}

/* 11 Final CTA + 12 availability */
export function PlatformCta() {
  return (
    <section aria-labelledby="platform-cta-title" className="border-t border-line bg-surface py-24 lg:py-32">
      <div className="container-page">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Eyebrow>{finalCta.eyebrow}</Eyebrow>
            <h2 id="platform-cta-title" className={H2}>{finalCta.title}</h2>
            <p className="mt-5 max-w-[560px] text-lg leading-relaxed text-muted">{finalCta.lead}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <Button href={LINKS.openConvy} icon={LINKS.openConvyIsExternal ? "external" : "arrow"} className="h-12 px-6">{finalCta.primaryCta}</Button>
            <Button href={LINKS.bookDemo} variant="secondary" className="h-12 px-6">{finalCta.secondaryCta}</Button>
          </div>
          <p className="max-w-[640px] text-[15px] leading-relaxed text-subtle lg:col-span-7">{finalCta.support}</p>
        </div>
        <p className="mt-16 max-w-[860px] border-t border-line pt-8 text-[13px] leading-relaxed text-subtle">
          <span className="font-medium text-muted">Feature availability. </span>
          {availabilityNote}
        </p>
      </div>
    </section>
  );
}
