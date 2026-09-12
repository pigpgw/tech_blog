"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const palettes = [
  ["#222631", "#8597C3", "#D4DEFF", "#3558E8"],
  ["#343C51", "#929CB0", "#EEE4CF", "#C56F50"],
  ["#544438", "#A18B71", "#F0E5CB", "#738878"],
  ["#3E4346", "#8B9A98", "#E8EAE1", "#CE9C58"],
];
const initialBars = [51, 92, 37, 76, 115, 61, 141, 83, 128];
export const Experiments = () => {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [fontSize, setFontSize] = useState(70);
  const [italic, setItalic] = useState(true);
  const [bars, setBars] = useState(initialBars);
  const [active, setActive] = useState<number[]>([]);
  const [sorting, setSorting] = useState(false);
  const [sortMessage, setSortMessage] = useState("정렬 준비");
  const cancelled = useRef(false);
  const running = useRef(false);
  useEffect(() => {
    cancelled.current = false;
    return () => {
      cancelled.current = true;
    };
  }, []);
  const runSort = async () => {
    if (running.current) return;
    running.current = true;
    setSorting(true);
    setSortMessage("인접한 두 값을 비교하고 있습니다.");
    const values = [...initialBars];
    for (let i = values.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const left = values[i] ?? 0;
      values[i] = values[j] ?? 0;
      values[j] = left;
    }
    setBars([...values]);
    const delay = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 0
      : 75;
    for (let i = 0; i < values.length - 1; i++) {
      for (let j = 0; j < values.length - i - 1; j++) {
        if (cancelled.current) {
          running.current = false;
          return;
        }
        setActive([j, j + 1]);
        await new Promise<void>((resolve) => window.setTimeout(resolve, delay));
        if (cancelled.current) {
          running.current = false;
          return;
        }
        const left = values[j] ?? 0;
        const right = values[j + 1] ?? 0;
        if (left > right) {
          values[j] = right;
          values[j + 1] = left;
        }
        setBars([...values]);
      }
    }
    setActive([]);
    setSorting(false);
    running.current = false;
    setSortMessage("정렬 완료. 작은 값부터 큰 값 순서로 정렬했습니다.");
  };
  const palette = palettes[paletteIndex] ?? palettes[0] ?? [];
  return (
    <div className="lab-grid">
      <article className="lab-card">
        <div className="lab-canvas palette-canvas">
          <span className="canvas-label">EXPERIMENT 01 / COLOR STUDY</span>
          {palette.map((color, index) => (
            <span
              key={index}
              className="palette-swatch"
              style={{
                background: color,
                color: index === 2 ? "#222631" : "#ffffff",
              }}
            >
              {color}
            </span>
          ))}
        </div>
        <div className="lab-caption">
          <div className="meta">
            <span className="category">DESIGN</span>
            <span aria-live="polite">
              PALETTE {String(paletteIndex + 1).padStart(2, "0")} / 04
            </span>
          </div>
          <h2>색으로 만드는 분위기</h2>
          <p>
            같은 구성에 다른 색을 얹으면 어떤 인상이 될까요? 네 가지 조합을
            살펴봅니다.
          </p>
          <button
            className="lab-action"
            onClick={() =>
              setPaletteIndex((value) => (value + 1) % palettes.length)
            }
          >
            다른 조합 보기 <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </article>
      <article className="lab-card">
        <div className="lab-canvas type-canvas">
          <span className="canvas-label">EXPERIMENT 02 / TYPE PLAY</span>
          <div
            className="type-preview"
            style={{ fontSize, fontStyle: italic ? "italic" : "normal" }}
            aria-hidden="true"
          >
            Less,
            <br />
            but better.
          </div>
          <label className="type-controls" htmlFor="type-size">
            <span>글자 크기</span>
            <input
              id="type-size"
              type="range"
              min="40"
              max="82"
              value={fontSize}
              onChange={(event) => setFontSize(Number(event.target.value))}
            />
            <output htmlFor="type-size">{fontSize}</output>
            <span>px</span>
          </label>
        </div>
        <div className="lab-caption">
          <div className="meta">
            <span className="category">TYPOGRAPHY</span>
            <span>{italic ? "Italic" : "Roman"}</span>
          </div>
          <h2>글자의 표정</h2>
          <p>
            크기와 기울기만 바꿔도 달라지는 리듬. 슬라이더를 움직여 균형을
            찾아보세요.
          </p>
          <button
            className="lab-action"
            aria-pressed={italic}
            onClick={() => setItalic((value) => !value)}
          >
            기울임꼴 {italic ? "끄기" : "켜기"}{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
        </div>
      </article>
      <article className="lab-card">
        <div
          className="lab-canvas sort-canvas"
          role="img"
          aria-label={"정렬 시각화: " + bars.join(", ")}
        >
          <span className="canvas-label">EXPERIMENT 03 / BUBBLE SORT</span>
          {bars.map((value, index) => (
            <span
              key={index}
              className={"sort-bar" + (active.includes(index) ? " active" : "")}
              style={{ height: value }}
            />
          ))}
        </div>
        <div className="lab-caption">
          <div className="meta">
            <span className="category">ALGORITHM</span>
            <span>O(n²)</span>
          </div>
          <h2>순서가 만들어지는 과정</h2>
          <p>
            이웃한 두 값을 하나씩 비교합니다. 버블 정렬이 순서를 만드는 과정을
            지켜보세요.
          </p>
          <button className="lab-action" disabled={sorting} onClick={runSort}>
            {sorting ? "정렬하는 중…" : "섞고 정렬하기"}{" "}
            <ArrowUpRight size={15} aria-hidden="true" />
          </button>
          <p className="sr-only" role="status">
            {sortMessage}
          </p>
        </div>
      </article>
    </div>
  );
};
