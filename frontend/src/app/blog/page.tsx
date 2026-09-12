import type { Metadata } from "next";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogCategories } from "@/components/blog/BlogCategories";
import {
  buildBlogCategoryLinks,
  buildBlogListItems,
} from "@/lib/blog-presentation";
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
  const items = buildBlogListItems(posts, categories);
  return (
    <>
      <BlogListHeader count={items.length} />
      <div className="blog-layout">
        <BlogCategories
          categories={buildBlogCategoryLinks(posts, categories)}
          total={items.length}
        />
        <BlogPostList posts={items} />
      </div>
    </>
  );
}
