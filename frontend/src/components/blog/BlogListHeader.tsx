export const BlogListHeader = ({
  count,
  categoryLabel,
}: {
  count: number;
  categoryLabel?: string;
}) => (
  <header className="page-head">
    <p className="eyebrow">THE JOURNAL</p>
    <div className="page-head-row">
      <h1 className="page-title serif">
        Notes &amp; <em>thoughts.</em>
      </h1>
      <span className="page-number" aria-label={"공개 글 " + count + "개"}>
        {String(count).padStart(2, "0")}
      </span>
    </div>
    <p className="page-description">
      {categoryLabel
        ? categoryLabel + "에 관한 기록입니다."
        : "문제를 만나고, 직접 부딪치고, 이해한 만큼 기록합니다."}
      <br />
      다음의 나와 같은 질문을 가진 누군가를 위해.
    </p>
  </header>
);
