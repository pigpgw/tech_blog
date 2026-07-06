export const parseBlogCategoryPath = (path: string) => path.split("/");
export const slugifyBlogCategorySegment = (path: string) =>
  path.toLowerCase().trim().replace(/\s+/g, "-");
export const buildBlogCategoryHref = (path: string) => {
  const slugPath = parseBlogCategoryPath(path)
    .map(slugifyBlogCategorySegment)
    .join("/");

  return `/blog/categories/${slugPath}`;
};
