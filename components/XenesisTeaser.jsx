"use client";

import { useEffect, useRef } from "react";
import { Archivo_Black } from "next/font/google";
import { FEST } from "@/lib/config";

const font = Archivo_Black({ weight: "400", subsets: ["latin"], display: "swap" });

const WORD = FEST.name;
const HOLD_MS = 2400; // time to reach full energy
const MIN_ENERGY = 0.3; // release below this = fizzle out

// Mirror-chrome bands: sky, dark horizon, warm ground, bright kick.
const CHROME = [
  [0, "#f6f9ff"],
  [0.14, "#8fa6bd"],
  [0.3, "#2a3746"],
  [0.42, "#06090d"],
  [0.48, "#d9e4f0"],
  [0.53, "#f3e2bd"],
  [0.6, "#8a7350"],
  [0.72, "#2b2418"],
  [0.84, "#c9d8ea"],
  [1, "#ffffff"],
];

// 4.0 gets a cooler, electric-blue chrome so it reads as the version.
const CHROME_BLUE = [
  [0, "#f2f7ff"],
  [0.14, "#7aa2ff"],
  [0.3, "#1c2f66"],
  [0.42, "#040713"],
  [0.48, "#cfe0ff"],
  [0.53, "#a9c6ff"],
  [0.6, "#4d6fd0"],
  [0.72, "#141f45"],
  [0.84, "#bcd2ff"],
  [1, "#ffffff"],
];

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const buzz = (p) => {
  try {
    if (navigator.vibrate) navigator.vibrate(p);
  } catch {}
};

export default function XenesisTeaser() {
  const stageRef = useRef(null);
  const canvasRef = useRef(null);
  const overlayRef = useRef(null);
  const orbRef = useRef(null);
  const labelRef = useRef(null);
  const flashRef = useRef(null);
  const hintRef = useRef(null);
  const infoRef = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const Matter = (await import("matter-js")).default;
      const family = font.style.fontFamily;
      try {
        await Promise.race([
          document.fonts.load(`100px ${family}`),
          new Promise((r) => setTimeout(r, 1500)),
        ]);
      } catch {}
      if (disposed) return;
      cleanup = init(Matter, family);
    })();

    function init(Matter, family) {
      const { Engine, Bodies, Body, Mouse, MouseConstraint, Events, Composite } = Matter;
      const stage = stageRef.current;
      const canvas = canvasRef.current;
      const overlay = overlayRef.current;
      const orb = orbRef.current;
      const label = labelRef.current;
      const flash = flashRef.current;
      const hint = hintRef.current;
      const info = infoRef.current;
      const ctx = canvas.getContext("2d");

      const S = {
        phase: "idle", // idle -> live
        holding: false,
        energy: 0,
        holdStart: 0,
        shake: 0,
        tx: 0, ty: 0, ttx: 0, tty: 0, // reflection tilt (smoothed / target)
        tgx: 0, // target sideways gravity
        igniteAt: 0,
        w: 0, h: 0, dpr: 1, f: 100, capH: 70,
        lastBuzz: 0, lastImpact: 0,
        motionAsked: false, motionOn: false, gotOrient: false,
      };
      let engine, mouseC, floorY, letters = [], acc = 0, raf, lastLabel = "";

      /* ---------- world ---------- */
      function build(drop, energy = 0.6) {
        const { w, h } = S;
        engine = Engine.create();
        engine.gravity.y = 1;

        const footer = Math.max(84, Math.min(150, h * 0.14));
        floorY = h - footer;

        const portrait = w < h * 0.9 && w < 820;
        const rows = portrait ? ["XENE", "SIS", FEST.edition] : [WORD, FEST.edition];

        ctx.font = `100px ${family}`;
        const rowW100 = Math.max(
          ...rows.map((r) => [...r].reduce((a, c) => a + ctx.measureText(c).width, 0))
        );
        const cap100 = ctx.measureText("H").actualBoundingBoxAscent || 70;
        const fByWidth = ((w * 0.92) / (rowW100 * 1.07)) * 100;
        const fByHeight = (floorY * 0.55) / (rows.length * 1.12 * (cap100 / 100));
        const f = Math.min(fByWidth, fByHeight);
        const capH = (f * cap100) / 100;
        const pad = f * 0.07;
        const bh = capH + pad;
        S.f = f;
        S.capH = capH;

        ctx.font = `${f}px ${family}`;
        const bodies = [];
        let idx = 0;
        rows.forEach((row, ri) => {
          const chars = [...row];
          const widths = chars.map((c) => ctx.measureText(c).width + (c === "." ? f * 0.22 : pad)); // wider dot body so it lands upright
          const total = widths.reduce((a, b) => a + b, 0);
          let x = (w - total) / 2;
          const homeY = floorY - bh / 2 - (rows.length - 1 - ri) * (bh + 2);
          chars.forEach((ch, i) => {
            const bw = widths[i];
            const hx = x + bw / 2;
            x += bw;
            const b = Bodies.rectangle(
              drop ? hx + (Math.random() - 0.5) * f * 0.6 : hx,
              drop ? -f * (1.2 + Math.random() * 2.5 + idx * 0.9) : homeY,
              bw,
              bh,
              {
                chamfer: { radius: f * 0.09 },
                restitution: 0.35,
                friction: 0.7,
                frictionStatic: 0.9,
                density: 0.004,
                frictionAir: 0.012,
                angle: drop ? (Math.random() - 0.5) * 1.2 : 0,
              }
            );
            if (drop) {
              Body.setVelocity(b, { x: (Math.random() - 0.5) * 4, y: 6 + energy * 14 });
              Body.setAngularVelocity(b, (Math.random() - 0.5) * 0.3);
            }
            b.glyph = ch;
            b.tint = row === FEST.edition;
            b.home = { x: hx, y: homeY };
            bodies.push(b);
            idx++;
          });
        });
        letters = bodies;

        const t = 200;
        const walls = [
          Bodies.rectangle(w / 2, floorY + t / 2, w * 3, t, { isStatic: true, friction: 0.9 }),
          Bodies.rectangle(-t / 2, -h * 2, t, h * 6, { isStatic: true }),
          Bodies.rectangle(w + t / 2, -h * 2, t, h * 6, { isStatic: true }),
          Bodies.rectangle(w / 2, -h * 5 - 100, w * 3, t, { isStatic: true }),
        ];

        const mouse = Mouse.create(canvas);
        mouse.pixelRatio = S.dpr;
        canvas.removeEventListener("mousewheel", mouse.mousewheel);
        canvas.removeEventListener("DOMMouseScroll", mouse.mousewheel);
        mouseC = MouseConstraint.create(engine, {
          mouse,
          constraint: { stiffness: 0.25, damping: 0.1, render: { visible: false } },
        });
        Composite.add(engine.world, [...bodies, ...walls, mouseC]);
        Events.on(mouseC, "startdrag", hideHint); // hint goes away once they touch a letter

        // Heavy impacts: shake + short buzz
        Events.on(engine, "collisionStart", (e) => {
          const now = performance.now();
          for (const p of e.pairs) {
            const s = Math.max(p.bodyA.speed, p.bodyB.speed);
            if (s > 7 && now - S.lastImpact > 70) {
              S.lastImpact = now;
              S.shake = Math.max(S.shake, Math.min(s * 0.7, 14));
              buzz(Math.round(Math.min(8 + s * 2, 40)));
            }
          }
        });

        // Spring letters back to their slots (ramps in after the crash)
        Events.on(engine, "beforeUpdate", () => {
          const t = (performance.now() - S.igniteAt) / 1000;
          const gain = clamp((t - 1.3) / 1.7, 0, 1);
          engine.gravity.x += (S.tgx - engine.gravity.x) * 0.08;
          if (!gain) return;
          for (const b of letters) {
            const k = 0.000012 * gain * b.mass;
            Body.applyForce(b, b.position, {
              x: (b.home.x - b.position.x) * k,
              y: (b.home.y - b.position.y) * k,
            });
            const a = ((((b.angle + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)) - Math.PI;
            Body.setAngularVelocity(
              b,
              b.angularVelocity - a * 0.003 * gain - b.angularVelocity * 0.03 * gain
            );
          }
        });
      }

      /* ---------- drawing ---------- */
      function drawLetter(b) {
        const { f, capH } = S;
        ctx.save();
        ctx.translate(b.position.x, b.position.y);
        ctx.rotate(b.angle);
        ctx.font = `${f}px ${family}`;
        ctx.textAlign = "center";
        ctx.textBaseline = "alphabetic";
        ctx.lineJoin = "round";
        const y = capH / 2;

        // Reflection axis stays world-fixed (counter-rotates) and slides with tilt
        const L = capH * 2.2;
        const a = Math.PI / 2 + S.tx * 0.7 - b.angle;
        const dx = Math.cos(a), dy = Math.sin(a);
        const shift =
          (S.tx * 0.5 + S.ty * 0.4) * capH * 0.6 +
          ((b.position.x / S.w - 0.5) * 0.3 + (b.position.y / S.h - 0.5) * 0.2) * capH;
        const g = ctx.createLinearGradient(
          dx * (-L / 2 + shift), dy * (-L / 2 + shift),
          dx * (L / 2 + shift), dy * (L / 2 + shift)
        );
        for (const [o, c] of b.tint ? CHROME_BLUE : CHROME) g.addColorStop(o, c);

        ctx.strokeStyle = "#0a0d12";
        ctx.lineWidth = f * 0.05;
        ctx.strokeText(b.glyph, 0, y);
        ctx.fillStyle = g;
        ctx.fillText(b.glyph, 0, y);
        ctx.strokeStyle = "rgba(255,255,255,0.45)";
        ctx.lineWidth = Math.max(1, f * 0.008);
        ctx.strokeText(b.glyph, 0, y);
        ctx.restore();
      }

      function draw() {
        ctx.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
        ctx.clearRect(0, 0, S.w, S.h);
        const fl = ctx.createLinearGradient(0, 0, S.w, 0);
        fl.addColorStop(0, "rgba(255,255,255,0)");
        fl.addColorStop(0.5, "rgba(255,255,255,0.28)");
        fl.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = fl;
        ctx.fillRect(0, floorY, S.w, 1);
        for (const b of letters) drawLetter(b);
      }

      /* ---------- loop ---------- */
      let last = performance.now();
      function frame(now) {
        raf = requestAnimationFrame(frame);
        const dt = Math.min(now - last, 50);
        last = now;

        if (S.phase === "idle") {
          if (S.holding) {
            S.energy = Math.min(1, (now - S.holdStart) / HOLD_MS);
            if (now - S.lastBuzz > 110 - S.energy * 70) {
              S.lastBuzz = now;
              buzz(Math.round(6 + S.energy * 34));
            }
          } else {
            S.energy = Math.max(0, S.energy - dt / 500);
          }
          orb.style.transform = `translate(-50%,-50%) scale(${1 + S.energy * 3})`;
          const txt = S.energy >= 0.98 ? "Let go" : S.holding ? "Keep holding" : "Hold to begin";
          if (txt !== lastLabel) {
            lastLabel = txt;
            label.textContent = txt;
          }
        } else {
          S.tx += (S.ttx - S.tx) * 0.1;
          S.ty += (S.tty - S.ty) * 0.1;
          acc += dt;
          let steps = 0;
          while (acc >= 1000 / 60 && steps < 3) {
            Engine.update(engine, 1000 / 60);
            acc -= 1000 / 60;
            steps++;
          }
          draw();
        }

        const amp = (S.holding ? S.energy * S.energy * 12 : 0) + S.shake;
        stage.style.transform =
          amp > 0.2
            ? `translate(${(Math.random() - 0.5) * amp}px,${(Math.random() - 0.5) * amp}px)`
            : "none";
        S.shake *= 0.86;
      }

      /* ---------- input ---------- */
      async function requestMotion() {
        if (S.motionAsked) return;
        S.motionAsked = true;
        try {
          const D = window.DeviceOrientationEvent;
          if (D && typeof D.requestPermission === "function") {
            const r = await D.requestPermission();
            if (r !== "granted") return;
          }
          window.addEventListener("deviceorientation", onOrient);
          S.motionOn = true;
        } catch {
          S.motionAsked = false; // retry on release (still inside the gesture)
        }
      }

      function onOrient(e) {
        if (e.gamma == null || e.beta == null) return;
        S.gotOrient = true;
        const o = (screen.orientation && screen.orientation.angle) || 0;
        let g = e.gamma, b = e.beta;
        if (o === 90) { g = e.beta; b = -e.gamma; }
        else if (o === 270) { g = -e.beta; b = e.gamma; }
        S.ttx = clamp(g / 35, -1, 1);
        S.tty = clamp((b - 40) / 35, -1, 1);
        S.tgx = clamp(g / 40, -1, 1) * 0.9;
      }

      function onMove(e) {
        if (e.pointerType === "touch" || S.gotOrient) return;
        S.ttx = (e.clientX / S.w - 0.5) * 2;
        S.tty = (e.clientY / S.h - 0.5) * 2;
      }

      function down(e) {
        if (S.phase !== "idle") return;
        S.holding = true;
        S.holdStart = performance.now() - S.energy * HOLD_MS;
        try { overlay.setPointerCapture(e.pointerId); } catch {}
        requestMotion();
      }

      function up() {
        if (!S.holding) return;
        S.holding = false;
        requestMotion(); // no-op unless the first attempt failed
        if (S.energy >= MIN_ENERGY) ignite(S.energy);
      }

      function ignite(energy) {
        S.phase = "live";
        S.igniteAt = performance.now();
        build(true, energy);

        overlay.style.pointerEvents = "none";
        overlay.style.opacity = "0";
        orb.style.transition = "transform .5s ease-out, opacity .5s";
        orb.style.transform = "translate(-50%,-50%) scale(18)";
        orb.style.opacity = "0";

        flash.style.transition = "none";
        flash.style.opacity = "1";
        void flash.offsetWidth;
        flash.style.transition = "opacity 1s ease-out";
        flash.style.opacity = "0";

        S.shake = 16;
        buzz([60, 40, 120]);
        setTimeout(() => {
          info.style.visibility = "visible";
          info.style.opacity = "1";
        }, 2800);
        setTimeout(() => (hint.style.opacity = "1"), 3800);
        setTimeout(hideHint, 30000);
      }

      function hideHint() {
        hint.style.opacity = "0";
      }

      let rt;
      function resize() {
        S.w = window.innerWidth;
        S.h = window.innerHeight;
        S.dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = S.w * S.dpr;
        canvas.height = S.h * S.dpr;
        canvas.style.width = S.w + "px";
        canvas.style.height = S.h + "px";
        if (S.phase === "live") {
          S.igniteAt = performance.now() - 5000;
          build(false);
        }
      }
      const onResize = () => {
        clearTimeout(rt);
        rt = setTimeout(resize, 200);
      };

      resize();
      overlay.addEventListener("pointerdown", down);
      overlay.addEventListener("pointerup", up);
      overlay.addEventListener("pointercancel", up);
      window.addEventListener("pointermove", onMove);
      window.addEventListener("resize", onResize);
      raf = requestAnimationFrame(frame);

      return () => {
        cancelAnimationFrame(raf);
        clearTimeout(rt);
        overlay.removeEventListener("pointerdown", down);
        overlay.removeEventListener("pointerup", up);
        overlay.removeEventListener("pointercancel", up);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("deviceorientation", onOrient);
        if (engine) Engine.clear(engine);
      };
    }

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <main
      aria-label="XENESIS 4.0"
      style={{
        position: "fixed",
        inset: 0,
        background: "#000",
        overflow: "hidden",
        touchAction: "none",
        userSelect: "none",
        WebkitUserSelect: "none",
        WebkitTouchCallout: "none",
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      <style>{`
        html,body{margin:0;height:100%;background:#000;overflow:hidden;overscroll-behavior:none}
        @keyframes xen-breathe{0%,100%{transform:scale(1);opacity:.8}50%{transform:scale(1.14);opacity:1}}
        @media (prefers-reduced-motion:reduce){.xen-orb-core{animation:none!important}}
      `}</style>

      <h1
        style={{
          position: "absolute", width: 1, height: 1, overflow: "hidden",
          clip: "rect(0 0 0 0)", whiteSpace: "nowrap", margin: -1,
        }}
      >
        XENESIS 4.0, coming soon. {FEST.organiser}, {FEST.college}
      </h1>

      <div ref={stageRef} style={{ position: "absolute", inset: 0, willChange: "transform" }}>
        <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, touchAction: "none" }} />

        {/* Hold-to-ignite layer */}
        <div
          ref={overlayRef}
          style={{ position: "absolute", inset: 0, transition: "opacity .4s", touchAction: "none", cursor: "pointer" }}
        >
          <div
            ref={orbRef}
            style={{
              position: "absolute",
              left: "50%",
              top: "46%",
              width: 92,
              height: 92,
              transform: "translate(-50%,-50%)",
              willChange: "transform",
            }}
          >
            <div
              className="xen-orb-core"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, #fff 0%, #d6e8ff 22%, rgba(120,170,255,.55) 48%, rgba(60,90,255,0) 72%)",
                boxShadow: "0 0 70px 18px rgba(120,170,255,.35)",
                animation: "xen-breathe 2.6s ease-in-out infinite",
              }}
            />
          </div>
          <div
            ref={labelRef}
            className={font.className}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: "66%",
              textAlign: "center",
              color: "#9aa4b2",
              fontSize: 14,
              letterSpacing: "0.32em",
              textTransform: "none",
            }}
          >
            Hold to begin
          </div>
        </div>

        {/* Coming soon details + WhatsApp + hint (fades in after the crash) */}
        <div
          ref={infoRef}
          style={{
            position: "absolute",
            top: "max(20px, env(safe-area-inset-top))",
            left: 0,
            right: 0,
            padding: "0 16px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            textAlign: "center",
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 1.2s",
            pointerEvents: "none",
          }}
        >
          <div style={{ display: "flex", gap: "clamp(18px, 5vw, 44px)", justifyContent: "center" }}>
            {FEST.details.map((d) => (
              <div key={d.label}>
                <div style={{ fontFamily: "system-ui, sans-serif", fontSize: 12, color: "#6b7480", marginBottom: 4 }}>
                  {d.label}
                </div>
                <div
                  className={font.className}
                  style={{ fontSize: "clamp(12px, 2vw, 16px)", color: "#c3cad4", letterSpacing: "0.1em" }}
                >
                  {d.value}
                </div>
              </div>
            ))}
          </div>
          <a
            href={FEST.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: "auto",
              touchAction: "manipulation",
              padding: "10px 20px",
              borderRadius: 999,
              border: "1px solid rgba(154,184,255,.5)",
              background: "rgba(120,170,255,.08)",
              color: "#dfe8ff",
              fontFamily: "system-ui, sans-serif",
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Join our WhatsApp channel
          </a>
          <div
            ref={hintRef}
            style={{
              color: "#7d8794",
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
              letterSpacing: "0.06em",
              opacity: 0,
              transition: "opacity .8s",
            }}
          >
            Flick the letters. Tilt your phone.
          </div>
        </div>
      </div>

      <div
        ref={flashRef}
        style={{ position: "absolute", inset: 0, background: "#fff", opacity: 0, pointerEvents: "none" }}
      />

      <footer
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "clamp(84px, 14vh, 150px)",
          paddingBottom: "env(safe-area-inset-bottom)",
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          textAlign: "center",
          padding: "0 20px",
          color: "#8b94a1",
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "clamp(11px, 1.6vw, 15px)",
          lineHeight: 1.45,
          pointerEvents: "none",
        }}
      >
        <span style={{ color: "#5f6772" }}>Organized by</span>
        <span style={{ color: "#c3cad4" }}>{FEST.organiser}</span>
        <span>{FEST.college}</span>
      </footer>
    </main>
  );
}
