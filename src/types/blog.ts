export type BlogPost = {
  id?: string;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
};

export type BlogPostDetail = BlogPost & {
  id: string;
  content: string;
};
