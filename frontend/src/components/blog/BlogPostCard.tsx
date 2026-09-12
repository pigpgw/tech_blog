import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { BlogCategoryBadge } from "@/components/blog/BlogCategoryBadge";
import { formatPublishedDate } from "@/lib/blog-presentation";
type Props = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  categoryLabelSegments: string[];
};
export const BlogPostCard = ({
  slug,
  title,
  description,
  publishedAt,
  categoryLabelSegments,
}: Props) => (
  <article>
    <Link
      href={"/blog/" + slug}
      className="post-row"
      aria-labelledby={"post-title-" + slug}
    >
      <div>
        <div className="meta">
          <BlogCategoryBadge labelSegments={categoryLabelSegments} />
          <time dateTime={publishedAt}>{formatPublishedDate(publishedAt)}</time>
        </div>
        <h3 id={"post-title-" + slug}>{title}</h3>
        <p>{description}</p>
        <div className="row-bottom">
          기록 읽기 <ArrowUpRight size={13} aria-hidden="true" />
        </div>
      </div>
      <div className="post-thumb" aria-hidden="true">
        <span className="serif">{"{ }"}</span>
      </div>
    </Link>
  </article>
);
