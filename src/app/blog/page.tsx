import { Metadata } from "next";
import { getBlogPosts } from "@/app/apis/blog";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";

export const metadata: Metadata = {
  title: "문제와 해결 과정을 기록한 글",
  description:
    "개발하며 배우고 경험한 문제 해결 과정과 기술 내용을 기록하는 개발 블로그",
};

export default async function BlogListPage() {
  const posts = (await getBlogPosts()).sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
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
