export type BlogCategoryPath = string;

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: BlogCategoryPath;
  draft: boolean;
};

export type BlogPostDetail = BlogPostSummary & {
  content: string;
};
