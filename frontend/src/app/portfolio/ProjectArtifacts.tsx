import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import { portfolioArtifacts } from "@/content/portfolio-artifacts";

export function ProjectArtifacts({ slug }: { slug: string }) {
  const artifact = portfolioArtifacts.find((item) => item.slug === slug);
  if (!artifact) return null;

  return (
    <section id="artifacts" className="pf-artifacts">
      <p className="pf-label">
        {slug === "cppm" ? "ARCHITECTURE & PROMPTS" : "WORKFLOW & SKILL"}
      </p>
      <h2>{artifact.title}</h2>
      <p>{artifact.introduction}</p>
      <ul className="pf-artifact-decisions">
        {artifact.decisions.map((decision) => (
          <li key={decision}>{decision}</li>
        ))}
      </ul>
      {artifact.examples.map((example) => (
        <div
          className="pf-code-example pf-artifact-example pf-editor-code"
          data-language={example.language}
          key={example.title}
        >
          <h3>{example.title}</h3>
          <p>{example.description}</p>
          <div className="pf-code-language" aria-hidden="true">
            {example.language}
          </div>
          <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
            {`\`\`\`${example.language}\n${example.code}\n\`\`\``}
          </ReactMarkdown>
          <a href={artifact.sourceUrl} target="_blank" rel="noreferrer">
            {example.source}
          </a>
        </div>
      ))}
    </section>
  );
}
