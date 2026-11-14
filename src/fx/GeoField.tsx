/**
 * The hero's 3D field (three.js, loaded on its own chunk by GeoFieldLazy below): a few low-poly
 * wireframe shapes in the brand's teal and green, lit softly, drifting and turning toward the
 * pointer. Built for cost: seven meshes, no textures, device pixel ratio capped at 1.5, and the
 * render loop runs only while the hero is on screen and the tab is visible.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";

const TEAL = 0x32bfa5;
const GREEN = 0x20c96b;
const LINE = 0x34374d;

export default function GeoField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x141521, 9, 22);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 60);
    camera.position.set(0, 0, 12);

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.PointLight(TEAL, 40, 30);
    key.position.set(-4, 3, 6);
    scene.add(key);
    const rim = new THREE.PointLight(GREEN, 18, 30);
    rim.position.set(5, -3, 4);
    scene.add(rim);

    // each shape: a dark faceted solid with its teal edges drawn over it
    const solid = (geo: THREE.BufferGeometry, edge: number, opacity: number) => {
      const g = new THREE.Group();
      g.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({ color: 0x191b2b, roughness: 0.45, metalness: 0.35, flatShading: true, transparent: true, opacity: 0.55 }),
        ),
      );
      g.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: edge, transparent: true, opacity })));
      return g;
    };

    const shapes: Array<{ obj: THREE.Object3D; spin: THREE.Vector3; float: number; base: THREE.Vector3 }> = [];
    const place = (obj: THREE.Object3D, x: number, y: number, z: number, s: number, spin: [number, number, number]) => {
      obj.position.set(x, y, z);
      obj.scale.setScalar(s);
      scene.add(obj);
      shapes.push({ obj, spin: new THREE.Vector3(...spin), float: Math.random() * Math.PI * 2, base: new THREE.Vector3(x, y, z) });
    };
    place(solid(new THREE.IcosahedronGeometry(1, 0), TEAL, 0.9), -6.2, 2.2, -1, 1.15, [0.12, 0.18, 0]);
    place(solid(new THREE.OctahedronGeometry(1, 0), GREEN, 0.75), 6.4, 2.6, -2, 0.9, [0.16, -0.1, 0.05]);
    place(solid(new THREE.TorusGeometry(0.9, 0.22, 10, 36), TEAL, 0.55), 5.6, -1.8, 0, 0.85, [0.2, 0.08, 0.1]);
    place(solid(new THREE.TetrahedronGeometry(1, 0), TEAL, 0.7), -5.4, -2.4, 1, 0.7, [-0.1, 0.22, 0]);
    place(solid(new THREE.DodecahedronGeometry(1, 0), LINE, 0.9), -1.8, 4.2, -6, 1.3, [0.06, 0.1, 0]);
    place(solid(new THREE.IcosahedronGeometry(1, 1), GREEN, 0.35), 2.4, 4.6, -8, 1.6, [0.05, -0.07, 0]);
    place(solid(new THREE.BoxGeometry(1, 1, 1), TEAL, 0.5), 0.8, -4.2, -4, 0.75, [0.18, 0.12, 0.04]);

    // a perspective floor grid, very faint
    const grid = new THREE.GridHelper(40, 40, TEAL, LINE);
    (grid.material as THREE.Material).transparent = true;
    (grid.material as THREE.Material).opacity = 0.12;
    grid.position.y = -5.2;
    scene.add(grid);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth || 1;
      const h = el.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    io.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible || document.hidden) return;
      const t = clock.getElapsedTime();
      const dt = Math.min(clock.getDelta(), 0.05);
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      for (const s of shapes) {
        s.obj.rotation.x += s.spin.x * 0.6 * (dt || 0.016);
        s.obj.rotation.y += s.spin.y * 0.6 * (dt || 0.016);
        s.obj.position.y = s.base.y + Math.sin(t * 0.5 + s.float) * 0.25;
      }
      camera.position.x = pointer.x * 0.9;
      camera.position.y = -pointer.y * 0.6;
      camera.lookAt(0, 0, 0);
      key.position.x = -4 + pointer.x * 2;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const onVis = () => !document.hidden && loop();
    document.addEventListener("visibilitychange", onVis);
    loop();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose?.();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((x) => x.dispose());
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="fx-geo" aria-hidden="true" />;
}
