import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export const NotFoundView = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <section className="not-found-view" aria-labelledby="not-found-title">
    <p className="eyebrow">404 / A SMALL DETOUR</p>
    <span className="serif not-found-number" aria-hidden="true">
      Lost, perhaps.
    </span>
    <h1 id="not-found-title">{title}</h1>
    <p>{description}</p>
    <div className="not-found-links">
      <Link className="solid-button" href="/blog">
        블로그 보기 <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
      <Link className="text-link" href="/">
        홈으로 이동 <ArrowUpRight size={16} aria-hidden="true" />
      </Link>
    </div>
  </section>
);
