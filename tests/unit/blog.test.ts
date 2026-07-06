import { describe, expect, it } from "vitest";
import { getAllPostsSummary } from "@/lib/blog";

describe("blog category", () => {
  it("reads category path and label separately", () => {
    const post = getAllPostsSummary().find(
      (post) => post.slug === "claude-prompt-engineering-guide",
    );

    expect(post?.category).toEqual({
      path: "ai/prompt-engineering",
      label: "AI/Prompt Engineering",
    });
  });
});
