export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: {
    path: string;
    label: string;
  };
  draft: boolean;
};

export type BlogPostDetail = BlogPostSummary & {
  content: string;
};
