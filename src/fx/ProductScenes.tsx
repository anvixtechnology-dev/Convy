/**
 * The Product page's eight previews, one 3D composition per module: the module's interface as
 * the base surface (a kit fragment, or a drawn one where no fragment fits) inside a tilting
 * stage, with layers of its own floating above it (translateZ). Demonstrations only: every name,
 * number and status is demo data in a drawn window, and nothing claims to be live or connected.
 */
import type { ReactNode } from "react";
import type { ModuleKey } from "../content/types";
import { Tilt } from "./motion";

/** A layer floating `z` px above the surface, placed by its class. */
function Over({ className, z, children }: { className: string; z: number; children: ReactNode }) {
  return (
    <div className={`fx-over ${className}`} style={{ transform: `translateZ(${z}px)` }} aria-hidden="true">
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- drawn surfaces */
function FlowsSurface() {
  const steps = ["Service type", "Address", "Preferred time", "Review details"];
  return (
    <div className="fx-surf fx-flows" aria-hidden="true">
      <div className="fx-surf__head">
        <span>WhatsApp Flow · Service booking</span>
        <span className="fx-pill">Preview</span>
      </div>
      <svg className="fx-flows__svg" viewBox="0 0 400 300" preserveAspectRatio="none">
        <path className="fx-flows__path" d="M70 60 C 200 60, 200 120, 330 120 S 200 180, 70 180 S 200 240, 330 240" />
      </svg>
      <ol className="fx-flows__nodes">
        {steps.map((s, i) => (
          <li key={s} style={{ ["--i" as string]: i }}>
            <span className="fx-flows__n">{i + 1}</span>
            {s}
          </li>
        ))}
      </ol>
    </div>
  );
}

function CatalogSurface() {
  const items = [
    { name: "Split AC 1.5 ton", st: "Synced" },
    { name: "Ceiling fan", st: "Synced" },
    { name: "Water purifier", st: "Synced" },
    { name: "LED panel", st: "Synced" },
    { name: "Air cooler", st: "Failed" },
    { name: "Inverter", st: "Synced" },
  ];
  return (
    <div className="fx-surf fx-catalog" aria-hidden="true">
      <div className="fx-surf__head">
        <span>Catalog · Home appliances</span>
        <span className="fx-pill">Sync with Meta</span>
      </div>
      <ul className="fx-catalog__grid">
        {items.map((it, i) => (
          <li key={it.name} style={{ ["--i" as string]: i }}>
            <span className={`fx-catalog__img fx-catalog__img--${i % 3}`} />
            <b>{it.name}</b>
            <em className={it.st === "Failed" ? "is-failed" : ""}>{it.st}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WalletSurface() {
  return (
    <div className="fx-surf fx-wallet" aria-hidden="true">
      <div className="fx-surf__head">
        <span>Messaging wallet</span>
        <span className="fx-pill">Preview</span>
      </div>
      <div className="fx-wallet__bal">
        <small>Balance</small>
        <strong>₹18,420</strong>
      </div>
      <div className="fx-wallet__meter">
        <i className="fx-wallet__used" />
        <i className="fx-wallet__res" />
      </div>
      <div className="fx-wallet__legend">
        <span>
          <i className="is-used" />
          Used this month
        </span>
        <span>
          <i className="is-res" />
          Reserved ₹2,150
        </span>
      </div>
      <ul className="fx-wallet__tx">
        <li>
          <span>Campaign · Diwali offer</span>
          <b>−₹1,240</b>
        </li>
        <li>
          <span>Top-up</span>
          <b className="is-in">+₹10,000</b>
        </li>
        <li>
          <span>Utility templates</span>
          <b>−₹312</b>
        </li>
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------- floating layers per module */
const overlays: Partial<Record<ModuleKey, ReactNode>> = {
  inbox: (
    <>
      <Over className="fx-o-arrive" z={90}>
        <div className="fx-bubble">New message · Is the 2BHK still available?</div>
      </Over>
      <Over className="fx-o-badge" z={130}>
        <span className="fx-badge">3 unread</span>
      </Over>
    </>
  ),
  templates: (
    <>
      <Over className="fx-o-stack1" z={50}>
        <div className="fx-card fx-card--light fx-mini">
          <div className="fx-card__head">festive_offer · Marketing</div>
          <span className="fx-pill">Pending review</span>
        </div>
      </Over>
      <Over className="fx-o-stack2" z={110}>
        <div className="fx-card fx-mini">
          <div className="fx-card__head">appointment_reminder · Utility</div>
          <span className="fx-pill">Approved by Meta</span>
        </div>
      </Over>
    </>
  ),
  campaigns: (
    <Over className="fx-o-audience" z={90}>
      <div className="fx-card fx-audience">
        <div className="fx-card__head">Audience · 4,812 contacts</div>
        <div className="fx-audience__dots">
          {Array.from({ length: 40 }, (_, i) => (
            <i key={i} className={i % 9 === 4 ? "is-off" : ""} style={{ ["--i" as string]: i }} />
          ))}
        </div>
        <div className="fx-card__row">
          <span>Eligible</span>
          <b>4,775</b>
        </div>
      </div>
    </Over>
  ),
  users: (
    <Over className="fx-o-team" z={100}>
      <div className="fx-card fx-team">
        <div className="fx-card__head">Sales workspace</div>
        <div className="fx-team__avatars">
          <span>MS</span>
          <span>AK</span>
          <span>RV</span>
          <span>SN</span>
          <span>+2</span>
        </div>
      </div>
    </Over>
  ),
  ai: (
    <Over className="fx-o-ai" z={110}>
      <div className="fx-card fx-type">
        <div className="fx-card__head">
          <span className="fx-dot fx-dot--teal" />
          Summary, for the next agent
        </div>
        <p>
          <span className="fx-type__line">Asked about the MBA fee structure.</span>
          <span className="fx-type__line">Wants a counselling call this week.</span>
        </p>
      </div>
    </Over>
  ),
  flows: (
    <Over className="fx-o-submit" z={110}>
      <div className="fx-card fx-mini">
        <div className="fx-card__head">Submission received</div>
        <span className="fx-pill">AC repair · Tuesday 10:00</span>
      </div>
    </Over>
  ),
  workflows: (
    <Over className="fx-o-version" z={90}>
      <span className="fx-badge">Version 3 · Published</span>
    </Over>
  ),
  catalogs: (
    <Over className="fx-o-retry" z={120}>
      <div className="fx-card fx-mini">
        <div className="fx-card__head">Sync history</div>
        <span className="fx-pill">1 item failed · Retry</span>
      </div>
    </Over>
  ),
  wallet: (
    <Over className="fx-o-estimate" z={110}>
      <div className="fx-card fx-mini">
        <div className="fx-card__head">Cost estimate · next campaign</div>
        <span className="fx-pill">≈ ₹1,180</span>
      </div>
    </Over>
  ),
};

/** The surfaces drawn here replace the kit fragment for these modules. */
export const drawnSurfaces: Partial<Record<ModuleKey, ReactNode>> = {
  flows: <FlowsSurface />,
  catalogs: <CatalogSurface />,
  wallet: <WalletSurface />,
};

/** One module's preview: the frame (its surface) in a tilting 3D stage with its floating layers. */
export function ProductStage({
  module,
  frameClass,
  label,
  children,
  className,
}: {
  module: ModuleKey;
  frameClass: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Tilt className={`fx-product ${className ?? ""}`} max={7}>
      <div className={frameClass} role="img" aria-label={label}>
        {drawnSurfaces[module] ?? children}
      </div>
      {overlays[module]}
    </Tilt>
  );
}

/** The same stage for a home-page split: the frame tilts with one soft light, no layers. */
export function SplitStage({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <Tilt className={`fx-product ${className ?? ""}`} max={5}>
      {children}
    </Tilt>
  );
}
