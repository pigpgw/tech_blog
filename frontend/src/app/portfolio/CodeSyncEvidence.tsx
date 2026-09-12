import Image from "next/image";
import { codeSyncScreenshots } from "@/content/portfolio";

export function CodeSyncEvidence() {
  return (
    <section id="evidence" className="pf-evidence">
      <p className="pf-label">CODE SYNC · PRODUCT EVIDENCE</p>
      <h2>리뷰 화면과 협업 흐름</h2>
      <p className="pf-evidence-intro">
        GitHub PR 리뷰, 동시 편집, 문서·화이트보드 협업을 연결한 실제 화면입니다.
      </p>
      <div className="pf-gallery">
        {codeSyncScreenshots.map((screenshot) => (
          <figure key={screenshot.src}>
            <a
              href={screenshot.src}
              target="_blank"
              rel="noreferrer"
              aria-label={`${screenshot.title} 원본 보기`}
            >
              <Image
                src={screenshot.src}
                alt={screenshot.description}
                width={screenshot.width}
                height={screenshot.height}
                unoptimized
              />
            </a>
            <figcaption>
              <strong>{screenshot.title}</strong>
              <p>{screenshot.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
