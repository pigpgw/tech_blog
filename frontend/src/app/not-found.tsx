import type { Metadata } from "next";
import { NotFoundView } from "@/components/layout/NotFoundView";
export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청한 페이지를 찾을 수 없습니다.",
};
export default function NotFound() {
  return (
    <NotFoundView
      title="페이지를 찾을 수 없습니다"
      description="주소가 바뀌었거나 존재하지 않는 페이지입니다. 홈이나 블로그에서 다시 탐색해 주세요."
    />
  );
}
