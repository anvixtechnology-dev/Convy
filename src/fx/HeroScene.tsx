/**
 * The hero's 3D workspace: the shared inbox window in the middle, and the panels of the rest of
 * the workspace (a campaign, a template, an AI summary, a workflow, message bubbles) floating at
 * their own depths around it. CSS 3D (preserve-3d) driven by framer-motion values: the stage turns
 * toward the pointer and leans back as the hero scrolls away. Every name and number is demo data
 * inside a drawn window; nothing here claims to be live.
 */
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
import { EASE, usePointerFx } from "./motion";

function Layer({
  className,
  z,
  delay,
  children,
}: {
  className: string;
  z: number;
  delay: number;
  children: ReactNode;
}) {
  return (
    <motion.div
      className={`fx-layer ${className}`}
      initial={{ opacity: 0, z: z - 260, y: 30 }}
      animate={{ opacity: 1, z, y: 0 }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      <div className="fx-layer__float">{children}</div>
    </motion.div>
  );
}

export function HeroScene({ children }: { children: ReactNode }) {
  const pointerFx = usePointerFx();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  // the pointer, over the whole window, as -1..1
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    if (!pointerFx) return;
    const on = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 2 - 1);
      my.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", on, { passive: true });
    return () => window.removeEventListener("pointermove", on);
  }, [pointerFx, mx, my]);

  const spring = { stiffness: 70, damping: 18, mass: 0.8 };
  const ry = useSpring(useTransform(mx, [-1, 1], [-7, 7]), spring);
  const rxPointer = useSpring(useTransform(my, [-1, 1], [6, -2]), spring);

  // as the hero leaves, the workspace leans back and sinks
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rxScroll = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 18]);
  const sink = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -140]);
  const rx = useTransform([rxPointer, rxScroll], ([a, b]: number[]) => 8 + a + b);

  return (
    <div ref={ref} className="fx-stage">
      <motion.div className="fx-scene" style={{ rotateX: reduced ? 6 : rx, rotateY: pointerFx ? ry : 0, z: sink }}>
        {/* the soft light on the floor of the scene */}
        <div className="fx-scene__floor" aria-hidden="true" />

        {/* the inbox: the product itself, at the centre */}
        <motion.div
          className="fx-layer fx-layer--main"
          initial={{ opacity: 0, z: -200, rotateX: 18 }}
          animate={{ opacity: 1, z: 0, rotateX: 0 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.35 }}
        >
          {children}
        </motion.div>

        <Layer className="fx-l-campaign" z={70} delay={0.7}>
          <div className="fx-card">
            <div className="fx-card__head">
              <span className="fx-dot fx-dot--accent" />
              Campaign · Diwali offer
            </div>
            <div className="fx-card__big">4,812</div>
            <div className="fx-card__sub">recipients, eligibility checked</div>
            <div className="fx-bar">
              <i style={{ width: "96%" }} />
            </div>
            <div className="fx-card__row">
              <span>Delivered</span>
              <b>96%</b>
            </div>
          </div>
        </Layer>

        <Layer className="fx-l-template" z={90} delay={0.85}>
          <div className="fx-card fx-card--light">
            <div className="fx-card__head">
              <span className="fx-dot fx-dot--green" />
              Template · order_update
            </div>
            <p className="fx-card__msg">
              Hi <mark>Priya</mark>, your order <mark>2219</mark> leaves our store today.
            </p>
            <span className="fx-pill">Approved by Meta</span>
          </div>
        </Layer>

        <Layer className="fx-l-ai" z={60} delay={1}>
          <div className="fx-card">
            <div className="fx-card__head">
              <span className="fx-dot fx-dot--accent" />
              AI summary
            </div>
            <p className="fx-card__sum">Wants a Saturday site visit for the 3BHK in Baner.</p>
            <div className="fx-tags">
              <span>Site visit</span>
              <span>Positive</span>
            </div>
          </div>
        </Layer>

        <Layer className="fx-l-flow" z={80} delay={1.1}>
          <div className="fx-card fx-flow">
            <div className="fx-card__head">Workflow</div>
            <svg viewBox="0 0 220 64" className="fx-flow__svg" aria-hidden="true">
              <path className="fx-flow__path" d="M28 32 H110 H192" />
              <circle cx="28" cy="32" r="12" />
              <circle cx="110" cy="32" r="12" />
              <circle cx="192" cy="32" r="12" />
            </svg>
            <div className="fx-flow__labels">
              <span>Trigger</span>
              <span>Condition</span>
              <span>CRM action</span>
            </div>
          </div>
        </Layer>

        <Layer className="fx-l-bubble2" z={110} delay={1.5}>
          <div className="fx-bubble fx-bubble--out">Yes, 11:00 is noted ✓✓</div>
        </Layer>
      </motion.div>
    </div>
  );
}
