import { ClassroomPresenter } from "@/components/classroom/ClassroomPresenter";
import { getClassroomDeck } from "@/lib/classroomSlides";

export default function ClassroomS01PresenterPage() {
  const deck = getClassroomDeck("s01");

  if (!deck) {
    return (
      <main className="hbe-page min-h-screen p-8">
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Presenter deck not found</h1>
        </section>
      </main>
    );
  }

  return <ClassroomPresenter deck={deck} />;
}
