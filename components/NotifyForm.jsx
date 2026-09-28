"use client";
import { useState } from "react";

export default function NotifyForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle"); // idle | busy | done | error

  async function submit(e) {
    e.preventDefault();
    setState("busy");
    try {
      const r = await fetch("/api/notify", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }),
      });
      setState(r.ok ? "done" : "error");
    } catch { setState("error"); }
  }

  if (state === "done") return <p className="text-cyan-x">You're on the list. We'll email you at launch.</p>;
  return (
    <form onSubmit={submit} className="w-full max-w-md">
      <div className="flex gap-2">
        <input
          type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address" aria-label="Email address"
          className="min-w-0 flex-1 rounded-lg border border-cyan-x/30 bg-black/60 px-4 py-3 outline-none backdrop-blur focus:border-cyan-x"
        />
        <button disabled={state === "busy"} className="rounded-lg bg-cyan-x px-5 py-3 font-semibold text-black transition hover:bg-violet-x hover:text-white disabled:opacity-60">
          {state === "busy" ? "Saving" : "Notify me"}
        </button>
      </div>
      {state === "error" && <p className="mt-2 text-sm text-red-400">Couldn't save your email. Check the address and try again.</p>}
    </form>
  );
}
