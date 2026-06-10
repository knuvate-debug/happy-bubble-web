"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { ClassroomDeck as ClassroomDeckType } from "@/lib/classroomSlides";
import { trackClassroomEvent } from "@/lib/classroomTracking";
import { ClassroomControls } from "./ClassroomControls";
import { ClassroomSlide } from "./ClassroomSlide";

export function ClassroomDeck({ deck }: { deck: ClassroomDeckType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const deckRef = useRef<HTMLDivElement | null>(null);
  const currentSlide = deck.slides[currentIndex];

  function goPrev() {
    setCurrentIndex((value) => {
      const next = Math.max(0, value - 1);
      if (next !== value) {
        const nextSlide = deck.slides[next];
        trackClassroomEvent({
          sessionId: deck.sessionId,
          eventName: "classroom_prev",
          slideId: nextSlide.id,
          value: nextSlide.title,
          metadata: { source: "student_deck", index: next }
        });
      }
      return next;
    });
  }

  function goNext() {
    setCurrentIndex((value) => {
      const next = Math.min(deck.slides.length - 1, value + 1);
      if (next !== value) {
        const nextSlide = deck.slides[next];
        trackClassroomEvent({
          sessionId: deck.sessionId,
          eventName: "classroom_next",
          slideId: nextSlide.id,
          value: nextSlide.title,
          metadata: { source: "student_deck", index: next }
        });
      }
      return next;
    });
  }

  function completeClassroom() {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_complete",
      slideId: currentSlide.id,
      value: currentSlide.title,
      metadata: {
        source: "student_deck",
        slideCount: deck.slides.length,
        currentIndex
      }
    });
  }

  function goFullscreen() {
    if (!deckRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }
    deckRef.current.requestFullscreen().catch(() => {});
  }

  useEffect(() => {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_open",
      slideId: currentSlide.id,
      value: deck.title,
      metadata: { source: "student_deck", slideCount: deck.slides.length }
    });
  }, [deck.sessionId, deck.slides.length, deck.title]);

  useEffect(() => {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_slide_view",
      slideId: currentSlide.id,
      value: currentSlide.title,
      metadata: { source: "student_deck", index: currentIndex }
    });
  }, [currentIndex, currentSlide.id, currentSlide.title, deck.sessionId]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight" || event.key === " ") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div ref={deckRef} className="min-h-screen bg-hbe-bg p-4 sm:p-6">
      <header className="mb-5 flex flex-col justify-between gap-3 rounded-[32px] bg-white/72 p-4 shadow-bubble sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-hbe-green">
            Classroom Mode
          </p>
          <h1 className="mt-1 text-2xl font-black text-hbe-navy sm:text-3xl">
            {deck.title}
          </h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/classroom/s01/presenter"
            className="hbe-focus rounded-full bg-hbe-green px-4 py-2 text-sm font-black text-white shadow-sm"
            target="_blank"
          >
            Presenter
          </Link>
          <Link
            href="/classroom/s01/overview"
            className="hbe-focus rounded-full bg-hbe-cream px-4 py-2 text-sm font-black text-hbe-navy shadow-sm"
          >
            Overview
          </Link>
          <Link
            href="/teacher/s01"
            className="hbe-focus rounded-full bg-white px-4 py-2 text-sm font-black text-hbe-navy shadow-sm"
          >
            Teacher Board
          </Link>
          <Link
            href="/sessions/s01"
            className="hbe-focus rounded-full bg-hbe-cream px-4 py-2 text-sm font-black text-hbe-navy shadow-sm"
          >
            Today’s Bubble
          </Link>
        </div>
      </header>

      <ClassroomSlide deck={deck} slide={currentSlide} currentIndex={currentIndex} />

      <ClassroomControls
        currentIndex={currentIndex}
        total={deck.slides.length}
        onPrev={goPrev}
        onNext={goNext}
        onFullscreen={goFullscreen}
        onComplete={completeClassroom}
      />
    </div>
  );
}
