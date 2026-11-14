/**
 * Home sections, built to the taste-skill kit (design-taste-frontend 2.5.1).
 *
 * type: software (site-kind software)
 * deal: hero centred, nav nav-mega, close close-word, footer footer-dark, rhythm dark-band,
 *       buttons arrow, mark dots, palette the brand's own (brief Part 2: #0B0708 ground, teal #B3264A),
 *       type instrument (Instrument Sans), moment letters-assemble (the statement section)
 * The page is a stack of screens: the hero alone on the first, every other section one or two.
 *
 * Copy comes from src/content and is the brief's; the kit's classes and tokens carry the look.
 */
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { EASE, Magnetic, Words } from "../fx/motion";
import { ConnectSceneLazy, GeoFieldLazy, Particles } from "../fx/Ambient";
import { HeroScene } from "../fx/HeroScene";
import { ProductStage, SplitStage } from "../fx/ProductScenes";
import { hero, benefits, process, workspace, features, industries, gettingStarted, security, journeys } from "../content/site";
const siteJourneys = { journeys };
import { pricing } from "../content/pricing";
import { faq } from "../content/faq";
import { moduleAnchor, type ModuleKey } from "../content/types";
import { LINKS } from "../config/links";
import { SmartLink } from "../components/ui/primitives";
import {
  aiSummary,
  auditLog,
  campaignChecklist,
  campaignStat,
  enquiryChat,
  inboxWindow,
  ownershipNotify,
  roleToggles,
  setupApps,
  templateDoc,
} from "../kit/fragments";

type H = "h1" | "h2";

/** A kit fragment pasted as markup into its slot (the slot div keeps the kit's placing classes). */
export function Frag({ html, className, style, loop }: { html: string; className: string; style?: React.CSSProperties; loop?: boolean }) {
  return <div className={className} style={style} data-ui-loop={loop ? "" : undefined} dangerouslySetInnerHTML={{ __html: html }} />;
}

/** A diagram card: the spec as JSON in a script inside the element (diagrams.md). */
export function Diagram({ spec, still }: { spec: object; still?: boolean }) {
  return <div className="dg" data-diagram="" data-dg-still={still ? "" : undefined} dangerouslySetInnerHTML={{ __html: `<script type="application/json">${JSON.stringify(spec)}</script>` }} />;
}

export const Arrow = () => (
  <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
    <path className="m-arrow__stem" d="M1 6h8" />
    <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
  </svg>
);

function Heading({ as: Tag = "h2", id, lead, muted }: { as?: H; id: string; lead: ReactNode; muted?: ReactNode }) {
  return (
    <Tag id={id}>
      {lead}
      {muted && (
        <>
          {" "}
          <span className="muted">{muted}</span>
        </>
      )}
    </Tag>
  );
}

/* ================================================================== 1 Hero (centred) */
export function HeroSection() {
  return (
    <section className="hero hero--centred fx-hero" aria-labelledby="hero-h">
      <div className="fx-hero__light" aria-hidden="true" />
      <GeoFieldLazy />
      <div className="wrap">
        <div className="hero-text">
          <div className="hero__c">
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
              <SmartLink className="pill fx-pill-glow" href="/pricing">
                <span>{hero.highlights[0]}</span>
                <span className="muted">Plans from ₹1,999 a month</span>
              </SmartLink>
            </motion.span>
            <h1 id="hero-h" aria-label={`${hero.titleLine1} ${hero.titleLine2}`}>
              <Words text={hero.titleLine1} delay={0.1} />{" "}
              <Words text={hero.titleLine2} delay={0.3} className="fx-words--accent" />
            </h1>
            {/* the brief's lead, first two sentences; its last clause carries the statement section below */}
            <motion.p
              className="hero__lead"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.55 }}
            >
              Turn WhatsApp enquiries into coordinated customer work. Bring your inbox, team, templates, and campaigns together.
            </motion.p>
            <motion.div
              className="btn-row"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.7 }}
            >
              <Magnetic>
                <SmartLink className="btn btn--primary fx-btn-3d" href={LINKS.openConvy}>
                  {hero.primaryCta}
                  <Arrow />
                </SmartLink>
              </Magnetic>
              <Magnetic strength={0.2}>
                <SmartLink className="btn btn--secondary fx-btn-3d" href={LINKS.bookDemo}>
                  Book a demo
                </SmartLink>
              </Magnetic>
            </motion.div>
          </div>
          <div className="hero__window cv-hero-ground fx-hero__window" role="img" aria-label="The CONVY workspace: a customer asks about a site visit in the shared inbox, with a campaign, a template, an AI summary and a workflow around it">
            <Particles />
            <HeroScene>
            <div className="ui cv-win" aria-hidden="true">
              <div className="cv-win__bar">
                <span className="cv-win__dots"><i /><i /><i /></span>
                <span><b>Priya Nair</b> · Site visit enquiry</span>
                <span className="sp" />
                <span>WhatsApp · Sales</span>
              </div>
              <div className="cv-win__body">
                <div className="cv-inbox">
                  <div className="q">Search conversations</div>
                  <div className="t is-on"><i style={{ background: "#F4B3C2" }}>PN</i><b>Priya Nair</b><time>10:42</time><span>Is the 3BHK in Baner still available?</span></div>
                  <div className="t"><i style={{ background: "#f3c98b" }}>RK</i><b>Rahul Kulkarni</b><time>10:31</time><span>Can you send the brochure again?</span></div>
                  <div className="t"><i style={{ background: "#a9c4f0" }}>FS</i><b>Fatima Shaikh</b><time>10:12</time><span>Resolved · order 2219 delivered</span></div>
                </div>
                <div className="cv-convo">
                  <div className="cv-chat" data-ly-steps="900">
                    <div className="cv-msg cv-msg--in">Is the 3BHK in Baner still available? Can we visit on Saturday?<small>10:42</small></div>
                    <div className="cv-tool" data-step>AI summary: wants a Saturday site visit, 3BHK in Baner</div>
                    <div className="cv-msg cv-msg--out" data-step>Hi Priya, yes, it is available. I have noted Saturday at 11:00 for your visit, and Arjun will meet you at the site.<small>Meera · Sales</small></div>
                    <div className="cv-acts" data-step><span>Send</span><span>Add note</span><span>Assign</span></div>
                  </div>
                </div>
              </div>
            </div>
            </HeroScene>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== 2 Benefits: three cards, a fragment each */
export function BenefitsSection() {
  const panels = [
    <Frag key="w" className="stage stage--fade-br" html={`<div class="at-corner wide" style="--w:620px;--ax:24px;--ay:24px">${inboxWindow}</div>`} />,
    <Frag key="n" className="stage stage--fade-b" html={`<div class="at-rise fit" style="--fit-max:360px;--ax:max(20px, 50% - 180px);--ay:32px;--ay-sm:20px">${ownershipNotify}</div>`} loop />,
    <Frag key="c" className="stage stage--fade-b" html={`<div class="at-rise fit" style="--fit-max:360px;--ax:max(20px, 50% - 180px);--ay:32px;--ay-sm:20px">${campaignChecklist}</div>`} />,
  ];
  return (
    <section className="section" id="benefits" aria-labelledby="benefits-h">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <Heading id="benefits-h" lead={benefits.titleLine1} muted={benefits.titleLine2} />
        </div>
        <div className="grid cv-cards">
          {benefits.items.map((b, i) => (
            <article className="card card--row span-4 fx-card3d" data-reveal="" style={{ ["--d" as string]: `${i * 0.1}s` }} key={b.title}>
              <h3>{b.title}</h3>
              <p>{b.body}</p>
              <div className="panel panel--flush">{panels[i]}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================== 3 Process: split, a lanes diagram */
const lanesSpec = {
  layout: "lanes",
  alt: "WhatsApp messages and campaigns come into CONVY, which carries them to the shared inbox, a campaign and a workflow.",
  input: { label: "WhatsApp", icon: "whatsapp" },
  core: { label: "CONVY", icon: "ui:message-square", tone: "accent" },
  lanes: [
    { label: "Inbox", icon: "ui:inbox", done: true, sub: "Assigned" },
    { label: "Campaign", icon: "ui:megaphone", done: true, sub: "Approved" },
    { label: "Workflow", icon: "ui:workflow", done: true, sub: "CRM" },
  ],
};

export function ProcessSection() {
  return (
    <section className="section g2m" id="process" aria-labelledby="process-h">
      <div className="wrap grid">
          <div className="span-6 stack-6">
            <div className="section-head" data-reveal="">
              <h2 id="process-h">{process.title}</h2>
              <p>{process.description}</p>
            </div>
            <ul className="rows cv-rows">
              {process.steps.map((s) => (
                <li key={s.name}>
                  <span className="rows__name">{s.name}</span>
                  <p>{s.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <SplitStage className="span-6 start-7 fill">
            <div className="frame frame--split frame--lit cv-diagram-frame cv-g2m-frame">
              <div className="panel cv-diagram">
                <Diagram spec={lanesSpec} still />
              </div>
            </div>
          </SplitStage>
      </div>
    </section>
  );
}

/* ================================================================== 4 Workspace: tabs-tour on the dark band */
const workflowSpec = {
  layout: "timeline",
  alt: "A workflow: an enquiry triggers it, a condition checks the service, a WhatsApp Flow collects the details, it waits for the response, then a CRM action runs.",
  steps: [
    { label: "Trigger", sub: "New enquiry", icon: "ui:zap" },
    { label: "Condition", sub: "Service: AC repair", icon: "ui:git-branch" },
    { label: "WhatsApp Flow", sub: "Collect details", icon: "whatsapp" },
    { label: "Wait for response", sub: "Up to 24 h", icon: "ui:clock" },
    { label: "CRM action", sub: "Create the lead", icon: "ui:send" },
  ],
};

const tourKeys: ModuleKey[] = ["templates", "campaigns", "ai", "workflows"];
const tourScreens: Record<string, ReactNode> = {
  templates: <Frag className="stage stage--fade-br" html={`<div class="at-rise to-edge" style="--w:520px;--ax:max(24px, 50% - 260px);--ay:48px">${templateDoc}</div>`} />,
  campaigns: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:480px;--ax:max(24px, 50% - 240px);--ay:56px">${campaignStat}</div>`} />,
  ai: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:480px;--ax:max(24px, 50% - 240px);--ay:56px">${aiSummary}</div>`} />,
  workflows: (
    <div className="stage cv-stage-diagram">
      <Diagram spec={workflowSpec} />
    </div>
  ),
};

export function WorkspaceTour({ headingLevel = "h2" }: { headingLevel?: H }) {
  const [on, setOn] = useState<ModuleKey>("templates");
  const items = tourKeys.map((k) => features.find((f) => f.key === k)!);
  return (
    <section className="section g2m ground-inverse" id="workspace" aria-labelledby="workspace-h">
      <div className="wrap grid">
          <div className="span-6 stack-6">
            <div className="section-head" data-reveal="">
              <Heading as={headingLevel} id="workspace-h" lead={workspace.titleLine1} muted={workspace.titleLine2} />
              <p>{workspace.description}</p>
            </div>
            <div className="tabs" role="tablist" aria-label="Workspace modules">
              {items.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  className="tab"
                  role="tab"
                  id={`tab-${f.key}`}
                  aria-selected={on === f.key}
                  aria-controls={`tabpanel-${f.key} screen-${f.key}`}
                  tabIndex={on === f.key ? 0 : -1}
                  onClick={() => setOn(f.key)}
                  onKeyDown={(e) => {
                    const d = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
                    if (!d) return;
                    e.preventDefault();
                    const next = items[(items.findIndex((x) => x.key === on) + d + items.length) % items.length];
                    setOn(next.key);
                    document.getElementById(`tab-${next.key}`)?.focus();
                  }}
                >
                  {f.nav}
                </button>
              ))}
            </div>
            {items.map((f) => (
              <div key={f.key} id={`tabpanel-${f.key}`} role="tabpanel" aria-labelledby={`tab-${f.key}`} hidden={on !== f.key} className="cv-tabpanel stack-4">
                <h3>{f.title}</h3>
                <p>{f.description}</p>
                <SmartLink className="link" href={`/product#${moduleAnchor[f.key]}`}>
                  See {f.nav.toLowerCase()}
                </SmartLink>
              </div>
            ))}
          </div>
          <SplitStage className="span-6 start-7 fill">
            <div className="frame frame--split cv-tour-frame cv-g2m-frame">
              {items.map((f) => (
                <div key={f.key} id={`screen-${f.key}`} className="cv-screen" hidden={on !== f.key} role="img" aria-label={`${f.nav} in CONVY`}>
                  {tourScreens[f.key]}
                </div>
              ))}
            </div>
          </SplitStage>
      </div>
    </section>
  );
}

/* ================================================================== 5 The statement (letters-assemble) */
export function StatementSection() {
  return (
    <section className="section fx-statement" id="statement" data-moment="letters-assemble" aria-labelledby="statement-h">
      <ConnectSceneLazy />
      <div className="wrap">
        <h2 id="statement-h" className="mo-la__type">
          We connect. We convert.
        </h2>
        <p className="mo-la__sub">Bring your inbox, team, templates, and campaigns together, with supported workflows and AI chat summaries when enabled.</p>
      </div>
    </section>
  );
}

/* ================================================================== 6 Industries: rows beside a WhatsApp thread */
export function IndustriesSection({ headingLevel = "h2" }: { headingLevel?: H }) {
  if (headingLevel === "h1") return <SolutionsIndustries />;
  return (
    <section className="section g2m" id="industries" aria-labelledby="industries-h">
      <div className="wrap grid">
          <div className="span-6 stack-6">
            <div className="section-head" data-reveal="">
              <Heading as={headingLevel} id="industries-h" lead={industries.titleLine1} muted={industries.titleLine2} />
            </div>
            <ul className="rows cv-rows">
              {industries.items.map((it) => (
                <li key={it.id} id={it.id}>
                  <span className="rows__name">{it.name}</span>
                  <p>{it.body}</p>
                </li>
              ))}
            </ul>
          </div>
          <SplitStage className="span-6 start-7 fill cv-chat-stage">
            <div className="frame frame--split frame--lit cv-chat-frame cv-g2m-frame" role="img" aria-label="A WhatsApp enquiry about a site visit, answered from the CONVY shared inbox">
              <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:440px;--ax:max(24px, 50% - 220px);--ay:48px">${enquiryChat}</div>`} />
            </div>
          </SplitStage>
      </div>
    </section>
  );
}

/**
 * The Solutions page's opening: the h1, its intro and a WhatsApp thread on the first screen; the
 * five industries, each with its customer journey, on the second. Two screens (.g2), so the
 * larger h1 and the intro never push the list into the next section.
 */
function SolutionsIndustries() {
  return (
    <section className="section g2 cv-solutions" id="industries" aria-labelledby="industries-h">
      <div className="wrap">
        <div className="grid cv-solutions__top">
          <div className="span-6 stack-6">
            <div className="section-head" data-reveal="">
              <Heading as="h1" id="industries-h" lead={industries.titleLine1} muted={industries.titleLine2} />
              <p>{industries.description}</p>
            </div>
          </div>
          <SplitStage className="span-6 start-7 cv-solutions__visual">
            <div className="frame frame--split frame--lit cv-chat-frame" role="img" aria-label="A WhatsApp enquiry about a site visit, answered from the CONVY shared inbox">
              <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:440px;--ax:max(24px, 50% - 220px);--ay:48px">${enquiryChat}</div>`} />
            </div>
          </SplitStage>
        </div>
        <ul className="cv-solutions__list" data-reveal="">
          {industries.items.map((it) => (
            <li key={it.id} id={it.id}>
              <h2 className="cv-solutions__name">{it.name}</h2>
              <p>{it.body}</p>
              <p className="cv-solutions__path">{it.path}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ================================================================== 7 Security: three cards */
const hubSpec = {
  layout: "hub",
  alt: "CONVY connects to WhatsApp and Meta through the official Business API and Embedded Signup, with roles and an activity record.",
  center: { label: "CONVY", icon: "ui:message-square", tone: "accent" },
  spokes: [
    { label: "WhatsApp", icon: "whatsapp" },
    { label: "Meta", icon: "meta" },
    { label: "Roles", icon: "ui:user-check" },
    { label: "Activity", icon: "ui:history" },
  ],
};

export function SecuritySection({ headingLevel = "h2" }: { headingLevel?: H }) {
  const panels = [
    <div key="d" className="cv-card-diagram">
      <Diagram spec={hubSpec} />
    </div>,
    <Frag key="t" className="stage stage--fade-b" html={`<div class="at-rise fit" style="--fit-max:360px;--ax:max(20px, 50% - 180px);--ay:32px;--ay-sm:20px">${roleToggles}</div>`} />,
    <Frag key="l" className="stage stage--fade-b" html={`<div class="at-rise fit" style="--fit-max:360px;--ax:max(20px, 50% - 180px);--ay:32px;--ay-sm:20px">${auditLog}</div>`} />,
  ];
  return (
    <section className="section" id="security" aria-labelledby="security-h">
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <Heading as={headingLevel} id="security-h" lead={security.title} />
          <p>{security.description}</p>
        </div>
        <div className="grid cv-cards">
          {security.items.map((s, i) => (
            <article className="card card--row span-4 fx-card3d" data-reveal="" style={{ ["--d" as string]: `${i * 0.1}s` }} key={s.name}>
              <h3>{s.name}</h3>
              <p>{s.body}</p>
              <div className="panel panel--flush">{panels[i]}</div>
            </article>
          ))}
        </div>
        <p className="t-small muted cv-note">{security.note}</p>
      </div>
    </section>
  );
}

/* ================================================================== 8 Getting started: split, the setup */
export function GettingStartedSection() {
  return (
    <section className="section g2m" id="get-started" aria-labelledby="get-started-h">
      <div className="wrap">
        <div className="stack-6">
          <div className="section-head--split" data-reveal="">
            <h2 id="get-started-h">{gettingStarted.title}</h2>
            <SmartLink className="link" href={LINKS.bookDemo}>
              Book a demo
            </SmartLink>
          </div>
          <ol className="grid cv-steps">
            {gettingStarted.steps.map((s) => (
              <li className="span-3" key={s.number}>
                <span className="step-num">{Number(s.number)}</span>
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
        <div className="frame frame--lit fill cv-setup-frame" data-reveal="" role="img" aria-label="Workspace setup in CONVY: WhatsApp connected, templates synced, the team invited and the first campaign ready">
          <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:460px;--ax:max(24px, 50% - 230px);--ay:40px">${setupApps}</div>`} loop />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== 9 Pricing: four plans */
const sentence = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

export function PricingSection({ headingLevel = "h2" }: { headingLevel?: H }) {
  return (
    <section className="section" id="pricing" aria-labelledby="pricing-h" style={headingLevel === "h1" ? ({ "--h": 2 } as React.CSSProperties) : undefined}>
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <Heading as={headingLevel} id="pricing-h" lead={pricing.title} muted={headingLevel === "h2" ? "Priced per tenant, per month." : undefined} />
          {headingLevel === "h1" && <p>{pricing.description}</p>}
        </div>
        <div className="grid cv-plans">
          {pricing.plans.map((p) => {
            const enterprise = p.id === "enterprise";
            return (
              <article className="card card--plan span-3 fx-plan" data-reveal="" style={{ ["--d" as string]: `${pricing.plans.indexOf(p) * 0.08}s` }} key={p.id}>
                <h3>{sentence(p.name)}</h3>
                <p className="muted">{p.audience}</p>
                <p className="price">
                  <span className="t-stat">{p.price}</span>
                  {p.unit && <span className="t-small muted">{p.unit.replace(/^\/ /, "per ").replace(/ \/ /g, " per ")}</span>}
                </p>
                <SmartLink className="btn btn--secondary" href={enterprise ? LINKS.bookDemo : LINKS.openConvy}>
                  {enterprise ? "Book a demo" : "Open Convy"}
                </SmartLink>
                <ul className="checks">
                  {p.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        {headingLevel === "h1" && (
          <div className="stack-2 cv-note">
            {pricing.notes.map((n) => (
              <p className="t-small muted" key={n}>
                {n}
              </p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/* ================================================================== 10 FAQ: every answer open */
export function FAQSection({ headingLevel = "h2", from = 0, count = 4, id = "faq" }: { headingLevel?: H; from?: number; count?: number; id?: string }) {
  const all = from === 0 && count >= faq.items.length;
  return (
    <section className="section" id={id} aria-labelledby={`${id}-h`}>
      <div className="wrap">
        <div className="grid">
          <div className="span-6 stack-6">
            <div className="section-head" data-reveal="">
              <Heading as={headingLevel} id={`${id}-h`} lead={from === 0 ? faq.title : "More questions."} />
              <p>{from === 0 ? "What teams ask before they start with Convy." : "Automation, AI, billing and setup."}</p>
            </div>
            <ul className="cv-works" aria-label="Works with">
              <li><img src="/assets/icons/whatsapp.svg" alt="" width="32" height="32" /><span>WhatsApp Business API</span></li>
              <li><img src="/assets/icons/meta.svg" alt="" width="32" height="22" /><span>Meta templates and Embedded Signup</span></li>
              <li><img src="/assets/icons/xlsx.svg" alt="" width="32" height="32" /><span>CSV and Excel audiences</span></li>
            </ul>
            {!all && from === 0 && headingLevel === "h2" ? (
              <SmartLink className="link" href="/faq">
                See all {faq.items.length} questions
              </SmartLink>
            ) : (
              <SmartLink className="link" href={LINKS.bookDemo}>
                Book a demo
              </SmartLink>
            )}
          </div>
          <FaqList items={faq.items.slice(from, from + count)} id={id} />
        </div>
      </div>
    </section>
  );
}

/** The questions as an accordion: one answer open at a time, the first open on load. */
function FaqList({ items, id }: { items: Array<{ q: string; a: string }>; id: string }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="faq fx-faq span-6 start-7" data-reveal="">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div className={`faq__item fx-faq__item${on ? " is-open" : ""}`} key={it.q}>
            <h3>
              <button
                type="button"
                className="fx-faq__q"
                aria-expanded={on}
                aria-controls={`${id}-a${i}`}
                id={`${id}-q${i}`}
                onClick={() => setOpen(on ? null : i)}
              >
                <span>{it.q}</span>
                <motion.span className="fx-faq__chev" animate={{ rotate: on ? 180 : 0 }} transition={{ duration: 0.3, ease: EASE }} aria-hidden="true">
                  <ChevronDown size={18} strokeWidth={2} />
                </motion.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  className="fx-faq__a"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <p>{it.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== Product page pieces */
/** The nine modules, one chapter screen each, with the anchors the nav and footer link to. */
const moduleScreens: Partial<Record<ModuleKey, ReactNode>> = {
  inbox: <Frag className="stage stage--fade-br" html={`<div class="at-corner to-edge" style="--ax:48px;--ay:48px">${inboxWindow}</div>`} />,
  templates: tourScreens.templates,
  campaigns: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:440px;--ax:max(24px, 50% - 220px);--ay:48px">${campaignChecklist}</div>`} />,
  users: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:440px;--ax:max(24px, 50% - 220px);--ay:48px">${roleToggles}</div>`} />,
  ai: tourScreens.ai,
  flows: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:440px;--ax:max(24px, 50% - 220px);--ay:48px">${enquiryChat}</div>`} />,
  catalogs: <Frag className="stage stage--fade-b" html={`<div class="at-rise to-edge" style="--w:460px;--ax:max(24px, 50% - 230px);--ay:48px">${setupApps}</div>`} />,
  wallet: tourScreens.campaigns,
  workflows: tourScreens.workflows,
};

export function ModuleChapters() {
  return (
    <>
      {features.map((f, i) => (
        <section className="section" id={moduleAnchor[f.key]} key={f.key} aria-labelledby={`${f.key}-h`}>
          <div className="wrap">
            <div className="grid">
              <div className="span-6 stack-6">
                <div className="section-head" data-reveal="">
                  {i === 0 ? (
                    <h1 id={`${f.key}-h`}>
                      {f.title}
                    </h1>
                  ) : (
                    <h2 id={`${f.key}-h`}>{f.title}</h2>
                  )}
                  <p>
                    {f.nav}
                    {f.status ? `, ${sentence(f.status).replace("ai ·", "AI,")}` : ""}. {f.description}
                  </p>
                </div>
                <ul className="checks">
                  {f.features.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
              <ProductStage
                module={f.key}
                className="span-6 start-7"
                frameClass={`frame frame--split${f.key === "workflows" ? "" : " frame--lit"}`}
                label={`${f.nav} in CONVY`}
              >
                {moduleScreens[f.key]}
              </ProductStage>
            </div>
          </div>
        </section>
      ))}
    </>
  );
}

/** Kept for the pages that still import it: the close now lives in footer.closing on every page. */
export function FinalCtaSection() {
  return null;
}

/** The four customer journeys (Product page): two screens, two journeys a screen. */
export function JourneysSection() {
  const { journeys } = siteJourneys;
  const rows = (list: typeof journeys.items) => (
    <ul className="rows cv-journeys span-12">
      {list.map((j) => (
        <li key={j.key}>
          <span className="rows__name">{j.title}</span>
          <p>{j.body}</p>
          <span className="rows__value">{j.process.join(" · ")}</span>
          <SmartLink className="link" href={`/product#${moduleAnchor[j.key]}`}>
            See {j.label.toLowerCase()}
          </SmartLink>
        </li>
      ))}
    </ul>
  );
  return (
    <section className="section" id="journeys" aria-labelledby="journeys-h" style={{ "--h": 2 } as React.CSSProperties}>
      <div className="wrap">
        <div className="section-head" data-reveal="">
          <h2 id="journeys-h">{journeys.title}</h2>
          <p>{journeys.description}</p>
        </div>
        <div className="grid">{rows(journeys.items)}</div>
      </div>
    </section>
  );
}
