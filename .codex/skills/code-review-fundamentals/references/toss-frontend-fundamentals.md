# Toss Frontend Fundamentals Review Reference

이 참조는 코드리뷰 때 빠르게 적용하기 위한 요약이다. 상세 링크는 저장소 문서 `docs/03-code-review-fundamentals.md`를 우선 확인한다.

## 핵심 판단

- 좋은 프론트엔드 코드는 변경하기 쉬운 코드다.
- 변경하기 쉬운지는 가독성, 예측 가능성, 응집도, 결합도를 함께 보고 판단한다.
- 네 기준은 충돌할 수 있다. 항상 추상화하거나 항상 중복 제거하지 말고, 변경 위험과 영향 범위를 기준으로 선택한다.

## 기준별 질문

### 가독성

- 읽는 사람이 한 번에 고려해야 하는 맥락이 큰가?
- 같이 실행되지 않는 코드가 한 함수나 컴포넌트 안에 섞였는가?
- UI 상태, 데이터 변환, API 호출, 비즈니스 규칙이 한 곳에 뭉쳤는가?
- 복잡한 조건과 매직 넘버에 이름이 있는가?
- 위에서 아래로 자연스럽게 읽히는가?

### 예측 가능성

- 이름, 파라미터, 반환값만 보고 동작을 예상할 수 있는가?
- 같은 계열 함수의 반환 타입과 실패 처리 방식이 일관적인가?
- 조회처럼 보이는 함수가 저장, 라우팅, 상태 변경 같은 숨은 부수효과를 만들지 않는가?
- 컴포넌트의 시각적 역할과 실제 HTML/키보드 동작이 일치하는가?

### 응집도

- 함께 수정되어야 하는 값, 문구, 검증 로직, 필드 정의가 가까이 있는가?
- 한쪽만 바꾸면 장애가 날 수 있는 중복인가?
- 폼 상태와 검증 정책이 같이 바뀌도록 묶여 있는가?
- 공통화가 가독성을 낮추더라도 같이 수정되어야 하는 위험을 줄이는가?

### 결합도

- 작은 변경이 예상보다 넓은 화면이나 컴포넌트에 영향을 주는가?
- 한 컴포넌트가 너무 많은 책임을 갖는가?
- props drilling 때문에 중간 컴포넌트가 알 필요 없는 데이터를 전달하는가?
- 서로 다른 변경 주기를 가진 화면을 공통 컴포넌트로 너무 강하게 묶었는가?

## 보조 기준

- 접근성: semantic HTML, interactive element label, role/state, keyboard navigation, alt text.
- 번들링/성능: 불필요한 초기 import, code splitting 누락, tree-shaking 방해, 클라이언트 번들 민감 정보.
- 디버깅: 재현 경로, 원인 추적, 로그, 근본 원인 수정, 재발 방지.

## 공식 링크

- https://frontend-fundamentals.com/code-quality/
- https://frontend-fundamentals.com/bundling/
- https://frontend-fundamentals.com/a11y/
- https://frontend-fundamentals.com/debug/
- https://github.com/toss/frontend-fundamentals
