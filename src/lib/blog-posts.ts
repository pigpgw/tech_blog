import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { BlogPost, BlogPostDetail } from "@/types/blog";

const postsDirectory = path.join(process.cwd(), "content/blog");

const isBlogPost = (data: unknown): data is Omit<BlogPost, "id"> => {
  if (!data || typeof data !== "object") return false;

  const post = data as Record<string, unknown>;

  return (
    typeof post["slug"] === "string" &&
    typeof post["title"] === "string" &&
    typeof post["description"] === "string" &&
    typeof post["publishedAt"] === "string" &&
    typeof post["category"] === "string"
  );
};

export const getAllPosts = (): BlogPostDetail[] => {
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));

  return fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    if (!isBlogPost(data)) {
      throw new Error(`Invalid blog post frontmatter: ${fileName}`);
    }

    return {
      id: fileName.replace(/\.md$/, ""),
      content,
      ...data,
    };
  });
};

export const getPostBySlug = (slug: string) =>
  getAllPosts().find((post) => post.slug === slug);

export const blogPosts = getAllPosts();

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);
