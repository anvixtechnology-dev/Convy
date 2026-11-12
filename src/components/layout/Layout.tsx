import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { SITE } from "../../config/links";

/** Scroll to top on route change, or to the #hash target when present. */
function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    // Wait a frame so the new route has rendered.
    const t = window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [pathname, hash]);
  return null;
}

export function ScrollToTopButton() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 800);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
          }
          className="group grid size-11 place-items-center rounded-full border border-line bg-card/80 text-fg shadow-frame backdrop-blur-md transition-[border-color,color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent/50 hover:text-accent active:scale-95"
        >
          <ArrowUp className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden />
          <span className="sr-only">Scroll to top</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/**
 * Floating WhatsApp contact. Renders only when SITE.whatsappUrl is configured —
 * no destination has been supplied yet, so nothing is invented here.
 */
export function FloatingWhatsAppButton() {
  if (!SITE.whatsappUrl) return null;
  return (
    <motion.a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid size-12 place-items-center rounded-full bg-accent-2 text-[#06210f] shadow-frame transition-transform duration-200 hover:scale-105 active:scale-95"
    >
      {/* restrained pulse: a ring that fades out every few seconds */}
      <span aria-hidden className="live-dot absolute inset-0 rounded-full text-accent-2 [&::after]:[animation-duration:3.6s]" />
      <MessageCircle className="relative size-5" aria-hidden />
      <span className="sr-only">Chat with Convy on WhatsApp (opens in a new tab)</span>
    </motion.a>
  );
}

export function Layout() {
  return (
    <div className="ambient relative">
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="relative z-[1] outline-none">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        <ScrollToTopButton />
        <FloatingWhatsAppButton />
      </div>
    </div>
  );
}
