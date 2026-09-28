"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// 3D centrepiece: a glowing X inside a wireframe shell, with drifting particles.
export default function Scene() {
  const mount = useRef(null);
  useEffect(() => {
    const el = mount.current;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = innerWidth < 640;
    const renderer = new THREE.WebGLRenderer({ antialias: !mobile, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const cam = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    cam.position.z = 6;

    const group = new THREE.Group();
    const bar = () => new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 3.4, 0.28), new THREE.MeshBasicMaterial({ color: 0x22e5ff }));
    const a = bar(), b = bar();
    a.rotation.z = Math.PI / 4; b.rotation.z = -Math.PI / 4;
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.6, 1),
      new THREE.MeshBasicMaterial({ color: 0x8b5cff, wireframe: true, transparent: true, opacity: 0.35 }));
    group.add(a, b, shell);
    group.position.y = mobile ? 1.6 : 0.6;
    scene.add(group);

    const n = mobile ? 400 : 1200, pos = new Float32Array(n * 3);
    for (let i = 0; i < pos.length; i++) pos[i] = (Math.random() - 0.5) * 30;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pts = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0x22e5ff, size: 0.04, transparent: true, opacity: 0.7 }));
    scene.add(pts);

    const m = { x: 0, y: 0 };
    const onMove = (e) => {
      const t = e.touches ? e.touches[0] : e;
      m.x = (t.clientX / innerWidth - 0.5) * 2; m.y = (t.clientY / innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      renderer.setSize(el.clientWidth, el.clientHeight);
      cam.aspect = el.clientWidth / el.clientHeight; cam.updateProjectionMatrix();
    };
    addEventListener("pointermove", onMove); addEventListener("touchmove", onMove); addEventListener("resize", onResize);

    let raf;
    const loop = () => {
      const s = reduce ? 0 : 1;
      group.rotation.y += 0.004 * s; shell.rotation.x += 0.002 * s;
      cam.position.x += (m.x * 0.8 - cam.position.x) * 0.04;
      cam.position.y += (-m.y * 0.6 - cam.position.y) * 0.04;
      cam.lookAt(0, 0, 0);
      pts.rotation.y += 0.0006 * s;
      renderer.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove); removeEventListener("touchmove", onMove); removeEventListener("resize", onResize);
      renderer.dispose(); el.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mount} className="fixed inset-0 z-0" aria-hidden="true" />;
}
