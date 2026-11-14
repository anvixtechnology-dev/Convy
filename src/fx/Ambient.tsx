/**
 * Ambient layers: the lazy 3D geometry field (desktop, motion allowed), a light canvas of fine
 * particles, and the CSS lights. Each falls back to nothing, so the page never waits on them.
 */
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

const GeoField = lazy(() => import("./GeoField"));

/** The 3D field only on a wide screen with a fine pointer and WebGL, never under reduced motion. */
export function GeoFieldLazy() {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches;
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      gl = false;
    }
    // let the hero's words and window paint first
    const t = window.setTimeout(() => setOk(wide && gl), 350);
    return () => window.clearTimeout(t);
  }, []);
  if (reduced || !ok) return null;
  return (
    <Suspense fallback={null}>
      <GeoField />
    </Suspense>
  );
}

/** Fine drifting particles on a 2D canvas: 46 points on a desktop, 18 on a phone, none when reduced. */
export function Particles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const c = ref.current;
    if (!c || reduced) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const n = window.innerWidth < 640 ? 18 : 46;
    let w = 0;
    let h = 0;
    const pts = Array.from({ length: n }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.6 + Math.random() * 1.4,
      vx: (Math.random() - 0.5) * 0.00012,
      vy: -0.00008 - Math.random() * 0.00016,
      a: 0.15 + Math.random() * 0.45,
    }));
    const size = () => {
      w = c.clientWidth;
      h = c.clientHeight;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const ro = new ResizeObserver(size);
    ro.observe(c);
    size();
    let on = true;
    const io = new IntersectionObserver(([e]) => {
      on = e.isIntersecting;
      if (on) draw();
    });
    io.observe(c);
    let raf = 0;
    let last = performance.now();
    const draw = () => {
      cancelAnimationFrame(raf);
      if (!on || document.hidden) return;
      const now = performance.now();
      const dt = Math.min(now - last, 50);
      last = now;
      ctx.clearRect(0, 0, w, h);
      for (const p of pts) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.y < -0.02) {
          p.y = 1.02;
          p.x = Math.random();
        }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232, 114, 142, ${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, [reduced]);
  return <canvas ref={ref} className={`fx-particles ${className ?? ""}`} aria-hidden="true" />;
}

const ConnectScene = lazy(() => import("./ConnectScene"));

/**
 * The "We connect. We convert." network: live 3D from 640px up with motion allowed and WebGL,
 * else a still burgundy core drawn in CSS, so the section never stands empty.
 */
export function ConnectSceneLazy() {
  const reduced = useReducedMotion();
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 640px)").matches;
    let gl = false;
    try {
      gl = !!document.createElement("canvas").getContext("webgl2");
    } catch {
      gl = false;
    }
    setOk(wide && gl);
  }, []);
  return (
    <div className="fx-connect" aria-hidden="true">
      {reduced || !ok ? (
        <div className="fx-connect__still" />
      ) : (
        <Suspense fallback={<div className="fx-connect__still" />}>
          <ConnectScene />
        </Suspense>
      )}
    </div>
  );
}
