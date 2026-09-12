import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/Footer";
export const metadata: Metadata = {
  title: { default: "박건우 Tech Blog", template: "%s | 박건우 Tech Blog" },
  description: "개발하며 마주친 문제와 해결 과정을 기록하는 기술 블로그",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body id="top">
        <a href="#main-content" className="skip">
          본문으로 바로 이동
        </a>
        <Header />
        <main id="main-content" className="wrap app-main">
          {children}
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
