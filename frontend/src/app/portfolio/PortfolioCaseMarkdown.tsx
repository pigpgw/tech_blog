import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { PortfolioProject } from "@/content/portfolio";

type PortfolioCase = PortfolioProject["cases"][number];

const escapeMarkdown = (value: string) =>
  value.replaceAll("\\", "\\\\").replaceAll("_", "\\_");

export function PortfolioCaseMarkdown({ item }: { item: PortfolioCase }) {
  const markdown = [
    "### 상황",
    escapeMarkdown(item.problem),
    "### 판단",
    escapeMarkdown(item.decision),
    "### 구현",
    item.implementation.map((line) => `- ${escapeMarkdown(line)}`).join("\n"),
    "### 결과",
    `> ${escapeMarkdown(item.result)}`,
  ].join("\n\n");

  return (
    <div className="pf-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
    </div>
  );
}
