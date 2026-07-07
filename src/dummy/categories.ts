import type { Category } from "@/types/blog";

export const dummyCategories = [
  {
    id: "ai",
    name: "AI",
    slug: "ai",
    parentId: null,
    order: 1,
  },
  {
    id: "ai/prompt-engineering",
    name: "Prompt Engineering",
    slug: "prompt-engineering",
    parentId: "ai",
    order: 1,
  },
  {
    id: "category",
    name: "Category",
    slug: "category",
    parentId: null,
    order: 99,
  },
  {
    id: "category/subcategory",
    name: "Subcategory",
    slug: "subcategory",
    parentId: "category",
    order: 1,
  },
] satisfies Category[];
