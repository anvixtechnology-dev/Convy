/**
 * CONVY motion primitives, built on framer-motion (already in the project).
 *
 * Every pointer effect writes motion values, never React state, so moving the mouse never
 * re-renders a component. Pointer effects run only with a fine pointer (mouse, pen) and never
 * under prefers-reduced-motion; MotionConfig reducedMotion="user" (main.tsx) also drops the
 * transforms of every reveal for visitors who ask for less motion.
 */
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** True on a device with a mouse or pen (no tilt or magnet on touch screens). */
export function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const on = () => setFine(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return fine;
}

/** Pointer effects are on: a fine pointer and no request for reduced motion. */
export function usePointerFx() {
  const fine = useFinePointer();
  const reduced = useReducedMotion();
  return fine && !reduced;
}

/* ------------------------------------------------------------------ Tilt */
/**
 * A surface that tilts toward the pointer in 3D, with a soft light that follows it.
 * Children placed with `data-depth` (in px) float above the surface (translateZ).
 */
export function Tilt({
  children,
  className,
  max = 8,
  style,
  glare = true,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  style?: CSSProperties;
  glare?: boolean;
}) {
  const on = usePointerFx();
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spring = { stiffness: 160, damping: 18, mass: 0.6 };
  const rx = useSpring(useTransform(py, [0, 1], [max, -max]), spring);
  const ry = useSpring(useTransform(px, [0, 1], [-max, max]), spring);
  const gx = useTransform(px, (v) => `${v * 100}%`);
  const gy = useTransform(py, (v) => `${v * 100}%`);

  const move = (e: React.PointerEvent) => {
    if (!on || e.pointerType !== "mouse") return;
    const r = ref.current!.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
  };
  const leave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      className={`fx-tilt ${className ?? ""}`}
      style={{ ...style, transformPerspective: 1100, rotateX: on ? rx : 0, rotateY: on ? ry : 0, ["--gx" as string]: gx, ["--gy" as string]: gy }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
      {glare && on && <span className="fx-tilt__glare" aria-hidden="true" />}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ Magnetic */
/** Pulls its child a few pixels toward the pointer; the child stays the real link or button. */
export function Magnetic({ children, strength = 0.28, className }: { children: ReactNode; strength?: number; className?: string }) {
  const on = usePointerFx();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  const y = useSpring(0, { stiffness: 220, damping: 16, mass: 0.4 });
  return (
    <motion.span
      ref={ref}
      className={`fx-magnet ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (!on || e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/* ------------------------------------------------------------------ Words */
/**
 * A heading revealed word by word: each word rises out of its own line box and turns forward.
 * The words stay real text (one aria-label on the parent keeps screen readers on the sentence).
 */
export function Words({ text, delay = 0, step = 0.06, className }: { text: string; delay?: number; step?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={`fx-words ${className ?? ""}`}>
      {words.map((w, i) => (
        <span key={i}>
          <span className="fx-words__box" aria-hidden="true">
            <motion.span
              className="fx-words__w"
              initial={{ y: "110%", rotateX: -70, opacity: 0 }}
              animate={{ y: "0%", rotateX: 0, opacity: 1 }}
              transition={{ duration: 0.85, ease: EASE, delay: delay + i * step }}
            >
              {w}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------ Reveal3D */
/** A block that turns up out of depth once, the first time it scrolls into view. */
export function Reveal3D({
  children,
  className,
  delay = 0,
  depth = 80,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  depth?: number;
  as?: "div" | "article" | "li";
  style?: CSSProperties;
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      style={{ ...style, transformPerspective: 1200 }}
      initial={{ opacity: 0, y: 40, rotateX: 14, z: -depth }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0, z: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ Parallax */
/** The scroll progress of an element through the viewport, 0 entering to 1 leaving. */
export function useSectionProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  return { ref, progress: scrollYProgress };
}

/** A layer that drifts against the scroll by up to `amount` px (0 under reduced motion). */
export function useParallax(progress: MotionValue<number>, amount = 60) {
  const reduced = useReducedMotion();
  return useTransform(progress, [0, 1], reduced ? [0, 0] : [amount, -amount]);
}
