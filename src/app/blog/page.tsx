import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";

export const metadata: Metadata = {
  title: "문제와 해결 과정을 기록한 글",
  description:
    "개발하며 배우고 경험한 문제 해결 과정과 기술 내용을 기록하는 개발 블로그",
};

export default function BlogListPage() {
  const posts = blogPosts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <>
      <header>
        <p>Blog</p>
        <h1>문제와 해결 과정을 기록한 글</h1>
        <p>개발하며 마주친 문제와 해결 과정을 글로 정리합니다.</p>
      </header>

      <section aria-labelledby="blog-list">
        <h2 id="blog-list">전체 글</h2>
        {posts.length > 0 ? (
          <ul>
            {posts.map((post) => (
              <li key={post.slug}>
                <article>
                  <p>{post.category}</p>
                  <time dateTime={post.publishedAt}>{post.publishedAt}</time>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                  </h3>
                  <p>{post.description}</p>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p>아직 발행된 글이 없습니다.</p>
        )}
      </section>
    </>
  );
}
