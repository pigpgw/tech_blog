import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { getAllPostsSummary } from "@/lib/blog";

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ segments: string[] }>;
}) {
  const { segments } = await params;
  const categoryPath = segments.join("/");
  const posts = getAllPostsSummary()
    .filter((post) => {
      return post.category.path === categoryPath;
    })
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );
  const postItems = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    publishedAt: post.publishedAt,
    categoryLabel: post.category.label,
  }));
  return (
    <div className="flex flex-1 flex-col py-10 sm:py-14">
      <BlogListHeader />
      <BlogPostList posts={postItems} />
    </div>
  );
}
