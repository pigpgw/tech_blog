import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { BlogPostCard } from "@/components/blog/BlogPostCard";

describe("BlogPostCard", () => {
  it("renders category label for display", () => {
    const html = renderToStaticMarkup(
      <BlogPostCard
        slug="claude-prompt-engineering-guide"
        title="Claude Prompt Engineering Guide"
        description="프롬프트 엔지니어링 가이드"
        publishedAt="2026-01-01"
        categoryLabel="AI > Prompt Engineering"
      />,
    );

    expect(html).toContain("AI &gt; Prompt Engineering");
    expect(html).not.toContain("AI/Prompt Engineering");
  });
});
