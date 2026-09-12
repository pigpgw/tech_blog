export const portfolioArtifacts = [
  {
    slug: "cppm",
    title: "역할 분리와 종료 조건을 프롬프트에 명시",
    introduction:
      "Bedrock의 Agent 협업 기능을 사용하되, 어떤 요청을 누구에게 보내고 언제 멈출지는 직접 설계했습니다. 아래는 업무 기록에 남긴 Master·Supervisor 프롬프트의 일부입니다.",
    decisions: [
      "Master는 일반 대화와 분석 요청을 분류하고, 일반 대화는 Chat Agent에 바로 전달하도록 했습니다.",
      "Supervisor는 Use Case KB에서 분석 방법을, 계열사별 KB에서 필드·파생 지표·차트 규칙을 찾아 OpenSearch·Graph Agent에 전달하도록 했습니다.",
      "검색 결과가 없거나 서버 오류가 발생하면 후속 그래프 생성과 불필요한 재호출을 멈추도록 응답 처리 규칙을 작성했습니다.",
    ],
    examples: [
      {
        title: "Master: 요청 분류와 응답 전달",
        description:
          "일반 대화가 분석 Agent까지 거치지 않도록 경로를 나눴습니다. 하위 Agent가 결과를 반환한 뒤 Master가 다시 판단해 다른 Agent를 호출하지 않도록 제한했습니다.",
        language: "markdown",
        code: `## 라우팅 규칙

- **일반 대화** (인사, 질문, 시스템 기능 안내 등) → CppmChatAgent
- **데이터 검색/분석/그래프 생성** → CppmSupervisorAgent

## 응답 전달 (매우 중요 - 절대 규칙)

- 하위 에이전트(CppmChatAgent, CppmSupervisorAgent)의 응답을 **반드시 그대로** 사용자에게 전달합니다.
- 하위 에이전트의 응답이 만족스럽지 않아도 그대로 전달합니다. 절대 다른 에이전트로 다시 라우팅하지 않습니다.`,
        source: "Master Agent 프롬프트 · 원문 발췌",
      },
      {
        title: "Supervisor: 검색 결과에 따른 종료",
        description:
          "빈 결과와 서버 오류를 구분해 사용자에게 알리도록 했습니다. 특히 HTTP 500 응답을 받은 Supervisor가 검색을 다시 지시하지 않도록 종료 조건을 명시했습니다.",
        language: "markdown",
        code: `CppmOpenSearchAgent 응답 처리 규칙:
- CppmOpenSearchAgent가 검색 결과를 반환했을 때:
  - has_results가 false이거나 hits.total.value가 0인 경우: 검색 결과가 없는 것이므로, 사용자에게 "검색 결과가 없습니다"라고 명확히 전달하고 FINISH로 종료합니다.
  - error 필드가 있는 경우:
    * 에러 메시지에 "500", "service unavailable", "Internal Server Error"가 포함된 경우: "일시적 오류가 발생했습니다. 잠시 후 다시 시도해주세요"라고 사용자에게 전달하고 FINISH로 종료합니다.
    * 그 외의 에러: 에러 메시지를 사용자에게 전달하고 FINISH로 종료합니다.
  - 정상적인 검색 결과가 있는 경우: 다음 단계(예: CppmGraphAgent)로 진행하거나 FINISH로 종료합니다.`,
        source: "Supervisor Agent 프롬프트 · 원문 발췌",
      },
    ],
    sourceUrl:
      "https://confused-dietician-c17.notion.site/3077caa087bd80f4bb01db4819320452?pvs=74",
  },
  {
    slug: "fbiti",
    title: "frontend-publishing Skill에 담은 작업 기준",
    introduction:
      "AI가 화면을 생성하는 데서 끝나지 않고, 기존 컴포넌트와 프로젝트 규칙을 따르도록 작업 지침을 구성했습니다. 구현 전 범위를 확인하고 결과를 검수하는 과정은 사람이 맡도록 했습니다.",
    decisions: [
      "입력: Figma 디자인·디자인 가이드·기존 공용 컴포넌트와 관련 기술 문서를 함께 참조하도록 했습니다.",
      "구현: 공용 컴포넌트 재사용, 시맨틱 마크업·ARIA, 모바일 우선 반응형 기준을 명시했습니다.",
      "검수: 구현 전에 계획과 검증 항목을 확인하고 승인된 범위에서 작업한 뒤 품질을 점검하도록 했습니다.",
    ],
    examples: [
      {
        title: "작업 계획부터 검수까지",
        description:
          "아래는 업무 기록에 기재된 적용 기준을 정리한 요약입니다. 당시 Skill 원본 파일을 그대로 옮긴 코드는 아닙니다.",
        language: "markdown",
        code: `## 작업 전
- 기존 코드와 공용 컴포넌트 확인
- Figma 디자인과 프로젝트 디자인 가이드 참조
- 구현 범위와 검증 항목을 정하고 사람의 승인 확인

## 구현 기준
- 기존 공용 컴포넌트 재사용
- 시맨틱 마크업과 ARIA 적용
- 모바일 우선 반응형 구현

## 결과 검수
- 프로젝트 규칙과 공용 컴포넌트 사용 여부 확인
- 접근성과 반응형 구현 결과 확인
- 구현 결과를 사람이 검수`,
        source: "디지엠 유닛원 업무 기록 · Skill 적용 기준 요약",
      },
    ],
    sourceUrl:
      "https://confused-dietician-c17.notion.site/3077caa087bd80f4bb01db4819320452?pvs=74",
  },
];
