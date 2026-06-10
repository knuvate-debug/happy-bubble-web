"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { ClassroomDeck } from "@/lib/classroomSlides";
import { trackClassroomEvent } from "@/lib/classroomTracking";

export function ClassroomOverview({ deck }: { deck: ClassroomDeck }) {
  useEffect(() => {
    trackClassroomEvent({
      sessionId: deck.sessionId,
      eventName: "classroom_overview_open",
      value: deck.title,
      metadata: { source: "overview", slideCount: deck.slides.length }
    });
  }, [deck.sessionId, deck.slides.length, deck.title]);

  return (
    <main className="hbe-page min-h-screen p-4 sm:p-6">
      <header className="mb-6 rounded-[40px] bg-white/78 p-7 shadow-bubble">
        <p className="text-sm font-black uppercase tracking-[0.22em] text-hbe-green">
          Classroom Overview
        </p>
        <h1 className="mt-3 text-4xl font-black text-hbe-navy">{deck.title}</h1>
        <p className="mt-2 text-lg font-bold text-hbe-navy/65">
          전체 슬라이드 흐름을 한눈에 확인합니다.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          <Link
            href="/classroom/s01"
            className="hbe-focus rounded-full bg-hbe-green px-5 py-3 text-sm font-black text-white shadow-sm"
          >
            Open Deck
          </Link>
          <Link
            href="/classroom/s01/presenter"
            className="hbe-focus rounded-full bg-hbe-cream px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
          >
            Presenter View
          </Link>
          <Link
            href="/teacher/s01"
            className="hbe-focus rounded-full bg-white px-5 py-3 text-sm font-black text-hbe-navy shadow-sm"
          >
            Teacher Board
          </Link>
        </div>
      </header>

      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {deck.slides.map((slide, index) => (
          <article key={slide.id} className="rounded-[36px] bg-white/78 p-6 shadow-bubble">
            <p className="text-sm font-black text-hbe-green">Slide {index + 1}</p>
            <h2 className="mt-3 text-2xl font-black text-hbe-navy">{slide.title}</h2>
            <p className="mt-2 text-base font-bold text-hbe-navy/65">{slide.subtitle}</p>
            <div className="mt-5 rounded-[24px] bg-hbe-cream p-4">
              <p className="text-xs font-black uppercase tracking-wide text-hbe-navy/50">
                Teacher Note
              </p>
              <p className="mt-2 line-clamp-4 text-sm font-bold text-hbe-navy/70">
                {slide.teacherNote}
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-hbe-sky px-3 py-1 text-xs font-black text-hbe-navy">
                {slide.visualType}
              </span>
              {slide.focusText ? (
                <span className="rounded-full bg-hbe-gold/40 px-3 py-1 text-xs font-black text-hbe-navy">
                  {slide.focusText}
                </span>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
