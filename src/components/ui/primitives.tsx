import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

/** One easing curve for the whole site. */
export const EASE = [0.22, 1, 0.36, 1] as const;

/** Stagger step between siblings, capped so long lists don't drag. */
export const stagger = (i: number, step = 0.06, max = 0.3) => Math.min(i * step, max);

/* ------------------------------------------------------------------ */
/* Reveal — a short fade-and-rise as content scrolls into view.         */
/* Reduced motion: MotionConfig("user") drops the movement site-wide.   */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  className,
  as = "div",
  id,
  delay = 0,
  y = 16,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "article";
  id?: string;
  y?: number;
}) {
  const Comp = motion[as];
  return (
    <Comp
      id={id}
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/* Signature — WhatsApp-style "read" double tick, used as list marker   */
/* ------------------------------------------------------------------ */
export function ReadTicks({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 12" aria-hidden className={cx("mt-[7px] h-[10px] w-[15px] shrink-0 text-accent", className)}>
      <path d="M1 6.5 4.2 9.7 11 2.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.6 9.4l.3.3L15.7 2.3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Type                                                                */
/* ------------------------------------------------------------------ */
/** Small uppercase label (kept per brand brief), quiet: muted, light tracking. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cx("mb-4 flex items-center text-[12px] font-medium uppercase tracking-[0.08em] text-subtle", className)}>
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  titleAccent,
  description,
  align = "left",
  className,
  as: H = "h2",
}: {
  id?: string;
  eyebrow: string;
  title: string;
  /** Optional second line, rendered in teal. */
  titleAccent?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2";
}) {
  return (
    <Reveal className={cx("max-w-[760px]", align === "center" && "mx-auto text-center [&>p:first-child]:justify-center", className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <H
        id={id}
        className={cx(
          "font-medium text-fg",
          H === "h1"
            ? "text-[2.5rem] leading-[1.06] tracking-[-0.032em] sm:text-[3.25rem] lg:text-hero"
            : "text-[2rem] leading-[1.12] tracking-[-0.025em] sm:text-[2.375rem] lg:text-section",
        )}
      >
        {title}
        {titleAccent && (
          <>
            <br className="hidden sm:block" /> <span className="text-muted">{titleAccent}</span>
          </>
        )}
      </H>
      {description && <p className="mt-5 text-lg leading-relaxed text-muted">{description}</p>}
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons / links — internal routes use <Link>, others use <a>        */
/* ------------------------------------------------------------------ */
type Variant = "primary" | "secondary" | "ghost";
const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-[#45cdb4]",
  secondary: "border border-line bg-white/[0.02] text-fg hover:border-[#4a4e68] hover:bg-white/[0.05]",
  ghost: "text-fg hover:text-accent",
};

export function isInternal(href: string) {
  return href.startsWith("/") && !href.startsWith("//");
}
export function isExternalWeb(href: string) {
  return /^https?:\/\//.test(href);
}

export function SmartLink({
  href,
  className,
  children,
  ...rest
}: { href: string; className?: string; children: ReactNode } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  if (isInternal(href)) {
    return (
      <Link to={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }
  const ext = isExternalWeb(href);
  return (
    <a href={href} className={className} {...(ext ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}

export function Button({
  href,
  children,
  variant = "primary",
  icon,
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  icon?: "arrow" | "external";
  className?: string;
}) {
  const Icon = icon === "external" ? ArrowUpRight : ArrowRight;
  return (
    <SmartLink
      href={href}
      className={cx(
        "group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-medium transition-[color,background-color,border-color,transform] duration-200 active:scale-[0.98]",
        variants[variant],
        className,
      )}
    >
      {children}
      {icon && (
        <Icon
          aria-hidden
          className={cx(
            "size-4 transition-transform duration-200",
            icon === "external" ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5" : "group-hover:translate-x-0.5",
          )}
          strokeWidth={2.2}
        />
      )}
      {icon === "external" && <span className="sr-only">(opens in a new tab)</span>}
    </SmartLink>
  );
}

export function TextLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <SmartLink
      href={href}
      className={cx("group inline-flex items-center gap-1.5 text-[15px] font-medium text-fg underline decoration-line decoration-1 underline-offset-[6px] transition-colors hover:decoration-fg", className)}
    >
      {children}
      <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-0.5" />
    </SmartLink>
  );
}

/* ------------------------------------------------------------------ */
/* Status pill (PREVIEW, AI · WHEN ENABLED, CONFIGURED WORKFLOWS)       */
/* ------------------------------------------------------------------ */
/** Availability status as quiet text with a hollow dot — not a pill. */
export function StatusTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-[11px] font-medium tracking-[0.06em] text-subtle">
      <span aria-hidden className="size-1.5 rounded-full border border-muted" />
      {children}
    </span>
  );
}
export const StatusPill = StatusTag;

/* ------------------------------------------------------------------ */
/* PreviewFrame — every illustrative product UI goes through here.      */
/* Content is inert + hidden from AT: nothing inside is a real control. */
/* ------------------------------------------------------------------ */
export function PreviewFrame({
  label,
  children,
  className,
  bodyClassName,
  chrome = true,
}: {
  label: string;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  chrome?: boolean;
}) {
  return (
    <figure role="img" aria-label={label} className={cx("relative overflow-hidden rounded-xl border border-line bg-card shadow-frame", className)}>
      {chrome && (
        <div aria-hidden className="flex h-9 items-center gap-1.5 border-b border-line bg-surface px-3.5">
          <span className="size-2.5 rounded-full bg-[#3a3d55]" />
          <span className="size-2.5 rounded-full bg-[#3a3d55]" />
          <span className="size-2.5 rounded-full bg-[#3a3d55]" />
        </div>
      )}
      <div aria-hidden inert className={cx("pointer-events-none cursor-default select-none", bodyClassName)}>
        {children}
      </div>
    </figure>
  );
}

export function PreviewCaption({ children = "Illustrative preview · demo data." }: { children?: ReactNode }) {
  return <p className="mt-3 text-xs text-subtle">{children}</p>;
}

/* ------------------------------------------------------------------ */
/* Brand                                                               */
/* ------------------------------------------------------------------ */
/**
 * Placeholder mark — no original logo asset was supplied.
 * Replace this component's SVG with the official CONVY logo file.
 */
export function Logo({ withTagline = false, tagline, taglineClass = "min-[400px]:block" }: { withTagline?: boolean; tagline?: string; taglineClass?: string }) {
  return (
    <span className="inline-flex items-center gap-3">
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect width="32" height="32" rx="8" fill="#32BFA5" />
        <path d="M9 12a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v3a4 4 0 0 1-4 4h-4l-4 3v-3.5A4 4 0 0 1 9 15z" fill="#141521" />
        <circle cx="22" cy="22" r="3" fill="#20C96B" stroke="#141521" strokeWidth="1.5" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="text-[17px] font-semibold tracking-[0.1em] text-fg">CONVY</span>
        {withTagline && tagline && (
          <span className={`mt-1 hidden whitespace-nowrap text-[10px] font-medium tracking-[0.08em] text-subtle ${taglineClass}`}>{tagline}</span>
        )}
      </span>
    </span>
  );
}

/* Mock-UI atoms -------------------------------------------------------- */
export function Avatar({ initials, tone = 0, size = "md" }: { initials: string; tone?: number; size?: "sm" | "md" }) {
  const tones = [
    "bg-[#1f3a37] text-[#7fe0cc]",
    "bg-[#2a2d4d] text-[#a9b0ff]",
    "bg-[#3a3122] text-[#e8c27a]",
    "bg-[#2c2e40] text-[#c3c7da]",
  ];
  return (
    <span
      className={cx(
        "grid shrink-0 place-items-center rounded-full font-medium",
        size === "sm" ? "size-6 text-[9px]" : "size-8 text-[11px]",
        tones[tone % tones.length],
      )}
    >
      {initials}
    </span>
  );
}

export function Chip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "teal" | "amber" | "outline" }) {
  const tones = {
    neutral: "bg-elevated text-muted",
    teal: "bg-accent-soft text-accent",
    amber: "bg-[#3a3122] text-[#e8c27a]",
    outline: "border border-line text-muted",
  };
  return (
    <span className={cx("inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-[11px] font-medium", tones[tone])}>
      {children}
    </span>
  );
}
