/**
 * nav-mega (dealt): one fixed, opaque bar on the page's .wrap. "Product" opens a full-width
 * panel of the nine modules in three columns and one menu card; every other word is a page.
 * system.js wires the hover panel, the phone sheet, Esc and aria-expanded: no handlers here,
 * and this component never re-renders its children (system.js adds the sheet's buttons).
 */
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Magnetic } from "../../fx/motion";
import { nav } from "../../content/site";
import { moduleAnchor, type ModuleKey } from "../../content/types";
import { LINKS } from "../../config/links";
import { SmartLink } from "../ui/primitives";

const menu: Array<{ group: string; items: Array<{ key: ModuleKey; name: string; line: string }> }> = [
  {
    group: "Conversations",
    items: [
      { key: "inbox", name: "Shared inbox", line: "Ownership, notes and timers" },
      { key: "templates", name: "Template studio", line: "Approved messages via Meta" },
      { key: "ai", name: "AI chat summaries", line: "Context before the next reply" },
    ],
  },
  {
    group: "Outreach",
    items: [
      { key: "campaigns", name: "Campaigns", line: "Import, check, launch, track" },
      { key: "flows", name: "WhatsApp Flows", line: "Forms inside WhatsApp" },
      { key: "workflows", name: "Workflow automation", line: "Conditions, waits, CRM actions" },
    ],
  },
  {
    group: "Workspace",
    items: [
      { key: "users", name: "Users & roles", line: "The right access per role" },
      { key: "catalogs", name: "Product catalogs", line: "Catalog sync with Meta" },
      { key: "wallet", name: "Messaging wallet", line: "Balance, usage and spend" },
    ],
  },
];

const chev = (
  <svg className="chev" viewBox="0 0 12 12" aria-hidden="true">
    <path d="M3 4.5l3 3 3-3" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export function Logo() {
  return (
    <>
      <span className="mark" data-mark="dots" aria-hidden="true" />
      CONVY
    </>
  );
}

export function Navbar() {
  const { pathname } = useLocation();
  const [product, ...rest] = nav;
  const current = (to: string) => (pathname === to ? ("page" as const) : undefined);
  const indicator = (to: string) =>
    pathname === to ? <motion.span layoutId="fx-nav-ind" className="fx-nav-ind" aria-hidden="true" transition={{ type: "spring", stiffness: 380, damping: 32 }} /> : null;

  // transparent over the top of the page, solid with a soft blur once the page scrolls; a class,
  // set straight on the header, so scrolling never re-renders the nav (system.js owns its sheet)
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = header.current;
    if (!el) return;
    let raf = 0;
    const on = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.classList.toggle("is-scrolled", window.scrollY > 12);
      });
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header className="nav fx-nav" ref={header}>
      <div className="wrap nav__bar">
        <a className="skip-link" href="#top">
          Skip to content
        </a>
        <Link className="nav__logo fx-logo" to="/" aria-label="CONVY home">
          <Logo />
        </Link>
        <nav className="nav__links" aria-label="Main">
          <div className="nav__item">
            <Link className="nav__link" to={product.to} aria-current={current(product.to)}>
              {product.label} {chev}
              {indicator(product.to)}
            </Link>
            <div className="nav__menu">
              <div className="wrap grid">
                {menu.map((col) => (
                  <div className="menu-col span-3" key={col.group}>
                    <p className="t-label">{col.group}</p>
                    {col.items.map((it) => (
                      <Link key={it.key} to={`/product#${moduleAnchor[it.key]}`}>
                        {it.name}
                        <span>{it.line}</span>
                      </Link>
                    ))}
                  </div>
                ))}
                <Link className="menu-card span-3" to="/platform">
                  <div className="panel menu-card__panel">
                    <img className="menu-card__icon" src="/assets/icons/whatsapp.svg" alt="" width="56" height="56" />
                  </div>
                  <span className="t-card">The CONVY platform</span>
                  <span className="t-small muted">Every module, one workspace</span>
                </Link>
              </div>
            </div>
          </div>
          {rest.map((item) => (
            <div className="nav__item" key={item.to}>
              <Link className="nav__link" to={item.to} aria-current={current(item.to)}>
                {item.label}
                {indicator(item.to)}
              </Link>
            </div>
          ))}
        </nav>
        <div className="nav__actions">
          <SmartLink className="nav__link" href={LINKS.bookDemo}>
            Book a demo
          </SmartLink>
          <Magnetic strength={0.22}>
            <SmartLink className="btn btn--primary fx-btn-3d" href={LINKS.openConvy}>
              Open Convy
            </SmartLink>
          </Magnetic>
        </div>
        <button className="nav__toggle" type="button" aria-expanded="false" aria-label="Menu">
          <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
            <path d="M2 5h14M2 13h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </header>
  );
}
