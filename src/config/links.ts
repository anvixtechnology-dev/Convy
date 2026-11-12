/**
 * Site-wide destinations. Everything that leaves the site is configured here.
 *
 * appUrl       — the "Open Convy" sign-in / app URL. NOT YET PROVIDED.
 *                While null, "Open Convy" buttons go to the Getting started
 *                section instead of a guessed external address.
 * whatsappUrl  — destination for the floating WhatsApp button
 *                (e.g. "https://wa.me/<number>"). NOT YET PROVIDED.
 *                While null, the floating button is not rendered.
 * email        — from the supplied footer content.
 */
export const SITE = {
  appUrl: null as string | null,
  whatsappUrl: null as string | null,
  email: "admin@convy.info",
} as const;

export const LINKS = {
  openConvy: SITE.appUrl ?? "/#get-started",
  openConvyIsExternal: SITE.appUrl !== null,
  bookDemo: `mailto:${SITE.email}?subject=${encodeURIComponent("Book a demo")}`,
  email: `mailto:${SITE.email}`,
} as const;
