export const BlogCategoryBadge = ({
  labelSegments,
}: {
  labelSegments: string[];
}) => <span className="category">{labelSegments.join(" / ")}</span>;
