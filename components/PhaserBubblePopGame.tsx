"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/trackEvent";

type PopRound = {
  id: string;
  target: string;
  options: string[];
};

const rounds: PopRound[] = [
  { id: "pop-s", target: "s", options: ["s", "a", "s", "t", "s"] },
  { id: "pop-a", target: "a", options: ["a", "s", "t", "a", "a"] },
  { id: "pop-t", target: "t", options: ["t", "a", "t", "s", "t"] }
];

function getMessage(correct: number, total: number) {
  if (correct >= total) return "Bubble Complete!";
  return `Pop ${total - correct} more`;
}

export function PhaserBubblePopGame({ sessionId = "s01" }: { sessionId?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<any>(null);
  const [roundIndex, setRoundIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [completed, setCompleted] = useState(false);

  const round = rounds[roundIndex];
  const targetCount = useMemo(
    () => round.options.filter((value) => value === round.target).length,
    [round]
  );

  useEffect(() => {
    let destroyed = false;

    async function start() {
      if (!hostRef.current || gameRef.current) return;

      const Phaser = await import("phaser");
      if (destroyed || !hostRef.current) return;

      class BubblePopScene extends Phaser.Scene {
        constructor() {
          super("BubblePopScene");
        }

        create() {
          const width = this.scale.width;
          const height = this.scale.height;

          this.add.rectangle(width / 2, height / 2, width, height, 0xe8f4fb);
          this.add.text(width / 2, 52, `Find: ${round.target}`, {
            fontSize: "34px",
            color: "#1B4F8A",
            fontStyle: "bold",
            fontFamily: "Arial"
          }).setOrigin(0.5);

          this.add.text(width / 2, 95, "Tap only the matching bubbles", {
            fontSize: "18px",
            color: "#1B4F8A",
            fontFamily: "Arial"
          }).setOrigin(0.5);

          const positions = [
            [width * 0.22, height * 0.34],
            [width * 0.5, height * 0.31],
            [width * 0.78, height * 0.36],
            [width * 0.36, height * 0.62],
            [width * 0.66, height * 0.64]
          ];

          round.options.forEach((value, index) => {
            const [x, y] = positions[index];
            const isTarget = value === round.target;
            const circle = this.add.circle(x, y, 58, isTarget ? 0xfff4d6 : 0xffffff, 0.94);
            circle.setStrokeStyle(6, isTarget ? 0xf5b800 : 0x5da636);
            circle.setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, value, {
              fontSize: "44px",
              color: "#1B4F8A",
              fontStyle: "bold",
              fontFamily: "Arial"
            }).setOrigin(0.5);

            circle.on("pointerdown", () => {
              if (isTarget) {
                this.tweens.add({
                  targets: [circle, label],
                  scale: 1.35,
                  alpha: 0,
                  duration: 220,
                  onComplete: () => {
                    circle.disableInteractive();
                    circle.setVisible(false);
                    label.setVisible(false);
                  }
                });
                setCorrectCount((value) => value + 1);
                trackEvent({
                  sessionId,
                  activityType: "game",
                  eventName: "correct",
                  roundId: round.id,
                  value,
                  metadata: { gameId: "bubble-pop", target: round.target }
                });
              } else {
                this.tweens.add({
                  targets: [circle, label],
                  x: "+=10",
                  yoyo: true,
                  duration: 80,
                  repeat: 2
                });
                trackEvent({
                  sessionId,
                  activityType: "game",
                  eventName: "incorrect",
                  roundId: round.id,
                  value,
                  metadata: { gameId: "bubble-pop", target: round.target }
                });
              }
            });
          });
        }
      }

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        width: 860,
        height: 560,
        backgroundColor: "#E8F4FB",
        scene: BubblePopScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      });

      trackEvent({
        sessionId,
        activityType: "game",
        eventName: "start",
        roundId: round.id,
        value: "bubble-pop",
        metadata: { gameId: "bubble-pop", target: round.target }
      });
    }

    start();

    return () => {
      destroyed = true;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [roundIndex, round.id, round.target, sessionId]);

  useEffect(() => {
    if (correctCount >= targetCount) {
      if (roundIndex < rounds.length - 1) {
        const timer = window.setTimeout(() => {
          setRoundIndex((value) => value + 1);
          setCorrectCount(0);
        }, 650);
        return () => window.clearTimeout(timer);
      }

      if (!completed) {
        setCompleted(true);
        trackEvent({
          sessionId,
          activityType: "game",
          eventName: "complete",
          roundId: round.id,
          value: "bubble-pop",
          metadata: { gameId: "bubble-pop", rounds: rounds.length }
        });
      }
    }
  }, [correctCount, targetCount, roundIndex, completed, round.id, sessionId]);

  return (
    <section className="rounded-[40px] bg-white/78 p-5 shadow-bubble">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            Bubble Pop
          </p>
          <h2 className="text-2xl font-black text-hbe-navy">
            Round {roundIndex + 1} · Target {round.target}
          </h2>
        </div>
        <div className="rounded-full bg-hbe-cream px-4 py-2 font-black text-hbe-navy">
          {getMessage(correctCount, targetCount)}
        </div>
      </div>

      <div ref={hostRef} className="overflow-hidden rounded-[32px] bg-hbe-sky" />

      {completed ? (
        <div className="mt-5 rounded-[28px] bg-hbe-gold/50 p-5 text-center">
          <p className="text-3xl font-black text-hbe-navy">Bubble Pop Complete!</p>
        </div>
      ) : null}
    </section>
  );
}
