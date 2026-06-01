import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const REVIEW_CONFIGS = {
  "code-review": {
    inputPath: path.join("tmp", "code-review", "current.md"),
    outputPath: path.join("tmp", "code-review", "index.html"),
    title: "Code Review",
    missingMessage:
      "Create the Markdown code review first, then run npm run code:review.",
  },
  "plan-review": {
    inputPath: path.join("docs", "plan", "current.md"),
    outputPath: path.join("docs", "plan", "index.html"),
    title: "Plan Review",
    missingMessage:
      "Create the Markdown plan at docs/plan/current.md from docs/plan/template.md, then run npm run plan:review.",
  },
};

const reviewType = process.argv[2] ?? "plan-review";
const config = REVIEW_CONFIGS[reviewType];

if (!config) {
  console.error(
    `Unknown review type: ${reviewType}. Use one of: ${Object.keys(REVIEW_CONFIGS).join(", ")}`,
  );
  process.exit(1);
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function renderInline(value) {
  return escapeHtml(value).replace(/`([^`]+)`/g, "<code>$1</code>");
}

function renderMarkdown(markdown) {
  const lines = markdown.split(/\r?\n/);
  const html = [];
  let inCodeBlock = false;
  let inList = false;
  let codeLines = [];
  let paragraphLines = [];

  function flushParagraph() {
    if (paragraphLines.length === 0) {
      return;
    }

    html.push(`<p>${renderInline(paragraphLines.join(" "))}</p>`);
    paragraphLines = [];
  }

  function flushList() {
    if (!inList) {
      return;
    }

    html.push("</ul>");
    inList = false;
  }

  function flushCodeBlock() {
    html.push(`<pre><code>${escapeHtml(codeLines.join("\n"))}</code></pre>`);
    codeLines = [];
  }

  for (const line of lines) {
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();

      if (inCodeBlock) {
        flushCodeBlock();
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }

      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = line.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      html.push(`<h${level}>${renderInline(heading[2])}</h${level}>`);
      continue;
    }

    const listItem = line.match(/^[-*]\s+(.+)$/);
    if (listItem) {
      flushParagraph();

      if (!inList) {
        html.push("<ul>");
        inList = true;
      }

      html.push(`<li>${renderInline(listItem[1])}</li>`);
      continue;
    }

    const blockquote = line.match(/^>\s?(.+)$/);
    if (blockquote) {
      flushParagraph();
      flushList();
      html.push(`<blockquote>${renderInline(blockquote[1])}</blockquote>`);
      continue;
    }

    paragraphLines.push(line.trim());
  }

  flushParagraph();
  flushList();

  if (inCodeBlock) {
    flushCodeBlock();
  }

  return html.join("\n");
}

function renderPage(markdown) {
  const body = renderMarkdown(markdown);

  return `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(config.title)}</title>
    <style>
      :root {
        color-scheme: light;
        --bg: #f7f7f4;
        --panel: #ffffff;
        --text: #1f2933;
        --muted: #68737d;
        --line: #d8d8d2;
        --accent: #176b87;
        --code-bg: #f1f5f7;
      }

      * {
        box-sizing: border-box;
      }

      body {
        margin: 0;
        background: var(--bg);
        color: var(--text);
        font-family:
          Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
          "Segoe UI", sans-serif;
        line-height: 1.65;
      }

      main {
        max-width: 920px;
        margin: 0 auto;
        padding: 48px 20px 72px;
      }

      article {
        border: 1px solid var(--line);
        border-radius: 8px;
        background: var(--panel);
        padding: 36px;
        box-shadow: 0 12px 30px rgb(31 41 51 / 0.06);
      }

      h1,
      h2,
      h3 {
        margin: 1.6em 0 0.55em;
        line-height: 1.25;
        letter-spacing: 0;
      }

      h1:first-child,
      h2:first-child,
      h3:first-child {
        margin-top: 0;
      }

      h1 {
        font-size: 2rem;
      }

      h2 {
        border-top: 1px solid var(--line);
        padding-top: 1.1rem;
        font-size: 1.35rem;
      }

      h3 {
        font-size: 1.08rem;
      }

      p,
      ul,
      pre,
      blockquote {
        margin: 0.85rem 0;
      }

      ul {
        padding-left: 1.35rem;
      }

      li + li {
        margin-top: 0.3rem;
      }

      code {
        border-radius: 4px;
        background: var(--code-bg);
        padding: 0.12rem 0.28rem;
        color: #0f4f64;
        font-family: "SFMono-Regular", Consolas, monospace;
        font-size: 0.92em;
      }

      pre {
        overflow-x: auto;
        border: 1px solid var(--line);
        border-radius: 8px;
        background: #101820;
        padding: 1rem;
      }

      pre code {
        background: transparent;
        padding: 0;
        color: #edf3f6;
      }

      blockquote {
        border-left: 4px solid var(--accent);
        margin-left: 0;
        padding: 0.35rem 0 0.35rem 1rem;
        color: var(--muted);
      }

      .meta {
        margin-bottom: 1rem;
        color: var(--muted);
        font-size: 0.9rem;
      }

      @media (max-width: 640px) {
        main {
          padding: 20px 12px 44px;
        }

        article {
          padding: 22px 18px;
        }

        h1 {
          font-size: 1.6rem;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <article>
        <div class="meta">Generated from ${escapeHtml(config.inputPath)}</div>
        ${body}
      </article>
    </main>
  </body>
</html>
`;
}

async function main() {
  let markdown;

  try {
    markdown = await readFile(config.inputPath, "utf8");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error(`${config.title} file not found: ${config.inputPath}`);
      console.error(config.missingMessage);
      process.exitCode = 1;
      return;
    }

    throw error;
  }

  await mkdir(path.dirname(config.outputPath), { recursive: true });
  await writeFile(config.outputPath, renderPage(markdown));
  console.log(`${config.title} HTML generated: ${config.outputPath}`);
}

await main();
