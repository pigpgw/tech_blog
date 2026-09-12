import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
export const metadata: Metadata = {
  title: "글을 찾을 수 없습니다",
  description: "요청한 블로그 글을 찾을 수 없습니다.",
};
export default function BlogPostNotFound() {
  return (
    <NotFoundView
      title="글을 찾을 수 없습니다"
      description="요청한 글이 공개되어 있지 않거나 주소가 바뀌었을 수 있습니다. 블로그 목록에서 다시 확인해 주세요."
    />
  );
}
