import { Link } from "react-router-dom";
import { brand, footer } from "../../content/site";
import { moduleAnchor } from "../../content/types";
import { LINKS, SITE } from "../../config/links";
import { Logo, SmartLink } from "../ui/primitives";

/** Footer navigation — labels verbatim from the brief (Part 5). */
const columns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "PRODUCT",
    links: [
      { label: "Inbox", href: `/product#${moduleAnchor.inbox}` },
      { label: "Templates", href: `/product#${moduleAnchor.templates}` },
      { label: "Campaigns", href: `/product#${moduleAnchor.campaigns}` },
      { label: "AI chat summaries", href: `/product#${moduleAnchor.ai}` },
      { label: "WhatsApp Flows", href: `/product#${moduleAnchor.flows}` },
      { label: "Workflow automation", href: `/product#${moduleAnchor.workflows}` },
      { label: "Catalogs", href: `/product#${moduleAnchor.catalogs}` },
      { label: "Messaging wallet", href: `/product#${moduleAnchor.wallet}` },
    ],
  },
  {
    title: "SOLUTIONS",
    links: [
      { label: "By vertical", href: "/solutions" },
      { label: "For agencies", href: "/solutions#agencies" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "COMPANY",
    links: [
      { label: "FAQ", href: "/faq" },
      { label: SITE.email, href: LINKS.email },
      { label: "Book a demo", href: LINKS.bookDemo },
    ],
  },
  {
    title: "LEGAL",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-[#11121c]">
      <div className="container-page grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_repeat(4,minmax(0,1fr))] lg:gap-10 lg:py-20">
        <div className="sm:col-span-2 lg:col-span-1 lg:pr-8">
          <Link to="/" aria-label="CONVY home" className="inline-block rounded-md">
            <Logo withTagline tagline={brand.tagline} />
          </Link>
          <p className="mt-6 max-w-[360px] text-[14px] leading-relaxed text-subtle">{footer.description}</p>
        </div>

        {columns.map((col) => (
          <nav key={col.title} aria-label={col.title.charAt(0) + col.title.slice(1).toLowerCase()}>
            <h2 className="text-[12px] font-medium tracking-[0.08em] text-fg">{col.title}</h2>
            <ul className="mt-5 space-y-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <SmartLink href={l.href} className="text-[14px] text-subtle transition-colors hover:text-accent">
                    {l.label}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-6 text-[13px] text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p className="font-medium tracking-[0.08em]">{brand.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
