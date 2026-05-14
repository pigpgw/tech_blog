import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "박건우 Resume",
  description:
    "박건우의 프론트엔드, AI, 백엔드 프로젝트 경험과 기술 역량을 정리한 이력서",
};

const techGroups = [
  {
    title: "Core Web",
    items: ["React", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    title: "UI / State",
    items: ["Tailwind CSS", "Styled Components", "Zustand", "TanStack Query"],
  },
  {
    title: "Backend / Data",
    items: ["Express.js", "MySQL", "REST API"],
  },
  {
    title: "AI / Cloud",
    items: ["AWS Bedrock", "Lambda", "SQS"],
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
    role: "Software Engineer · 정규직",
    description:
      "자사 서비스 개발 및 대기업 공통업무 플랫폼에서 AI 챗봇 구축, 기존 기능 분리와 업무 개선을 수행했습니다.",
    projects: [
      {
        title: "프비티",
        period: "2025.07 - 2026.01",
        stack:
          "React, Next.js, TypeScript, Styled Components, Docker, Jest, Cypress",
        links: [],
        bullets: [
          "프랜차이즈 본사의 고객 관리(CRM), 멤버십, 수발주, 가맹점 운영을 통합 관리하는 B2B SaaS 서비스입니다.",
          "글줄 중심의 단일 리스트형 고객 랜딩을 Next.js 기반 콘텐츠·팝업·공지사항·배너/캐러셀·리스트·상세 화면으로 리뉴얼해 가맹점별 소식과 콘텐츠 탐색 구조를 개선했습니다.",
          "네이버 리뷰 유도 프로모션과 점주용 자동 응답 프로그램을 연계해 리뷰 수집부터 응대까지 이어지는 운영 흐름을 구축했습니다.",
          "AI 도구를 활용해 36K LOC·300+ 파일·39개 API 규모의 모노레포 의존성을 분석하고 영업관리·계정관리 기능을 독립 서비스로 분리했습니다.",
        ],
      },
      {
        title: "LG 공통업무 플랫폼",
        period: "2025.10 - 2025.12",
        stack:
          "React, TypeScript, Express, MySQL, AWS Bedrock, Docker, Jest, Cypress",
        links: [],
        bullets: [
          "LG 그룹 전 계열사가 사용하는 공통업무 서비스 안에서 AI 업무지원 챗봇 기능을 개발한 프로젝트입니다.",
          "외부 LLM 사용이 제한된 보안 환경에서 AWS Bedrock 기반 AI 업무지원 챗봇을 설계·개발·배포·운영하고, 자연어 질의를 업무 데이터 조회·분석·그래프 생성 흐름으로 연결했습니다.",
          "1~2분 소요되는 에이전트 작업을 오류로 오인하는 문제를 Bedrock Trace 기반 진행 상태 UI로 개선하고, 채팅 히스토리 검색·하이라이팅·메시지 위치 이동을 구현했습니다.",
          "Bedrock 호출과 민감 정보를 Lambda/IAM Role 경계에서 처리하고 AI Markdown 응답에 DOMPurify 기반 XSS 정제를 적용했으며, Jest·Cypress 테스트 커버리지 80% 이상을 유지했습니다.",
        ],
      },
    ],
  },
  {
    company: "크래프톤 정글 6기",
    period: "2024.07 - 2024.12",
    role: "Software Engineering Training",
    description:
      "주 100시간 이상 몰입형 학습으로 전산학 기반을 다지고, 매주 팀을 바꿔가며 페어 프로그래밍과 다양한 팀 프로젝트를 수행했습니다.",
    projects: [
      {
        title: "CS 학습 및 Code Sync",
        period: "2024.07 - 2024.11",
        stack: "C, CSAPP, Pintos, React, TypeScript, Vite, Yjs, Monaco Editor",
        links: [
          {
            label: "우수 프로젝트",
            href: "https://jungle.krafton.com/news/59",
          },
          {
            label: "팀 문서",
            href: "https://confused-dietician-c17.notion.site/Jungle-Code-Sync-16a7caa087bd80d5b73ee5b35857ff7a",
          },
        ],
        bullets: [
          "주 100시간 이상 전산학 기반을 학습하며 CSAPP 기반 시스템 프로그래밍, Pintos 운영체제 프로젝트, 실시간 코드 리뷰 협업 서비스 개발을 수행했습니다.",
          "CSAPP 기반 시스템 프로그래밍 학습을 통해 malloc, mmap 메모리 관리 및 Tiny Web Server를 구현하고, Pintos 운영체제 프로젝트에서 Thread Scheduling, Process Management, File System을 구현했습니다.",
          "Code Sync에서 route 단위 code splitting과 lazy loading을 적용해 초기 JS 번들을 1,820KB에서 99KB로 줄였습니다. (94.5% 감소)",
          "PR 리뷰 화면 동기화와 코드 리뷰 프로세스 개선으로 팀 주간 평균 PR 댓글을 285건에서 89건으로 줄이고, 설문 기반 불편 응답을 50건에서 5건으로 줄였으며 우수 프로젝트로 공식 홈페이지에 소개됐습니다.",
        ],
      },
    ],
  },
];

const awardItems = [
  {
    text: "2023.07.07 ICICT 2023 치앙마이 포스터상 - 원격의료를 위한 AI 기반 의료영상 처리 연구",
  },
  {
    text: "2024.02.24 조선대학교 총장배 모범상 - 의료영상 딥러닝 모델 성능 분석 연구 성과 인정",
  },
  {
    text: "2023.08.29 조선대학교 IT융합대학 캡스톤디자인 경진대회 은상 - 암전이 예측 서비스",
  },
];

const educationItems = [
  {
    text: "2018.03 - 2024.02 조선대학교 전자공학과 / AI 헬스케어 융합전공 졸업",
  },
];

const contacts = [
  {
    label: "Email",
    value: "ceh20002@naver.com",
    href: "mailto:ceh20002@naver.com",
    accessibleName: "이메일 보내기: ceh20002@naver.com",
  },
  {
    label: "Phone",
    value: "010-9473-7427",
    href: "tel:01094737427",
    accessibleName: "전화 걸기: 010-9473-7427",
  },
];

export default function ResumePage() {
  return (
    <>
      <section>
        <p>Resume</p>
        <h1>박건우</h1>
        <p>Developer</p>
        <p>
          전자공학으로 시작해 스타트업 인턴, 국제 학회 연구, 대기업 프로젝트까지
          다양한 환경에서 경험을 쌓아온 Developer입니다. 디지엠유닛원에서 B2B
          SaaS와 LG 공통업무 서비스의 AI 업무지원 기능을 개발하며 사용자 흐름,
          데이터 연동, 보안 경계를 함께 고려한 제품 개선을 경험했습니다.
        </p>

        <ul>
          {contacts.map(({ label, value, href, accessibleName }) => (
            <li key={label}>
              <a href={href} aria-label={accessibleName}>
                {label}: {value}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="이력 상세 정보">
        <section>
          <p>Stack</p>
          <h2>기술 스택</h2>
          <p>프로젝트에서 실제 사용한 기술만 분류했습니다.</p>

          <div>
            {techGroups.map((group) => (
              <section key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section>
          <h2>수상</h2>
          <ul>
            {awardItems.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2>학력</h2>
          <ul>
            {educationItems.map((item) => (
              <li key={item.text}>{item.text}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="resume-experience">
          <p>Experience</p>
          <h2 id="resume-experience">주요 경험</h2>

          <div>
            {experiences.map((experience) => (
              <article key={experience.company}>
                <header>
                  <h3>{experience.company}</h3>
                  <p>{experience.role}</p>
                  <p>{experience.period}</p>
                  <p>{experience.description}</p>
                </header>

                <div>
                  {experience.projects.map((project) => (
                    <section key={project.title}>
                      <h4>{project.title}</h4>
                      <p>{project.period}</p>
                      <p>Tech Stack : {project.stack}</p>
                      {project.links.length > 0 ? (
                        <ul>
                          {project.links.map((link) => (
                            <li key={link.href}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} ${link.label} 새 탭에서 열기`}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                      <ul>
                        {project.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
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
    </>
  );
}
