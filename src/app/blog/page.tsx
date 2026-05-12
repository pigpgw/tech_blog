import { Metadata } from "next";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "Tech Blog",
  description:
    "개발하며 배우고 경험한 문제 해결 과정과 기술 내용을 기록하는 개발 블로그",
};

export default function BlogListPage() {
  const posts = blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
  return (
    <div className="flex flex-1 flex-col py-10 sm:py-14">
      <BlogListHeader />
      <BlogPostList posts={posts} />
    </div>
  );
}
