"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { ClassroomDeck as ClassroomDeckType } from "@/lib/classroomSlides";
import { trackClassroomEvent } from "@/lib/classroomTracking";
import { ClassroomTimer } from "./ClassroomTimer";
import { PresenterSlideList } from "./PresenterSlideList";
import { SlideActionButton } from "./SlideActionButton";

export function ClassroomPresenter({ deck }: { deck: ClassroomDeckType }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slide = deck.slides[currentIndex];

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
          metadata: { source: "presenter", index: next }
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
          metadata: { source: "presenter", index: next }
        });
      }
      return next;
    });
  }

  function selectSlide(index: number) {
    setCurrentIndex(index);
    const selected = deck.slides[index];
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_slide_view",
      slideId: selected.id,
      value: selected.title,
      metadata: { source: "presenter_select", index }
    });
  }

  function completeClassroom() {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_complete",
      slideId: slide.id,
      value: slide.title,
      metadata: {
        source: "presenter",
        slideCount: deck.slides.length,
        currentIndex
      }
    });
  }

  useEffect(() => {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_presenter_open",
      slideId: slide.id,
      value: deck.title,
      metadata: { source: "presenter", slideCount: deck.slides.length }
    });
  }, [deck.sessionId, deck.slides.length, deck.title]);

  useEffect(() => {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_slide_view",
      slideId: slide.id,
      value: slide.title,
      metadata: { source: "presenter", index: currentIndex }
    });
  }, [currentIndex, deck.sessionId, slide.id, slide.title]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight" || event.key === " ") goNext();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const nextSlide = deck.slides[currentIndex + 1];

  return (
    <main className="hbe-page min-h-screen p-4 sm:p-6">
      <header className="mb-5 flex flex-col justify-between gap-4 rounded-[36px] bg-white/78 p-5 shadow-bubble lg:flex-row lg:items-center">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
            Presenter View
          </p>
          <h1 className="mt-2 text-3xl font-black text-hbe-navy">{deck.title}</h1>
          <p className="mt-1 text-sm font-bold text-hbe-navy/60">
            교사용 진행 화면입니다. 학생에게 보여줄 화면은 Classroom Deck을 사용하세요.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/classroom/s01"
            className="hbe-focus rounded-full bg-hbe-green px-5 py-3 text-sm font-black text-white shadow-sm"
            target="_blank"
          >
            Open Student Deck
          </Link>
          <Link
            href="/classroom/s01/overview"
            className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
          >
            Slide Overview
          </Link>
          <Link
            href="/teacher/s01"
            className="hbe-focus rounded-full bg-white px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
          >
            Teacher Board
          </Link>
        </div>
      </header>

      <section className="grid gap-5 xl:grid-cols-[320px_1fr_340px]">
        <PresenterSlideList deck={deck} currentIndex={currentIndex} onSelect={selectSlide} />

        <section className="rounded-[44px] bg-white/80 p-7 shadow-bubble">
          <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
            Current Slide
          </p>
          <p className="mt-3 text-sm font-black text-hbe-navy/45">
            {currentIndex + 1} / {deck.slides.length}
          </p>
          <h2 className="mt-5 text-5xl font-black leading-tight text-hbe-navy">
            {slide.title}
          </h2>
          <p className="mt-4 text-2xl font-black text-hbe-navy/72">
            {slide.subtitle}
          </p>

          <div className="mt-7 rounded-[32px] bg-hbe-cream p-6">
            <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
              Teacher Note
            </p>
            <p className="mt-3 text-lg font-bold leading-relaxed text-hbe-navy/76">
              {slide.teacherNote}
            </p>
          </div>

          {slide.focusText ? (
            <div className="mt-6 rounded-[32px] bg-hbe-sky/70 p-6">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
                Focus
              </p>
              <p className="mt-3 text-5xl font-black text-hbe-navy">{slide.focusText}</p>
            </div>
          ) : null}

          {slide.actions?.length ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {slide.actions.map((action) => (
                <SlideActionButton key={`${slide.id}-${action.label}`} action={action} />
              ))}
            </div>
          ) : null}

          <div className="mt-8 flex flex-wrap justify-between gap-3">
            <button
              onClick={goPrev}
              disabled={currentIndex === 0}
              className="hbe-focus rounded-full bg-white px-6 py-4 font-black text-hbe-navy shadow-bubble disabled:opacity-40"
            >
              Back
            </button>
            <button
              onClick={completeClassroom}
              className="hbe-focus rounded-full bg-hbe-gold px-6 py-4 font-black text-hbe-navy shadow-bubble"
            >
              Complete
            </button>
            <button
              onClick={goNext}
              disabled={currentIndex === deck.slides.length - 1}
              className="hbe-focus rounded-full bg-hbe-green px-6 py-4 font-black text-white shadow-bubble disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </section>

        <aside className="space-y-5">
          <ClassroomTimer sessionId={deck.sessionId} source="presenter" />

          <section className="rounded-[32px] bg-white/80 p-5 shadow-bubble">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-hbe-green">
              Next Slide
            </p>
            {nextSlide ? (
              <div className="mt-4 rounded-[24px] bg-hbe-bg p-4">
                <p className="text-sm font-black text-hbe-navy/50">
                  Slide {currentIndex + 2}
                </p>
                <h3 className="mt-2 text-xl font-black text-hbe-navy">
                  {nextSlide.title}
                </h3>
                <p className="mt-1 text-sm font-bold text-hbe-navy/60">
                  {nextSlide.subtitle}
                </p>
              </div>
            ) : (
              <div className="mt-4 rounded-[24px] bg-hbe-gold/30 p-4">
                <h3 className="text-xl font-black text-hbe-navy">Last Slide</h3>
                <p className="mt-1 text-sm font-bold text-hbe-navy/60">
                  오늘의 버블을 마무리합니다.
                </p>
              </div>
            )}
          </section>

          <section className="rounded-[32px] bg-hbe-lilac/80 p-5 shadow-bubble">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-hbe-navy/55">
              Key Controls
            </p>
            <div className="mt-4 space-y-2 text-sm font-bold text-hbe-navy/70">
              <p>ArrowRight / Space: Next</p>
              <p>ArrowLeft: Back</p>
              <p>Student Deck: projector screen</p>
              <p>Presenter View: teacher only</p>
            </div>
          </section>
        </aside>
      </section>
    </main>
  );
}
