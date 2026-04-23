import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
  title: "기술 블로그",
  description: "프론트엔드 학습 과정과 구현 경험을 정리하는 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="h-full font-sans antialiased">
      <body className="flex min-h-full flex-col">
        <main className="min-h-screen bg-[#f8fafc] text-slate-950">
          <div className="mx-auto flex min-h-full w-full max-w-3xl flex-col px-5 py-6 sm:px-8 sm:py-8">
            <Header />
            {children}
          </div>
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
