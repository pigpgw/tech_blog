"use client";
import { useState } from "react";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import type { BlogPost } from "@/types/blog";
import type { ChangeEvent } from "react";

type BlogListProps = {
  posts: BlogPost[];
};

export const BlogPostList = ({ posts }: BlogListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredBlogPosts = posts.filter((post) =>
    post.title.toLocaleLowerCase().includes(searchQuery.toLowerCase()),
  );

  const hasPosts = filteredBlogPosts.length > 0;

  return (
    <section aria-labelledby="blog-list" className="mt-8 sm:mt-10">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 id="blog-list" className="text-lg font-semibold text-slate-950">
          전체 글
        </h2>
        <div className="w-full sm:w-72">
          <label htmlFor="blog-search" className="sr-only">
            블로그 글 검색
          </label>
          <input
            id="blog-search"
            type="search"
            onChange={handleSearchQueryChange}
            value={searchQuery}
            placeholder="검색할 블로그 제목을 입력하세요"
            className="min-h-11 w-full rounded-full border border-slate-200 bg-white px-4 text-sm font-medium text-slate-950 shadow-sm ring-1 ring-slate-900/[0.03] transition outline-none placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {hasPosts ? (
        <div className="grid gap-5">
          {filteredBlogPosts.map((post) => (
            <BlogPostCard key={post.slug} {...post} />
          ))}
        </div>
      ) : (
        <div className="rounded-[28px] border border-dashed border-slate-300 bg-white/70 px-6 py-12 text-center">
          <p className="text-lg font-semibold text-slate-950">
            아직 발행된 글이 없습니다.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            첫 번째 글을 정리하면 이 목록에 바로 노출됩니다.
          </p>
        </div>
      )}
    </section>
  );
};
