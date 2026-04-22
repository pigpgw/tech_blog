# 프론트엔드 학습/블로깅 로드맵

목적: 프론트엔드 핵심 학습 주제를 기준으로 공부 순서를 정하고, 공부한 내용을 기술블로그 글과 프로젝트 기능으로 증명한다.

관련 문서:

- 블로그 구현 로드맵: [기술블로그 프로젝트 개발 로드맵](./01-blog-project-roadmap.md)
- Supabase/Admin 설계: [Supabase ERD 설계](./03-supabase-erd-design.md)

---

## 0. 기준

공고와 면접에서 반복되는 핵심 역량만 먼저 준비한다.

| 우선순위 | 키워드                                                                | 준비 방향                                                         |
| -------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- |
| 필수     | HTML, CSS, JavaScript, TypeScript, React, Git, REST API, 반응형       | 반드시 공부하고 블로그 글과 코드로 증명한다.                      |
| 중요     | Next.js, SSR/CSR, SEO, 성능, 상태관리, 테스트, CI/CD                  | 블로그 프로젝트에 적용하고 선택 기준을 설명한다.                  |
| 확장     | Supabase/Auth, Admin, Profile/Blog/Resume/Craft, Monorepo, Cloudflare | 블로그가 안정된 뒤 관리자 글 관리와 모노레포 플랫폼으로 확장한다. |
| 차별화   | 접근성, 번들 최적화, 운영/모니터링, 코드리뷰/문서화, AI 활용          | 실제 사례 1개 이상을 남긴다.                                      |
| 후순위   | PWA, React Native, WebGL, Docker/AWS 심화, GraphQL 심화               | 반응형 웹으로 부족한 요구가 생길 때만 한다.                       |

### 인프랩 공고에서 특히 보이는 것

- JavaScript, TypeScript, HTML/CSS, React, Next.js
- SSR/CSR 선택 기준
- HTTP 통신, REST API, 반응형 웹
- API 호출 최소화, 렌더링 최적화, 번들링 최적화
- Vanilla JavaScript로 웹 페이지를 만들어본 경험
- 웹표준/웹접근성, 브라우저 트러블슈팅
- 단위 테스트, UI 테스트, GitHub Actions
- 실제 서비스 배포/운영, 모니터링/로그/알람
- 코드리뷰, 페어프로그래밍, 서버 개발자/디자이너와 협업
- 모르는 개념을 빠르게 학습하는 방법
- 대화보다 문서로 정리하고 공유하는 습관

---

## 1. 블로깅 원칙

모든 공부를 글로 쓰지 않는다. 공고 키워드, 면접 질문, 블로그 프로젝트에 연결되는 주제만 먼저 쓴다.

좋은 글의 구조:

1. 공고나 면접에서 왜 이 역량을 보는지 설명한다.
2. 개념을 짧게 정리한다.
3. 블로그 프로젝트에서 생긴 문제를 제시한다.
4. 나쁜 코드와 개선한 코드를 비교한다.
5. 선택 기준과 trade-off를 쓴다.
6. 마지막에 면접 답변으로 5~8줄 요약한다.

쓰지 않을 글:

- 문법만 복붙한 글
- 공식문서 요약만 있는 글
- "무엇을 했다"만 있고 "왜 그렇게 했다"가 없는 글
- 측정값 없이 성능을 개선했다고 말하는 글

---

## 2. 학습 순서

### 2-1. 인터넷과 브라우저 동작 원리

먼저 하는 이유: 브라우저 렌더링, 성능 최적화, 네트워크, 배포 문제는 프론트엔드 면접에서 자주 이어진다.

#### 공부할 것

- [ ] DNS, TCP, TLS, HTTPS 흐름
- [ ] HTTP/1.1, HTTP/2 차이
- [ ] DOM/CSSOM/render tree
- [ ] layout/paint/composite
- [ ] reflow/repaint
- [ ] `async`/`defer`
- [ ] critical rendering path
- [ ] 브라우저 process/thread 기본

### 2-2. HTML/CSS와 접근성

먼저 하는 이유: React를 써도 실제 화면은 HTML과 CSS로 만들어진다.

#### 공부할 것

- [ ] semantic HTML
- [ ] heading 구조
- [ ] link와 button 차이
- [ ] form, input, label
- [ ] meta, OG tag, canonical, structured data
- [ ] box model
- [ ] position, stacking context
- [ ] flex/grid
- [ ] responsive layout
- [ ] CSS variables
- [ ] focus style, keyboard navigation
- [ ] `aria-label`, `aria-live`, `aria-hidden`, `tabindex`
- [ ] CSS Modules, Tailwind, design token 선택 기준

### 2-3. JavaScript 핵심

먼저 하는 이유: React 면접 질문의 상당수는 JavaScript 실행 방식, 이벤트, 비동기 이해로 이어진다.

#### 공부할 것

- [ ] 실행 컨텍스트, call stack, scope chain, hoisting
- [ ] 원시값 vs 참조값
- [ ] 타입 변환과 동등 비교
- [ ] 얕은 복사와 깊은 복사
- [ ] closure
- [ ] this
- [ ] prototype
- [ ] DOM 조작: `innerHTML` vs `textContent`
- [ ] event bubbling/capturing
- [ ] event delegation
- [ ] ESM, CommonJS, dynamic import
- [ ] event loop, task queue, microtask queue
- [ ] Promise, async/await
- [ ] debounce/throttle 직접 구현
- [ ] AbortController

### 2-4. 자료구조와 코딩테스트 기본

먼저 하는 이유: 신입 전형에서는 기본 문제 해결력을 보는 경우가 많다.

#### 공부할 것

- [ ] Big-O 기본
- [ ] 배열/문자열
- [ ] 객체/Map/Set
- [ ] stack/queue
- [ ] 정렬 기본
- [ ] 이분 탐색
- [ ] DFS/BFS
- [ ] 투 포인터
- [ ] JavaScript 입출력과 자주 쓰는 메서드

#### 기준

- [ ] 쉬운 문제를 20분 안에 풀 수 있다.
- [ ] 풀이 시간복잡도를 말할 수 있다.
- [ ] JavaScript로 자료구조를 다룰 수 있다.

### 2-5. HTTP, REST API, 인증/보안

먼저 하는 이유: 프론트엔드는 서버 데이터를 안전하게 받아 화면에 보여주는 일을 많이 한다.

#### 공부할 것

- [ ] HTTP lifecycle: DNS -> TCP -> TLS -> 요청 -> 응답
- [ ] HTTP method/status code
- [ ] request/response/header
- [ ] REST API 설계 원칙
- [ ] query string
- [ ] loading/error/empty 상태
- [ ] timeout/retry/cancel
- [ ] CORS, preflight, credentials
- [ ] Cache-Control, ETag
- [ ] cookie/session
- [ ] JWT
- [ ] OAuth 기본 흐름
- [ ] XSS/CSRF
- [ ] CSP 기본

### 2-6. TypeScript 기본과 모델링

먼저 하는 이유: 신입 공고에서도 TypeScript는 기본 요구에 가깝다. 어려운 타입보다 실제 데이터와 props를 안전하게 다루는 능력이 중요하다.

#### 공부할 것

- [ ] primitive/object type
- [ ] interface vs type
- [ ] union/intersection
- [ ] optional/readonly
- [ ] as const
- [ ] never/unknown/any
- [ ] narrowing
- [ ] generic 기본
- [ ] Pick/Omit/Record/ReturnType
- [ ] discriminated union
- [ ] API 응답 타입과 도메인 타입 분리
- [ ] React event type
- [ ] props 타입 설계

### 2-7. React 핵심

먼저 하는 이유: React는 신입 프론트엔드 공고에서 가장 반복되는 핵심 기술이다.

#### 공부할 것

- [ ] JSX
- [ ] component 단일 책임
- [ ] props/state
- [ ] 단방향 데이터 흐름
- [ ] list key
- [ ] controlled/uncontrolled input
- [ ] useState와 함수형 업데이트
- [ ] useEffect dependency, cleanup, stale closure
- [ ] useRef
- [ ] useMemo/useCallback 사용 기준
- [ ] useContext/useReducer 기본
- [ ] custom hook
- [ ] React.memo
- [ ] reconciliation
- [ ] React 18 automatic batching
- [ ] derived state를 state로 저장하지 않는 기준

### 2-8. React 상태관리, 폼, 에러 처리

먼저 하는 이유: 실제 서비스는 입력, 검증, 서버 데이터, 에러/로딩 처리가 대부분이다.

#### 공부할 것

- [ ] server state vs client state
- [ ] UI local state vs global state
- [ ] TanStack Query: query key, staleTime, invalidate
- [ ] Zustand 기본
- [ ] Redux/Jotai/Recoil은 비교만
- [ ] React Hook Form
- [ ] Zod
- [ ] field validation
- [ ] ErrorBoundary
- [ ] network error fallback
- [ ] Suspense와 Skeleton UI 기본
- [ ] `useDebounce`, `useThrottle`
- [ ] `useFetch`, `useIntersectionObserver`
- [ ] `useLocalStorage`, `useEventListener`

### 2-9. Next.js, 번들러, 배포

먼저 하는 이유: Next.js는 렌더링 방식, SEO, 배포 경험까지 함께 설명할 수 있어야 한다.

#### 공부할 것

- [ ] file-based routing
- [ ] dynamic route
- [ ] CSR/SSR/SSG/ISR
- [ ] hydration
- [ ] hydration mismatch
- [ ] Server Component vs Client Component
- [ ] App Router: `layout`, `page`, `loading`, `error`, `not-found`
- [ ] metadata
- [ ] sitemap/robots
- [ ] next/image, next/font, next/link
- [ ] Server Component fetch cache 옵션
- [ ] ESM vs CommonJS
- [ ] tree shaking
- [ ] dynamic import, code splitting
- [ ] chunk 전략
- [ ] npm/yarn/pnpm 차이
- [ ] EC2/정적 배포에서 chunk `Module not found`가 나는 이유
- [ ] Vercel production/preview deploy

### 2-10. 성능과 SEO

먼저 하는 이유: 성능과 SEO는 수치로 증명하기 좋고 이력서 문장으로 만들기 좋다.

#### 공부할 것

- [ ] Lighthouse
- [ ] LCP/CLS/INP
- [ ] Chrome DevTools Performance
- [ ] bundle analyzer
- [ ] image lazy loading, WebP/AVIF, width/height
- [ ] font-display
- [ ] preload/prefetch/preconnect
- [ ] dynamic import
- [ ] 불필요한 dependency 제거
- [ ] JSON-LD
- [ ] Google Search Console
- [ ] 가상 리스트 적용 전 고려: 리렌더링 제거, 메모이제이션, 페이지네이션
- [ ] 가상 리스트 직접 구현 원리: 보이는 범위만 DOM mount, scroll offset 계산

### 2-11. 테스트, 코드 품질, 협업

먼저 하는 이유: 신입 프로젝트도 검증 가능하게 만들면 신뢰도가 올라간다.

#### 공부할 것

- [ ] ESLint/Prettier
- [ ] TypeScript strict mode
- [ ] Vitest 또는 Jest
- [ ] React Testing Library
- [ ] MSW 기본
- [ ] Playwright smoke test
- [ ] GitHub Actions
- [ ] lint/typecheck/test/build CI
- [ ] commit convention
- [ ] PR 작성법: 무엇을/왜/어떻게, 스크린샷, 영향 범위
- [ ] 코드리뷰 요청과 반영
- [ ] issue/bug report template

### 2-12. AI 활용 역량

먼저 하는 이유: AI 기반 개발 경험은 늘고 있지만 핵심은 도구 이름이 아니라 검증 능력이다.

#### 공부할 것

- [ ] Cursor/GitHub Copilot/Codex 사용 흐름
- [ ] 코드리뷰 요청 프롬프트
- [ ] 테스트 케이스 생성 프롬프트
- [ ] 에러 디버깅 프롬프트
- [ ] 리팩터링 요청 프롬프트
- [ ] AI 결과물 보안 검토
- [ ] 타입체크/테스트/접근성으로 검증
- [ ] 7일 안에 새 언어를 배운다면 계획 세우기

### 2-13. 프로젝트 확장, 운영, 모노레포

먼저 하는 이유: 1차 MVP를 `/`, `/resume`, `/blog`, `/blog/[slug]`로 작게 완성한 뒤 `Admin/Supabase -> Profile/Blog/Resume/Craft 모노레포 -> Cloudflare 라우팅`으로 확장하면 단순 화면 구현이 아니라 실제 운영 가능한 블로그 플랫폼으로 설명할 수 있다.

#### 공부할 것

- [ ] `/`, `/resume`, `/blog`, `/blog/[slug]` 기반 1차 MVP
- [ ] 관리자만 글을 추가/수정할 수 있는 Admin 확장
- [ ] 태그/카테고리/검색/다크모드
- [ ] `Post`, `Tag`, `Category`, `Theme` 타입 모델링
- [ ] Supabase Admin: posts/tags/categories, draft/published, RLS
- [ ] service role key client 노출 금지
- [ ] Profile/Blog/Resume/Craft 앱으로 모노레포 확장
- [ ] Craft에서 debounce/throttle, virtual list 같은 개념을 인터랙티브 예제로 만들기
- [ ] pnpm workspace 기본
- [ ] `apps/profile`, `apps/blog`, `apps/resume`, `apps/craft` 분리
- [ ] `packages/ui`, `packages/meta`, `packages/config`, `packages/supabase` 분리
- [ ] workspace 단위 lint/typecheck/test/build
- [ ] Cloudflare Pages/Functions/Worker는 모노레포 이후 검토
- [ ] Sentry 또는 간단한 error logging
- [ ] 사용자 행동 지표: 검색어, 클릭, 재방문, 글 완독률 같은 정량/정성 지표

#### 모노레포로 설명할 것

- [ ] 왜 처음부터 모노레포로 시작하지 않았는가
- [ ] 어떤 기준으로 앱과 패키지를 분리했는가
- [ ] 공통 UI와 SEO metadata를 왜 패키지로 뺐는가
- [ ] workspace에서 타입체크와 빌드를 어떻게 검증하는가
- [ ] 모노레포가 과한 구조가 되지 않게 어떤 기능까지 미뤘는가

---

## 3. 12주 학습 운영안

| 주차   | 목표                          | 블로그 산출물                           |
| ------ | ----------------------------- | --------------------------------------- |
| 1주차  | 브라우저, HTML/CSS, 접근성    | 시맨틱 HTML 또는 브라우저 렌더링 글 1개 |
| 2주차  | JavaScript 이벤트, 비동기     | debounce/throttle 글 1개                |
| 3주차  | TypeScript 모델링             | Post/Category/Tag 모델링 글 1개         |
| 4주차  | React props/state/hooks       | 상태 위치 결정 글 1개                   |
| 5주차  | React effect, cleanup, 렌더링 | useEffect cleanup 또는 setState 글 1개  |
| 6주차  | Next.js 라우팅, 렌더링        | CSR/SSR/SSG 비교 글 1개                 |
| 7주차  | SEO, metadata, sitemap        | SEO 구성 글 1개                         |
| 8주차  | HTTP, REST, server state      | 서버 상태와 클라이언트 상태 글 1개      |
| 9주차  | TanStack Query, Zustand       | 상태관리 선택 기준 글 1개               |
| 10주차 | 성능 측정, 가상 리스트        | Lighthouse 또는 가상 리스트 글 1개      |
| 11주차 | 테스트, CI, 배포 문제         | RTL/Actions 또는 chunk 오류 글 1개      |
| 12주차 | AI 활용, 이력서 문장화        | AI 검증 글 또는 이력서 문장화 글 1개    |

12주 이후 확장:

- [ ] Supabase Admin으로 글 관리 확장
- [ ] Profile/Blog/Resume/Craft 앱 추가
- [ ] pnpm workspace 기반 모노레포 전환
- [ ] 공통 UI/metadata/config/Supabase 패키지 분리
- [ ] Cloudflare Pages/Functions/Worker 검토

---

## 4. 블로그에 우선 남길 글

아래 글부터 쓴다. 모든 공부를 글로 쓰지 말고, 면접 질문으로 이어지는 주제를 먼저 남긴다.

1. [ ] `브라우저 렌더링 과정을 기술블로그 화면으로 이해하기`
2. [ ] `시맨틱 HTML을 쓰는 이유를 블로그 레이아웃으로 설명하기`
3. [ ] `Link와 Button을 구분하지 않으면 생기는 접근성 문제`
4. [ ] `검색 입력에 debounce를 적용해야 하는 이유`
5. [ ] `Debounce와 Throttle을 직접 구현하며 이해하기`
6. [ ] `TypeScript로 블로그 글 데이터를 모델링하기`
7. [ ] `React에서 상태를 어디에 둘지 결정하는 기준`
8. [ ] `useEffect cleanup에서 요청 취소와 unmount 처리를 구분하기`
9. [ ] `왜 setState는 비동기처럼 동작하는가`
10. [ ] `Next.js 렌더링 방식 CSR/SSR/SSG 비교`
11. [ ] `metadata, sitemap, robots로 기본 SEO 구성하기`
12. [ ] `서버 상태와 클라이언트 상태를 구분하는 기준`
13. [ ] `TanStack Query가 fetch useEffect보다 나은 순간`
14. [ ] `가상 리스트를 적용하기 전에 먼저 확인할 것들`
15. [ ] `EC2/정적 배포에서 chunk Module not found가 나는 이유`
16. [ ] `Lighthouse 점수를 올리기 전에 먼저 측정한 것들`
17. [ ] `React Testing Library는 구현이 아니라 행동을 테스트한다`
18. [ ] `GitHub Actions로 lint, typecheck, test, build 자동화하기`
19. [ ] `AI가 만든 코드를 그대로 믿으면 안 되는 이유`
20. [ ] `기술블로그 프로젝트를 이력서 문장으로 바꾸기`
21. [ ] `블로그를 Profile/Blog/Resume/Craft 모노레포로 확장한 이유`
22. [ ] `pnpm workspace로 포트폴리오를 모노레포로 전환하기`
23. [ ] `공통 UI와 metadata를 packages로 분리한 기준`

---

## 5. 당근 면접 질문 기반 대비

질문은 답변만 외우지 말고 블로그 프로젝트 사례와 연결한다.

### 기본 질문

- [ ] 자기소개
- [ ] 프론트엔드 개발자라면 반드시 알아야 할 기술
- [ ] 내가 다른 프론트엔드 개발자보다 더 잘한다고 생각하는 것과 이유
- [ ] 프론트엔드 개발자에게 반드시 필요한 역량
- [ ] 10년차 개발자와 1년차 개발자의 차이

### 기술 질문

- [ ] 프론트엔드 하면서 가장 어려웠던 기술적 문제
- [ ] 가상 리스트 사용 전에 최적화를 위해 어디까지 고려했는지
- [ ] 가상 리스트를 직접 구현한다면 무엇을 구현해야 하는지
- [ ] debounce와 throttle 차이
- [ ] debounce 함수를 직접 구현하는 방법
- [ ] React 함수형 컴포넌트 unmount 시점에 API 요청을 보내야 한다면 어떻게 할지
- [ ] unmount 시 요청 취소와 analytics 전송을 어떻게 구분할지
- [ ] 왜 setState는 비동기처럼 동작하는지
- [ ] EC2/정적 배포에서 chunk 관련 문제가 생기는 이유
- [ ] `Module not found`가 뜨면 어떻게 확인하고 해결할지

### 프로젝트 질문

- [ ] 프로젝트에서 기술적으로 가장 잘한 선택
- [ ] 프로젝트에서 가장 큰 성과를 낸 경험
- [ ] 더 성과를 낸다면 어떤 기능이나 지표를 설계할지
- [ ] 프로젝트에서 다시는 하지 말아야 할 실수
- [ ] 고객 재구매율 또는 재방문율을 올리기 위해 어떤 지표를 볼지
- [ ] 모니터링 도구 없이 정성 지표만 봤다면 한계가 무엇인지
- [ ] 정량 지표와 정성 피드백을 어떻게 같이 볼지

### 기타 질문

- [ ] 지원/이직하려는 이유
- [ ] 7일 안에 Go를 AI로 공부한다면 어떻게 할지
- [ ] CRUD 이후 남은 시간을 어떤 기준으로 쓸지

---

## 6. 지금 하지 않을 것

아래는 블로그 MVP 이후로 미룬다. 먼저 핵심 학습 주제와 블로그 구현을 안정적으로 완성한다.

- React Native
- PWA
- Three.js/WebGL
- Docker/AWS 깊은 인프라
- GraphQL 심화
- WebSocket/SSE 심화
- HTTP/3, QUIC 심화
- WeakMap/WeakRef, generator 심화
- 디자인 패턴 나열식 공부
- 여러 상태관리 라이브러리 동시 사용
- 과한 관리자 기능
- 댓글/좋아요/조회수
- 기술블로그와 무관한 대시보드

---

## 7. 참고한 공고

- 인프랩 프론트엔드 개발자(React, TypeScript): https://www.rallit.com/positions/2126/%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90-react-typescript
- 인프랩 산업기능요원 프론트엔드 개발자: https://www.rallit.com/positions/2136/%EC%82%B0%EC%97%85%EA%B8%B0%EB%8A%A5%EC%9A%94%EC%9B%90-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90
