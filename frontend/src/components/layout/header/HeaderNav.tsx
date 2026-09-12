"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const links = [
  { href: "/", label: "홈" },
  { href: "/resume", label: "이력서" },
  { href: "/portfolio", label: "포트폴리오" },
  { href: "/blog", label: "기술블로그" },
  { href: "/lab", label: "실험실" },
];
export const HeaderNav = () => {
  const pathname = usePathname();
  return (
    <nav className="main-nav" aria-label="주요 메뉴">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          aria-current={
            pathname === href ||
            (href !== "/" && pathname.startsWith(href + "/"))
              ? "page"
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  );
};
