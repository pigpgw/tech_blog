"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinkClass =
  "inline-flex min-h-11 items-center rounded-full border border-white/70 bg-white/90 px-4 text-slate-700 shadow-sm ring-1 ring-slate-900/[0.03] transition hover:-translate-y-0.5 hover:bg-white hover:text-slate-950 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500 aria-[current=page]:border-blue-200 aria-[current=page]:font-semibold aria-[current=page]:text-slate-950 aria-[current=page]:underline aria-[current=page]:decoration-2 aria-[current=page]:underline-offset-4";

export const HeaderNav = () => {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <nav
      aria-label="주요 메뉴"
      className="flex w-full flex-wrap items-center gap-2 text-sm font-medium sm:w-auto sm:justify-end"
    >
      <Link
        href="/"
        className={navLinkClass}
        aria-current={pathname === "/" ? "page" : undefined}
      >
        Home
      </Link>
      <Link
        href="/blog"
        className={navLinkClass}
        aria-current={isBlogPage ? "page" : undefined}
      >
        Blog
      </Link>
      <Link
        href="/resume"
        className={navLinkClass}
        aria-current={pathname === "/resume" ? "page" : undefined}
      >
        Resume
      </Link>
      <a
        href="https://github.com/pigpgw"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="박건우 GitHub 새 탭에서 열기"
        className={navLinkClass}
      >
        GitHub
      </a>
    </nav>
  );
};
