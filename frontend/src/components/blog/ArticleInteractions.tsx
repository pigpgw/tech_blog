"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
export const ReadingProgress = () => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      if (ref.current)
        ref.current.style.width =
          (total > 0
            ? Math.min(100, Math.max(0, (window.scrollY / total) * 100))
            : 0) + "%";
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return <div ref={ref} className="reading-progress" aria-hidden="true" />;
};
export const CodeBlock = ({ children }: { children: ReactNode }) => {
  const preRef = useRef<HTMLPreElement>(null);
  const [message, setMessage] = useState("");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(preRef.current?.textContent ?? "");
      setMessage("복사했습니다.");
    } catch {
      setMessage("코드를 선택해 직접 복사해 주세요.");
    }
  };
  return (
    <div className="code-block">
      <div className="code-label">
        <span>CODE</span>
        <button className="copy-code" onClick={copy}>
          코드 복사
        </button>
      </div>
      <pre ref={preRef}>{children}</pre>
      <span className="sr-only" role="status">
        {message}
      </span>
    </div>
  );
};
