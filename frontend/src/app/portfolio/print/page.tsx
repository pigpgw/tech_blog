import Image from "next/image";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { portfolioProjects } from "@/content/portfolio";
import type { Metadata } from "next";
import { CodeSyncEvidence } from "../CodeSyncEvidence";
import { ProjectArtifacts } from "../ProjectArtifacts";
import { PortfolioCaseMarkdown } from "../PortfolioCaseMarkdown";

export const metadata: Metadata = {
  title: "박건우 포트폴리오 인쇄본",
  robots: { index: false, follow: false },
};

export default function PrintPortfolioPage() {
  return (
    <div className="pf-print">
      <header className="pf-print-cover">
        <p className="pf-label">DEVELOPER PORTFOLIO · 2026.09</p>
        <h1>박건우</h1>
        <p>Park Geon Woo</p>
        <p className="pf-lead">
          실시간 협업부터 AI 업무지원까지,
          <br />
          화면·API·상태로 연결한 개발 경험
        </p>
        <p>
          <a href="mailto:ceh20002@naver.com">ceh20002@naver.com</a> ·{" "}
          <a href="https://github.com/pigpgw">github.com/pigpgw</a>
        </p>
        {portfolioProjects.map((project, index) => (
          <section key={project.slug}>
            <p className="pf-label">
              0{index + 1} · {project.affiliation}
            </p>
            <h2>{project.name}</h2>
            <p>{project.introduction}</p>
            <p>{project.summary}</p>
          </section>
        ))}
      </header>
      {portfolioProjects.map((project) => (
        <article key={project.slug}>
          <header className="pf-print-overview">
            <p className="pf-label">{project.affiliation}</p>
            <h1>{project.name}</h1>
            <h2>{project.subtitle}</h2>
            <p>
              {project.period} · {project.role}
              {project.team ? ` · ${project.team}` : ""}
            </p>
            <p>{project.description}</p>
            <p className="pf-note">{project.stack.join(" · ")}</p>
            <figure>
              <Image
                src={project.image}
                alt={project.imageAlt}
                width={1280}
                height={720}
              />
              <figcaption>{project.caption}</figcaption>
            </figure>
            {project.links.map((link) => (
              <p key={link.href}>
                <a href={link.href}>
                  {link.label} · {link.href}
                </a>
              </p>
            ))}
          </header>
          {project.slug === "code-sync" && <CodeSyncEvidence />}
          <div className="pf-print-cases">
            {project.cases.map((item, index) => (
              <section key={item.title}>
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
                    <Image
                      src={item.image}
                      alt={item.caption ?? "구현 구조도"}
                      width={994}
                      height={1000}
                    />
                    <figcaption>{item.caption}</figcaption>
                  </figure>
                )}
              </section>
            ))}
          </div>
          <ProjectArtifacts slug={project.slug} />
        </article>
      ))}
    </div>
  );
}
