import Link from "next/link";
import type { BlogCategoryLink } from "@/lib/blog-presentation";
export const BlogCategories = ({
  categories,
  total,
  selectedId,
}: {
  categories: BlogCategoryLink[];
  total: number;
  selectedId?: string;
}) => (
  <aside aria-label="블로그 카테고리">
    <p className="sidebar-label">EXPLORE BY TOPIC</p>
    <nav className="filter-list" aria-label="카테고리">
      <Link
        className="filter-button"
        href="/blog"
        aria-current={!selectedId ? "page" : undefined}
      >
        <span>전체</span>
        <span className="filter-count">{String(total).padStart(2, "0")}</span>
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          className="filter-button"
          href={category.href}
          aria-current={selectedId === category.id ? "page" : undefined}
        >
          <span>{category.label}</span>
          <span className="filter-count">
            {String(category.count).padStart(2, "0")}
          </span>
        </Link>
      ))}
    </nav>
    <div className="sidebar-note">
      <span className="serif">Learning in public.</span>
      <p>
        완성된 정답보다
        <br />
        이해해 가는 과정을 나눕니다.
      </p>
    </div>
  </aside>
);
