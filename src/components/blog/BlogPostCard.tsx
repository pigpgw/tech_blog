import Link from "next/link";

type BlogPostCardProps = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  categoryLabel: string;
};

export const BlogPostCard = ({
  slug,
  title,
  description,
  publishedAt,
  categoryLabel,
}: BlogPostCardProps) => {
  const href = slug ? `/blog/${slug}` : "/blog";
  const titleId = `post-title-${slug}`;
  const descriptionId = `post-description-${slug}`;

  return (
    <Link
      href={href}
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      className="block rounded-[28px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
    >
      <article className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)] transition hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.08),0_24px_48px_rgba(15,23,42,0.12)]">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
            {categoryLabel}
          </span>
          <time dateTime={publishedAt} className="text-slate-500">
            {publishedAt}
          </time>
        </div>

        <div className="mt-5">
          <h2
            id={titleId}
            className="text-xl font-semibold tracking-tight text-slate-950 sm:text-2xl"
          >
            {title}
          </h2>
          <p
            id={descriptionId}
            className="mt-3 text-sm leading-7 text-slate-600 sm:text-base"
          >
            {description}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 pt-5">
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            {slug}
          </p>
        </div>
      </article>
    </Link>
  );
};
