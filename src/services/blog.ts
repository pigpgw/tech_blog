import {
  fetchMockCategories,
  fetchMockPostDetail,
  fetchMockPosts,
} from "@/lib/blog-api.mock";
import type { BlogPostDetail, BlogPostSummary, Category } from "@/types/blog";

export const getBlogCategories = async (): Promise<Category[]> => {
  const response = await fetchMockCategories();

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const getBlogPosts = async (): Promise<BlogPostSummary[]> => {
  const response = await fetchMockPosts();

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const data = await response.json();

  return data.items;
};

export const getBlogPostDetail = async (
  id: string,
): Promise<BlogPostDetail | null> => {
  const response = await fetchMockPostDetail(id);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};
