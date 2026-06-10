"use client";

import { useEffect, useRef, useState } from "react";
import type { BubbleGameSession, SoundMatchRound } from "@/game/data/bubbleGameSessions";
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

export function PhaserSoundMatchGame({ gameSession }: { gameSession: BubbleGameSession }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const gameRef = useRef<import("phaser").Game | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let destroyed = false;

    async function boot() {
      if (!containerRef.current || gameRef.current) return;

      const Phaser = (await import("phaser")).default as unknown as PhaserModule;
      if (destroyed || !containerRef.current) return;

      class SoundMatchScene extends Phaser.Scene {
        private roundIndex = 0;
        private mistakes = 0;
        private feedbackText?: Phaser.GameObjects.Text;
        private progressText?: Phaser.GameObjects.Text;
        private titleText?: Phaser.GameObjects.Text;
        private listenButton?: Phaser.GameObjects.Container;
        private choiceButtons: Phaser.GameObjects.Container[] = [];
        private started = false;

        constructor() {
          super("SoundMatchScene");
        }

        create() {
          this.cameras.main.setBackgroundColor("#FBF8EF");
          this.createBackground();
          this.showReady();
        }

        private createBackground() {
          const { width, height } = this.scale;

          this.add.circle(width * 0.16, height * 0.18, 110, 0xe8f4fb, 0.9);
          this.add.circle(width * 0.86, height * 0.16, 130, 0xefe6fa, 0.85);
          this.add.circle(width * 0.78, height * 0.86, 150, 0xfff4d6, 0.9);
          this.add.circle(width * 0.12, height * 0.86, 95, 0xfde7e0, 0.8);
        }

        private clearSceneObjects() {
          this.children.removeAll();
          this.createBackground();
          this.choiceButtons = [];
        }

        private showReady() {
          this.clearSceneObjects();
          const { width, height } = this.scale;

          this.add.text(width / 2, height * 0.18, "Session 1", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#5DA636",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.32, gameSession.title, {
            fontFamily: "Arial",
            fontSize: "64px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.43, "Listen and pop!", {
            fontFamily: "Arial",
            fontSize: "30px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.51, "소리를 듣고 버블을 톡!", {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.72);

          const startButton = this.createPillButton(width / 2, height * 0.68, "Start", 220, 82, 0x5da636, "#FFFFFF", () => {
            this.started = true;
            this.roundIndex = 0;
            this.mistakes = 0;
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "game_start",
              activityType: "game"
            });
            this.showRound();
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

        private get currentRound(): SoundMatchRound {
          return gameSession.rounds[this.roundIndex];
        }

        private showRound() {
          this.clearSceneObjects();
          const { width, height } = this.scale;
          const round = this.currentRound;

          this.add.text(width * 0.08, height * 0.09, "Happy Bubble Game", {
            fontFamily: "Arial",
            fontSize: "18px",
            color: "#5DA636",
            fontStyle: "bold"
          });

          this.titleText = this.add.text(width * 0.08, height * 0.15, gameSession.title, {
            fontFamily: "Arial",
            fontSize: "34px",
            color: "#1B4F8A",
            fontStyle: "bold"
          });

          this.progressText = this.add.text(width * 0.92, height * 0.11, `${this.roundIndex + 1} / ${gameSession.rounds.length}`, {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold",
            backgroundColor: "#E8F4FB",
            padding: { x: 16, y: 10 }
          }).setOrigin(1, 0.5);

          this.listenButton = this.createPillButton(width / 2, height * 0.32, "Listen", 240, 78, 0x1b4f8a, "#FFFFFF", () => {
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "listen_click",
              activityType: "game",
              roundId: round.id,
              value: round.audioText
            });
            speak(round.audioText);
          });

          this.add.text(width / 2, height * 0.41, "다시 듣고 싶으면 Listen을 눌러요.", {
            fontFamily: "Arial",
            fontSize: "16px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.62);

          this.feedbackText = this.add.text(width / 2, height * 0.86, "", {
            fontFamily: "Arial",
            fontSize: "34px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.createChoices(round);

          this.time.delayedCall(220, () => speak(round.audioText));
        }

        private createChoices(round: SoundMatchRound) {
          const { width, height } = this.scale;
          const count = round.choices.length;
          const spacing = count === 2 ? 190 : 155;
          const startX = width / 2 - ((count - 1) * spacing) / 2;
          const y = height * 0.62;

          round.choices.forEach((choice, index) => {
            const x = startX + index * spacing;
            const button = this.createBubbleButton(x, y, choice, () => {
              this.handleChoice(choice, button);
            });
            this.choiceButtons.push(button);
          });
        }

        private handleChoice(choice: string, button: Phaser.GameObjects.Container) {
          const round = this.currentRound;
          const isCorrect = choice === round.correctAnswer;

          this.choiceButtons.forEach((item) => item.disableInteractive());

          trackEvent({
            sessionId: gameSession.sessionId,
            eventName: "choice_tap",
            activityType: "game",
            roundId: round.id,
            value: choice,
            isCorrect
          });

          if (isCorrect) {
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "round_correct",
              activityType: "game",
              roundId: round.id,
              value: choice,
              isCorrect: true
            });

            this.feedbackText?.setText("Pop! ★").setColor("#5DA636");
            this.tweens.add({
              targets: button,
              scaleX: 1.18,
              scaleY: 1.18,
              duration: 180,
              yoyo: true,
              repeat: 1
            });

            this.time.delayedCall(760, () => {
              if (this.roundIndex === gameSession.rounds.length - 1) {
                trackEvent({
                  sessionId: gameSession.sessionId,
                  eventName: "game_complete",
                  activityType: "game",
                  metadata: { mistakes: this.mistakes }
                });
                this.showComplete();
              } else {
                this.roundIndex += 1;
                this.showRound();
              }
            });
          } else {
            this.mistakes += 1;
            trackEvent({
              sessionId: gameSession.sessionId,
              eventName: "round_wrong",
              activityType: "game",
              roundId: round.id,
              value: choice,
              isCorrect: false
            });

            this.feedbackText?.setText("Again. 다시 들어볼까?").setColor("#1B4F8A");
            this.tweens.add({
              targets: this.listenButton,
              scaleX: 1.08,
              scaleY: 1.08,
              duration: 240,
              yoyo: true,
              repeat: 2
            });

            this.time.delayedCall(760, () => {
              this.feedbackText?.setText("");
              this.choiceButtons.forEach((item) => item.setInteractive({ useHandCursor: true }));
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

          this.add.text(width / 2, height * 0.44, "You did it!", {
            fontFamily: "Arial",
            fontSize: "54px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5);

          this.add.text(width / 2, height * 0.53, "Great job! S, A, T 버블을 모두 만났어요.", {
            fontFamily: "Arial",
            fontSize: "20px",
            color: "#1B4F8A",
            fontStyle: "bold"
          }).setOrigin(0.5).setAlpha(0.75);

          this.add.text(width / 2, height * 0.60, `Mistakes: ${this.mistakes}`, {
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
            window.location.href = "/sessions/s01";
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
            fontSize: "26px",
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
          const radius = label.length > 1 ? 78 : 68;
          const bubble = this.add.circle(0, 0, radius, 0xe8f4fb, 1);
          bubble.setStrokeStyle(5, 0xffffff, 0.88);
          const shine = this.add.circle(-radius * 0.35, -radius * 0.35, radius * 0.22, 0xffffff, 0.38);
          const text = this.add.text(0, 0, label, {
            fontFamily: "Arial",
            fontSize: label.length > 1 ? "36px" : "46px",
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
            duration: 1500 + Math.random() * 600,
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
        scene: SoundMatchScene,
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
          Bubble Game을 준비하고 있어요.
        </div>
      ) : null}
      <div
        ref={containerRef}
        className="min-h-[420px] overflow-hidden rounded-[30px] bg-hbe-bg"
        aria-label="S1 Phaser Sound Match Game"
      />
      <p className="mt-4 text-center text-sm font-bold text-hbe-navy/60">
        모바일에서는 화면을 세로로 잡고 버블을 터치해 주세요.
      </p>
    </section>
  );
}
