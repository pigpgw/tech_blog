// 홈 소개와 현재 탐구는 이곳에서 직접 관리합니다.
// relatedPostSlug에는 실제 공개 글의 slug를 지정하며, 없으면 링크를 숨깁니다.
export const homeContent = {
  name: "박건우",
  headline: "만들고, 이해하고, 기록합니다.",
  introduction:
    "코드가 동작하는 순간을 넘어, 그 이유를 알아가는 개발자 박건우입니다.",
  currentExploration: {
    title: "화면 뒤의 흐름을 이해하는 중입니다.",
    description:
      "서버에서 준비한 데이터가 화면에 닿기까지, 각 부분의 역할과 경계를 살펴봅니다.",
    topics: ["Next.js", "데이터의 경계", "서버에서 화면까지"],
    relatedPostSlug: null as string | null,
  },
};
