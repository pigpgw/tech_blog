type BlogCategoryBadgeProps = {
  label: string;
};

export const BlogCategoryBadge = ({ label }: BlogCategoryBadgeProps) => {
  const displayLabel = label.split("/").join(" > ");

  return (
    <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
      {displayLabel}
    </span>
  );
};
