import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPostSummary, BlogPostDetail } from "@/types/blog";
import { z } from "zod";

const postsDirectory = path.join(process.cwd(), "content/blog");
const BlogPostSummarySchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  publishedAt: z.string(),
  category: z.string(),
  draft: z.boolean().default(false),
});

export const getAllPostsSummary = (): BlogPostSummary[] => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  return fileNames
    .map((fileName): BlogPostSummary => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return BlogPostSummarySchema.parse(data);
    })
    .filter((summary) => !summary.draft);
};

export const getPostDetailBySlug = (
  targetSlug: string,
): BlogPostDetail | undefined => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    const summary = BlogPostSummarySchema.parse(data);

    if (summary.draft || summary.slug !== targetSlug) continue;

    return {
      ...summary,
      content,
    };
  }
  return undefined;
};

export const parseBlogCategoryPath = (path: string) => path.split("/");
export const slugifyBlogCategorySegment = (path: string) =>
  path.toLowerCase().trim().replace(/\s+/g, "-");
export const buildBlogCategoryHref = (path: string) => {
  const slugPath = parseBlogCategoryPath(path)
    .map(slugifyBlogCategorySegment)
    .join("/");

  return `/blog/categories/${slugPath}`;
};
