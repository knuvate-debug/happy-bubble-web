import Link from "next/link";

export function AppHeader() {
  return (
    <header className="mx-auto flex w-full max-w-[1440px] items-center justify-between px-5 py-5">
      <Link href="/sessions" className="hbe-focus rounded-full text-xl font-black tracking-tight text-hbe-navy">
        Happy Bubble English
      </Link>
      <nav className="flex items-center gap-2 text-sm font-bold">
        <Link className="hbe-focus rounded-full bg-white/75 px-4 py-2 shadow-sm transition hover:bg-hbe-cream" href="/sessions">
          Child
        </Link>
        <Link className="hbe-focus rounded-full bg-white/75 px-4 py-2 shadow-sm transition hover:bg-hbe-cream" href="/teacher/s01">
          Teacher
        </Link>
        <Link className="hbe-focus rounded-full bg-white/75 px-4 py-2 shadow-sm transition hover:bg-hbe-cream" href="/admin">
          Admin
        </Link>
      </nav>
    </header>
  );
}
