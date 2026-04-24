import Link from "next/link";
import { getPostBySlug } from "@/lib/blog-posts";
import { ChevronLeft, Clock3, NotebookPen } from "lucide-react";
import { notFound } from "next/navigation";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogItem = getPostBySlug(slug);

  if (!blogItem) notFound();

  return (
    <article className="flex flex-1 flex-col py-10 sm:py-14">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          목록으로 돌아가기
        </Link>
      </div>

      <header className="mt-6 rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-white to-slate-50 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
            {blogItem.category}
          </span>
          <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-slate-100 px-3 font-medium text-slate-600">
            <Clock3 className="size-4" aria-hidden="true" />
            {blogItem.publishedAt}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          {blogItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          {blogItem.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
              Category
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {blogItem.category}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
              Slug
            </p>
            <p className="mt-2 text-sm font-semibold break-all text-slate-900">
              {blogItem.slug}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold tracking-[0.16em] text-slate-400 uppercase">
              Reading
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">약 3분</p>
          </div>
        </div>
      </header>

      <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-7 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <NotebookPen className="size-4" aria-hidden="true" />
          Article
        </div>

        <div className="mt-6 text-base leading-8 whitespace-pre-line text-slate-700">
          {blogItem.content}
        </div>
      </section>
    </article>
  );
}
