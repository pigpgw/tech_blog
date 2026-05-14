import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없습니다",
  description: "요청한 페이지를 찾을 수 없습니다.",
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title">
      <p>404</p>
      <h1 id="not-found-title">페이지를 찾을 수 없습니다</h1>
      <p>
        주소가 바뀌었거나 존재하지 않는 페이지입니다. 홈으로 돌아가서 다시
        탐색해 주세요.
      </p>
      <ul>
        <li>
          <Link href="/">홈으로 이동</Link>
        </li>
        <li>
          <Link href="/blog">블로그 보기</Link>
        </li>
        <li>
          <Link href="/resume">이력 보기</Link>
        </li>
      </ul>
    </section>
  );
}
