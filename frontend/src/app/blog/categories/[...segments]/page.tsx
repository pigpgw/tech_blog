import { notFound } from "next/navigation";
import { BlogListHeader } from "@/components/blog/BlogListHeader";
import { BlogPostList } from "@/components/blog/BlogPostList";
import { BlogCategories } from "@/components/blog/BlogCategories";
import {
  buildBlogCategoryLinks,
  buildBlogListItems,
  sortPublishedPosts,
} from "@/lib/blog-presentation";
import { buildCategoryLabelSegments } from "@/lib/blog-categories";
import { getBlogCategories, getBlogPosts } from "@/services/blog";
type Props = { params: Promise<{ segments: string[] }> };
export const dynamicParams = false;
export async function generateStaticParams() {
  const posts = sortPublishedPosts(await getBlogPosts());
  return Array.from(new Set(posts.map((post) => post.categoryId))).map(
    (path) => ({ segments: path.split("/") }),
  );
}
export default async function BlogCategoryPage({ params }: Props) {
  const { segments } = await params;
  const categoryPath = segments.join("/");
  const [allPosts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const allItems = buildBlogListItems(allPosts, categories);
  const items = allItems.filter((post) => post.categoryId === categoryPath);
  if (items.length === 0) notFound();
  return (
    <>
      <BlogListHeader
        count={items.length}
        categoryLabel={buildCategoryLabelSegments(
          categoryPath,
          categories,
        ).join(" / ")}
      />
      <div className="blog-layout">
        <BlogCategories
          categories={buildBlogCategoryLinks(allPosts, categories)}
          total={allItems.length}
          selectedId={categoryPath}
        />
        <BlogPostList posts={items} />
      </div>
    </>
  );
}
