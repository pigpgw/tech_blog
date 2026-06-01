import Link from "next/link";
import { ChevronLeft, Clock3, NotebookPen } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import "highlight.js/styles/github.css";
import { Metadata } from "next";
import { getPostDetailBySlug } from "@/lib/blog-posts";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostDetailBySlug(slug);
  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
      description: "요청한 블로그 글을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogItem = getPostDetailBySlug(slug);

  if (!blogItem) notFound();

  const titleId = "blog-post-title";

  return (
    <article
      aria-labelledby={titleId}
      className="flex flex-1 flex-col py-10 sm:py-14"
    >
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
          <time
            dateTime={blogItem.publishedAt}
            className="inline-flex min-h-9 items-center gap-2 rounded-full bg-slate-100 px-3 font-medium text-slate-600"
          >
            <Clock3 className="size-4" aria-hidden="true" />
            {blogItem.publishedAt}
          </time>
        </div>

        <h1
          id={titleId}
          className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl"
        >
          {blogItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          {blogItem.description}
        </p>
      </header>

      <div className="mt-8 rounded-[32px] border border-slate-200 bg-white px-7 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <NotebookPen className="size-4" aria-hidden="true" />
          Article
        </div>

        <div className="blog-markdown mt-6">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              h1: "h2",
            }}
          >
            {blogItem.content}
          </ReactMarkdown>
        </div>
      </div>
    </article>
  );
}
