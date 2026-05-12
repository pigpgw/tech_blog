import Link from "next/link";
import { BookOpen, FileText, Home } from "lucide-react";

export default function NotFound() {
  return (
    <section
      aria-labelledby="not-found-title"
      className="flex flex-1 items-center py-10 sm:py-16"
    >
      <div className="w-full rounded-[32px] bg-white p-8 text-center shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-900/6 sm:p-12">
        <p className="text-sm font-semibold text-blue-600">404</p>
        <h1
          id="not-found-title"
          className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl"
        >
          페이지를 찾을 수 없습니다
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
          주소가 바뀌었거나 존재하지 않는 페이지입니다. 홈으로 돌아가서 다시
          탐색해 주세요.
        </p>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <Home className="size-4" aria-hidden="true" />
            홈으로 이동
          </Link>
          <Link
            href="/blog"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <BookOpen className="size-4" aria-hidden="true" />
            블로그 보기
          </Link>
          <Link
            href="/resume"
            className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-slate-100 px-5 text-sm font-semibold text-slate-950 transition hover:bg-slate-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
          >
            <FileText className="size-4" aria-hidden="true" />
            이력 보기
          </Link>
        </div>
      </div>
    </section>
  );
}
