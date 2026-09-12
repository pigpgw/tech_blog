"use client";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { BlogPostSummary } from "@/types/blog";
import { formatPublishedDate } from "@/lib/blog-presentation";
type SearchPost = Pick<BlogPostSummary, "slug" | "title" | "publishedAt">;
export const SiteSearch = ({ posts }: { posts: SearchPost[] }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  const [query, setQuery] = useState("");
  const results = posts.filter((post) =>
    post.title.toLocaleLowerCase().includes(query.trim().toLocaleLowerCase()),
  );
  const open = () => {
    if (!dialogRef.current?.open) dialogRef.current?.showModal();
    inputRef.current?.focus();
  };
  const close = () => dialogRef.current?.close();
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        event.key === "/" &&
        !event.metaKey &&
        !event.ctrlKey &&
        !event.altKey &&
        !(
          target instanceof HTMLElement &&
          (target.isContentEditable ||
            ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName))
        )
      ) {
        event.preventDefault();
        if (!dialogRef.current?.open) dialogRef.current?.showModal();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);
  return (
    <>
      <button
        ref={openerRef}
        className="icon-button"
        onClick={open}
        aria-label="글 검색"
      >
        <Search size={17} aria-hidden="true" />
      </button>
      <dialog
        ref={dialogRef}
        aria-labelledby="site-search-title"
        onClose={() => openerRef.current?.focus()}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            close();
        }}
      >
        <h2 className="sr-only" id="site-search-title">
          블로그 글 검색
        </h2>
        <div className="dialog-top">
          <Search size={18} aria-hidden="true" />
          <label className="sr-only" htmlFor="site-search-input">
            검색할 글 제목
          </label>
          <input
            ref={inputRef}
            id="site-search-input"
            type="search"
            placeholder="어떤 기록을 찾고 있나요?"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            className="dialog-close"
            onClick={close}
            aria-label="검색 닫기"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div className="dialog-results">
          <p className="sr-only" role="status">
            검색 결과 {results.length}개
          </p>
          {results.length ? (
            results.map((post) => (
              <Link
                key={post.slug}
                href={"/blog/" + post.slug}
                className="dialog-result"
                onClick={close}
              >
                <time className="meta" dateTime={post.publishedAt}>
                  {formatPublishedDate(post.publishedAt)}
                </time>
                <strong>{post.title}</strong>
              </Link>
            ))
          ) : (
            <p className="empty">
              일치하는 글이 없습니다.
              <br />
              다른 제목으로 찾아보세요.
            </p>
          )}
        </div>
        <p className="dialog-hint">
          글 제목으로 검색 · / 키로 열기 · Esc 키로 닫기
        </p>
      </dialog>
    </>
  );
};
