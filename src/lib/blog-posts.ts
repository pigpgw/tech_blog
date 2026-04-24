export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "debounce-throttle-browser-events",
    title: "디바운스와 쓰로틀을 브라우저 이벤트 흐름으로 이해하기",
    description:
      "입력 이벤트와 스크롤 핸들러를 예시로 디바운스, 쓰로틀이 왜 필요한지와 언제 선택해야 하는지 정리한다.",
    publishedAt: "2026.04.20",
    category: "JavaScript",
  },
  {
    id: 2,
    slug: "nextjs-app-router-first-impression",
    title: "Next.js App Router로 개인 기술 블로그를 시작하며 정한 기준",
    description:
      "App Router 구조, 레이아웃 분리 기준, SEO와 퍼블리싱 우선순위를 초기 MVP 관점에서 정리한다.",
    publishedAt: "2026.04.18",
    category: "Next.js",
  },
  {
    id: 3,
    slug: "tailwind-publishing-rules",
    title: "Tailwind CSS로 퍼블리싱할 때 먼저 맞춘 규칙들",
    description:
      "간격, 타이포그래피, 반응형 기준을 먼저 고정해두면 퍼블리싱 속도와 일관성이 어떻게 달라지는지 기록한다.",
    publishedAt: "2026.04.14",
    category: "CSS",
  },
];

export const blogCategories = Array.from(
  new Set(blogPosts.map((post) => post.category)),
);
