import Link from "next/link";
import Image from "next/image";
import { ArrowDownToLine, ArrowUpRight, Mail } from "lucide-react";
import type { Metadata } from "next";
import { portfolioProjects } from "@/content/portfolio";

export const metadata: Metadata = {
  title: "박건우 포트폴리오",
  description:
    "디지엠 유닛원의 CPPM·프비티와 크래프톤 정글 Code Sync. 화면, API, 실시간 상태를 연결한 개발 경험.",
  alternates: { canonical: "https://www.pigpgw.cloud/portfolio" },
  openGraph: {
    title: "박건우 | Developer Portfolio",
    description:
      "실시간 협업부터 AI 업무지원까지, 문제를 해결한 세 가지 프로젝트.",
    images: [{ url: "https://www.pigpgw.cloud/portfolio/code-sync.jpg" }],
  },
};

export default function PortfolioPage() {
  return (
    <>
      <header className="pf-intro">
        <p className="pf-label">Park Geon Woo · SELECTED WORK · 2024—2026</p>
        <h1>
          박건우 <span>Portfolio</span>
        </h1>
        <p className="pf-lead">
          실시간 협업부터 AI 업무지원까지,
          <br />
          복잡한 사용자 흐름을 화면·API·상태로 연결합니다.
        </p>
        <div className="pf-actions">
          <a
            className="pf-primary"
            href="/portfolio/park-geon-woo-portfolio.pdf"
            download
          >
            <ArrowDownToLine size={16} /> 포트폴리오 PDF
          </a>
          <Link href="/resume">
            이력서 <ArrowUpRight size={16} />
          </Link>
          <a href="https://github.com/pigpgw">
            GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
      <div className="pf-section-heading">
        <h2>주요 프로젝트</h2>
        <span>실무 2 · 팀 프로젝트 1</span>
      </div>
      <div className="pf-projects">
        {portfolioProjects.map((project, index) => (
          <article
            className={`pf-project pf-${project.theme}`}
            key={project.slug}
          >
            <div className="pf-project-heading">
              <span className="pf-index">0{index + 1}</span>
              <div>
                <p className="pf-label">{project.affiliation}</p>
                <h3>
                  <Link href={`/portfolio/${project.slug}`}>
                    {project.name}
                    <ArrowUpRight size={28} />
                  </Link>
                </h3>
                <p className="pf-subtitle">{project.introduction}</p>
                <dl className="pf-list-meta">
                  <div>
                    <dt>기간</dt>
                    <dd>{project.period}</dd>
                  </div>
                  <div>
                    <dt>역할</dt>
                    <dd>{project.role}</dd>
                  </div>
                  {project.team && (
                    <div>
                      <dt>팀</dt>
                      <dd>{project.team}</dd>
                    </div>
                  )}
                </dl>
              </div>
            </div>
            <Link
              className="pf-preview"
              href={`/portfolio/${project.slug}`}
              aria-label={`${project.name} 상세 보기`}
            >
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1280}
                height={720}
                priority={index === 0}
              />
            </Link>
            <div className="pf-project-bottom">
              <div>
                <p className="pf-label">담당한 일</p>
                <p>{project.summary}</p>
                <ul className="pf-stack">
                  {project.stack.slice(0, 4).map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
              </div>
              <Link className="pf-read" href={`/portfolio/${project.slug}`}>
                기여와 구현 상세 <ArrowUpRight size={18} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="pf-contact">
        <p className="pf-label">CONTACT</p>
        <h2>더 자세한 이야기를 나눠요.</h2>
        <a href="mailto:ceh20002@naver.com">
          <Mail size={20} />
          ceh20002@naver.com
          <ArrowUpRight size={20} />
        </a>
      </section>
    </>
  );
}
