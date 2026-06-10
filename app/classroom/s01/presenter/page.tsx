import { ClassroomPresenter } from "@/components/classroom/ClassroomPresenter";
import { getClassroomDeck } from "@/lib/classroomSlides";
import { getInstructorMode } from "@/lib/instructorModes";

export default function ClassroomS01PresenterPage({
  searchParams
}: {
  searchParams?: { mode?: string };
}) {
  const deck = getClassroomDeck("s01");
  const instructorMode = getInstructorMode(searchParams?.mode).id;

  if (!deck) {
    return (
      <main className="hbe-page min-h-screen p-8">
        <section className="hbe-card rounded-[40px] p-8 text-center">
          <h1 className="text-4xl font-black text-hbe-navy">Presenter deck not found</h1>
        </section>
      </main>
    );
  }

  return <ClassroomPresenter deck={deck} instructorMode={instructorMode} />;
}
