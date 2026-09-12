import Link from "next/link";
import { HeaderNav } from "@/components/layout/header/HeaderNav";
import { SiteSearch } from "@/components/layout/header/SiteSearch";
import { getBlogPosts } from "@/services/blog";
import { sortPublishedPosts } from "@/lib/blog-presentation";
export const Header = async () => {
  const posts = sortPublishedPosts(await getBlogPosts()).map(
    ({ slug, title, publishedAt }) => ({ slug, title, publishedAt }),
  );
  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" aria-label="박건우 홈으로 이동">
          <span className="brand-mark" aria-hidden="true">
            g
          </span>
          <span className="brand-word">geonwoo.</span>
          <span className="brand-note">
            A DEVELOPER’S
            <br />
            FIELD NOTES
          </span>
        </Link>
        <HeaderNav />
        <div className="header-tools">
          <SiteSearch posts={posts} />
        </div>
      </div>
    </header>
  );
};
