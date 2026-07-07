import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-api";
import { SITE_URL } from "@/lib/site";

const buildUrl = (pathname: string) => {
  return new URL(pathname, SITE_URL).toString();
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getBlogPosts();
  const categoryLastModifiedMap = new Map<string, Date>();

  const latestPostDate =
    posts.length > 0
      ? new Date(
          Math.max(
            ...posts.map((post) => new Date(post.publishedAt).getTime()),
          ),
        )
      : undefined;

  posts.forEach((post) => {
    const publishedAt = new Date(post.publishedAt);
    const currentLastModified = categoryLastModifiedMap.get(post.categoryId);

    if (!currentLastModified || publishedAt > currentLastModified) {
      categoryLastModifiedMap.set(post.categoryId, publishedAt);
    }
  });

  return [
    {
      url: buildUrl("/"),
    },
    {
      url: buildUrl("/blog"),
      lastModified: latestPostDate,
    },
    {
      url: buildUrl("/resume"),
    },
    ...posts.map((post) => ({
      url: buildUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.publishedAt),
    })),
    ...Array.from(categoryLastModifiedMap, ([categoryPath, lastModified]) => ({
      url: buildUrl(`/blog/categories/${categoryPath}`),
      lastModified,
    })),
  ];
}
