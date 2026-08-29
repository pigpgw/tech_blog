import { Metadata } from "next";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { buildCategoryLabelSegments } from "@/lib/blog-categories";
import { getBlogCategories, getBlogPosts } from "@/services/blog";

export const metadata: Metadata = {
  title: "문제와 해결 과정을 기록한 글",
  description:
    "개발하며 배우고 경험한 문제 해결 과정과 기술 내용을 기록하는 개발 블로그",
};

export default async function BlogListPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const sortedPosts = posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  const postItems = sortedPosts.map((post) => ({
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
