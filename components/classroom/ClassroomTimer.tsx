"use client";

import { useEffect, useMemo, useState } from "react";

function formatSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(rest).padStart(2, "0")}`;
}

export function ClassroomTimer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(id);
  }, [running]);

  const formatted = useMemo(() => formatSeconds(seconds), [seconds]);

  return (
    <section className="rounded-[32px] bg-hbe-navy p-5 text-white shadow-bubble">
      <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">Class Timer</p>
      <p className="mt-3 text-5xl font-black">{formatted}</p>
      <div className="mt-5 flex gap-2">
        <button
          onClick={() => setRunning(true)}
          className="hbe-focus rounded-full bg-hbe-green px-4 py-2 text-sm font-black text-white"
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          className="hbe-focus rounded-full bg-white/15 px-4 py-2 text-sm font-black text-white"
        >
          Pause
        </button>
        <button
          onClick={() => {
            setRunning(false);
            setSeconds(0);
          }}
          className="hbe-focus rounded-full bg-white/15 px-4 py-2 text-sm font-black text-white"
        >
          Reset
        </button>
      </div>
    </section>
  );
}
