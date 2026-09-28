"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FEST } from "@/lib/config";

const GLYPHS = "01<>/\\{}#$%&";
const REST = FEST.name.slice(1);

export default function Loader({ onDone, short }) {
  const ref = useRef(null);
  const [pct, setPct] = useState(0);
  const [text, setText] = useState("");
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    const cv = ref.current, ctx = cv.getContext("2d");
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const MIN = reduce ? 500 : short ? 1400 : 3200;
    const N = innerWidth < 640 ? 300 : 800;
    const w = (cv.width = innerWidth), h = (cv.height = innerHeight);
    const s = Math.min(w, h) * 0.16;
    const P = Array.from({ length: N }, (_, i) => {
      const t = Math.random() * 2 - 1, d = i % 2 ? 1 : -1;
      return { x: Math.random() * w, y: Math.random() * h, tx: w / 2 + t * s, ty: h / 2 + t * s * d };
    });
    let ready = false, raf, done = false, iv, to;
    document.fonts.ready.then(() => (ready = true));
    const t0 = performance.now();

    const ignite = () => {
      setFlash(true);
      let step = 0;
      iv = setInterval(() => {
        step++;
        const locked = Math.floor(step / 4);
        setText(REST.split("").map((c, i) =>
          i < locked ? c : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]).join(""));
        if (locked >= REST.length) { clearInterval(iv); to = setTimeout(onDone, 700); }
      }, 50);
    };

    const tick = (now) => {
      const p = Math.min(1, (now - t0) / MIN);
      const shown = ready ? p : Math.min(p, 0.9);
      setPct(Math.floor(shown * 100));
      ctx.fillStyle = "rgba(0,0,0,.22)";
      ctx.fillRect(0, 0, w, h);
      const k = 0.02 + shown * 0.08;
      for (const q of P) {
        q.x += (q.tx - q.x) * k;
        q.y += (q.ty - q.y) * k;
        ctx.fillStyle = shown > 0.85 ? "#22e5ff" : "#8b5cff";
        ctx.fillRect(q.x, q.y, 2, 2);
      }
      if (shown >= 1 && !done) { done = true; ignite(); return; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); clearInterval(iv); clearTimeout(to); };
  }, [onDone, short]);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-black"
      exit={{ opacity: 0, scale: 1.4, filter: "blur(20px)" }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      role="status" aria-label="Loading"
    >
      <canvas ref={ref} className="absolute inset-0" />
      {flash && (
        <motion.div
          className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-cyan-x"
          initial={{ scale: 0, opacity: 1 }} animate={{ scale: 40, opacity: 0 }} transition={{ duration: 1.1 }}
        />
      )}
      <div className="absolute inset-x-0 bottom-[22%] text-center font-[family-name:var(--font-display)]">
        {flash
          ? <p className="glow text-3xl tracking-[0.3em] text-cyan-x sm:text-5xl">X{text}</p>
          : <p className="text-sm tracking-widest text-cyan-100/70">{pct}%</p>}
      </div>
    </motion.div>
  );
}
