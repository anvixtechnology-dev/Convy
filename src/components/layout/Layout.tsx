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
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.18 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="grid size-11 place-items-center rounded-full border border-line bg-card/90 text-fg shadow-frame backdrop-blur transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ArrowUp className="size-4" aria-hidden />
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
    <a
      href={SITE.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="grid size-12 place-items-center rounded-full bg-accent-2 text-[#06210f] shadow-frame transition-transform hover:-translate-y-0.5"
    >
      <MessageCircle className="size-5" aria-hidden />
      <span className="sr-only">Chat with Convy on WhatsApp (opens in a new tab)</span>
    </a>
  );
}

export function Layout() {
  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
        <ScrollToTopButton />
        <FloatingWhatsAppButton />
      </div>
    </>
  );
}
