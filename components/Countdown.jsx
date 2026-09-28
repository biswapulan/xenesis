"use client";
import { useEffect, useState } from "react";
import { FEST } from "@/lib/config";

function parts(ms) {
  const t = Math.max(0, Math.floor(ms / 1000));
  return [
    ["days", Math.floor(t / 86400)],
    ["hours", Math.floor(t / 3600) % 24],
    ["min", Math.floor(t / 60) % 60],
    ["sec", t % 60],
  ];
}

export default function Countdown() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const target = new Date(FEST.launchDate).getTime();
    const tick = () => setLeft(target - Date.now());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  if (left === null) return <div className="h-20" />;
  return (
    <div className="flex gap-3 sm:gap-6" role="timer" aria-label="Time until launch">
      {parts(left).map(([label, v]) => (
        <div key={label} className="w-16 sm:w-24">
          <div className="glow font-[family-name:var(--font-display)] text-3xl tabular-nums text-cyan-x sm:text-5xl">
            {String(v).padStart(2, "0")}
          </div>
          <div className="text-xs text-cyan-100/60">{label}</div>
        </div>
      ))}
    </div>
  );
}
