import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
export const metadata: Metadata = {
  title: "카테고리를 찾을 수 없습니다",
  description: "요청한 블로그 카테고리를 찾을 수 없습니다.",
};
export default function BlogCategoryNotFound() {
  return (
    <NotFoundView
      title="카테고리를 찾을 수 없습니다"
      description="요청한 카테고리에 발행된 글이 없거나 주소가 바뀌었을 수 있습니다. 전체 글에서 다시 찾아보세요."
    />
  );
}
