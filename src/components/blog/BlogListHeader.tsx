// import { blogCategories } from "@/lib/blog-posts";

export const BlogListHeader = () => {
  return (
    <header className="rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-white to-slate-50 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:p-10">
      <p className="text-sm font-semibold text-blue-600">Blog</p>
      <h1 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
        문제와 해결 과정을 기록한 글
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
        개발하며 마주친 문제와 해결 과정을 글로 정리합니다.
      </p>

      <section aria-labelledby="blog-categories" className="mt-8">
        <div className="flex flex-wrap items-center gap-3">
          <h2
            id="blog-categories"
            className="text-sm font-semibold text-slate-950"
          >
            카테고리
          </h2>
          <ul className="flex flex-wrap gap-3">
            {/* {blogCategories.map((category) => (
              <li
                key={category}
                className="inline-flex min-h-10 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700"
              >
                {category}
              </li>
            ))} */}
          </ul>
        </div>
      </section>
    </header>
  );
};
