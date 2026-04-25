# 프론트엔드 학습/블로깅 로드맵

목적: 프론트엔드 개발자 역량을 보여주는 주제를 우선 학습하고, 기술블로그 글과 프로젝트 코드로 증명한다.

관련 문서:

- 블로그 구현 로드맵: [기술블로그 프로젝트 개발 로드맵](./01-blog-project-roadmap.md)
- Supabase/Admin 설계: [Supabase ERD 설계](./03-supabase-erd-design.md)

## 1. 학습 순서

### 1-1. 브라우저 렌더링과 프론트엔드 성능

- [ ] DOM/CSSOM/render tree
- [ ] layout/paint/composite
- [ ] reflow/repaint
- [ ] critical rendering path
- [ ] `async`/`defer`

### 1-2. HTML/CSS와 접근성

- [ ] semantic HTML
- [ ] heading 구조
- [ ] link와 button 차이
- [ ] form, input, label
- [ ] meta, OG tag, canonical
- [ ] box model
- [ ] position, stacking context
- [ ] flex/grid
- [ ] responsive layout
- [ ] focus style, keyboard navigation
- [ ] `aria-label`, `aria-live`, `aria-hidden`, `tabindex`

### 1-3. JavaScript 실행, 이벤트, 비동기

- [ ] 실행 컨텍스트, call stack, scope chain
- [ ] 원시값 vs 참조값
- [ ] closure
- [ ] this
- [ ] event bubbling/capturing
- [ ] event delegation
- [ ] event loop, task queue, microtask queue
- [ ] Promise, async/await
- [ ] debounce/throttle 직접 구현
- [ ] AbortController

### 1-4. HTTP, REST API, 인증/보안

- [ ] HTTP method/status code
- [ ] request/response/header
- [ ] REST API 설계 원칙
- [ ] query string
- [ ] loading/error/empty 상태
- [ ] timeout/retry/cancel
- [ ] CORS, preflight, credentials
- [ ] cookie/session
- [ ] JWT
- [ ] XSS/CSRF

### 1-5. TypeScript 기본과 데이터 모델링

- [ ] interface vs type
- [ ] union/intersection
- [ ] optional/readonly
- [ ] as const
- [ ] unknown/any/never
- [ ] narrowing
- [ ] generic 기본
- [ ] Pick/Omit/Record/ReturnType
- [ ] discriminated union
- [ ] API 응답 타입과 도메인 타입 분리
- [ ] React event type
- [ ] props 타입 설계

### 1-6. React 핵심

- [ ] component 단일 책임
- [ ] props/state
- [ ] 단방향 데이터 흐름
- [ ] list key
- [ ] controlled/uncontrolled input
- [ ] useState와 함수형 업데이트
- [ ] useEffect dependency, cleanup, stale closure
- [ ] useRef
- [ ] useMemo/useCallback 사용 기준
- [ ] custom hook
- [ ] React.memo
- [ ] reconciliation
- [ ] derived state를 state로 저장하지 않는 기준

### 1-7. React 상태관리, 폼, 에러 처리

- [ ] server state vs client state
- [ ] UI local state vs global state
- [ ] TanStack Query: query key, staleTime, invalidate
- [ ] Zustand 기본
- [ ] React Hook Form
- [ ] Zod
- [ ] field validation
- [ ] ErrorBoundary
- [ ] network error fallback
- [ ] Suspense와 Skeleton UI 기본
- [ ] `useDebounce`, `useThrottle`
- [ ] `useIntersectionObserver`
- [ ] `useLocalStorage`, `useEventListener`

### 1-8. Next.js, SEO, 배포

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
- [ ] dynamic import, code splitting
- [ ] Vercel production/preview deploy

### 1-9. 성능 측정과 코드 품질

- [ ] Lighthouse
- [ ] LCP/CLS/INP
- [ ] Chrome DevTools Performance
- [ ] bundle analyzer
- [ ] image lazy loading, WebP/AVIF, width/height
- [ ] font-display
- [ ] preload/prefetch/preconnect
- [ ] dynamic import
- [ ] 불필요한 dependency 제거
- [ ] ESLint/Prettier
- [ ] TypeScript strict mode
- [ ] React Testing Library
- [ ] Playwright smoke test
- [ ] GitHub Actions
- [ ] lint/typecheck/test/build CI

### 1-10. AI 활용과 문서화

- [ ] Cursor/GitHub Copilot/Codex 사용 흐름
- [ ] 코드리뷰 요청 프롬프트
- [ ] 테스트 케이스 생성 프롬프트
- [ ] 에러 디버깅 프롬프트
- [ ] 리팩터링 요청 프롬프트
- [ ] AI 결과물 보안 검토
- [ ] 타입체크/테스트/접근성으로 검증
- [ ] 의미 있는 AI 활용 사례 기록

### 1-11. 프로젝트 확장과 운영

- [x] `/`, `/resume`, `/blog`, `/blog/[slug]` 기반 1차 MVP
- [ ] 관리자만 글을 추가/수정할 수 있는 Admin 확장
- [ ] 태그/카테고리/검색/다크모드
- [ ] `Post`, `Tag`, `Category`, `Theme` 타입 모델링
- [ ] Supabase Admin: posts/tags/categories, draft/published, RLS
- [ ] service role key client 노출 금지
- [ ] 방문자 수, 페이지뷰, 글별 조회수 같은 사용자 행동 지표
- [ ] Sentry 또는 간단한 error logging
- [ ] Profile/Blog/Resume/Craft 앱으로 모노레포 확장
- [ ] pnpm workspace 기본
- [ ] `apps/profile`, `apps/blog`, `apps/resume`, `apps/craft` 분리
- [ ] `packages/ui`, `packages/meta`, `packages/config`, `packages/supabase` 분리
- [ ] workspace 단위 lint/typecheck/test/build

## 2. 블로그에 우선 남길 글

1. [ ] `브라우저 렌더링 과정을 기술블로그 화면으로 이해하기`
2. [ ] `시맨틱 HTML을 쓰는 이유를 블로그 레이아웃으로 설명하기`
3. [ ] `Link와 Button을 구분하지 않으면 생기는 접근성 문제`
4. [ ] `Debounce와 Throttle을 직접 구현하며 이해하기`
5. [ ] `useEffect cleanup에서 요청 취소와 unmount 처리를 구분하기`
6. [ ] `TypeScript로 블로그 글 데이터를 모델링하기`
7. [ ] `React에서 상태를 어디에 둘지 결정하는 기준`
8. [ ] `서버 상태와 클라이언트 상태를 구분하는 기준`
9. [ ] `Next.js 렌더링 방식 CSR/SSR/SSG 비교`
10. [ ] `metadata, sitemap, robots로 기본 SEO 구성하기`
11. [ ] `Lighthouse 점수를 올리기 전에 먼저 측정한 것들`
12. [ ] `AI가 만든 코드를 그대로 믿으면 안 되는 이유`
13. [ ] `기술블로그 프로젝트를 이력서 문장으로 바꾸기`

## 3. 면접 질문 기반 대비

### 기본 질문

- [ ] 자기소개
- [ ] 프론트엔드 개발자에게 반드시 필요한 역량
- [ ] 내가 다른 프론트엔드 개발자보다 더 잘한다고 생각하는 것과 이유
- [ ] 10년차 개발자와 1년차 개발자의 차이

### 기술 질문

- [ ] 브라우저가 화면을 그리는 과정을 설명할 수 있는가
- [ ] reflow/repaint가 생기는 상황과 줄이는 방법을 설명할 수 있는가
- [ ] link와 button을 구분하는 기준을 설명할 수 있는가
- [ ] debounce와 throttle 차이를 설명할 수 있는가
- [ ] debounce 함수를 직접 구현할 수 있는가
- [ ] unmount 시 요청 취소와 analytics 전송을 어떻게 구분할지 설명할 수 있는가
- [ ] 왜 setState는 비동기처럼 동작하는지 설명할 수 있는가
- [ ] 서버 상태와 클라이언트 상태를 구분할 수 있는가
- [ ] Next.js 렌더링 방식별 차이를 설명할 수 있는가
- [ ] `Module not found`나 chunk 오류가 나면 어떻게 확인할지 설명할 수 있는가

### 프로젝트 질문

- [ ] 프로젝트에서 기술적으로 가장 잘한 선택
- [ ] 프로젝트에서 가장 큰 성과를 낸 경험
- [ ] 더 성과를 낸다면 어떤 기능이나 지표를 설계할지
- [ ] 모니터링 도구 없이 정성 지표만 봤다면 한계가 무엇인지
- [ ] 정량 지표와 정성 피드백을 어떻게 같이 볼지
- [ ] 프로젝트에서 다시는 하지 말아야 할 실수
