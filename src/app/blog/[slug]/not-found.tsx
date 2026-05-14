import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글을 찾을 수 없습니다",
  description: "요청한 블로그 글을 찾을 수 없습니다.",
};

export default function BlogPostNotFound() {
  return (
    <section aria-labelledby="not-found-title">
      <p>404</p>
      <h1 id="not-found-title">글을 찾을 수 없습니다</h1>
      <p>
        요청한 블로그 글을 찾을 수 없습니다. 글 주소가 바뀌었거나 아직 작성되지
        않은 글일 수 있으니 블로그 목록에서 다시 확인해 주세요.
      </p>
      <ul>
        <li>
          <Link href="/blog">블로그 글들 보기</Link>
        </li>
        <li>
          <Link href="/">홈으로 이동</Link>
        </li>
      </ul>
    </section>
  );
}
