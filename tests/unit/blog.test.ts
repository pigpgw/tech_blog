import { describe, expect, it } from "vitest";
import {
  buildBlogCategoryHref,
  parseBlogCategoryPath,
  slugifyBlogCategorySegment,
} from "@/lib/blog";

describe("blog category path", () => {
  it("parses category path into display segments", () => {
    expect(parseBlogCategoryPath("CSS/Flexbox Layout")).toEqual([
      "CSS",
      "Flexbox Layout",
    ]);
  });

  it("converts category segment to URL slug", () => {
    expect(slugifyBlogCategorySegment("Flexbox Layout")).toBe("flexbox-layout");
  });

  it("builds category href from category path", () => {
    expect(buildBlogCategoryHref("CSS/Flexbox Layout")).toBe(
      "/blog/categories/css/flexbox-layout",
    );
  });
});
