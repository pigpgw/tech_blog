import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { mockCategories } from "@/lib/mock-categories";
import type {
  BlogPostDetail,
  BlogPostListResponse,
  BlogPostSummary,
  Category,
} from "@/types/blog";

type MockErrorResponse = {
  message: string;
};

type MockSuccessResponse<T> = {
  ok: true;
  status: number;
  json: () => Promise<T>;
};

type MockFailureResponse = {
  ok: false;
  status: number;
  json: () => Promise<MockErrorResponse>;
};

type MockResponse<T> = MockSuccessResponse<T> | MockFailureResponse;

const postsDirectory = path.join(process.cwd(), "content/blog");
const fileNames = fs
  .readdirSync(postsDirectory)
  .filter((fileName) => fileName.endsWith(".md"));

const createMockSuccessResponse = <T>(
  status: number,
  data: T,
): MockSuccessResponse<T> => ({
  ok: true,
  status,
  json: () => Promise.resolve(data),
});

const createMockFailureResponse = (
  status: number,
  data: MockErrorResponse,
): MockFailureResponse => ({
  ok: false,
  status,
  json: () => Promise.resolve(data),
});

export const fetchMockCategories = async (): Promise<
  MockResponse<Category[]>
> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(createMockSuccessResponse(200, mockCategories));
    }, 1000);
  });
};

export const fetchMockPosts = async (): Promise<
  MockResponse<BlogPostListResponse>
> => {
  const posts = fileNames
    .map((fileName): BlogPostSummary => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return data as BlogPostSummary;
    })
    .filter((blog) => !blog.draft);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        createMockSuccessResponse(200, {
          items: posts,
          page: 1,
          pageSize: posts.length,
          total: posts.length,
        }),
      );
    }, 1000);
  });
};

export const fetchMockPostDetail = async (
  id: string,
): Promise<MockResponse<BlogPostDetail>> => {
  for (const fileName of fileNames) {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const summary = data as BlogPostSummary;

    if (summary.draft || summary.id !== id) continue;

    return createMockSuccessResponse(200, {
      ...summary,
      content,
    });
  }

  return createMockFailureResponse(404, {
    message: "Post not found",
  });
};
