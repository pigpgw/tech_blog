import Link from "next/link";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  Mail,
  Phone,
} from "lucide-react";

const techGroups = [
  {
    title: "Core Frontend",
    items: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    title: "UI / State",
    items: ["Tailwind CSS", "Zustand", "TanStack Query"],
  },
  {
    title: "Backend / Data",
    items: ["Express.js", "Flask", "MySQL", "MariaDB", "DynamoDB"],
  },
  {
    title: "Cloud",
    items: ["AWS"],
  },
  {
    title: "Quality",
    items: ["Jest", "Cypress"],
  },
];

const experiences = [
  {
    company: "디지엠유닛원",
    period: "2025.07 - 2026.01",
    role: "Software Engineer",
    description:
      "자사 B2B SaaS와 LG 공통 업무 플랫폼에서 React UI, API, 데이터, AWS 서버리스 흐름을 함께 다뤘습니다.",
    projects: [
      {
        title: "LG 공통 업무 플랫폼 CPPM",
        period: "2025.10 - 2025.12",
        stack: "React · AWS Bedrock · Lambda · SQS · DynamoDB · S3",
        links: [],
        bullets: [
          "외부 LLM 사용이 제한된 대기업 보안 환경에서 AWS Lex와 Bedrock Agent를 비교 검토하고, 자유 질의와 동적 시각화 요구에 맞춰 Bedrock 기반 AI 챗봇 PoC와 아키텍처를 설계했습니다.",
          "일반 대화까지 분석 지침이 붙던 구조를 Routing Agent, 대화 Agent, 분석 Agent로 분리해 요청 유형별로 필요한 지침과 도구만 사용하도록 구성했습니다.",
          "업무 지침 직접 주입 방식을 Knowledge Base RAG로 전환해 관련 chunk만 참조하도록 만들고, 고정 지침 2K token과 업무 문서 20K token을 매번 넣는 예시 대비 5개 chunk 기준 약 4.5K token 수준으로 입력 컨텍스트를 줄일 수 있는 구조를 잡았습니다.",
          "OpenSearch 조회, Knowledge Base 지표 정의 참조, 그래프 코드 동적 생성, Lambda 실행, S3 저장, URL 반환으로 이어지는 데이터 시각화 파이프라인을 구현했습니다.",
          "초기 프롬프트만으로는 검색어 임의 변경, 결과 없음 상황의 허위 응답, URL 누락이 반복되어 Agent별 출력 규칙, 재시도 제한, Lambda 실행 검증을 함께 두는 하네스 엔지니어링을 적용했습니다.",
          "API Gateway WebSocket route Lambda가 Bedrock 응답을 기다리며 타임아웃되는 문제를 Request Lambda, SQS, Worker Lambda, DynamoDB 기반 비동기 처리로 분리했습니다.",
          "엘리베이터 피치 효과 관점에서 단순 로딩 대신 Agent Trace를 파싱해 요청 분석, Agent 라우팅, OpenSearch 조회, 그래프 생성, S3 업로드 단계를 실시간 UI로 표시했습니다.",
          "AI 생성 Markdown은 DOMPurify sanitize 후 렌더링하고, API Key와 Bedrock 호출은 Lambda 뒤로 격리했으며, Agent와 Lambda별 IAM Role을 최소 권한으로 분리했습니다.",
        ],
      },
      {
        title: "프비티 B2B SaaS",
        period: "2025.07 - 2026.01",
        stack: "React · Next.js · MariaDB · MySQL",
        links: [],
        bullets: [
          "고객 랜딩, 콘텐츠, 이벤트, 배너, 팝업, 룰렛 프로모션 등 사용자 노출 기능을 확장하고 진입, 참여, 결과 확인, 혜택 수령, 리뷰 유도 플로우를 구현했습니다.",
          "게임 정보 조회, 결과 수령 확인, CTA 클릭 여부 등 프로모션 API를 연동하고 storeTableHashID 기반 중복 참여 방지와 예외 처리를 적용했습니다.",
          "36,238 LOC, 300+ 파일, 39개 API 규모의 영업관리 시스템을 기존 수발주 시스템에서 분리하는 작업에 참여했습니다.",
          "인증·계정 경계가 기존 서비스에 묶여 있던 문제를 직원 정보 기반 로그인, 직원·코드 관리 기능 이관, MariaDB API 규격 수정으로 정리했습니다.",
          "PHP/MySQL 기반 레거시 코드와 신규 React 화면이 함께 동작해야 하는 제약에서 API 의존성과 화면 진입 흐름을 조정했습니다.",
        ],
      },
    ],
  },
  {
    company: "스마일게이트 윈터 데브",
    period: "2025.01 - 2025.03",
    role: "Team Project Developer",
    description:
      "현업자 피드백을 바탕으로 8주간 팀 단위 서비스 설계, 구현, 배포를 수행했습니다.",
    projects: [
      {
        title: "SmileTogether",
        period: "2025.01 - 2025.03",
        stack: "React · Zustand · TanStack Query · Socket.io · CI/CD",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/pigpgw/smiletogether",
          },
        ],
        bullets: [
          "서비스 운영 흐름이 끊기지 않도록 알림, 채팅, CI/CD 파이프라인 자동화를 구현했습니다.",
          "기능 구현뿐 아니라 릴리즈와 운영 흐름까지 고려해 팀 단위 개발을 진행했습니다.",
        ],
      },
    ],
  },
  {
    company: "크래프톤 정글 6기",
    period: "2024.07 - 2024.12",
    role: "Software Engineering Training",
    description:
      "주 100시간 이상 몰입형 학습과 팀 프로젝트를 통해 CS 기초와 서비스 구현 역량을 훈련했습니다.",
    projects: [
      {
        title: "Code Sync",
        period: "2024.10 - 2024.11",
        stack: "React · TypeScript · Socket.io · Tailwind CSS · Zustand · Monaco · Yjs",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/pigpgw/code-sync-fe",
          },
          {
            label: "팀 저장소",
            href: "https://github.com/jungle-6-3/code-sync-fe",
          },
        ],
        bullets: [
          "GitHub PR 번호 입력만으로 메타데이터, 변경 파일, diff, 리뷰 댓글을 수집하고 Monaco Editor에서 실시간 코드 리뷰를 진행하는 협업 도구를 구현했습니다.",
          "삭제·이동된 파일 댓글이 GitHub REST API의 최신 파일 목록에서 빠지는 문제를 comment.path와 현재 filename 비교로 재해석해 Outdated 상태와 안내 메시지로 표시했습니다.",
          "PR 병합 후 head 브랜치 삭제로 변경 내역 조회가 실패하던 문제를 branch ref 기준에서 merge commit SHA 또는 head SHA 기반 stableRef 조회로 전환했습니다.",
          "사용자별 GitHub API 반복 호출 구조를 방 생성자 1회 조회와 Y.Doc 공유 상태 동기화 구조로 바꿔 2인 접속 기준 API Call을 약 40% 줄였습니다.",
          "Monaco Editor + Yjs 기반 동시 편집, 커서 동기화, 상대방 코드 위치 이동, Editor 화면 캡처 후 Draw Board 공유 기능을 구현했습니다.",
          "Monaco, Excalidraw, BlockNote, Yjs, Peer.js가 초기 번들에 몰리던 문제를 route chunk로 분리해 초기 JS gzip 번들을 1,820.83 KiB에서 99.35 KiB로 줄였습니다.",
          "코드 리뷰 프로세스 개선을 통해 팀 주간 평균 PR 댓글 수를 285건에서 89건으로 줄였고, 크래프톤 정글 우수 프로젝트로 선정됐습니다.",
        ],
      },
      {
        title: "시스템 프로그래밍 · 운영체제",
        period: "2024.07 - 2024.09",
        stack: "C · CSAPP · Pintos",
        links: [
          {
            label: "Pintos",
            href: "https://github.com/pigpgw/Pintos-kaist",
          },
          {
            label: "Malloc",
            href: "https://github.com/pigpgw/malloc-lab",
          },
          {
            label: "Tiny Web Server",
            href: "https://github.com/pigpgw/webproxy-lab",
          },
        ],
        bullets: [
          "CSAPP 기반 시스템 프로그래밍 학습을 통해 malloc, mmap 메모리 관리와 Tiny Web Server를 구현했습니다.",
          "Pintos 운영체제 프로젝트에서 Thread Scheduling, Process Management, File System을 구현했습니다.",
        ],
      },
    ],
  },
  {
    company: "국제공동 프로젝트",
    period: "2023.03 - 2023.12",
    role: "전자공학과 대표",
    description:
      "원격의료를 위한 AI 기반 의료영상처리 알고리즘 적용 연구에 참여했습니다.",
    projects: [
      {
        title: "원격의료 의료영상 AI 연구",
        period: "2023.03 - 2023.12",
        stack: "Python · PyTorch · U-Net · ResNet50",
        links: [
          {
            label: "GitHub",
            href: "https://github.com/pigpgw/AI-Powered-Image-Processing-for-Telemedicine",
          },
        ],
        bullets: [
          "뇌종양 영상과 폐질환 영상을 대상으로 의료영상 AI 모델과 optimizer 조합별 성능을 비교했습니다.",
          "ICICT 2023 치앙마이 포스터상과 조선대학교 총장배 모범상을 수상했습니다.",
        ],
      },
    ],
  },
  {
    company: "퓨처 이모텍",
    period: "2023.02",
    role: "단기 인턴",
    description:
      "탄소중립 시장 자료 조사와 보고서 작성을 지원했습니다.",
    projects: [
      {
        title: "탄소중립 시장 조사",
        period: "2023.02.02 - 2023.02.22",
        stack: "Research · Report",
        links: [],
        bullets: [
          "국내외 탄소중립 사례를 비교 분석하고 광주 지역 특성을 반영한 정책 기초 자료를 정리했습니다.",
        ],
      },
    ],
  },
  {
    company: "아티피셜 소사이어티",
    period: "2022.07",
    role: "단기 인턴",
    description:
      "AI 시선추적 기반 독해력 향상 서비스의 데이터와 모델 업무를 지원했습니다.",
    projects: [
      {
        title: "AI 시선추적 서비스 지원",
        period: "2022.07.02 - 2022.07.24",
        stack: "AI · Data · Crawling",
        links: [],
        bullets: [
          "데이터 증대, 데이터 확보, 모델 훈련, 크롤링 업무를 지원했습니다.",
        ],
      },
    ],
  },
];

const educationItems = [
  {
    text: "2024.07.01 - 2024.11.30 크래프톤 정글 6기 - 우수 프로젝트 선정(Code Sync)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pigpgw/code-sync-fe",
      },
      {
        label: "우수 프로젝트",
        href: "https://jungle.krafton.com/news/59",
      },
    ],
  },
  {
    text: "2024.02.18 조선대학교 졸업 및 총장배 모범상 수상",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pigpgw/AI-Powered-Image-Processing-for-Telemedicine",
      },
    ],
  },
  {
    text: "2023.08.29 조선대학교 IT융합대학 캡스톤디자인 경진대회 은상(암진단 프로젝트)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pigpgw/cancer-metastasis-prediction",
      },
    ],
  },
  {
    text: "2023.07.06 - 2023.07.08 ICICT 치앙마이 포스터상(원격의료 의료영상 AI 모델 성능 비교 연구)",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/pigpgw/AI-Powered-Image-Processing-for-Telemedicine",
      },
    ],
  },
  {
    text: "2018.03 - 2024.02 조선대학교 전자공학과 / AI 헬스케어 융합전공",
  },
];

const contacts = [
  {
    label: "Email",
    value: "ceh20002@naver.com",
    href: "mailto:ceh20002@naver.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "010-9473-7427",
    href: "tel:01094737427",
    icon: Phone,
  },
  {
    label: "GitHub",
    value: "github.com/pigpgw",
    href: "https://github.com/pigpgw",
    icon: Code2,
  },
];

export default function ResumePage() {
  return (
    <main className="flex flex-1 flex-col py-10 sm:py-14">
      <section className="rounded-[32px] border border-slate-200/80 bg-linear-to-br from-white via-white to-slate-50 p-7 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_20px_48px_rgba(15,23,42,0.08)] sm:p-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-blue-600">Resume</p>
            <h1 className="mt-3 text-4xl font-semibold tracking-[-0.04em] text-slate-950 sm:text-5xl">
              자기소개 및 이력
            </h1>
            <p className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-slate-900 sm:text-3xl">
              박건우
            </p>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              누군가에게 도움이 되는 서비스를 만들고 싶다는 마음으로 개발하는
              박건우입니다.
            </p>
          </div>

          <div className="grid gap-2 text-sm text-slate-600">
            {contacts.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 font-medium transition hover:border-slate-300 hover:text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
              >
                <Icon className="size-4 text-blue-600" aria-hidden="true" />
                <span>{value}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section
        aria-label="이력 상세 정보"
        className="mt-8 space-y-6"
      >
        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)] sm:p-7">
          <div className="flex flex-col gap-2 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">Stack</p>
              <h2 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950">
                기술 스택
              </h2>
            </div>
            <p className="text-sm leading-6 text-slate-500">
              프로젝트에서 실제 사용한 기술만 분류했습니다.
            </p>
          </div>

          <div className="mt-6 divide-y divide-slate-100">
            {techGroups.map((group) => (
              <div
                key={group.title}
                className="grid gap-3 py-4 first:pt-0 last:pb-0 sm:grid-cols-[160px_1fr] sm:items-start"
              >
                <h3 className="text-sm font-semibold leading-8 text-slate-950">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex min-h-8 items-center rounded-full px-1 text-sm font-medium text-slate-700"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)]">
          <h2 className="text-lg font-semibold text-slate-950">
            학력/수상/교육
          </h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-slate-700">
            {educationItems.map((item) => (
              <li key={item.text} className="flex gap-3">
                <BriefcaseBusiness
                  className="mt-1 size-4 shrink-0 text-blue-600"
                  aria-hidden="true"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <span className="min-w-0">{item.text}</span>
                  {item.links && item.links.length > 0 ? (
                    <div className="flex shrink-0 flex-wrap gap-1.5 sm:justify-end">
                      {item.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex min-h-7 items-center gap-1 whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-2.5 text-[11px] font-semibold leading-none text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                        >
                          {link.label}
                          <ArrowUpRight
                            className="size-2.5"
                            aria-hidden="true"
                          />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-labelledby="resume-experience"
          className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_rgba(15,23,42,0.08)] sm:p-7"
        >
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">Experience</p>
              <h2
                id="resume-experience"
                className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-slate-950"
              >
                주요 경험
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
            >
              작성 글 보기
              <ArrowUpRight className="size-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-6 space-y-8">
            {experiences.map((experience) => (
              <article key={experience.company} className="space-y-5">
                <header>
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight text-slate-950">
                        {experience.company}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-slate-500">
                        {experience.role}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-slate-400">
                      {experience.period}
                    </p>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {experience.description}
                  </p>
                </header>

                <div className="space-y-4">
                  {experience.projects.map((project) => (
                    <section
                      key={project.title}
                      className="border-l-2 border-slate-200 pl-4"
                    >
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <h4 className="font-semibold text-slate-950">
                          {project.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-400">
                          {project.period}
                        </p>
                      </div>
                      <p className="mt-2 text-xs font-semibold leading-6 text-blue-700">
                        {project.stack}
                      </p>
                      {project.links.length > 0 ? (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {project.links.map((link) => (
                            <a
                              key={link.href}
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-8 items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
                            >
                              {link.label}
                              <ArrowUpRight
                                className="size-3"
                                aria-hidden="true"
                              />
                            </a>
                          ))}
                        </div>
                      ) : null}
                      <ul className="mt-3 space-y-2">
                        {project.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex gap-3 text-sm leading-7 text-slate-700"
                          >
                            <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-400" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </section>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
