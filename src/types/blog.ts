export type BlogCategoryId = string;

export type BlogPostSummary = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: BlogCategoryId;
  draft: boolean;
};

export type BlogPostDetail = BlogPostSummary & {
  content: string;
};

export type BlogTreeNode = BlogCategoryNode | BlogPostNode;

export type BlogCategoryNode = {
  type: "category";
  id: BlogCategoryId;
  label: string;
  order: number;
  children: BlogTreeNode[];
};

export type BlogPostNode = {
  type: "post";
  id: string;
  label: string;
  slug: string;
  category: BlogCategoryId;
  order: number;
};
