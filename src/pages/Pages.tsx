import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BenefitsSection,
  FAQSection,
  GettingStartedSection,
  HeroSection,
  IndustriesSection,
  JourneysSection,
  ModuleChapters,
  PricingSection,
  ProcessSection,
  SecuritySection,
  StatementSection,
  WorkspaceTour,
} from "../sections/HomeSections";
import {
  PlatformAI,
  PlatformAutomation,
  PlatformCta,
  PlatformFoundations,
  PlatformGettingStarted,
  PlatformHero,
  PlatformIndustries,
  PlatformIntro,
  PlatformProcess,
  PlatformTeams,
  PlatformWorkspace,
} from "../sections/PlatformSections";
import { SITE } from "../config/links";

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function HomePage() {
  useTitle("CONVY: a shared WhatsApp inbox for business teams");
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <WorkspaceTour />
      <StatementSection />
      <IndustriesSection />
      <SecuritySection />
      <PricingSection />
      <GettingStartedSection />
      <FAQSection />
    </>
  );
}

export function ProductPage() {
  useTitle("Product: the CONVY workspace for WhatsApp teams");
  return (
    <>
      <ModuleChapters />
      <JourneysSection />
    </>
  );
}

/**
 * The Platform page keeps its own Tailwind sections for now. The wrapper keeps them out of the
 * kit's one-section-per-screen box (main > section), which they were not built for.
 */
export function PlatformPage() {
  useTitle("Platform: CONVY for connected customer operations");
  return (
    <div className="legacy-page">
      <PlatformHero />
      <PlatformIntro />
      <PlatformProcess />
      <PlatformWorkspace />
      <PlatformTeams />
      <PlatformAutomation />
      <PlatformAI />
      <PlatformIndustries />
      <PlatformFoundations />
      <PlatformGettingStarted />
      <PlatformCta />
    </div>
  );
}

export function SolutionsPage() {
  useTitle("Solutions: CONVY for real estate, retail, services, education and agencies");
  return (
    <>
      <IndustriesSection headingLevel="h1" />
      <GettingStartedSection />
    </>
  );
}

export function SecurityPage() {
  useTitle("Security: how CONVY controls your customer workspace");
  return <SecuritySection headingLevel="h1" />;
}

export function PricingPage() {
  useTitle("Pricing: CONVY plans per tenant");
  return (
    <>
      <PricingSection headingLevel="h1" />
      <FAQSection />
    </>
  );
}

export function FAQPage() {
  useTitle("FAQ: questions about CONVY");
  return (
    <>
      <FAQSection headingLevel="h1" count={4} />
      <FAQSection from={4} count={4} id="faq-more" />
      <FAQSection from={8} count={4} id="faq-last" />
    </>
  );
}

/**
 * Privacy / Terms — routes exist so footer links resolve, but no legal text was
 * supplied. No policy wording is invented here; replace with the approved documents.
 */
export function LegalPage({ title }: { title: "Privacy" | "Terms" }) {
  useTitle(`${title}: CONVY`);
  return (
    <section className="section" aria-labelledby="legal-h">
      <div className="wrap">
        <div className="section-head measure">
          <h1 id="legal-h">{title}</h1>
          <p>
            This document is not yet published on the website. For questions, contact{" "}
            <a className="link" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

export function NotFoundPage() {
  useTitle("Page not found: CONVY");
  return (
    <section className="section" aria-labelledby="nf-h">
      <div className="wrap">
        <div className="section-head">
          <h1 id="nf-h">Page not found</h1>
          <p>
            <Link className="link" to="/">
              Back to the home page
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
