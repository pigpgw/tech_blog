# 코드리뷰 기준: Frontend Fundamentals 기반

목적: 사용자가 “리뷰” 또는 “코드리뷰”를 요청했을 때, 토스 Frontend Fundamentals의 기준을 바탕으로 변경하기 쉬운 코드인지 점검한다. 이 문서는 원문을 복사하는 문서가 아니라, 코드리뷰에 바로 적용하기 위한 요약과 링크 모음이다.

## 핵심 원칙

- 좋은 프론트엔드 코드는 새 요구사항을 반영하고 배포하기 쉬운 코드다.
- 코드 품질은 한 가지 기준으로 판단하지 않고, 가독성, 예측 가능성, 응집도, 결합도를 함께 본다.
- 네 기준은 서로 충돌할 수 있다. 추상화는 응집도를 높일 수 있지만 가독성을 낮출 수 있고, 중복 허용은 결합도를 낮출 수 있지만 응집도를 낮출 수 있다.
- 코드리뷰에서는 “무조건 추상화”나 “무조건 중복 제거”보다, 지금 변경의 위험과 앞으로 같이 바뀔 가능성을 기준으로 우선순위를 정한다.

## 리뷰 기준 1. 가독성

가독성은 코드를 읽는 사람이 한 번에 이해해야 하는 맥락이 적고, 위에서 아래로 자연스럽게 읽히는지를 본다.

체크할 것:

- 서로 같이 실행되지 않는 분기나 흐름이 한 함수 안에 섞여 있지 않은가?
- UI 상태, 비즈니스 규칙, 데이터 변환, API 호출이 한 함수에 뭉쳐 있지 않은가?
- 복잡한 조건식과 매직 넘버에 이름이 붙어 있는가?
- 삼항 연산자나 중첩 조건이 읽는 순서를 방해하지 않는가?
- 구현 상세를 감춰야 할 곳과 그대로 드러내야 할 곳을 구분했는가?

리뷰 코멘트 방향:

- “이름을 붙이면 의도를 먼저 읽을 수 있습니다.”
- “이 함수는 데이터 가공과 UI 상태 변경이 섞여 있어, 변경 시 읽어야 하는 맥락이 커집니다.”
- “이 추상화는 오히려 이동 비용을 늘리므로, 현재는 중복을 허용하는 편이 읽기 쉽습니다.”

## 리뷰 기준 2. 예측 가능성

예측 가능성은 이름, 파라미터, 반환값, 컴포넌트 역할만 보고 동작을 예상할 수 있는지를 본다.

체크할 것:

- 같은 이름이나 비슷한 이름이 서로 다른 의미로 쓰이지 않는가?
- 같은 계열의 함수가 반환 타입과 실패 처리 방식을 일관되게 유지하는가?
- 함수 이름과 달리 내부에서 라우팅, 저장, 로깅, 상태 변경 같은 숨은 부수효과를 만들지 않는가?
- 컴포넌트가 버튼처럼 보이면 실제로 버튼 역할과 키보드 동작을 제공하는가?

리뷰 코멘트 방향:

- “이름만 보면 조회 함수처럼 보이지만 내부에서 상태를 변경하므로 호출자가 동작을 예측하기 어렵습니다.”
- “같은 계열의 함수는 성공/실패 반환 형태를 맞추는 편이 사용처에서 예외 처리를 예측하기 쉽습니다.”

## 리뷰 기준 3. 응집도

응집도는 함께 수정되어야 하는 코드가 구조적으로 함께 바뀌도록 모여 있는지를 본다.

체크할 것:

- 함께 수정되는 파일이 같은 디렉토리나 같은 기능 경계 안에 있는가?
- 하나의 정책 값, 제한 값, 문구, 필드 정의가 여러 곳에 흩어져 있지 않은가?
- 폼 필드 단위로 응집해야 하는지, 폼 전체 단위로 응집해야 하는지 판단했는가?
- 공통화하지 않으면 한쪽만 수정되어 장애가 날 가능성이 높은가?

리뷰 코멘트 방향:

- “이 값은 검증 로직과 UI 문구가 같이 바뀌므로 한 곳에서 관리하는 편이 안전합니다.”
- “이 중복은 항상 함께 바뀌는 값이므로, 가독성보다 응집도를 우선해 공통화하는 편이 좋습니다.”

## 리뷰 기준 4. 결합도

결합도는 한 코드를 수정했을 때 영향 범위가 어디까지 퍼지는지를 본다.

체크할 것:

- 컴포넌트가 너무 많은 책임을 가져 작은 변경에도 넓은 영역이 영향을 받지 않는가?
- props drilling 때문에 중간 컴포넌트들이 알 필요 없는 데이터를 전달하지 않는가?
- 공통 컴포넌트 하나의 변경이 여러 화면에 예상 밖 영향을 주지 않는가?
- 중복 제거가 오히려 서로 다른 변경 주기를 가진 화면을 강하게 묶고 있지 않은가?

리뷰 코멘트 방향:

- “이 공통화는 두 화면의 변경 이유가 달라 보이므로, 지금은 중복을 허용해 영향 범위를 줄이는 편이 낫습니다.”
- “상위 컴포넌트가 세부 상태를 모두 관리하면서 수정 영향이 커졌습니다. 책임을 한 단계 나눌 수 있습니다.”

## 보조 기준: 접근성, 번들링, 디버깅

코드리뷰에서 네 가지 품질 기준 외에 아래 항목도 함께 확인한다.

- 접근성: 의미 있는 HTML 구조, 인터랙티브 요소의 이름, 역할과 동작 일치, 키보드 탐색, 현재 상태 표시, 이미지 대체 텍스트를 확인한다.
- 번들링/성능: 초기 로드에 필요 없는 라이브러리가 먼저 포함되지 않았는지, 코드 스플리팅과 트리셰이킹을 방해하는 import가 없는지 확인한다.
- 디버깅 가능성: 에러가 났을 때 재현 경로, 로그, 원인 추적, 재발 방지 기록이 남는 구조인지 확인한다.

## 코드리뷰 출력 규칙

리뷰를 요청받으면 아래 순서로 답한다.

1. Findings: 문제를 먼저 쓴다. 심각도 높은 순서로 정렬한다.
2. 각 finding에는 파일/라인, 기준, 문제, 왜 중요한지, 수정 방향을 포함한다.
3. 문제가 없으면 “큰 문제는 보이지 않는다”고 말하고, 남은 테스트 공백이나 리스크만 적는다.
4. 요청받지 않았다면 바로 수정하지 말고 리뷰만 한다.
5. 사용자가 “고쳐줘”, “수정해줘”라고 하면 그때 패치한다.

예시 형식:

```md
Findings

- [높음] src/app/resume/page.tsx:120
  기준: 예측 가능성 / 결합도
  문제: 조회 함수처럼 보이는 함수가 내부에서 전역 상태를 변경합니다.
  영향: 호출자가 함수 이름만 보고 부수효과를 예측하기 어렵고, 재사용 시 화면 상태가 함께 바뀔 수 있습니다.
  제안: 조회와 상태 반영을 분리하거나 함수 이름에 부수효과를 드러냅니다.

Open Questions

- 이 값이 다른 화면과 항상 함께 바뀌는 정책값인지 확인이 필요합니다.

검증

- 아직 실행하지 않음
```

## 조사한 원문 링크

공식 사이트:

- [Frontend Fundamentals](https://frontend-fundamentals.com/code-quality/)
- [Code Quality Fundamentals](https://frontend-fundamentals.com/code-quality/)
- [Bundling Fundamentals](https://frontend-fundamentals.com/bundling/)
- [A11y Fundamentals](https://frontend-fundamentals.com/a11y/)
- [Debug Fundamentals](https://frontend-fundamentals.com/debug/)
- [GitHub: toss/frontend-fundamentals](https://github.com/toss/frontend-fundamentals)

Code Quality 원문:

- [좋은 코드를 위한 4가지 기준](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/index.md)
- [시작하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/start.md)
- [복잡한 조건에 이름 붙이기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/condition-name.md)
- [매직 넘버에 이름 붙이기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/magic-number-readability.md)
- [매직 넘버 없애기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/magic-number-cohesion.md)
- [왼쪽에서 오른쪽으로 읽히게 하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/comparison-order.md)
- [삼항 연산자 단순하게 하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/ternary-operator.md)
- [숨은 로직 드러내기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/hidden-logic.md)
- [폼의 응집도 생각하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/form-fields.md)
- [함께 수정되는 파일을 같은 디렉토리에 두기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/code-directory.md)
- [로직 종류에 따라 합쳐진 함수 쪼개기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/use-page-state-readability.md)
- [책임을 하나씩 관리하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/use-page-state-coupling.md)
- [같은 종류의 함수는 반환 타입 통일하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/use-user.md)
- [이름 겹치지 않게 관리하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/http.md)
- [구현 상세 추상화하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/login-start-page.md)
- [Props Drilling 지우기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/item-edit-modal.md)
- [같이 실행되지 않는 코드 분리하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/submit-button.md)
- [중복 코드 허용하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/use-bottom-sheet.md)
- [시점 이동 줄이기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/code-quality/code/examples/user-policy.md)

Bundling 원문:

- [번들링이란](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/overview.md)
- [번들러란](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/bundler.md)
- [번들링 과정](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/overview.md)
- [진입점](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/entry.md)
- [경로 탐색](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/resolution.md)
- [로더](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/loader.md)
- [플러그인](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/plugin.md)
- [출력](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/bundling-process/output.md)
- [개발 서버](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/dev/dev-server.md)
- [환경 변수](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/dev/env-variable.md)
- [HMR](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/dev/hmr.md)
- [소스맵](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/dev/source-map.md)
- [번들 분석](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/optimization/bundle-analyzer.md)
- [코드 스플리팅](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/optimization/code-splitting.md)
- [트리셰이킹](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/bundling/deep-dive/optimization/tree-shaking.md)

A11y 원문:

- [접근성을 지켜야 하는 이유](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/why.md)
- [주요 원칙](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/principles.md)
- [접근성 개발 입문하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/basic-guide/overview.md)
- [역할 지정하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/basic-guide/role.md)
- [레이블 지정하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/basic-guide/label.md)
- [상태 지정하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/basic-guide/state.md)
- [이미지와 아이콘 대체 텍스트](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/alt-text/image-alt.md)
- [인터랙티브 요소에 이름 붙이기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/semantic/required-label.md)
- [같은 이름의 요소에는 설명 추가하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/semantic/duplicate-interactive-element.md)
- [버튼 안에 버튼 넣지 않기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/structure/button-inside-button.md)
- [테이블 행에 클릭 이벤트 핸들러 붙이지 않기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/structure/table-row-link.md)
- [버튼의 역할과 동작 일치](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/predictability/fake-button.md)
- [입력 요소는 form으로 감싸기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/predictability/form.md)
- [eslint 접근성 주요 규칙](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/eslint/rules.md)
- [디자인 시스템과 결합하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/eslint/design-system.md)
- [아코디언](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/accordion.md)
- [체크박스](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/checkbox.md)
- [모달](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/modal.md)
- [라디오](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/radio.md)
- [스위치](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/switch.md)
- [탭](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/a11y/ui-foundation/tab.md)

Debug 원문:

- [효과적인 디버깅을 위한 4가지 단계](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/start.md)
- [진단하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/diagnose/index.md)
- [에러 메시지로 진단하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/diagnose/error-message.md)
- [작업 지도 그리기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/diagnose/map.md)
- [재현하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/index.md)
- [간단한 코드로 재현하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/simply.md)
- [반복 재현 자동화](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/repeat.md)
- [범위 밖 값으로 재현하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/out-range.md)
- [버그 발생 경로 추적하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/trace.md)
- [디버거와 콘솔로그 활용하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/reproduce/debugger.md)
- [수정하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/fix/index.md)
- [근본 원인 수정하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/fix/correct.md)
- [데드코드 제거하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/fix/dead-code.md)
- [순수 함수 분리하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/fix/pure.md)
- [재발 방지하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/prevent/index.md)
- [버그 리포트 남기기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/prevent/bug-report.md)
- [에러 로그를 상세히 남기기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/prevent/error-log.md)
- [팀과 공유하여 집단지성화하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/prevent/share.md)
- [공통 유틸에 반영하기](https://github.com/toss/frontend-fundamentals/blob/main/fundamentals/debug/pages/prevent/util.md)
