import Link from "next/link";

export const Header = () => {
  return (
    <header className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
      >
        <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
          PG
        </span>
        <span>Park Gunwoo</span>
      </Link>

      <nav
        aria-label="주요 메뉴"
        className="flex w-full flex-wrap items-center gap-2 text-sm font-medium sm:w-auto sm:justify-end"
      >
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center rounded-full px-4 text-slate-600 transition hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          Blog
        </Link>
        <Link
          href="/resume"
          className="inline-flex min-h-11 items-center rounded-full px-4 text-slate-600 transition hover:bg-white hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          Resume
        </Link>
      </nav>
    </header>
  );
};
