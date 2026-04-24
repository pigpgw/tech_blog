import Link from "next/link";
import { blogPosts } from "@/lib/blog-posts";
import { ChevronLeft, Clock3, Hash, NotebookPen } from "lucide-react";
import { notFound } from "next/navigation";

const articleSections: Record<
  number,
  {
    lead: string;
    sections: Array<{
      heading: string;
      body: string;
    }>;
  }
> = {
  1: {
    lead:
      "입력과 스크롤처럼 짧은 시간 안에 여러 번 호출되는 이벤트를 그대로 처리하면, 화면은 금방 버벅이고 네트워크 요청도 불필요하게 늘어난다. 이 글은 디바운스와 쓰로틀을 브라우저 이벤트 흐름 안에서 이해하는 데 초점을 맞춘다.",
    sections: [
      {
        heading: "왜 이벤트 제어가 필요한가",
        body: "keyup, resize, scroll은 사용자가 한 번 조작해도 연속적으로 발생한다. 이때 모든 이벤트를 즉시 처리하면 렌더링과 계산이 겹치며 사용성이 떨어진다. 핵심은 이벤트를 막는 것이 아니라, 사용자가 체감할 타이밍에 맞춰 처리 밀도를 조절하는 것이다.",
      },
      {
        heading: "디바운스가 어울리는 순간",
        body: "디바운스는 마지막 입력 이후 일정 시간이 지났을 때 한 번만 실행하는 전략이다. 검색 자동완성, 필터 입력, 저장 지연 처리처럼 사용자의 입력이 잠시 멈췄을 때만 반응해야 하는 경우에 적합하다.",
      },
      {
        heading: "쓰로틀이 어울리는 순간",
        body: "쓰로틀은 일정 시간 동안 최대 한 번만 실행한다. 스크롤 위치 추적, 드래그 중 좌표 계산, 뷰포트 감시처럼 연속 반응은 필요하지만 매 프레임마다 계산할 필요는 없는 작업에 잘 맞는다.",
      },
    ],
  },
  2: {
    lead:
      "개인 블로그를 App Router로 시작할 때 가장 먼저 필요한 건 최신 유행 기능보다 파일 구조와 책임 분리 기준이다. 이 글은 작은 MVP를 기준으로 어떤 결정을 먼저 고정했는지 정리한다.",
    sections: [
      {
        heading: "페이지 구조를 먼저 단순하게 잡기",
        body: "홈, 블로그 목록, 상세, 이력서처럼 명확한 페이지부터 나누면 App Router의 장점이 바로 드러난다. layout은 공통 틀에 집중하고, 각 페이지는 자기 목적에 맞는 정보 구조를 갖도록 분리하는 것이 이후 확장에 유리하다.",
      },
      {
        heading: "SEO와 메타데이터를 초기에 고려한 이유",
        body: "기술 블로그는 결국 검색과 공유가 중요한 매체다. 그래서 나중에 붙이는 옵션이 아니라, 페이지 제목과 설명이 어떤 식으로 관리될지를 초기에 정하는 편이 낭비가 적다.",
      },
      {
        heading: "퍼블리싱 우선순위",
        body: "MVP 단계에서는 화려한 인터랙션보다 정보 탐색이 먼저다. 첫 화면에서 블로그 목적이 드러나고, 목록은 빠르게 훑을 수 있으며, 상세는 읽기에 집중되는 구조가 우선이다.",
      },
    ],
  },
  3: {
    lead:
      "Tailwind CSS로 빠르게 퍼블리싱하려면 유틸리티를 많이 아는 것보다 기준을 먼저 고정하는 편이 더 중요하다. 간격, 타이포, 카드 밀도 같은 기본 규칙을 먼저 정리하면 화면 품질이 훨씬 안정된다.",
    sections: [
      {
        heading: "간격 규칙을 먼저 정하면 좋은 이유",
        body: "섹션 간격과 카드 내부 간격을 초기에 정해두면 화면이 들쭉날쭉해지지 않는다. 특히 블로그처럼 텍스트 중심 페이지에서는 여백이 정보 구조를 설명하는 역할까지 맡는다.",
      },
      {
        heading: "타이포 스케일은 적을수록 강하다",
        body: "제목, 본문, 보조 텍스트 정도만 분명하게 나눠도 충분한 경우가 많다. 크기 단계를 과하게 늘리면 오히려 페이지 전체가 산만해지고 읽는 흐름이 약해진다.",
      },
      {
        heading: "반응형은 축소가 아니라 재배치",
        body: "모바일 대응은 단순히 글자 크기를 줄이는 작업이 아니다. 탭 가능한 영역, 줄바꿈, 섹션 밀도를 다시 조정해 작은 화면에서도 탐색 흐름이 유지되도록 만들어야 한다.",
      },
    ],
  },
};

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const blogItem = blogPosts.find((item) => item.id === Number(id));
  if (!blogItem) notFound();
  const article = articleSections[blogItem.id];
  if (!article) notFound();

  return (
    <article className="flex flex-1 flex-col py-10 sm:py-14">
      <div className="flex items-center justify-between gap-4">
        <Link
          href="/blog"
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
          목록으로 돌아가기
        </Link>
      </div>

      <header className="mt-6 rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-white to-slate-50 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex min-h-9 items-center rounded-full bg-blue-50 px-3 font-semibold text-blue-700">
            {blogItem.category}
          </span>
          <span className="inline-flex min-h-9 items-center gap-2 rounded-full bg-slate-100 px-3 font-medium text-slate-600">
            <Clock3 className="size-4" aria-hidden="true" />
            {blogItem.publishedAt}
          </span>
        </div>

        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-4xl">
          {blogItem.title}
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
          {blogItem.description}
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Category
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              {blogItem.category}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Slug
            </p>
            <p className="mt-2 break-all text-sm font-semibold text-slate-900">
              {blogItem.slug}
            </p>
          </div>
          <div className="rounded-3xl border border-slate-200 bg-white/80 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Reading
            </p>
            <p className="mt-2 text-sm font-semibold text-slate-900">
              약 3분
            </p>
          </div>
        </div>
      </header>

      <section className="mt-8 rounded-[32px] border border-slate-200 bg-white px-7 py-8 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:px-10 sm:py-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <NotebookPen className="size-4" aria-hidden="true" />
          Article
        </div>

        <p className="mt-6 text-base leading-8 text-slate-700">
          {article.lead}
        </p>

        <div className="mt-10 space-y-10">
          {article.sections.map((section) => (
            <section key={section.heading}>
              <div className="flex items-center gap-2 text-slate-900">
                <Hash className="size-4 text-blue-600" aria-hidden="true" />
                <h2 className="text-xl font-semibold tracking-tight">
                  {section.heading}
                </h2>
              </div>
              <p className="mt-4 text-base leading-8 text-slate-700">
                {section.body}
              </p>
            </section>
          ))}
        </div>
      </section>
    </article>
  );
}
