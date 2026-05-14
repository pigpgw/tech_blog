import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    default: "박건우 Tech Blog",
    template: "%s | 박건우 Tech Blog",
  },
  description: "개발하며 마주친 문제와 해결 과정을 기록하는 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header>
          <Link href="/">Park Gunwoo</Link>
          <nav aria-label="주요 메뉴">
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/resume">Resume</Link>
              </li>
              <li>
                <a
                  href="https://github.com/pigpgw"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>
        </header>
        <main id="main-content">{children}</main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
