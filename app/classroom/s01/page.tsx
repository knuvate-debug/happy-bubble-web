import { ClassroomDeck } from "@/components/classroom/ClassroomDeck";
import { getClassroomDeck } from "@/lib/classroomSlides";
import { getInstructorMode } from "@/lib/instructorModes";

export default function ClassroomS01Page({
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
          <h1 className="text-4xl font-black text-hbe-navy">Classroom deck not found</h1>
        </section>
      </main>
    );
  }

  return <ClassroomDeck deck={deck} instructorMode={instructorMode} />;
}
