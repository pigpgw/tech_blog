import Link from "next/link";
import { BookOpen, FileText } from "lucide-react";

export default function Home() {
  return (
    <section className="flex flex-1 items-center py-10 sm:py-16">
      <div className="w-full rounded-[32px] bg-white p-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/6 sm:p-12">
        <div
          aria-hidden="true"
          className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white"
        >
          PG
        </div>

        <p className="mt-6 text-sm font-semibold text-blue-600">
          Developer Notes
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
          박건우 Tech Blog
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          개발하며 마주친 문제와 해결 과정을 기록합니다.
        </p>

        <div className="mx-auto mt-10 grid max-w-md gap-3 sm:grid-cols-2">
          <Link
            href="/blog"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            Blog
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <FileText className="size-4" aria-hidden="true" />
            Resume
          </Link>
        </div>
      </div>
    </section>
  );
}
