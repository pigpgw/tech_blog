import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8fafc] text-slate-950">
      <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
        <header className="flex items-center justify-between py-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              PG
            </span>
            <span>Park Gunwoo</span>
          </Link>

          <nav aria-label="주요 메뉴" className="flex items-center gap-2 text-sm font-medium">
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

        <section className="flex flex-1 items-center py-10 sm:py-16">
          <div className="w-full rounded-[32px] bg-white p-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/6 sm:p-12">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-blue-600 text-lg font-bold text-white">
              PG
            </div>

            <p className="mt-6 text-sm font-semibold text-blue-600">
              Pigpgw Tech Blog
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              박건우의 기술 블로그
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              배우고 만든 것을 정리해두는 공간입니다.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              <a
                href="https://github.com/pigpgw"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
                GitHub
              </a>
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

            <div className="mt-8 flex items-center justify-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
              >
                최근 글 보러 가기
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
