"use client";

import { useEffect, useRef, useState } from "react";
import { trackEvent } from "@/lib/trackEvent";

const targetWord = "sat";
const letters = ["s", "a", "t"];

export function PhaserBuildSatGame({ sessionId = "s01" }: { sessionId?: string }) {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<any>(null);
  const [built, setBuilt] = useState("");
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    let destroyed = false;

    async function start() {
      if (!hostRef.current || gameRef.current) return;

      const Phaser = await import("phaser");
      if (destroyed || !hostRef.current) return;

      class BuildSatScene extends Phaser.Scene {
        constructor() {
          super("BuildSatScene");
        }

        create() {
          const width = this.scale.width;
          const height = this.scale.height;

          this.add.rectangle(width / 2, height / 2, width, height, 0xfff4d6);
          this.add.text(width / 2, 52, "Build: sat", {
            fontSize: "34px",
            color: "#1B4F8A",
            fontStyle: "bold",
            fontFamily: "Arial"
          }).setOrigin(0.5);

          this.add.text(width / 2, 95, "Tap the bubbles in order: s → a → t", {
            fontSize: "18px",
            color: "#1B4F8A",
            fontFamily: "Arial"
          }).setOrigin(0.5);

          const slots = [
            [width * 0.34, height * 0.28],
            [width * 0.5, height * 0.28],
            [width * 0.66, height * 0.28]
          ];

          slots.forEach(([x, y], index) => {
            const slot = this.add.circle(x, y, 48, 0xffffff, 0.75);
            slot.setStrokeStyle(4, 0x5da636);
            this.add.text(x, y, String(index + 1), {
              fontSize: "22px",
              color: "#1B4F8A",
              fontStyle: "bold",
              fontFamily: "Arial"
            }).setOrigin(0.5);
          });

          const positions = [
            [width * 0.28, height * 0.62],
            [width * 0.5, height * 0.62],
            [width * 0.72, height * 0.62]
          ];

          letters.forEach((letter, index) => {
            const [x, y] = positions[index];
            const bubble = this.add.circle(x, y, 64, 0xe8f4fb, 0.95);
            bubble.setStrokeStyle(7, 0xf5b800);
            bubble.setInteractive({ useHandCursor: true });

            const label = this.add.text(x, y, letter, {
              fontSize: "48px",
              color: "#1B4F8A",
              fontStyle: "bold",
              fontFamily: "Arial"
            }).setOrigin(0.5);

            bubble.on("pointerdown", () => {
              setBuilt((current) => {
                const expected = targetWord[current.length];
                if (letter === expected) {
                  const next = current + letter;

                  const [slotX, slotY] = slots[next.length - 1];
                  this.tweens.add({
                    targets: [bubble, label],
                    x: slotX,
                    y: slotY,
                    duration: 240,
                    ease: "Back.easeOut",
                    onComplete: () => {
                      bubble.disableInteractive();
                    }
                  });

                  trackEvent({
                    sessionId,
                    activityType: "game",
                    eventName: "correct",
                    roundId: "build-sat",
                    value: letter,
                    metadata: { gameId: "build-sat", targetWord, built: next }
                  });

                  if (next === targetWord) {
                    this.add.text(width / 2, height * 0.82, "sat!", {
                      fontSize: "64px",
                      color: "#1B4F8A",
                      fontStyle: "bold",
                      fontFamily: "Arial"
                    }).setOrigin(0.5);
                    setCompleted(true);
                    trackEvent({
                      sessionId,
                      activityType: "game",
                      eventName: "complete",
                      roundId: "build-sat",
                      value: targetWord,
                      metadata: { gameId: "build-sat" }
                    });
                  }

                  return next;
                }

                this.tweens.add({
                  targets: [bubble, label],
                  x: "+=10",
                  yoyo: true,
                  duration: 80,
                  repeat: 2
                });

                trackEvent({
                  sessionId,
                  activityType: "game",
                  eventName: "incorrect",
                  roundId: "build-sat",
                  value: letter,
                  metadata: { gameId: "build-sat", expected }
                });

                return current;
              });
            });
          });
        }
      }

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: hostRef.current,
        width: 860,
        height: 560,
        backgroundColor: "#FFF4D6",
        scene: BuildSatScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      });

      trackEvent({
        sessionId,
        activityType: "game",
        eventName: "start",
        roundId: "build-sat",
        value: targetWord,
        metadata: { gameId: "build-sat" }
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
  }, [sessionId]);

  return (
    <section className="rounded-[40px] bg-white/78 p-5 shadow-bubble">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-hbe-green">
            Build SAT
          </p>
          <h2 className="text-2xl font-black text-hbe-navy">Tap s → a → t</h2>
        </div>
        <div className="rounded-full bg-hbe-cream px-4 py-2 font-black text-hbe-navy">
          Built: {built || "—"}
        </div>
      </div>

      <div ref={hostRef} className="overflow-hidden rounded-[32px] bg-hbe-cream" />

      {completed ? (
        <div className="mt-5 rounded-[28px] bg-hbe-gold/50 p-5 text-center">
          <p className="text-3xl font-black text-hbe-navy">Build SAT Complete!</p>
        </div>
      ) : null}
    </section>
  );
}
