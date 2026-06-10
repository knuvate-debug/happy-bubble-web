"use client";

import { useEffect, useRef, useState } from "react";
import type { BubbleGameSession, BuildWordTarget } from "@/game/data/bubbleGameSessions";
import { trackEvent } from "@/lib/trackEvent";

type PhaserModule = typeof import("phaser");

function speak(text: string) {
  if (typeof window === "undefined") return;

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = 0.62;
  utterance.pitch = 1;
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(utterance);
}

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5);
}

export function PhaserBuildWordGame({ gameSession }: { gameSession: BubbleGameSession }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<import("phaser").Game | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let destroyed = false;

    async function boot() {
      if (!containerRef.current || gameRef.current) return;

      const Phaser = (await import("phaser")).default as unknown as PhaserModule;
      if (destroyed || !containerRef.current) return;

      const targets = gameSession.buildTargets ?? [];

      class BuildWordScene extends Phaser.Scene {
        private targetIndex = 0;
        private currentLetters: string[] = [];
        private slotTexts: Phaser.GameObjects.Text[] = [];
        private letterButtons: Phaser.GameObjects.Container[] = [];
        private feedbackText?: Phaser.GameObjects.Text;
        private mistakes = 0;

        constructor() {
          super("BuildWordScene");
        }

        create() {
          this.cameras.main.setBackgroundColor("#FBF8EF");
          this.createBackground();
          this.showReady();
        }

        private createBackground() {
          const { width, height } = this.scale;
          this.add.circle(width * 0.18, height * 0.16, 120, 0xe8f4fb, 0.9);
          this.add.circle(width * 0.86, height * 0.20, 130, 0xefe6fa, 0.85);
          this.add.circle(width * 0.80, height * 0.86, 145, 0xfff4d6, 0.9);
          this.add.circle(width * 0.12, height * 0.82, 90, 0xfde7e0, 0.75);
        }

        private clearSceneObjects() {
          this.children.removeAll();
          this.createBackground();
          this.slotTexts = [];
          this.letterButtons = [];
        }

        private get currentTarget(): BuildWordTarget {
          return targets[this.targetIndex];
        }

        private showReady() {
          this.clearSceneObjects();
          const { width, height } = this.scale;

          this.add.text(width / 2, height * 0.16, `Session ${gameSession.number}`, {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#5DA636",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.30, gameSession.title, {
            fontFamily: "Arial",
            fontSize: "58px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.42, "Build the word!", {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.51, "글자 버블을 눌러 단어를 만들어요.", {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.72);

          const startButton = this.createPillButton(width / 2, height * 0.68, "Start", 220, 82, 0x5da636, "#FFFFFF", () => {
            this.targetIndex = 0;
            this.mistakes = 0;
            this.currentLetters = [];
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "game_start",
              activityType: "game",
              metadata: { template: "BUILD_WORD" }
            });
            this.showTarget();
          });

          this.tweens.add({
            targets: startButton,
            scaleX: 1.04,
            scaleY: 1.04,
            duration: 900,
            yoyo: true,
            repeat: -1
          });
        }

        private showTarget() {
          this.clearSceneObjects();
          this.currentLetters = [];
          const { width, height } = this.scale;
          const target = this.currentTarget;

          this.add.text(width * 0.08, height * 0.09, "Happy Bubble Game", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#5DA636",
            fontStyle: "bold"
          });

          this.add.text(width * 0.08, height * 0.15, gameSession.title, {
            fontFamily: "Arial",
            fontSize: "34px",
            color: "#1B4F8A",
            fontStyle: "bold"
          });

          this.add.text(width * 0.92, height * 0.11, `${this.targetIndex + 1} / ${targets.length}`, {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold",
            backgroundColor: "#E8F4FB",
            padding: { x: 16, y: 10 }
          }).setOrigin(1, 0.5);

          this.createPillButton(width / 2, height * 0.28, "Listen", 240, 72, 0x1b4f8a, "#FFFFFF", () => {
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "listen_click",
              activityType: "game",
              roundId: target.id,
              value: target.word
            });
            speak(target.word);
          });

          this.add.text(width / 2, height * 0.37, "듣고, 글자 버블을 순서대로 눌러요.", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.62);

          this.createSlots(target);
          this.createLetters(target);

          this.feedbackText = this.add.text(width / 2, height * 0.88, "", {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.createPillButton(width * 0.18, height * 0.88, "Clear", 130, 54, 0xffffff, "#1B4F8A", () => {
            this.currentLetters = [];
            this.updateSlots();
            this.feedbackText?.setText("");
          });

          this.time.delayedCall(220, () => speak(target.word));
        }

        private createSlots(target: BuildWordTarget) {
          const { width, height } = this.scale;
          const slotSize = 82;
          const spacing = 96;
          const startX = width / 2 - ((target.letters.length - 1) * spacing) / 2;
          const y = height * 0.50;

          target.letters.forEach((_, index) => {
            const x = startX + index * spacing;
            const rect = this.add.rectangle(x, y, slotSize, slotSize, 0xffffff, 0.88);
            rect.setStrokeStyle(4, 0x1b4f8a, 0.22);
            const text = this.add.text(x, y, "", {
              fontFamily: "Arial",
              fontSize: "42px",
              color: "#1B4F8A",
              fontStyle: "bold"
            }).setOrigin(0.5);
            this.slotTexts.push(text);
          });
        }

        private createLetters(target: BuildWordTarget) {
          const { width, height } = this.scale;
          const letters = shuffle(target.letters);
          const spacing = 145;
          const startX = width / 2 - ((letters.length - 1) * spacing) / 2;
          const y = height * 0.70;

          letters.forEach((letter, index) => {
            const button = this.createBubbleButton(startX + index * spacing, y, letter, () => {
              this.tapLetter(letter, button);
            });
            this.letterButtons.push(button);
          });
        }

        private tapLetter(letter: string, button: Phaser.GameObjects.Container) {
          const target = this.currentTarget;
          if (this.currentLetters.length >= target.letters.length) return;

          this.currentLetters.push(letter);
          this.updateSlots();

          trackEvent({
            sessionId: gameSession.sessionId,
            eventName: "choice_tap",
            activityType: "game",
            roundId: target.id,
            value: letter,
            metadata: { template: "BUILD_WORD", action: "letter_tap" }
          });

          this.tweens.add({
            targets: button,
            scaleX: 0.94,
            scaleY: 0.94,
            duration: 80,
            yoyo: true
          });

          if (this.currentLetters.length === target.letters.length) {
            this.checkWord();
          }
        }

        private updateSlots() {
          this.slotTexts.forEach((text, index) => {
            text.setText(this.currentLetters[index] ?? "");
          });
        }

        private checkWord() {
          const target = this.currentTarget;
          const built = this.currentLetters.join("");
          const correct = built === target.word;

          if (correct) {
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "round_correct",
              activityType: "game",
              roundId: target.id,
              value: built,
              isCorrect: true
            });

            this.feedbackText?.setText("Pop! " + target.word).setColor("#5DA636");

            this.time.delayedCall(780, () => {
              if (this.targetIndex === targets.length - 1) {
                trackEvent({
                  sessionId: gameSession.sessionId,
                  eventName: "game_complete",
                  activityType: "game",
                  metadata: { mistakes: this.mistakes, template: "BUILD_WORD" }
                });
                this.showComplete();
              } else {
                this.targetIndex += 1;
                this.showTarget();
              }
            });
          } else {
            this.mistakes += 1;
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "round_wrong",
              activityType: "game",
              roundId: target.id,
              value: built,
              isCorrect: false
            });

            this.feedbackText?.setText("Again. 다시 만들어볼까?").setColor("#1B4F8A");

            this.time.delayedCall(800, () => {
              this.currentLetters = [];
              this.updateSlots();
              this.feedbackText?.setText("");
            });
          }
        }

        private showComplete() {
          this.clearSceneObjects();
          const { width, height } = this.scale;

          this.add.circle(width / 2, height * 0.26, 70, 0xf5b800, 1);
          this.add.text(width / 2, height * 0.26, "★", {
            fontFamily: "Arial",
            fontSize: "58px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.44, "You built it!", {
            fontFamily: "Arial",
            fontSize: "52px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.54, "글자 버블로 단어를 만들었어요.", {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.72);

          this.add.text(width / 2, height * 0.61, `Mistakes: ${this.mistakes}`, {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.55);

          this.createPillButton(width / 2 - 130, height * 0.75, "Again", 180, 64, 0x5da636, "#FFFFFF", () => {
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "restart",
              activityType: "game"
            });
            this.showReady();
          });

          this.createPillButton(width / 2 + 130, height * 0.75, "Session", 180, 64, 0xffffff, "#1B4F8A", () => {
            window.location.href = `/sessions/${gameSession.sessionId}`;
          });
        }

        private createPillButton(
          x: number,
          y: number,
          label: string,
          width: number,
          height: number,
          fill: number,
          color: string,
          onClick: () => void
        ) {
          const container = this.add.container(x, y);
          const bg = this.add.rectangle(0, 0, width, height, fill);
          bg.setStrokeStyle(3, 0xffffff, 0.45);
          const text = this.add.text(0, 0, label, {
            fontFamily: "Arial",
            fontSize: "24px",
            color,
            fontStyle: "bold"
          }).setOrigin(0.5);

          container.add([bg, text]);
          container.setSize(width, height);
          container.setInteractive({ useHandCursor: true });
          container.on("pointerdown", onClick);
          container.on("pointerover", () => container.setScale(1.04));
          container.on("pointerout", () => container.setScale(1));
          return container;
        }

        private createBubbleButton(x: number, y: number, label: string, onClick: () => void) {
          const container = this.add.container(x, y);
          const radius = 66;
          const bubble = this.add.circle(0, 0, radius, 0xe8f4fb, 1);
          bubble.setStrokeStyle(5, 0xffffff, 0.88);
          const shine = this.add.circle(-radius * 0.35, -radius * 0.35, radius * 0.22, 0xffffff, 0.38);
          const text = this.add.text(0, 0, label, {
            fontFamily: "Arial",
            fontSize: "46px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          container.add([bubble, shine, text]);
          container.setSize(radius * 2, radius * 2);
          container.setInteractive({ useHandCursor: true });
          container.on("pointerdown", onClick);
          container.on("pointerover", () => container.setScale(1.06));
          container.on("pointerout", () => container.setScale(1));

          this.tweens.add({
            targets: container,
            y: y - 8,
            duration: 1400 + Math.random() * 500,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
          });

          return container;
        }
      }

      const config: import("phaser").Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: 900,
        height: 620,
        backgroundColor: "#FBF8EF",
        scene: BuildWordScene,
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };

      gameRef.current = new Phaser.Game(config);
      setIsReady(true);
    }

    boot();

    return () => {
      destroyed = true;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [gameSession]);

  return (
    <section className="hbe-card rounded-[40px] p-4 sm:p-6">
      {!isReady ? (
        <div className="flex min-h-[420px] items-center justify-center text-xl font-black text-hbe-navy">
          Build Word Game을 준비하고 있어요.
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="min-h-[420px] overflow-hidden rounded-[30px] bg-hbe-bg"
        aria-label="Phaser Build Word Game"
      />
      <p className="mt-4 text-center text-sm font-bold text-hbe-navy/60">
        내부 preview: /game/s02?preview=true 로 테스트할 수 있습니다.
      </p>
    </section>
  );
}
