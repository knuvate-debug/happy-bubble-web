"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Round = {
  id: string;
  audioText: string;
  correctAnswer: string;
  choices: string[];
};

const rounds: Round[] = [
  { id: "r1", audioText: "s", correctAnswer: "s", choices: ["s", "a", "t"] },
  { id: "r2", audioText: "a", correctAnswer: "a", choices: ["s", "a", "t"] },
  { id: "r3", audioText: "t", correctAnswer: "t", choices: ["s", "a", "t"] },
  { id: "r4", audioText: "sat", correctAnswer: "sat", choices: ["sat", "at"] },
  { id: "r5", audioText: "at", correctAnswer: "at", choices: ["sat", "at"] }
];

function speak(text: string) {
  if (typeof window === "undefined") return;
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.62;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

export function S1SoundMatchGame() {
  const [started, setStarted] = useState(false);
  const [roundIndex, setRoundIndex] = useState(0);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">("idle");
  const [complete, setComplete] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const round = rounds[roundIndex];
  const progress = useMemo(() => `${Math.min(roundIndex + 1, rounds.length)} / ${rounds.length}`, [roundIndex]);

  function start() {
    setStarted(true);
    setComplete(false);
    setRoundIndex(0);
    setMistakes(0);
    setFeedback("idle");
    speak(rounds[0].audioText);
  }

  function listen() {
    if (!round) return;
    speak(round.audioText);
  }

  function choose(choice: string) {
    if (!round || feedback !== "idle") return;

    if (choice === round.correctAnswer) {
      setFeedback("correct");
      window.setTimeout(() => {
        if (roundIndex === rounds.length - 1) {
          setComplete(true);
          setFeedback("idle");
        } else {
          setRoundIndex((value) => value + 1);
          setFeedback("idle");
          window.setTimeout(() => speak(rounds[roundIndex + 1].audioText), 120);
        }
      }, 720);
    } else {
      setMistakes((value) => value + 1);
      setFeedback("wrong");
      window.setTimeout(() => setFeedback("idle"), 650);
    }
  }

  if (!started) {
    return (
      <section className="hbe-card overflow-hidden rounded-[40px] p-8 text-center">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">Session 1</p>
        <h1 className="mt-4 text-6xl font-black text-hbe-navy">S, A, T</h1>
        <p className="mt-4 text-2xl font-black text-hbe-navy/75">Listen and pop!</p>
        <p className="mt-2 font-bold text-hbe-navy/60">소리를 듣고 버블을 톡!</p>
        <button
          onClick={start}
          className="hbe-focus mt-8 rounded-full bg-hbe-green px-10 py-5 text-2xl font-black text-white shadow-bubble transition hover:-translate-y-1"
        >
          Start
        </button>
      </section>
    );
  }

  if (complete) {
    return (
      <section className="hbe-card rounded-[40px] p-8 text-center">
        <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-hbe-gold text-5xl shadow-bubble">
          ★
        </div>
        <h1 className="mt-6 text-5xl font-black text-hbe-navy">You did it!</h1>
        <p className="mt-3 text-xl font-bold text-hbe-navy/70">Great job! S, A, T 버블을 모두 만났어요.</p>
        <p className="mt-2 text-sm font-bold text-hbe-navy/55">Mistakes: {mistakes}</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            onClick={start}
            className="hbe-focus rounded-full bg-hbe-green px-7 py-4 font-black text-white shadow-bubble"
          >
            Again
          </button>
          <Link
            href="/sessions/s01"
            className="hbe-focus rounded-full bg-white px-7 py-4 text-center font-black text-hbe-navy shadow-bubble"
          >
            Back to Session
          </Link>
          <Link
            href="/teacher/s01"
            className="hbe-focus rounded-full bg-hbe-cream px-7 py-4 text-center font-black text-hbe-navy shadow-bubble"
          >
            Back to Teacher
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="hbe-card rounded-[40px] p-6 sm:p-8">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-black text-hbe-green">Session 1</p>
          <h1 className="text-3xl font-black text-hbe-navy">Listen and pop!</h1>
        </div>
        <div className="rounded-full bg-hbe-sky px-5 py-3 text-lg font-black text-hbe-navy">
          {progress}
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={listen}
          className={`hbe-focus rounded-full px-10 py-5 text-2xl font-black shadow-bubble transition ${
            feedback === "wrong"
              ? "bg-hbe-gold text-hbe-navy scale-105"
              : "bg-hbe-navy text-white hover:-translate-y-1"
          }`}
        >
          Listen
        </button>
        <p className="mt-3 text-sm font-bold text-hbe-navy/60">다시 듣고 싶으면 Listen을 눌러요.</p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-5">
        {round.choices.map((choice) => (
          <button
            key={choice}
            onClick={() => choose(choice)}
            className={`hbe-focus flex h-28 min-w-28 items-center justify-center rounded-full border-4 text-4xl font-black shadow-bubble transition sm:h-36 sm:min-w-36 ${
              feedback === "correct" && choice === round.correctAnswer
                ? "scale-110 border-hbe-gold bg-hbe-gold text-hbe-navy"
                : feedback === "wrong"
                  ? "border-hbe-lilac bg-hbe-lilac text-hbe-navy"
                  : "border-white bg-hbe-sky text-hbe-navy hover:-translate-y-2 hover:bg-hbe-cream"
            }`}
          >
            {choice}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-14 text-center">
        {feedback === "correct" ? (
          <p className="text-4xl font-black text-hbe-green">Pop! ★</p>
        ) : null}
        {feedback === "wrong" ? (
          <p className="text-3xl font-black text-hbe-navy">Again. 다시 들어볼까?</p>
        ) : null}
      </div>
    </section>
  );
}
