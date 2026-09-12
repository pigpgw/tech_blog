import type { Metadata } from "next";
import { Experiments } from "@/components/lab/Experiments";
export const metadata: Metadata = {
  title: "실험실",
  description:
    "색상, 타이포그래피와 알고리즘을 직접 조작하며 탐구하는 작은 실험실",
};
export default function LabPage() {
  return (
    <>
      <header className="page-head">
        <p className="eyebrow">IDEAS IN MOTION</p>
        <div className="page-head-row">
          <h1 className="page-title serif">
            Small <em>experiments.</em>
          </h1>
          <span className="page-number" aria-label="실험 3개">
            03
          </span>
        </div>
        <p className="page-description">
          “이렇게 해보면 어떨까?”에서 시작한 작은 실험들.
          <br />
          버튼을 누르고, 값을 바꾸고, 직접 발견해 보세요.
        </p>
      </header>
      <div className="lab-intro">
        <span>완성보다 탐구에 가까운 공간입니다.</span>
        <span className="eyebrow">
          <span className="status-dot" aria-hidden="true" /> INTERACTIVE
          EXPERIMENTS
        </span>
      </div>
      <Experiments />
      <section className="lab-note">
        <h2>Room for the unexpected.</h2>
        <p>
          모든 실험이 프로젝트가 될 필요는 없습니다.
          <br />
          작게 만들어 보며 얻은 감각이 다음 문제를 풀 때 뜻밖의 도움이 되기도
          하니까요.
        </p>
      </section>
    </>
  );
}
