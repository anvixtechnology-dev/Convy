/**
 * The site footer: a short close (the main action), the brand column, four link columns and the
 * copyright bar. Labels, copy and destinations come from the brief and the existing routes;
 * nothing here invents a link, a contact or a social account.
 *
 * Motion (framer-motion): the footer fades and rises once as it enters the viewport, the columns
 * staggered, the separators drawn from the left. MotionConfig reducedMotion="user" (main.tsx)
 * drops the movement for visitors who ask for less; footer.css stills the ambient light too.
 *
 * Its own cv-foot classes on purpose: the kit's .footer rules would restyle these links.
 */
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { brand, footer } from "../../content/site";
import { moduleAnchor } from "../../content/types";
import { LINKS } from "../../config/links";
import { SmartLink, isExternalWeb } from "../ui/primitives";
import { Logo } from "./Navbar";
import { Magnetic } from "../../fx/motion";
import "./footer.css";

type FooterLinkItem = { label: string; href: string };

const columns: Array<{ title: string; links: FooterLinkItem[] }> = [
  {
    title: "Product",
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
    title: "Solutions",
    links: [
      { label: "By vertical", href: "/solutions" },
      { label: "For agencies", href: "/solutions#agencies" },
      { label: "Security", href: "/security" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "FAQ", href: "/faq" },
      // the brief's email address (config/links.ts): the only contact detail the brief gives
      { label: "Contact", href: LINKS.email },
      { label: "Book a demo", href: LINKS.bookDemo },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms & Conditions", href: "/terms" },
    ],
  },
];

const EASE = [0.22, 1, 0.36, 1] as const;

const rise: Variants = {
  hidden: { opacity: 0, y: 24, rotateX: 18 },
  shown: (i: number = 0) => ({ opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.6, ease: EASE, delay: 0.06 + i * 0.07 } }),
};

const draw: Variants = {
  hidden: { scaleX: 0 },
  shown: { scaleX: 1, transition: { duration: 0.9, ease: EASE, delay: 0.1 } },
};

/** A footer link: the teal underline draws on hover, a small arrow slides in beside it. */
function FooterLink({ label, href }: FooterLinkItem) {
  const external = isExternalWeb(href);
  const Icon = external ? ArrowUpRight : ArrowRight;
  return (
    <SmartLink href={href} className="cv-foot__link">
      <span className="cv-foot__label">{label}</span>
      <Icon className="cv-foot__arrow" aria-hidden strokeWidth={2} />
      {external && <span className="sr-only"> (opens in a new tab)</span>}
    </SmartLink>
  );
}

export function Footer() {
  return (
    <motion.footer
      className="cv-foot"
      id="contact"
      aria-labelledby="close-h"
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, amount: 0.12 }}
    >
      <div className="cv-foot__light" aria-hidden="true" />

      <div className="wrap cv-foot__wrap">
        {/* the close: the main action, as before */}
        <motion.div className="cv-foot__close" variants={rise} custom={0}>
          <div>
            <h2 id="close-h">Bring your team together on Convy.</h2>
            <p>Start with WhatsApp, and grow from there.</p>
          </div>
          <Magnetic>
          <SmartLink className="btn btn--primary fx-btn-3d" href={LINKS.openConvy}>
            Open Convy
            <svg className="m-arrow" viewBox="0 0 12 12" aria-hidden="true">
              <path className="m-arrow__stem" d="M1 6h8" />
              <path className="m-arrow__head" d="M4.5 2.5 8 6l-3.5 3.5" />
            </svg>
          </SmartLink>
          </Magnetic>
        </motion.div>

        <motion.div className="cv-foot__rule" variants={draw} aria-hidden="true" />

        <div className="cv-foot__main">
          <motion.div className="cv-foot__brand" variants={rise} custom={1}>
            <Link className="cv-foot__logo fx-logo" to="/" aria-label="CONVY home">
              <Logo />
            </Link>
            <p className="cv-foot__tagline">{brand.tagline}</p>
            <p className="cv-foot__desc">{footer.description}</p>
          </motion.div>

          {columns.map((col, i) => (
            <motion.nav className="cv-foot__col" key={col.title} aria-labelledby={`foot-${col.title.toLowerCase()}`} variants={rise} custom={i + 2}>
              <h3 id={`foot-${col.title.toLowerCase()}`}>{col.title}</h3>
              <ul>
                {col.links.map((l) => (
                  <li key={l.label}>
                    <FooterLink {...l} />
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        <motion.div className="cv-foot__rule" variants={draw} aria-hidden="true" />

        <motion.div className="cv-foot__bar" variants={rise} custom={6}>
          <p>{footer.copyright}</p>
          <p className="cv-foot__bar-tag">{brand.tagline}</p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
