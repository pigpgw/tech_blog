import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { portfolioProjects } from "@/content/portfolio";
import { CodeSyncEvidence } from "../CodeSyncEvidence";
import { ProjectArtifacts } from "../ProjectArtifacts";
import { PortfolioCaseMarkdown } from "../PortfolioCaseMarkdown";

export function generateStaticParams() {
  return portfolioProjects.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolioProjects.find((project) => project.slug === slug);
  if (!project) return { title: "프로젝트를 찾을 수 없습니다" };
  return {
    title: `${project.name} 포트폴리오`,
    description: project.summary,
    alternates: { canonical: `https://www.pigpgw.cloud/portfolio/${slug}` },
    openGraph: {
      title: `${project.name} | 박건우`,
      description: project.summary,
      images: [{ url: `https://www.pigpgw.cloud${project.image}` }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = portfolioProjects.find((project) => project.slug === slug);
  if (!project) notFound();
  const next =
    portfolioProjects[
      (portfolioProjects.indexOf(project) + 1) % portfolioProjects.length
    ];
  return (
    <article className={`pf-detail pf-${project.theme}`}>
      <Link className="pf-back" href="/portfolio">
        <ArrowLeft size={16} /> 전체 프로젝트
      </Link>
      <header className="pf-detail-head">
        <p className="pf-label">{project.affiliation}</p>
        <h1>{project.name}</h1>
        <p className="pf-lead">{project.subtitle}</p>
        <p className="pf-description">{project.description}</p>
        <dl className="pf-meta">
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
              <dt>팀 구성</dt>
              <dd>{project.team}</dd>
            </div>
          )}
        </dl>
        <ul className="pf-stack">
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="pf-actions">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label}
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </header>
      <figure className="pf-figure">
        <a
          href={project.image}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.name} 이미지 원본 보기`}
        >
          <Image
            src={project.image}
            alt={project.imageAlt}
            width={1280}
            height={720}
            priority
          />
        </a>
        <figcaption>{project.caption}</figcaption>
      </figure>
      {project.slug === "code-sync" && <CodeSyncEvidence />}
      <div className="pf-detail-grid">
        <nav className="pf-toc" aria-label="프로젝트 목차">
          {project.slug === "code-sync" && <a href="#evidence">화면 증거</a>}
          {project.slug !== "code-sync" && (
            <a href="#artifacts">
              {project.slug === "cppm" ? "설계·프롬프트" : "Skill 적용 기준"}
            </a>
          )}
          {project.cases.map((item, index) => (
            <a key={item.title} href={`#case-${index + 1}`}>
              0{index + 1} · {item.title}
            </a>
          ))}
        </nav>
        <div className="pf-body">
          {project.cases.map((item, index) => (
            <section
              id={`case-${index + 1}`}
              className="pf-case"
              key={item.title}
            >
              <p className="pf-label">CASE 0{index + 1}</p>
              <h2>{item.title}</h2>
              <PortfolioCaseMarkdown item={item} />
              {"note" in item && item.note && (
                <p className="pf-note">{item.note}</p>
              )}
              {"code" in item && item.code && (
                <div
                  className="pf-case-code pf-editor-code"
                  data-language={item.code.language}
                >
                  <h3>{item.code.title}</h3>
                  <p>{item.code.description}</p>
                  <div className="pf-code-language" aria-hidden="true">
                    {item.code.language}
                  </div>
                  <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                    {`\`\`\`${item.code.language}\n${item.code.code}\n\`\`\``}
                  </ReactMarkdown>
                  <p className="pf-note">{item.code.source}</p>
                  {"href" in item.code &&
                    "file" in item.code &&
                    typeof item.code.href === "string" &&
                    typeof item.code.file === "string" && (
                    <a
                      className="pf-code-source"
                      href={item.code.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.code.file} · GitHub에서 원본 보기
                    </a>
                  )}
                </div>
              )}
              {"image" in item && item.image && (
                <figure className="pf-figure pf-inline-figure">
                  <a href={item.image} target="_blank" rel="noreferrer">
                    <Image
                      src={item.image}
                      alt={item.caption ?? "구현 구조도"}
                      width={994}
                      height={1000}
                    />
                  </a>
                  <figcaption>{item.caption}</figcaption>
                </figure>
              )}
            </section>
          ))}
          <ProjectArtifacts slug={project.slug} />
        </div>
      </div>
      <footer className="pf-next">
        <Link href="/portfolio">
          <ArrowLeft size={18} /> 목록
        </Link>
        {next && (
          <Link href={`/portfolio/${next.slug}`}>
            다음 프로젝트 · {next.name}
            <ArrowRight size={20} />
          </Link>
        )}
      </footer>
    </article>
  );
}
