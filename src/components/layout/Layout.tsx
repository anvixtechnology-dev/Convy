import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useLocation, useOutlet } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { bootKit, refreshKit } from "../../kit/runtime";
import { EASE } from "../../fx/motion";

/** Scroll to the #hash target once the new page is there, or to the top. */
function scrollToTarget(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    return;
  }
  const id = decodeURIComponent(hash.slice(1));
  let tries = 0;
  const find = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ block: "start" });
    else if (tries++ < 60) requestAnimationFrame(find);
  };
  find();
}

/**
 * Scroll reveals: every [data-reveal] in <main> turns up out of depth once, as it enters the
 * viewport (fx.css). One IntersectionObserver for the page; re-armed when a new page mounts.
 * Without script, or under reduced motion, everything simply stands (html.fx-js gates the hide).
 */
function armReveals() {
  const els = document.querySelectorAll<HTMLElement>("main [data-reveal]:not(.is-in)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-in"));
    return () => {};
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  els.forEach((el) => io.observe(el));
  return () => io.disconnect();
}

/** The page's ambient light follows the pointer: two CSS variables, set at most once a frame. */
function useAmbientPointer() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("fx-js");
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let x = 0.5;
    let y = 0.3;
    const on = (e: PointerEvent) => {
      x = e.clientX / window.innerWidth;
      y = e.clientY / window.innerHeight;
      if (!raf)
        raf = requestAnimationFrame(() => {
          raf = 0;
          root.style.setProperty("--cv-mx", x.toFixed(3));
          root.style.setProperty("--cv-my", y.toFixed(3));
        });
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, []);
}

/**
 * The page shell the kit expects: the fixed header, <main id="top"> and the footer, portalled
 * straight into <body>. Routes cross-fade: the old page leaves (fade, a short rise), then the new
 * one arrives; the kit's scripts and the reveals are re-armed once the new <main> is mounted.
 */
export function Layout() {
  const location = useLocation();
  const outlet = useOutlet();
  const first = useRef(true);
  useAmbientPointer();

  useEffect(() => {
    void bootKit();
    first.current = false;
    return armReveals();
  }, []);

  // runs for the entering page only (its target is opacity 1; the leaving page animates to 0)
  const onEnter = (target: unknown) => {
    if (first.current || (target as { opacity?: number })?.opacity !== 1) return;
    void refreshKit();
    armReveals();
  };

  // same page, new #hash: scroll there at once (no transition runs)
  useEffect(() => {
    if (!first.current && location.hash) scrollToTarget(location.hash);
  }, [location.hash]);

  return (
    <>
      {createPortal(
        <>
          <div className="fx-ambient" aria-hidden="true" />
          <Navbar />
          <AnimatePresence mode="wait" initial={false} onExitComplete={() => scrollToTarget(location.hash)}>
            <motion.main
              id="top"
              key={location.pathname}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } }}
              exit={{ opacity: 0, y: -16, transition: { duration: 0.22, ease: [0.4, 0, 1, 1] } }}
              onAnimationStart={onEnter}
            >
              {outlet}
            </motion.main>
          </AnimatePresence>
          <Footer />
        </>,
        document.body,
      )}
    </>
  );
}
