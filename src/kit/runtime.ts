/**
 * Runs the taste-skill kit's scripts (public/assets) inside the React app.
 *
 * The kit is written for static pages: each script starts itself once on load. Here the
 * first boot imports them after React's first commit, so the markup is in the DOM; every
 * later route change re-runs only the parts that work on <main> (fragments, diagrams,
 * the hover layer, the moments), since the header and its menu are mounted once.
 *
 * The kit files are served as plain files from /assets and never bundled.
 */
type Mod = Record<string, any>;

const at = (path: string): Promise<Mod> =>
  import(/* @vite-ignore */ new URL(`/assets/${path}`, window.location.origin).href);

let boot: Promise<void> | null = null;

/** First page: import the kit; system.js, layout.js and the diagram mount start themselves. */
export function bootKit(): Promise<void> {
  if (boot) return boot;
  boot = (async () => {
    await at("system.js");
    const [motion] = await Promise.all([at("motion/motion.js"), at("layout/layout.js"), at("diagrams/mount.js")]);
    motion.init?.();
  })().catch((e) => console.warn("kit: boot failed", e));
  return boot;
}

/** A route change: the new <main> gets its fragments, diagrams, moments and the hover layer. */
export async function refreshKit(): Promise<void> {
  await boot;
  const main = document.querySelector("main");
  if (!main) return;
  try {
    const phone = window.matchMedia("(max-width: 639px)").matches;
    main.querySelectorAll<HTMLElement>("[data-ui]").forEach((el) => {
      if (phone || !el.closest("[data-ui-loop]")) el.setAttribute("data-ui-still", "");
    });
    const [ui, dg, motion, layout, moments] = await Promise.all([
      at("ui/ui.js"),
      at("diagrams/diagram.js"),
      at("motion/motion.js"),
      at("layout/layout.js"),
      main.querySelector("[data-moment]") ? at("moments/moments.js") : Promise.resolve(null),
    ]);
    await Promise.all([ui.startAll?.(main) ?? ui.default?.startAll?.(main), (dg.default ?? dg).auto?.(main)]);
    (layout.default ?? layout).init?.();
    motion.refresh?.();
    if (moments) {
      moments.unmountAll(document);
      await moments.mountAll(document);
    }
  } catch (e) {
    console.warn("kit: refresh failed", e);
  }
}
