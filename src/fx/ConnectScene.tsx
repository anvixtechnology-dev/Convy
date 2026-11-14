/**
 * "We connect. We convert." as a 3D scene. Customers sit on a sphere around CONVY's core; their
 * messages (blush bubbles) travel in along the lines (we connect), and leave the core as burgundy
 * replies to a ring of double ticks, each tick lighting as its reply arrives (we convert).
 * Scrolling through the section turns the whole network; the pointer tilts it.
 * Its own chunk; renders only while on screen; not on phones or under reduced motion.
 */
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { C, bubbleGeometry, disposeAll, makeRenderer, materials, ticksGeometry } from "./shapes3d";

const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

export default function ConnectScene() {
  const host = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const section = el.closest("section") ?? el;
    const renderer = makeRenderer(el);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 80);
    camera.position.set(0, 1.2, 13);

    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(4, 6, 8);
    scene.add(key);
    const coreLight = new THREE.PointLight(C.bright, 80, 18);
    scene.add(coreLight);

    const m = materials();
    const net = new THREE.Group();
    scene.add(net);

    // the core: CONVY, a faceted burgundy heart inside a slowly turning wire shell
    const coreMat = new THREE.MeshStandardMaterial({ color: C.burgundy, emissive: C.bright, emissiveIntensity: 0.55, roughness: 0.25, metalness: 0.35, flatShading: true });
    const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 1), coreMat);
    net.add(core);
    const shell = new THREE.LineSegments(
      new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.75, 1)),
      new THREE.LineBasicMaterial({ color: C.rose, transparent: true, opacity: 0.35 }),
    );
    net.add(shell);

    // customers: points on a sphere (a Fibonacci spread), each with its line to the core
    const N = 16;
    const customers: THREE.Vector3[] = [];
    const custGeo = new THREE.SphereGeometry(0.16, 16, 12);
    const linePts: number[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const a = i * Math.PI * (3 - Math.sqrt(5));
      const p = new THREE.Vector3(Math.cos(a) * r, y * 0.8, Math.sin(a) * r).multiplyScalar(4.6);
      customers.push(p);
      const dot = new THREE.Mesh(custGeo, m.blush);
      dot.position.copy(p);
      net.add(dot);
      linePts.push(p.x, p.y, p.z, 0, 0, 0);
    }
    const lines = new THREE.BufferGeometry();
    lines.setAttribute("position", new THREE.Float32BufferAttribute(linePts, 3));
    net.add(new THREE.LineSegments(lines, new THREE.LineBasicMaterial({ color: C.rose, transparent: true, opacity: 0.16 })));

    // the converted ring: double ticks on a tilted orbit
    const ring = new THREE.Group();
    ring.rotation.x = 1.15;
    net.add(ring);
    const R = 3;
    const ticks: THREE.Mesh[] = [];
    const tickGeo = ticksGeometry(0.55);
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const mat = new THREE.MeshStandardMaterial({ color: C.rose, emissive: C.rose, emissiveIntensity: 0.15, roughness: 0.3 });
      const t = new THREE.Mesh(tickGeo, mat);
      t.position.set(Math.cos(a) * R, Math.sin(a) * R, 0);
      t.rotation.x = -1.15;
      t.userData.glow = 0;
      ring.add(t);
      ticks.push(t);
    }
    const orbit = new THREE.Mesh(new THREE.TorusGeometry(R, 0.012, 6, 120), new THREE.MeshBasicMaterial({ color: C.rose, transparent: true, opacity: 0.3 }));
    ring.add(orbit);

    // the messages: a pool of small bubbles, in from a customer, then out to a tick
    const inGeo = bubbleGeometry(0.62, 0.4, 0.16, "left", 0.1);
    const outGeo = bubbleGeometry(0.62, 0.4, 0.16, "right", 0.1);
    type Msg = { mesh: THREE.Mesh; from: number; to: number; t: number; speed: number; phase: "in" | "out" };
    const msgs: Msg[] = [];
    for (let i = 0; i < 18; i++) {
      const mesh = new THREE.Mesh(inGeo, m.blush);
      mesh.visible = false;
      net.add(mesh);
      msgs.push({ mesh, from: i % N, to: i % 10, t: -i * 0.22, speed: 0.45 + Math.random() * 0.2, phase: "in" });
    }
    const tickWorld = new THREE.Vector3();

    // scroll and pointer
    let progress = 0;
    const onScroll = () => {
      const r = section.getBoundingClientRect();
      progress = Math.min(1, Math.max(0, (window.innerHeight - r.top) / (window.innerHeight + r.height)));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
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

    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) loop();
    });
    io.observe(el);

    let raf = 0;
    const clock = new THREE.Clock();
    let last = 0;
    const loop = () => {
      cancelAnimationFrame(raf);
      if (!visible || document.hidden) return;
      const time = clock.getElapsedTime();
      const dt = Math.min(time - last, 0.05);
      last = time;

      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      net.rotation.y = -0.6 + progress * Math.PI * 1.1 + pointer.x * 0.25 + time * 0.04;
      net.rotation.x = 0.15 + pointer.y * 0.15;
      shell.rotation.y = time * 0.15;
      shell.rotation.x = time * 0.08;
      const pulse = 0.5 + Math.sin(time * 2) * 0.15;
      coreMat.emissiveIntensity = pulse;
      coreLight.intensity = 60 + pulse * 40;
      core.rotation.y = time * 0.3;

      for (const msg of msgs) {
        msg.t += dt * msg.speed;
        if (msg.t < 0) continue;
        if (msg.t >= 1) {
          if (msg.phase === "in") {
            // reached the core: it leaves as a reply
            msg.phase = "out";
            msg.mesh.geometry = outGeo;
            msg.mesh.material = m.burgundy;
          } else {
            // the reply reached its tick: the tick lights, a new message starts
            ticks[msg.to].userData.glow = 1;
            msg.phase = "in";
            msg.mesh.geometry = inGeo;
            msg.mesh.material = m.blush;
            msg.from = Math.floor(Math.random() * N);
            msg.to = Math.floor(Math.random() * 10);
            msg.t = -Math.random() * 0.6;
            msg.mesh.visible = false;
            continue;
          }
          msg.t = 0;
        }
        msg.mesh.visible = true;
        const k = ease(msg.t);
        if (msg.phase === "in") {
          msg.mesh.position.copy(customers[msg.from]).multiplyScalar(1 - k);
        } else {
          ticks[msg.to].getWorldPosition(tickWorld);
          net.worldToLocal(tickWorld);
          msg.mesh.position.set(0, 0, 0).lerp(tickWorld, k);
        }
        const s = msg.t < 0.12 ? msg.t / 0.12 : msg.t > 0.9 ? (1 - msg.t) / 0.1 : 1;
        msg.mesh.scale.setScalar(0.4 + s * 0.6);
        // bubbles face the camera
        msg.mesh.quaternion.copy(net.quaternion).invert().multiply(camera.quaternion);
      }
      for (const t of ticks) {
        t.userData.glow = Math.max(0, t.userData.glow - dt * 0.6);
        (t.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.15 + t.userData.glow * 1.3;
        t.scale.setScalar(1 + t.userData.glow * 0.45);
      }

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(loop);
    };
    const onVis = () => !document.hidden && loop();
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", onVis);
      inGeo.dispose();
      outGeo.dispose();
      disposeAll(scene);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={host} className="fx-connect__canvas" aria-hidden="true" />;
}
