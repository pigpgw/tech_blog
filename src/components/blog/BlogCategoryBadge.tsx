type BlogCategoryBadgeProps = {
  labelSegments: string[];
};

export const BlogCategoryBadge = ({
  labelSegments,
}: BlogCategoryBadgeProps) => {
  const displayLabel = labelSegments.join(" > ");

  return (
    <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
      {displayLabel}
    </span>
  );
};
