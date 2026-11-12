/**
 * Floating pill navbar (adapted from the supplied template):
 * bordered rounded-full bar, rolling-text link hover, outlined secondary
 * button, white primary button with a soft glow.
 * CONVY routes, logo, active state and the accessible mobile drawer are kept.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, nav } from "../../content/site";
import { LINKS } from "../../config/links";
import { Logo, SmartLink, cx } from "../ui/primitives";

/** Text rolls up on hover: the label slides out and an identical copy slides in. */
function RollingText({ children }: { children: ReactNode }) {
  return (
    <span className="relative block h-6 overflow-hidden leading-6">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute left-0 top-full block transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full motion-reduce:transition-none"
      >
        {children}
      </span>
    </span>
  );
}

const pillOutline =
  "inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-[#4a4e68] px-4 text-sm font-medium text-fg transition-colors hover:bg-elevated";
const pillPrimary =
  "inline-flex h-9 items-center justify-center gap-1.5 whitespace-nowrap rounded-full bg-white px-4 text-sm font-medium text-[#141521] shadow-[0_0_30px_7px] shadow-white/20 transition-[box-shadow,background-color] duration-300 hover:bg-[#ececf2] hover:shadow-[0_0_30px_14px] hover:shadow-white/30";

function OpenConvy({ className }: { className?: string }) {
  return (
    <SmartLink href={LINKS.openConvy} className={cx(pillPrimary, className)}>
      Open Convy
      {LINKS.openConvyIsExternal && (
        <>
          <ArrowUpRight className="size-4" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </>
      )}
    </SmartLink>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    drawerRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);
    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 px-4 pt-4">
      <a
        href="#main"
        className="sr-only rounded-md bg-accent px-3 py-2 text-sm font-medium text-on-accent focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60]"
      >
        Skip to content
      </a>

      <motion.div
        className="relative mx-auto w-full lg:w-fit"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Main"
          className="flex items-center justify-between rounded-full border border-line bg-page/80 py-3 pl-5 pr-3 text-sm text-fg backdrop-blur-md lg:justify-start lg:px-6"
        >
          <Link to="/" aria-label="CONVY home" className="rounded-full">
            <Logo withTagline tagline={brand.tagline} taglineClass="min-[400px]:block lg:hidden xl:block" />
          </Link>

          <ul className="ml-8 hidden items-center gap-5 lg:flex xl:ml-10 xl:gap-6">
            {nav.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    cx("group relative block rounded-sm", isActive ? "text-fg" : "text-muted hover:text-fg")
                  }
                >
                  {({ isActive }) => (
                    <>
                      <RollingText>{item.label}</RollingText>
                      {isActive ? (
                        <motion.span
                          layoutId="nav-active-dot"
                          aria-hidden
                          className="absolute -bottom-1.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent"
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        />
                      ) : (
                        <span
                          aria-hidden
                          className="absolute -bottom-1 left-0 right-0 h-px origin-left scale-x-0 bg-accent/70 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="ml-8 hidden items-center gap-3 lg:flex xl:ml-14">
            <SmartLink href={LINKS.bookDemo} className={pillOutline}>
              Book a demo
            </SmartLink>
            <OpenConvy />
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="grid size-10 place-items-center rounded-full text-fg transition-colors hover:bg-elevated lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          </button>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              ref={drawerRef}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-0 top-full mt-2 rounded-3xl border border-line bg-page/95 p-4 backdrop-blur-md lg:hidden"
            >
              <ul className="flex flex-col items-center gap-1 py-2 text-base">
                {nav.map((item) => (
                  <li key={item.to} className="w-full">
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        cx(
                          "flex h-12 items-center justify-center rounded-full transition-colors",
                          isActive ? "bg-elevated text-fg" : "text-muted hover:text-fg",
                        )
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col items-center gap-3 border-t border-line pt-5">
                <SmartLink href={LINKS.bookDemo} className={cx(pillOutline, "h-11 w-full max-w-xs")}>
                  Book a demo
                </SmartLink>
                <OpenConvy className="h-11 w-full max-w-xs" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
