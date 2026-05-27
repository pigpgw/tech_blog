# 기술 블로그 프로젝트

개인 기술 블로그를 개발하며 개발 과정에서 마주친 문제와 해결 과정을 정리하는 프로젝트이다.

## 프로젝트 목표와 범위

### 목표

- [AI 활용 기록](docs/02-ai-usage-log.md)을 통해 AI를 사용한 과정과 산출물을 정리한다.
- [AGENTS.md](AGENTS.md)에 저장소 작업 규칙과 Codex 공동 작성 기준을 둔다.
- [.codex/skills](.codex/skills)에 반복해서 사용할 AI 작업 절차를 둔다.

### MVP 단계

1. 1차 MVP: 홈, 이력서, 블로그
   - 홈, 자기소개 및 이력서, 블로그 목록/상세 페이지만 먼저 구현한다.
   - 기술 블로그 개발을 통해 구현, 성능, 접근성, 데이터 연동 등 실제 문제 해결 과정을 코드와 글로 기록한다.
   - 웹 표준, 웹 접근성, SEO, 성능 최적화 경험을 글과 화면으로 증빙한다.
   - 개발 과정에서 AI 도구를 활용하고, 활용 방식과 학습 내용을 함께 기록한다.
2. 2차 MVP: 관리자와 Supabase 기반 글 관리
   - 기존에는 파일이나 샘플 데이터로 글을 직접 관리한다.
   - 2차 MVP에서는 Supabase를 연결하고, 관리자 화면에서 블로그 글을 추가/수정할 수 있게 만든다.
   - 글 작성/수정/삭제는 관리자만 가능하게 제한한다.
   - 일반 방문자는 공개된 글만 볼 수 있게 한다.
3. 3차 MVP: 모노레포와 Cloudflare 라우팅
   - profile, blog, resume, craft를 각각 독립 앱으로 나눈다.
   - 코드는 하나의 모노레포에서 관리한다.
   - 공통 테마, GNB, Footer, UI 컴포넌트를 패키지로 공유한다.
   - Cloudflare Pages Functions로 요청 경로에 맞는 앱으로 프록시한다.
   - 예: `rhei.me/blog/...` 요청을 `blog.rhei.me/blog/...` 앱으로 전달한다.
4. 후순위 확장: 모바일 경험
   - 1차 MVP에서는 별도 모바일 앱을 만들지 않고 반응형 웹으로 대응한다.
   - 모바일에서 읽기와 탐색이 충분한지 먼저 확인한다.
   - 앱 설치, 푸시 알림, 오프라인 저장처럼 웹만으로 부족한 요구가 생기면 PWA 또는 React Native를 검토한다.

## 주요 기능

### 1차 MVP: 홈, 이력서, 블로그

- 홈 페이지
  - 이름과 기술 블로그 소개를 보여준다.
  - 블로그와 이력서 페이지로 이동하는 버튼을 제공한다.
- 자기소개 및 이력서 페이지
  - 어떤 스택을 사용해왔는지 정리한다.
  - 지금까지 해온 학습, 프로젝트, 경험을 가볍게 보여준다.
  - 기술 스택, 경력/프로젝트, 관심 분야와 앞으로 확장할 방향을 정리한다.
- 블로그 페이지
  - 작성한 기술 글을 최신순으로 확인할 수 있게 한다.
  - 개발하며 마주친 문제와 해결 과정을 글 단위로 정리한다.
  - `/blog`에서는 글 목록과 요약을 보여준다.
  - `/blog/[slug]`에서는 선택한 글의 본문을 읽을 수 있게 한다.
- 공통 헤더
  - 좌측에는 이름을 배치한다.
  - 우측에는 `Home`, `Resume`, `Blog`, `GitHub` 이동 링크를 배치한다.
  - 개인 GitHub 링크는 공통 헤더에서만 제공한다.
- SEO 및 공유 최적화
  - 페이지별 title, description, Open Graph 메타데이터를 설정한다.
  - 검색 노출과 링크 공유 미리보기를 고려한다.
- 접근성과 기본 품질
  - 시맨틱 마크업, 키보드 탐색, 명도 대비 등 기본 웹 접근성을 지킨다.
  - Lighthouse, 접근성 검사, 빌드 검증을 통해 기본 품질을 확인한다.
- 모바일 대응
  - 1차 MVP에서는 반응형 웹으로 모바일 화면을 지원한다.
  - 별도 React Native 앱은 만들지 않는다.
  - 모바일 앱이 필요한 이유가 명확해질 때 PWA 또는 React Native를 비교 검토한다.

## URL 구조

- `/`: Home. Resume, Blog, Lab으로 이동하는 허브.
- `/resume`: 이력서와 프로젝트 증빙.
- `/blog`: 글 목록.
- `/blog/[slug]`: 글 상세.
- `/blog/categories/[...segments]`: 카테고리별 글 목록.
- `/lab`: 실습 목록.
- `/lab/[slug]`: 개별 실습.
- `/admin/login`: 관리자 로그인.
- `/admin/posts`: 관리자 글 목록.
- `/admin/posts/new`: 새 글 작성.
- `/admin/posts/[id]/edit`: 글 수정.
- `/admin/posts/[id]/preview`: 글 미리보기.

URL 기준:

- 공개 글은 slug로 접근한다.
- Admin 글 수정은 DB id로 접근한다.
- 카테고리는 path로 표현한다. 예: `/blog/categories/web/react`.
- 검색어, 태그, 페이지, 정렬처럼 공유 가능한 목록 상태만 query string으로 둔다.
- drawer, modal, toast, form 입력 상태는 URL에 남기지 않는다.

## 로컬 실행 방법

### Node.js 버전

이 프로젝트는 Node.js `22.x`를 기준으로 실행한다.

```bash
nvm use
```

Node.js `24.x`도 사용할 수 있지만, 1차 MVP에서는 최신 기능보다 안정적인 LTS 환경이 더 중요하므로 Vercel과 로컬 기준을 `22.x`로 맞춘다.

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

개발 서버 실행 후 브라우저에서 `http://localhost:3000`으로 접속한다.

### 품질 검증

```bash
npm run lint
npm run format:check
npm run type-check
npm run build
```

### 포맷팅

```bash
npm run format
```

## 배포

- Production URL: <https://tech-blog-delta.vercel.app>
- 배포 플랫폼: Vercel
- production branch: `main`
- Web Analytics: `@vercel/analytics`
- Speed Insights: `@vercel/speed-insights`

평소 작업은 `dev`에서 진행하고, 배포할 준비가 끝나면 `main`에 반영한다.
`main`에 push되면 Vercel production deployment가 실행된다.
개별 deployment URL은 배포마다 달라지므로 README에는 production URL만 기록한다.
Vercel Project Settings의 Build/Output/Install/Development Command override는 끄고, Next.js preset 기본값을 사용한다.

### 2차 MVP: 관리자와 Supabase 기반 글 관리

- Supabase 연동
  - 블로그 글, 태그, 카테고리를 DB로 관리한다.
  - 공개 페이지에서는 published 상태의 글만 조회한다.
- 관리자 인증
  - 관리자만 글 작성/수정/삭제 화면에 접근할 수 있게 한다.
  - 일반 방문자는 관리자 기능을 사용할 수 없다.
- 글 관리 기능
  - 관리자 화면에서 글을 추가한다.
  - 기존 글을 수정한다.
  - draft/published 상태를 관리한다.
  - 태그와 카테고리를 관리한다.
- 공개 조회
  - 방문자는 공개된 글 목록과 글 내용을 조회한다.
  - 비공개 draft 글은 공개 화면에 노출하지 않는다.

### 3차 MVP: 모노레포와 Cloudflare 라우팅

- 앱 분리
  - `profile`, `blog`, `resume`, `craft` 앱을 모노레포 안에서 분리한다.
  - 각 앱은 독립적으로 배포 가능한 구조를 가진다.
- 공통 패키지
  - Tailwind 테마, GNB, Footer, 공통 UI 컴포넌트를 공유한다.
  - metadata, config 등도 공통 패키지로 분리한다.
- Cloudflare 라우팅
  - Cloudflare Pages Functions로 단일 도메인 경로를 각 앱으로 프록시한다.
  - 예: `/blog/...`는 blog 앱으로, `/resume/...`은 resume 앱으로, `/craft/...`는 craft 앱으로 전달한다.
- Craft
  - 블로그에서 다룬 개념을 시각화하거나 직접 실험할 수 있는 페이지를 만든다.
  - 예: 디바운스, 쓰로틀, 렌더링 최적화, 브라우저 이벤트 흐름

## 기술 스택

- 빌드 도구: Next.js 기본 빌드 시스템
- 프레임워크: Next.js
  - 기술 블로그는 검색 노출, 공유 미리보기, 페이지별 메타데이터가 중요하므로 SEO 구성이 쉬운 Next.js를 사용한다.
- 언어: TypeScript
  - 정적 타입을 통해 런타임 오류를 줄이고 코드의 의도를 명확히 드러낸다.
- 스타일링: Tailwind CSS
  - 빠른 UI 구현과 일관된 스타일 관리를 위해 사용한다.
- UI 컴포넌트: shadcn/ui
  - 컴포넌트 코드를 프로젝트에 직접 가져와 소유하고 수정할 수 있는 방식을 사용한다.
- 상태 관리: Context + reducer, TanStack Query, Zustand
  - 1차 MVP에서는 가능한 한 Context + reducer로 단순하게 시작한다.
  - 서버 상태가 필요해지면 TanStack Query를 사용한다.
  - 전역 클라이언트 상태가 복잡해질 경우 Zustand를 검토한다.
- 폼: React Hook Form
  - 입력 폼이 필요한 기능이 생기면 React Hook Form을 우선 검토한다.
- API 통신: fetch
  - Next.js의 서버 컴포넌트, 라우트 핸들러, 캐싱 및 재검증 옵션과 자연스럽게 연동하기 위해 기본 `fetch`를 사용한다.
  - axios는 기본 선택지로 두지 않는다.
  - 필요한 경우 `fetch` 래퍼를 만들어 공통 에러 처리, 인증 헤더, 응답 파싱을 관리한다.
- 테스트: Vitest, Playwright
  - 단위 테스트와 유틸리티 테스트는 Vitest를 사용한다.
  - 주요 사용자 흐름의 E2E 테스트가 필요해지면 Playwright를 사용한다.
  - Cypress는 별도 필요가 생길 때 비교 검토한다.
- 모바일 앱: 후순위 검토
  - 1차 MVP에서는 Next.js 반응형 웹으로 모바일 사용성을 확보한다.
  - 설치형 앱 경험이 필요하면 먼저 PWA를 검토한다.
  - 네이티브 기능이 필요해지면 React Native 또는 Expo를 검토한다.

### 패키지 매니저

- 1차 MVP: npm
  - 초기 단일 Next.js 블로그는 npm으로도 충분하다.
  - 별도 설치 없이 바로 사용할 수 있어 빠르게 시작하기 좋다.
  - lockfile은 `package-lock.json`만 사용한다.
- 3차 MVP: pnpm 검토
  - 추후 `apps/profile`, `apps/blog`, `apps/resume`, `apps/craft`, `packages/ui`, `packages/meta`처럼 모노레포로 확장하면 pnpm을 검토한다.
  - pnpm은 설치 속도와 디스크 효율이 좋고 workspace 기능이 강하다.
  - pnpm 도입 시 lockfile은 `pnpm-lock.yaml`만 사용한다.

### 배포 플랫폼

- 1차 MVP: Vercel
  - Next.js 배포와 preview deployment 구성이 쉬워 빠른 MVP 배포에 적합하다.
  - 환경 변수, preview URL 접근, API 인증, DB 권한 설정은 프로젝트에서 직접 관리한다.
  - Vercel 자체가 보안상 나쁜 선택은 아니지만, 설정을 잘못하면 민감 정보 노출이나 preview 접근 문제가 생길 수 있다.
- 3차 MVP: Cloudflare 검토
  - 모노레포 확장, CDN/WAF, edge 전략, 비용 구조가 중요해질 때 Cloudflare Pages 또는 Cloudflare Workers를 검토한다.
  - 단순 블로그 MVP 단계에서는 먼저 도입하지 않는다.

## 컨벤션

### 커밋

커밋 메시지는 Conventional Commits 형식을 따른다.

- 커밋 내용은 한국어로 작성한다.
- subject 문장은 `~한다` 형식으로 끝낸다.
- body와 footer는 필요한 경우에만 작성한다.

커밋 형식:

```txt
type(scope)!: subject

body

footer
```

기본적으로는 `type: subject` 형식을 사용한다.
영향 범위를 명확히 하고 싶을 때만 `scope`를 사용한다.
호환성이 깨지는 변경은 `!` 또는 footer의 `BREAKING CHANGE:`로 표시한다.

커밋 예시:

```txt
docs: 기술스택 선정 이유를 정리한다
feature: 홈 페이지를 구현한다
feature: 블로그 글 목록 페이지를 추가한다
fix: draft 게시글이 노출되는 문제를 수정한다
refactor: 게시글 조회 로직을 별도 함수로 분리한다
style: 모바일 글 목록 레이아웃을 개선한다
chore: Next.js 초기 설정을 추가한다
test: 게시글 정렬 로직 테스트를 추가한다
feature(blog): slug 기반 게시글 상세 페이지를 구현한다
fix(post)!: 게시글 slug 생성 방식을 변경한다
```

커밋 타입:

- `feature`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 코드 구조 개선
- `docs`: 문서 수정
- `style`: UI 스타일 수정
- `chore`: 설정, 패키지, 빌드 관련 작업
- `test`: 테스트 추가 또는 수정

body 작성 기준:

- 변경 이유나 구현 의도를 subject만으로 설명하기 어려울 때 작성한다.
- 무엇을 바꿨는지보다 왜 바꿨는지를 중심으로 작성한다.

footer 작성 기준:

- `BREAKING CHANGE:`가 있을 때 작성한다.
- 관련 이슈나 참고 링크를 남겨야 할 때 작성한다.
- Codex가 코드, 문서, 설정, 워크플로우, 스킬 등 커밋되는 산출물을 직접 작성하거나 수정한 경우 `Co-authored-by: Codex <codex@openai.com>`를 남길 수 있다.
- 사용자가 실제 작업을 하고 Codex가 질문 답변, 가벼운 검토, 표현 확인만 한 경우에는 `Co-authored-by`를 남기지 않는다.
- 단순 포맷 변경, 간단한 질문, 낮은 가치의 보일러플레이트 생성에도 `Co-authored-by`를 남기지 않는다.

### 이슈, 브랜치, PR

혼자 개발하더라도 주요 변경은 작업 의도와 검증 결과가 남도록 이슈와 PR을 선택적으로 사용한다.

이슈 작성 기준:

- 30분 안에 끝나는 작은 수정, 오타, 단순 스타일 조정은 이슈를 생략할 수 있다.
- 기능 범위, 재현 절차, 검증 기준을 정리해야 하는 작업은 이슈를 만든다.
- 블로그 글, AI 활용 기록, 회고로 남길 가치가 있는 작업은 이슈를 만든다.

브랜치 기준:

- `main`: production 배포 브랜치. 직접 작업하지 않는다.
- `dev`: 기본 통합 브랜치. 작은 수정은 `dev`에서 바로 작업할 수 있다.
- `feature/<slug>`: 기능, 화면, 사용자 경험 추가
- `fix/<slug>`: 버그 수정
- `docs/<slug>`: 문서, 블로그 글, 기록
- `chore/<slug>`: 설정, 템플릿, 빌드 도구

브랜치 이름은 영어 kebab-case로 작성한다.

예시:

```txt
feature/blog-search
fix/draft-post-filter
docs/github-workflow
chore/pr-template
```

PR 작성 기준:

- 주요 기능, 버그 수정, 문서 구조 변경, 설정 변경은 PR을 만든다.
- PR 본문에는 목적, 변경 내용, 검증 결과, 관련 이슈, AI 활용 여부를 남긴다.
- 실행하지 않은 검증 항목은 이유를 적는다.
- PR은 `dev`로 병합하고, 배포 준비가 끝난 변경만 `main`에 반영한다.

### 린터 & 프리티어

- 린터: ESLint
  - Next.js, React, TypeScript에서 발생하기 쉬운 코드 문제를 개발 단계에서 잡기 위해 사용한다.
  - Next.js 권장 설정인 `eslint-config-next/core-web-vitals`를 사용한다.
  - TypeScript 규칙은 `eslint-config-next/typescript`를 함께 사용한다.
- 포맷터: Prettier
  - 코드 스타일은 ESLint가 아니라 Prettier가 전담한다.
  - 들여쓰기, 줄바꿈, 따옴표 등 스타일 논쟁을 줄이고 일관된 코드 포맷을 유지한다.
- ESLint와 Prettier 충돌 방지
  - `eslint-config-prettier`를 사용해 Prettier와 충돌할 수 있는 ESLint 스타일 규칙을 비활성화한다.
  - `eslint-plugin-prettier`는 사용하지 않는다.
  - 린트와 포맷팅 책임을 분리해 설정을 단순하게 유지한다.
- Tailwind 클래스 정렬
  - `prettier-plugin-tailwindcss`를 사용한다.
  - Tailwind 클래스 순서를 자동 정렬해 `className` 가독성을 높인다.

실행 명령어:

```txt
npm run lint
npm run lint:fix
npm run format
npm run format:check
npm run type-check
npm run build
```

## 프론트엔드 디렉토리 구조

### 1차 MVP: Layer-based

초기에는 기능 수가 많지 않으므로 단순한 계층 기반 구조로 시작한다.

```txt
src/                      # 애플리케이션 소스 코드
├─ app/                   # Next.js App Router 라우트
│  ├─ page.tsx            # 홈 페이지
│  ├─ resume/             # 자기소개 및 이력서 페이지 라우트
│  │  └─ page.tsx
│  └─ blog/               # 블로그 페이지 라우트
│     ├─ page.tsx         # 블로그 글 목록 페이지
│     └─ [slug]/          # slug 기반 블로그 상세 페이지 라우트
│        └─ page.tsx
├─ components/            # 화면을 구성하는 재사용 UI 컴포넌트
├─ hooks/                 # React custom hook
├─ lib/                   # 도메인에 종속된 함수
├─ utils/                 # 도메인과 무관한 순수 공통 함수
└─ types/                 # 여러 파일에서 공유하는 TypeScript 타입
```

- `lib` 예시: 블로그 글 조회, Markdown/MDX 처리
- `utils` 예시: 날짜 포맷, 문자열 처리

### 3차 MVP: 모노레포 구조 검토

profile, blog, resume, craft 앱과 공통 UI 패키지 등으로 기능이 늘어나면 모노레포 구조로 전환한다.

```txt
apps/
├─ profile/
├─ blog/
├─ resume/
└─ craft/
packages/
├─ ui/
├─ meta/
└─ config/
```

## 배포와 검증 흐름

배포 플랫폼은 MVP 단계에 따라 다르게 사용한다.

- 1차 MVP: Vercel
  - Next.js 블로그를 빠르게 배포하기 위해 Vercel을 사용한다.
  - Vercel에 GitHub repository를 연결한다.
  - 평소 작업은 `dev`에서 진행하고, 배포할 준비가 끝나면 `main`에 반영한다.
  - `main`에 push되면 Vercel production deployment로 배포 결과를 확인한다.
  - GitHub Actions는 1차 MVP에서는 필수로 도입하지 않는다.
- 3차 MVP: Cloudflare 검토
  - profile, blog, resume, craft가 독립 앱으로 나뉘면 Cloudflare Pages Functions로 경로 기반 프록시를 검토한다.
  - Cloudflare 전환 또는 모노레포 검증 자동화가 필요해질 때 GitHub Actions를 도입한다.
  - CDN, edge runtime, 비용 구조, 캐싱 전략이 중요해질 때 전환 여부를 판단한다.

### 코드 검증

1차 MVP에서는 로컬에서 다음 검증을 실행한다.

- `lint`: ESLint 검사
- `format:check`: Prettier 포맷 검사
- `type-check`: TypeScript 타입 검사
- `test`: 단위 테스트
- `build`: Next.js 빌드 검증

GitHub Actions는 3차 MVP에서 Cloudflare, 모노레포, 앱별 배포 검증이 필요해질 때 추가한다.
