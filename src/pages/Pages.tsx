import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BenefitsSection,
  FAQSection,
  FinalCtaSection,
  GettingStartedSection,
  HeroSection,
  IndustriesSection,
  JourneysSection,
  PricingSection,
  ProcessSection,
  SecuritySection,
  WorkspaceSection,
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
import { Eyebrow } from "../components/ui/primitives";

function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

export function HomePage() {
  useTitle("CONVY — Your WhatsApp. One connected team.");
  return (
    <>
      <HeroSection />
      <BenefitsSection />
      <ProcessSection />
      <WorkspaceSection />
      <JourneysSection />
      <IndustriesSection />
      <GettingStartedSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <FinalCtaSection />
    </>
  );
}

export function ProductPage() {
  useTitle("Product — CONVY");
  return (
    <>
      <WorkspaceSection headingLevel="h1" variant="showcase" />
      <JourneysSection compact />
      <FinalCtaSection />
    </>
  );
}

export function PlatformPage() {
  useTitle("Platform — CONVY");
  return (
    <>
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
    </>
  );
}

export function SolutionsPage() {
  useTitle("Solutions — CONVY");
  return (
    <>
      <IndustriesSection headingLevel="h1" />
      <GettingStartedSection />
      <FinalCtaSection />
    </>
  );
}

export function SecurityPage() {
  useTitle("Security — CONVY");
  return (
    <>
      <SecuritySection headingLevel="h1" />
      <FinalCtaSection />
    </>
  );
}

export function PricingPage() {
  useTitle("Pricing — CONVY");
  return (
    <>
      <PricingSection headingLevel="h1" />
      <FAQSection />
      <FinalCtaSection />
    </>
  );
}

export function FAQPage() {
  useTitle("FAQ — CONVY");
  return (
    <>
      <FAQSection headingLevel="h1" />
      <FinalCtaSection />
    </>
  );
}

/**
 * Privacy / Terms — routes exist so footer links resolve, but no legal text was
 * supplied. No policy wording is invented here; replace with the approved documents.
 */
export function LegalPage({ title }: { title: "Privacy" | "Terms" }) {
  useTitle(`${title} — CONVY`);
  return (
    <section className="py-28 lg:py-36">
      <div className="container-page max-w-[760px]">
        <Eyebrow>LEGAL</Eyebrow>
        <h1 className="text-[2.5rem] font-medium tracking-[-0.03em] text-fg">{title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">
          This document is not yet published on the website. For questions, contact{" "}
          <a href={`mailto:${SITE.email}`} className="text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent">
            {SITE.email}
          </a>
          .
        </p>
      </div>
    </section>
  );
}

export function NotFoundPage() {
  useTitle("Page not found — CONVY");
  return (
    <section className="py-32">
      <div className="container-page text-center">
        <Eyebrow className="justify-center">404</Eyebrow>
        <h1 className="text-[2.5rem] font-medium tracking-[-0.03em] text-fg">Page not found</h1>
        <Link to="/" className="mt-8 inline-block text-accent hover:underline">
          Back to home
        </Link>
      </div>
    </section>
  );
}
