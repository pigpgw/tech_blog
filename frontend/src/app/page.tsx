import Link from "next/link";
import { ArrowUpRight, CornerDownRight, Asterisk } from "lucide-react";
import { getBlogCategories, getBlogPosts } from "@/services/blog";
import {
  buildBlogListItems,
  formatPublishedDate,
} from "@/lib/blog-presentation";
import { homeContent } from "@/content/home";
import { ConnectionArtwork } from "@/components/home/ConnectionArtwork";
import { PostArtwork } from "@/components/blog/PostArtwork";
export default async function Home() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getBlogCategories(),
  ]);
  const items = buildBlogListItems(posts, categories);
  const [featured, ...remaining] = items.slice(0, 4);
  const exploration = homeContent.currentExploration;
  const relatedPost = items.find(
    (post) => post.slug === exploration.relatedPostSlug,
  );
  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <div>
          <p className="eyebrow hero-kicker">
            <span className="status-dot" aria-hidden="true" /> A WORK IN
            PROGRESS, ALWAYS.
          </p>
          <h1 className="hero-title serif" id="home-title">
            Build. Learn.<span className="second">Make sense.</span>
          </h1>
          <p className="hero-copy">
            {homeContent.headline}
            <small>{homeContent.introduction}</small>
          </p>
          <Link className="text-link" href="/resume">
            조금 더 알아보기 <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
        <ConnectionArtwork />
      </section>
      <div className="intro-strip">
        <span>웹 개발부터 AI, 클라우드까지. 직접 해보며 남긴 생각들.</span>
        <span>Notes from the journey, not the finish line.</span>
      </div>
      <section className="section" aria-labelledby="latest-heading">
        <div className="section-heading">
          <h2 id="latest-heading">
            최근 글 <span>Latest notes</span>
          </h2>
          <Link className="small-link" href="/blog">
            모든 글 보기 <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
        {featured ? (
          <div
            className={
              "feature-grid" +
              (remaining.length === 0 ? " feature-grid-single" : "")
            }
          >
            <article>
              <Link className="feature-link" href={"/blog/" + featured.slug}>
                <PostArtwork />
                <div className="feature-copy">
                  <div className="meta">
                    <span className="category">
                      {featured.categoryLabelSegments.join(" / ")}
                    </span>
                    <span>LATEST NOTE</span>
                  </div>
                  <h3>{featured.title}</h3>
                  <p>{featured.description}</p>
                  <div className="meta">
                    <time dateTime={featured.publishedAt}>
                      {formatPublishedDate(featured.publishedAt)}
                    </time>
                    <ArrowUpRight size={15} aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </article>
            {remaining.length > 0 && (
              <div className="compact-list">
                {remaining.map((post) => (
                  <article key={post.slug}>
                    <Link className="compact-item" href={"/blog/" + post.slug}>
                      <div>
                        <div className="meta">
                          <span className="category">
                            {post.categoryLabelSegments.join(" / ")}
                          </span>
                          <time dateTime={post.publishedAt}>
                            {formatPublishedDate(post.publishedAt)}
                          </time>
                        </div>
                        <h3>{post.title}</h3>
                      </div>
                      <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </article>
                ))}
              </div>
            )}
          </div>
        ) : (
          <p className="empty">
            아직 발행된 글이 없습니다. 첫 번째 기록을 준비하고 있습니다.
          </p>
        )}
      </section>
      <div className="home-bottom">
        <section className="note-row" aria-labelledby="exploration-title">
          <CornerDownRight className="note-icon" size={34} aria-hidden="true" />
          <div>
            <p className="eyebrow note-label">
              현재 탐구 <span lang="en">Currently exploring</span>
            </p>
            <h2 id="exploration-title">{exploration.title}</h2>
            <p>{exploration.description}</p>
            <p>{exploration.topics.join(" · ")}</p>
            {relatedPost && (
              <Link className="small-link" href={"/blog/" + relatedPost.slug}>
                관련 기록 읽기 <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            )}
          </div>
        </section>
        <section className="note-row" aria-labelledby="playground-title">
          <Asterisk className="note-icon" size={34} aria-hidden="true" />
          <div>
            <p className="eyebrow note-label">
              실험실 <span lang="en">The playground</span>
            </p>
            <h2 id="playground-title">작은 실험, 뜻밖의 발견.</h2>
            <p>궁금해서 만들어 본, 직접 만져볼 수 있는 조각들.</p>
            <Link href="/lab" className="small-link">
              실험실 둘러보기 <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
