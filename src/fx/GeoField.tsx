/**
 * The hero's 3D field: CONVY's world floating around the headline. Chat bubbles in burgundy and
 * blush (incoming and outgoing, one typing, two read with WhatsApp's double tick), a campaign
 * megaphone and a workflow gear, drifting in depth and turning toward the pointer.
 * Loaded on its own chunk (Ambient.tsx); renders only while the hero is on screen and the tab is
 * visible; device pixel ratio capped at 1.5; never on a phone or under reduced motion.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { C, bubbleGeometry, disposeAll, gearGeometry, makeRenderer, materials, megaphone, ticksGeometry } from "./shapes3d";

export default function GeoField() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const renderer = makeRenderer(el);
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(C.black, 10, 24);
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 60);
    camera.position.set(0, 0, 13);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const key = new THREE.DirectionalLight(0xffffff, 1.4);
    key.position.set(-3, 5, 8);
    scene.add(key);
    const wineLight = new THREE.PointLight(C.bright, 60, 30);
    wineLight.position.set(-6, 2, 5);
    scene.add(wineLight);
    const roseLight = new THREE.PointLight(C.rose, 30, 30);
    roseLight.position.set(6, -3, 4);
    scene.add(roseLight);

    const m = materials();
    const items: Array<{ obj: THREE.Object3D; base: THREE.Vector3; spin: number; phase: number; sway: number }> = [];
    const add = (obj: THREE.Object3D, x: number, y: number, z: number, s: number, rotY = 0) => {
      obj.position.set(x, y, z);
      obj.scale.setScalar(s);
      obj.rotation.y = rotY;
      scene.add(obj);
      items.push({ obj, base: new THREE.Vector3(x, y, z), spin: 0.15 + Math.random() * 0.2, phase: Math.random() * Math.PI * 2, sway: 0.18 + Math.random() * 0.15 });
    };

    // an incoming message (blush), typing
    const typing = new THREE.Group();
    typing.add(new THREE.Mesh(bubbleGeometry(2.0, 1.1, 0.42, "left"), m.blush));
    for (let i = 0; i < 3; i++) {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.12, 16, 12), m.burgundy);
      dot.position.set(-0.42 + i * 0.42, 0, 0.26);
      dot.userData.dot = i;
      typing.add(dot);
    }
    add(typing, -6.4, 2.3, -1, 0.95, 0.35);

    // an outgoing reply (burgundy), read: the double tick
    const read = new THREE.Group();
    read.add(new THREE.Mesh(bubbleGeometry(2.4, 1.25, 0.45, "right"), m.burgundy));
    const ticks = new THREE.Mesh(ticksGeometry(1), m.glow);
    ticks.position.set(0.15, 0, 0.27);
    read.add(ticks);
    add(read, 6.3, 2.6, -1.5, 0.9, -0.4);

    // a small wine bubble, read
    const small = new THREE.Group();
    small.add(new THREE.Mesh(bubbleGeometry(1.5, 0.95, 0.38, "right"), m.wine));
    const t2 = new THREE.Mesh(ticksGeometry(0.8), m.glow);
    t2.position.set(0.1, 0, 0.26);
    small.add(t2);
    add(small, -5.6, -2.5, 0.5, 0.8, 0.5);

    // a campaign megaphone
    add(megaphone(m.burgundy, m.glow), 6.1, -2.2, 0, 0.85, -0.6);

    // a workflow gear
    add(new THREE.Mesh(gearGeometry(), m.dark), -2.4, 4.4, -6, 1.1, 0.3);

    // far bubbles, out of focus in the fog
    add(new THREE.Mesh(bubbleGeometry(1.8, 1, 0.4, "left"), m.wine), 2.8, 4.8, -8, 1.2, -0.2);
    add(new THREE.Mesh(bubbleGeometry(1.6, 0.9, 0.36, "right"), m.dark), 0.6, -4.6, -5, 1, 0.2);

    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const resize = () => {
      const w = el.clientWidth || 1, h = el.clientHeight || 1;
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
      pointer.x += (pointer.tx - pointer.x) * 0.04;
      pointer.y += (pointer.ty - pointer.y) * 0.04;
      for (const it of items) {
        it.obj.position.y = it.base.y + Math.sin(t * 0.6 + it.phase) * 0.28;
        it.obj.rotation.x = Math.sin(t * 0.4 + it.phase) * 0.12;
        it.obj.rotation.z = Math.sin(t * 0.3 + it.phase) * 0.06;
        it.obj.rotation.y += Math.sin(t * it.spin + it.phase) * 0.0015;
      }
      // the typing dots rise one after the other
      typing.children.forEach((c) => {
        if (c.userData.dot !== undefined) c.position.y = Math.max(0, Math.sin(t * 5 - c.userData.dot * 0.9)) * 0.14;
      });
      camera.position.x = pointer.x * 1.1;
      camera.position.y = -pointer.y * 0.7;
      camera.lookAt(0, 0, 0);
      wineLight.position.x = -6 + pointer.x * 2.5;
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
      disposeAll(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="fx-geo" aria-hidden="true" />;
}
