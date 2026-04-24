import Link from "next/link";
import { blogCategories, getAllPosts } from "@/lib/blog-posts";
import type { BlogPost } from "@/types/blog";

const BlogPostCard = ({
  slug,
  title,
  description,
  publishedAt,
  category,
}: BlogPost) => {
  const href = slug ? `/blog/${slug}` : "/blog";

  return (
    <Link href={href} className="block">
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08),0_24px_48px_rgba(15,23,42,0.12)]">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
            {category}
          </span>
          <span className="text-slate-400">{publishedAt}</span>
        </div>

        <div className="mt-5">
          <h2 className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl">
            {title}
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-400 uppercase">
            {slug}
          </p>
        </div>
      </article>
    </Link>
  );
};

const BlogListHeader = () => {
  return (
    <header className="rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-white to-slate-50 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold text-blue-600">Blog</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
        학습과 구현 과정을 기록한 글
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        브라우저 동작 원리, Next.js 구조화, 퍼블리싱 기준처럼 실제로 부딪히며
        정리한 내용을 모아두는 공간입니다.
      </p>

      <section aria-labelledby="blog-categories" className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="blog-categories"
            className="text-sm font-semibold text-slate-950"
          >
            카테고리
          </h2>
          {blogCategories.map((category) => (
            <span
              key={category}
              className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
            >
              {category}
            </span>
          ))}
        </div>
      </section>
    </header>
  );
};

export const BlogPostList = () => {
  const blogPosts = getAllPosts();
  const hasPosts = blogPosts.length > 0;

  return (
    <section aria-labelledby="blog-list" className="mt-8 sm:mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 id="blog-list" className="text-lg font-semibold text-slate-950">
          전체 글
        </h2>
        <p className="text-sm text-slate-500">{blogPosts.length} posts</p>
      </div>

      {hasPosts ? (
        <div className="grid gap-5">
          {blogPosts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-slate-950">
            아직 발행된 글이 없습니다.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            첫 번째 글을 정리하면 이 목록에 바로 노출됩니다.
          </p>
        </div>
      )}
    </section>
  );
};

export default function BlogListPage() {
  return (
    <section className="flex flex-1 flex-col py-10 sm:py-14">
      <BlogListHeader />
      <BlogPostList />
    </section>
  );
}
