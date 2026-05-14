import Link from "next/link";
import { getPostBySlug } from "@/lib/blog-posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return {
      title: "글을 찾을 수 없습니다",
      description: "요청한 블로그 글을 찾을 수 없습니다.",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blogItem = getPostBySlug(slug);

  if (!blogItem) notFound();

  const titleId = "blog-post-title";

  return (
    <article aria-labelledby={titleId}>
      <Link href="/blog">목록으로 돌아가기</Link>

      <header>
        <p>{blogItem.category}</p>
        <time dateTime={blogItem.publishedAt}>{blogItem.publishedAt}</time>
        <h1 id={titleId}>{blogItem.title}</h1>
        <p>{blogItem.description}</p>
      </header>

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{ h1: "h2" }}
      >
        {blogItem.content}
      </ReactMarkdown>
    </article>
  );
}
