import { notFound } from "next/navigation";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { buildCategoryLabelSegments } from "@/lib/blog-categories";
import { getBlogCategories, getBlogPosts } from "@/services/blog";

type Props = {
  params: Promise<{ segments: string[] }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  const categoryPaths = Array.from(
    new Set(posts.map((post) => post.categoryId)),
  );

  return categoryPaths.map((categoryPath) => ({
    segments: categoryPath.split("/"),
  }));
}
export default async function BlogCategoryPage({ params }: Props) {
  const { segments } = await params;
  const categoryPath = segments.join("/");
  const [allPosts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const posts = allPosts
    .filter((post) => {
      return post.categoryId === categoryPath;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

  if (posts.length === 0) notFound();

  const postItems = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    categoryLabelSegments: buildCategoryLabelSegments(
      post.categoryId,
      categories,
    ),
  }));
  return (
    <div className="flex flex-1 flex-col py-10 sm:py-14">
      <BlogListHeader />
      <BlogPostList posts={postItems} />
    </div>
  );
}
