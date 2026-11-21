import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import { isValidElement, type ReactNode } from "react";
import { BlogCategoryBadge } from "@/components/blog/BlogCategoryBadge";
import {
  CodeBlock,
  ReadingProgress,
} from "@/components/blog/ArticleInteractions";
import {
  getBlogCategories,
  getBlogPostDetail,
  getBlogPosts,
} from "@/services/blog";
import { buildCategoryLabelSegments } from "@/lib/blog-categories";
import {
  formatPublishedDate,
  getArticleHeadings,
  getReadingMinutes,
} from "@/lib/blog-presentation";
type Props = { params: Promise<{ slug: string }> };

const languageLabels: Record<string, string> = {
  bash: "Bash",
  css: "CSS",
  html: "HTML",
  javascript: "JavaScript",
  js: "JavaScript",
  json: "JSON",
  markdown: "Markdown",
  md: "Markdown",
  plaintext: "Plain text",
  py: "Python",
  python: "Python",
  text: "Plain text",
  ts: "TypeScript",
  txt: "Plain text",
  typescript: "TypeScript",
  xml: "XML",
};

const getCodeLanguageLabel = (children: ReactNode): string => {
  const codeElement = Array.isArray(children)
    ? children.find((child) => isValidElement(child))
    : children;

  if (!isValidElement<{ className?: string }>(codeElement)) {
    return "Plain text";
  }

  const className = codeElement.props.className;
  const language =
    typeof className === "string"
      ? className.match(/(?:language|lang)-([\w-]+)/)?.[1]
      : undefined;

  if (!language) return "Plain text";
  return languageLabels[language.toLowerCase()] ?? language;
};

export const dynamicParams = false;
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = (await getBlogPosts()).find((item) => item.slug === slug);
  return post
    ? { title: post.title, description: post.description }
    : {
        title: "글을 찾을 수 없습니다",
        description: "요청한 블로그 글을 찾을 수 없습니다.",
      };
}
export async function generateStaticParams() {
  return (await getBlogPosts()).map((post) => ({ slug: post.slug }));
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const summary = posts.find((post) => post.slug === slug);
  if (!summary) notFound();
  const post = await getBlogPostDetail(summary.id);
  if (!post) notFound();
  const headings = getArticleHeadings(post.content);
  return (
    <>
      <ReadingProgress />
      <div className="article-shell">
        <Link className="article-back" href="/blog">
          <ArrowLeft size={15} aria-hidden="true" /> 모든 기록으로 돌아가기
        </Link>
        <article aria-labelledby="article-title">
          <header className="article-header">
            <div className="meta">
              <BlogCategoryBadge
                labelSegments={buildCategoryLabelSegments(
                  post.categoryId,
                  categories,
                )}
              />
              <span>DEVELOPMENT NOTES</span>
            </div>
            <h1 id="article-title">{post.title}</h1>
            <p className="dek">{post.description}</p>
            <div className="byline">
              <span className="avatar" aria-hidden="true">
                g
              </span>
              <span>박건우</span>
              <span aria-hidden="true">·</span>
              <time dateTime={post.publishedAt}>
                {formatPublishedDate(post.publishedAt)}
              </time>
              <span aria-hidden="true">·</span>
              <span>약 {getReadingMinutes(post.content)}분 읽기</span>
            </div>
          </header>
          <div
            className={
              "reading-layout" + (headings.length === 0 ? " no-toc" : "")
            }
          >
            <div className="prose blog-markdown">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  h1: ({ node, ...props }) => (
                    <h2
                      {...props}
                      id={"section-" + node?.position?.start.line}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h2
                      {...props}
                      id={"section-" + node?.position?.start.line}
                    />
                  ),
                  h3: ({ node, ...props }) => (
                    <h3
                      {...props}
                      id={"section-" + node?.position?.start.line}
                    />
                  ),
                  pre: ({ children }) => (
                    <CodeBlock languageLabel={getCodeLanguageLabel(children)}>
                      {children}
                    </CodeBlock>
                  ),
                  table: ({ children }) => (
                    <div
                      className="markdown-table"
                      tabIndex={0}
                      role="region"
                      aria-label="표"
                    >
                      <table>{children}</table>
                    </div>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
              <div className="article-end">
                <span className="muted">읽어주셔서 감사합니다.</span>
                <Link className="small-link" href="/blog">
                  다른 기록 읽기 <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
            {headings.length > 0 && (
              <nav className="article-toc" aria-label="글 목차">
                <p className="eyebrow">IN THIS NOTE</p>
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={"#" + heading.id}
                    className={
                      heading.level === 3 ? "toc-subheading" : undefined
                    }
                  >
                    {heading.title}
                  </a>
                ))}
                <div className="sidebar-note">
                  <span className="serif">Read slowly.</span>
                </div>
              </nav>
            )}
          </div>
        </article>
      </div>
    </>
  );
}
