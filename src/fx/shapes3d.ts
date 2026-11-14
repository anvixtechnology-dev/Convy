/**
 * The 3D objects of CONVY's world, built from three.js primitives (no model files):
 * a chat bubble with its tail, WhatsApp's double read tick, typing dots, a campaign megaphone
 * and a workflow gear. Shared by the hero's message field and the connect scene.
 */
import * as THREE from "three";

export const C = {
  black: 0x0b0708,
  card: 0x1a1013,
  wine: 0x5a1426,
  burgundy: 0xb3264a,
  bright: 0xc93a5e,
  rose: 0xe8728e,
  blush: 0xf2e3e6,
};

/** A chat bubble: a rounded rectangle with a tail at one lower corner, extruded with a soft bevel. */
export function bubbleGeometry(w = 2.2, h = 1.3, r = 0.42, tail: "left" | "right" = "left", depth = 0.32) {
  const x0 = -w / 2, x1 = w / 2, y0 = -h / 2, y1 = h / 2;
  const s = new THREE.Shape();
  s.moveTo(x0 + r, y0);
  s.lineTo(x1 - r, y0);
  s.quadraticCurveTo(x1, y0, x1, y0 + r);
  s.lineTo(x1, y1 - r);
  s.quadraticCurveTo(x1, y1, x1 - r, y1);
  s.lineTo(x0 + r, y1);
  s.quadraticCurveTo(x0, y1, x0, y1 - r);
  s.lineTo(x0, y0 + r);
  s.quadraticCurveTo(x0, y0, x0 + r, y0);
  const t = new THREE.Shape();
  if (tail === "left") {
    t.moveTo(x0 + r * 0.6, y0 + 0.05);
    t.lineTo(x0 - 0.18, y0 - 0.34);
    t.lineTo(x0 + r * 1.9, y0 + 0.05);
  } else {
    t.moveTo(x1 - r * 0.6, y0 + 0.05);
    t.lineTo(x1 + 0.18, y0 - 0.34);
    t.lineTo(x1 - r * 1.9, y0 + 0.05);
  }
  const g = new THREE.ExtrudeGeometry([s, t], {
    depth,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 3,
    curveSegments: 10,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

/** WhatsApp's double tick (read), as two thin tubes. */
export function ticksGeometry(scale = 1) {
  const path = (dx: number) => {
    const p = new THREE.CurvePath<THREE.Vector3>();
    p.add(new THREE.LineCurve3(new THREE.Vector3(-0.42 + dx, 0, 0), new THREE.Vector3(-0.18 + dx, -0.24, 0)));
    p.add(new THREE.LineCurve3(new THREE.Vector3(-0.18 + dx, -0.24, 0), new THREE.Vector3(0.28 + dx, 0.24, 0)));
    return p;
  };
  const a = new THREE.TubeGeometry(path(0), 12, 0.055, 6);
  const b = new THREE.TubeGeometry(path(0.3), 12, 0.055, 6);
  const g = mergeGeometries([a, b]);
  g.scale(scale, scale, scale);
  return g;
}

/** A campaign megaphone: an open cone with its mouth and a handle. */
export function megaphone(material: THREE.Material, rim: THREE.Material) {
  const grp = new THREE.Group();
  const horn = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.28, 1.4, 28, 1, true), material);
  horn.rotation.z = Math.PI / 2;
  grp.add(horn);
  const mouth = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.06, 8, 32), rim);
  mouth.rotation.y = Math.PI / 2;
  mouth.position.x = -0.7;
  grp.add(mouth);
  const back = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.35, 20), material);
  back.rotation.z = Math.PI / 2;
  back.position.x = 0.85;
  grp.add(back);
  const handle = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.55, 0.18), material);
  handle.position.set(0.35, -0.5, 0);
  grp.add(handle);
  return grp;
}

/** A workflow gear: a toothed ring, extruded. */
export function gearGeometry(teeth = 10, r = 0.9, tooth = 0.22) {
  const s = new THREE.Shape();
  const steps = teeth * 4;
  for (let i = 0; i <= steps; i++) {
    const a = (i / steps) * Math.PI * 2;
    const rr = i % 4 < 2 ? r + tooth : r;
    const x = Math.cos(a) * rr, y = Math.sin(a) * rr;
    if (i === 0) s.moveTo(x, y);
    else s.lineTo(x, y);
  }
  const hole = new THREE.Path();
  hole.absarc(0, 0, r * 0.42, 0, Math.PI * 2, true);
  s.holes.push(hole);
  const g = new THREE.ExtrudeGeometry(s, { depth: 0.3, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.04, bevelSegments: 2 });
  g.translate(0, 0, -0.15);
  return g;
}

/** Joins geometries with the same attributes into one (positions, normals, uvs). */
export function mergeGeometries(list: THREE.BufferGeometry[]) {
  const geos = list.map((g) => (g.index ? g.toNonIndexed() : g));
  const total = geos.reduce((n, g) => n + g.attributes.position.count, 0);
  const out = new THREE.BufferGeometry();
  for (const name of ["position", "normal", "uv"]) {
    if (!geos.every((g) => g.attributes[name])) continue;
    const size = geos[0].attributes[name].itemSize;
    const arr = new Float32Array(total * size);
    let o = 0;
    for (const g of geos) {
      arr.set(g.attributes[name].array as Float32Array, o);
      o += g.attributes[name].count * size;
    }
    out.setAttribute(name, new THREE.BufferAttribute(arr, size));
  }
  return out;
}

/** Standard materials of the scenes. */
export function materials() {
  return {
    wine: new THREE.MeshStandardMaterial({ color: C.wine, roughness: 0.32, metalness: 0.25, emissive: 0x1a0509 }),
    burgundy: new THREE.MeshStandardMaterial({ color: C.burgundy, roughness: 0.28, metalness: 0.3, emissive: 0x2a0811 }),
    blush: new THREE.MeshStandardMaterial({ color: C.blush, roughness: 0.4, metalness: 0.05 }),
    dark: new THREE.MeshStandardMaterial({ color: C.card, roughness: 0.5, metalness: 0.4 }),
    glow: new THREE.MeshStandardMaterial({ color: C.rose, emissive: C.rose, emissiveIntensity: 0.9, roughness: 0.3 }),
  };
}

/** The renderer every scene uses: alpha, capped pixel ratio, low power. */
export function makeRenderer(host: HTMLElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  host.appendChild(renderer.domElement);
  return renderer;
}

/** Disposes every geometry and material under an object. */
export function disposeAll(root: THREE.Object3D) {
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    m.geometry?.dispose?.();
    const mat = m.material as THREE.Material | THREE.Material[] | undefined;
    (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
  });
}
