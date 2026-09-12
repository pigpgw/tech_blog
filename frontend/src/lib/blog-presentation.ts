import type { BlogPostSummary, Category } from "@/types/blog";
import { buildCategoryLabelSegments } from "@/lib/blog-categories";

export type BlogListItem = BlogPostSummary & {
  categoryLabelSegments: string[];
};
export type BlogCategoryLink = {
  id: string;
  label: string;
  href: string;
  count: number;
};
export type ArticleHeading = { id: string; title: string; level: number };

export const sortPublishedPosts = (
  posts: BlogPostSummary[],
): BlogPostSummary[] =>
  posts
    .filter((post) => !post.draft)
    .sort(
      (a, b) =>
        (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0) ||
        a.slug.localeCompare(b.slug),
    );

export const buildBlogListItems = (
  posts: BlogPostSummary[],
  categories: Category[],
): BlogListItem[] =>
  sortPublishedPosts(posts).map((post) => ({
    ...post,
    categoryLabelSegments: buildCategoryLabelSegments(
      post.categoryId,
      categories,
    ),
  }));

export const buildBlogCategoryLinks = (
  posts: BlogPostSummary[],
  categories: Category[],
): BlogCategoryLink[] => {
  const counts = new Map<string, number>();
  posts
    .filter((post) => !post.draft)
    .forEach((post) => {
      counts.set(post.categoryId, (counts.get(post.categoryId) ?? 0) + 1);
    });
  return Array.from(counts, ([id, count]) => ({
    id,
    count,
    label: buildCategoryLabelSegments(id, categories).join(" / "),
    href: "/blog/categories/" + id.split("/").map(encodeURIComponent).join("/"),
  })).sort((a, b) => a.label.localeCompare(b.label, "ko"));
};
export const formatPublishedDate = (date: string): string =>
  date.slice(0, 10).replaceAll("-", ".");
export const getReadingMinutes = (content: string): number =>
  Math.max(1, Math.ceil(content.replace(/\s/g, "").length / 600));

export const getArticleHeadings = (markdown: string): ArticleHeading[] => {
  const result: ArticleHeading[] = [];
  const lines = markdown.split(/\r?\n/);
  let fenceCharacter = "";
  let fenceLength = 0;
  lines.forEach((line, index) => {
    const fence = /^ {0,3}(\x60{3,}|~{3,})(.*)$/.exec(line);
    if (fence?.[1]) {
      const marker = fence[1];
      if (!fenceCharacter) {
        fenceCharacter = marker.charAt(0);
        fenceLength = marker.length;
      } else if (
        marker.charAt(0) === fenceCharacter &&
        marker.length >= fenceLength &&
        !fence[2]?.trim()
      )
        fenceCharacter = "";
      return;
    }
    if (fenceCharacter) return;
    const atx = /^ {0,3}(#{1,3})(?:[ \t]+|$)(.*)$/.exec(line);
    const next = lines[index + 1] ?? "";
    const isSetext =
      line.trim().length > 0 &&
      !/^( {4}|\t| {0,3}[>#*\-+])/.test(line) &&
      /^ {0,3}(=+|-+)\s*$/.test(next);
    const rawTitle = atx?.[2] ?? (isSetext ? line.trim() : null);
    if (rawTitle === null) return;
    const title = rawTitle
      .replace(/[ \t]+#+[ \t]*$/, "")
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
      .replace(/[*_\x60]/g, "")
      .trim();
    if (title)
      result.push({
        id: "section-" + (index + 1),
        title,
        level: atx?.[1]?.length ?? (next.trim().startsWith("=") ? 1 : 2),
      });
  });
  return result;
};
