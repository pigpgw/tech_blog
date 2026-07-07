import type { Category } from "@/types/blog";

export const buildCategoryLabelSegments = (
  categoryId: string,
  categories: Category[],
): string[] => {
  const categoryMap = new Map(
    categories.map((category) => [category.id, category]),
  );
  const labelSegments: string[] = [];
  let currentCategory = categoryMap.get(categoryId);

  while (currentCategory) {
    labelSegments.unshift(currentCategory.name);

    if (!currentCategory.parentId) break;

    currentCategory = categoryMap.get(currentCategory.parentId);
  }

  return labelSegments.length > 0 ? labelSegments : categoryId.split("/");
};
