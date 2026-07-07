import { notFound } from "next/navigation";
import { getBlogPosts } from "@/app/apis/blog";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  const categoryPath = segments.join("/");
  const posts = (await getBlogPosts())
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
    categoryLabelSegments: post.categoryId.split("/"),
  }));
  return (
    <div className="flex flex-1 flex-col py-10 sm:py-14">
      <BlogListHeader />
      <BlogPostList posts={postItems} />
    </div>
  );
}
