"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogListItem } from "@/lib/blog-presentation";
export const BlogPostList = ({ posts }: { posts: BlogListItem[] }) => {
  const [query, setQuery] = useState("");
  const filtered = posts.filter((post) =>
    post.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );
  return (
    <section aria-labelledby="blog-list">
      <div className="blog-toolbar">
        <h2 id="blog-list" className="result-label">
          {query.trim() ? "검색 결과" : "전체 기록"}{" "}
          <strong>{String(filtered.length).padStart(2, "0")}</strong>
        </h2>
        <label className="search-field">
          <Search size={15} aria-hidden="true" />
          <span className="sr-only">블로그 글 검색</span>
          <input
            id="blog-search"
            type="search"
            placeholder="기록 속에서 제목 찾기"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-describedby="blog-search-status"
          />
        </label>
      </div>
      <p id="blog-search-status" className="sr-only" role="status">
        검색 결과 {filtered.length}개
      </p>
      {filtered.length ? (
        <ul className="post-list">
          {filtered.map((post) => (
            <li key={post.slug}>
              <BlogPostCard {...post} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty">
          <p>
            {query.trim()
              ? "검색 결과가 없습니다."
              : "아직 발행된 글이 없습니다."}
          </p>
          {query.trim() && (
            <button className="reset-button" onClick={() => setQuery("")}>
              검색 초기화
            </button>
          )}
        </div>
      )}
      <div className="archive-end">
        <span>차곡차곡 쌓인 생각들.</span>
        <span>Learning in public.</span>
      </div>
    </section>
  );
};
