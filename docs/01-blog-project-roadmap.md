# 기술블로그 프로젝트 개발 로드맵

목적: 기술블로그를 빠르게 만들면서 프론트엔드 핵심 개념을 코드와 글로 정리한다.

관련 문서:

- 프로젝트 README: [README](../README.md)
- 작업 규칙: [AGENTS](../AGENTS.md)
- 학습 로드맵: [학습/블로깅 로드맵](./02-study-blogging-roadmap.md)
- AI 활용 기록: [AI 활용 기록](./04-ai-usage-log.md)
- Supabase/Admin 후순위 설계: [Supabase ERD 설계](./03-supabase-erd-design.md)

---

## 1차 MVP 범위

1차 MVP는 아래 페이지만 만든다.

- `/`: 홈
- `/resume`: 자기소개 및 이력서
- `/blog`: 블로그 목록
- `/blog/[slug]`: 블로그 상세

## 작업 순서

### 1. 프로젝트 생성

목표: 개발을 시작할 수 있는 Next.js 환경을 만든다.

- [x] Git repository 초기화
- [x] `main`, `dev` 브랜치 생성
- [x] Next.js 프로젝트 생성 옵션 확정
  - [x] TypeScript
  - [x] App Router
  - [x] Tailwind CSS
  - [x] ESLint
  - [x] `src/` 디렉토리 사용
  - [x] import alias 설정
- [x] `create-next-app` 실행
- [x] 기본 의존성 설치
  - [x] Next.js
  - [x] React
  - [x] TypeScript
  - [x] Tailwind CSS
  - [x] ESLint
  - [x] Prettier
- [x] Tailwind CSS 설정
  - [x] `postcss.config` 확인
  - [x] `globals.css`에 Tailwind 지시문 추가
  - [x] 기본 CSS 변수 또는 색상 토큰 정리
- [x] ESLint 설정
  - [x] Next.js 권장 설정 적용
  - [x] TypeScript 규칙 적용
  - [x] `lint` script 연결
  - [x] `lint:fix` script 연결
- [x] Prettier 설정
  - [x] `prettier.config.mjs` 작성
  - [x] `.prettierignore` 작성
  - [x] `eslint-config-prettier` 적용
  - [x] `prettier-plugin-tailwindcss` 적용
  - [x] `format` script 연결
  - [x] `format:check` script 연결
- [x] shadcn/ui 초기 설정
  - [x] `components.json` 생성
  - [x] `cn` 유틸 함수 준비
  - [x] 기본 UI 컴포넌트 추가 여부 결정
- [x] 기본 폴더 생성
  - [x] `src/app`
  - [x] `src/components`
  - [x] `src/hooks`
  - [x] `src/lib`
  - [x] `src/utils`
  - [x] `src/types`
- [x] npm scripts 정리
  - [x] `dev`
  - [x] `build`
  - [x] `lint`
  - [x] `lint:fix`
  - [x] `format`
  - [x] `format:check`
  - [x] `type-check`
- [x] `.gitignore` 작성
  - [x] `node_modules`
  - [x] `.next`
  - [x] `out`
  - [x] `dist`
  - [x] `coverage`
  - [x] `.env*.local`
  - [x] `.vercel`
  - [x] `.DS_Store`
- [x] `.env.example` 작성
- [x] README에 실행 방법 추가

완료 기준:

- [x] `npm run dev`가 실행된다.
- [x] `npm run lint`가 통과한다.
- [x] `npm run format:check`가 통과한다.
- [x] `npm run type-check`가 통과한다.
- [x] `npm run build`가 통과한다.
- [x] `.gitignore`, `prettier.config.mjs`, `.prettierignore`, `.env.example`이 있다.
- [x] README만 보고 로컬 실행이 가능하다.

---

### 2. 공통 레이아웃 만들기

목표: 모든 페이지가 같은 기본 구조를 사용하게 만든다.

- [x] App Router 기본 레이아웃 구성
- [x] Header 구현
  - [x] 좌측: 이름
  - [x] 우측: `Home`, `Resume`, `Blog`, `GitHub`
- [x] Footer 구현
- [x] 페이지 공통 최대 너비 설정
- [ ] 현재 페이지 표시 처리

완료 기준:

- [x] `/`, `/resume`, `/blog`, `/blog/[slug]`에서 같은 Header/Footer가 보인다.
- [x] GitHub 링크는 외부 링크로 동작한다.

---

### 3. 홈 페이지 만들기

목표: 방문자가 첫 화면에서 누구의 블로그인지 이해하고 다음 페이지로 이동할 수 있게 한다.

- [x] 이름 표시
- [x] 짧은 소개
- [x] GitHub 이동 링크 추가
- [x] Resume 이동 링크 추가
- [x] Blog 이동 버튼 추가

완료 기준:

- [x] 첫 화면에서 이름과 소개가 바로 보인다.
- [x] GitHub, Resume, Blog로 이동할 수 있다.
- [x] 과한 랜딩 페이지가 아니라 빠르게 탐색 가능한 화면이다.

### 4. 자기소개 및 이력서 페이지 만들기

목표: 사용해온 기술, 경력/프로젝트, 관심 분야를 짧고 명확하게 보여준다.

- [x] 사용해온 기술 스택 정리
  - [x] JavaScript
  - [x] TypeScript
  - [x] React
  - [x] Next.js
  - [x] HTML/CSS
  - [x] Git
- [x] 해온 학습과 프로젝트 경험 정리
- [x] 경력 또는 활동 이력 정리
- [ ] 관심 분야 정리
- [x] GitHub 이동 링크 추가
- [x] Blog 이동 링크 추가

완료 기준:

- [x] 어떤 기술을 다뤄봤는지 한눈에 보인다.
- [x] 경험이 과장 없이 정리되어 있다.
- [x] 이력서 페이지가 너무 무겁지 않고 가볍게 읽힌다.

### 5. 블로그 목록 페이지 만들기

목표: 작성한 글을 목록으로 보여주고, 각 글 상세 페이지로 이동할 수 있게 만든다.

- [x] Markdown 샘플 글 20개 작성
- [x] 글 목록 렌더링
- [x] 글 제목 표시
- [x] 글 설명 표시
- [x] 작성일 표시
- [x] 카테고리 표시
- [x] 글 상세 페이지 링크 연결
- [x] 빈 목록 상태 처리
- [ ] 최신순 정렬

완료 기준:

- [x] `/blog`에서 글 목록이 보인다.
- [x] 제목, 설명, 작성일, 태그 또는 카테고리가 보인다.
- [x] 글 카드를 누르면 `/blog/[slug]`로 이동한다.
- [x] 글이 없어도 빈 상태가 어색하지 않다.

### 6. 블로그 상세 페이지 만들기

목표: 선택한 글의 본문을 읽을 수 있는 상세 페이지를 만든다.

- [x] `/blog/[slug]` route 생성
- [x] slug로 글 데이터 찾기
- [x] 존재하지 않는 slug 처리
- [x] 글 제목 표시
- [x] 글 설명 표시
- [x] 작성일 표시
- [x] 카테고리 표시
- [x] 본문 렌더링
- [x] 목록으로 돌아가기 링크 추가

완료 기준:

- [x] `/blog/[slug]`에서 글 본문을 읽을 수 있다.
- [x] 없는 글은 어색한 빈 화면이 아니라 not found 상태로 처리한다.
- [x] 목록 페이지로 돌아갈 수 있다.

### 7. 콘텐츠 데이터 구조 만들기

목표: 나중에 Markdown/MDX로 확장할 수 있는 글 데이터 구조를 먼저 정한다.

1차 MVP에서는 Markdown 파일과 frontmatter 기반으로 시작한다.

- [x] `BlogPost` 타입 작성
- [x] `BlogPostDetail` 타입 작성
- [x] Markdown post 20개 작성
- [ ] 최신순 정렬 함수 작성
- [ ] draft 필터링 함수 작성
- [x] 글 목록 페이지에서 Markdown 데이터 연결
- [x] slug 기반 상세 조회 함수 작성

완료 기준:

- [x] 글 데이터 구조가 타입으로 정의되어 있다.
- [ ] draft 글은 목록에서 제외할 수 있다.
- [x] slug로 상세 글을 찾을 수 있다.
- [x] Markdown/MDX frontmatter로 확장하기 쉽다.

### 8. 기본 SEO와 접근성

목표: 기본적인 웹 품질을 갖춘다.

- [ ] 페이지별 title 설정
- [ ] 페이지별 description 설정
- [ ] Open Graph 기본값 설정
- [ ] heading 순서 확인
- [ ] `main`, `nav`, `footer` landmark 확인
- [ ] 링크와 버튼 역할 구분
- [ ] focus style 확인
- [ ] 색상 대비 확인

완료 기준:

- [ ] 각 페이지의 목적이 metadata에 들어가 있다.
- [ ] 키보드로 주요 링크를 이동할 수 있다.
- [ ] heading 구조가 어색하지 않다.

### 9. 린트/포맷/타입 체크

목표: 기본 코드 품질 검사를 자동화한다.

- [x] ESLint 설정 확인
- [x] Prettier 설정
- [x] `type-check` script 추가
- [x] `lint` 실행
- [x] `format:check` 실행
- [x] `type-check` 실행
- [x] `build` 실행

완료 기준:

- [x] `npm run lint`가 통과한다.
- [x] `npm run format:check`가 통과한다.
- [x] `npm run type-check`가 통과한다.
- [x] `npm run build`가 통과한다.

---

### 10. Vercel 1차 배포

목표: 공개 URL을 만든다.

- [x] Vercel 프로젝트 생성
- [x] Vercel에 GitHub repository 연결
- [x] production branch를 `main`으로 설정
- [x] preview deployment 대상 브랜치 확인
- [x] build command 확인
- [x] command override 비활성화
- [x] production deploy 확인
- [x] Web Analytics 코드 연결
- [x] Speed Insights 코드 연결
- [x] preview deploy 생성 확인
- [x] 배포 URL README에 추가

완료 기준:

- [x] 배포 URL이 있다.
- [x] `main`에 머지하면 production deployment가 실행된다.
- [x] 작업 브랜치 또는 PR에서 preview deployment가 생성된다.

배포 URL:

- Production URL: <https://tech-blog-delta.vercel.app>
- Production URL 응답: `200 OK` 확인
- Source branch: `main`
- Build setting: Next.js preset 기본값 사용
- Web Analytics: `@vercel/analytics`
- Speed Insights: `@vercel/speed-insights`

## 1차 MVP 이후

### 2차 MVP: 관리자와 Supabase 기반 글 관리

목표: 파일이나 샘플 데이터로 직접 글을 올리던 방식에서, 관리자 화면을 통해 블로그 글을 추가/수정하는 방식으로 확장한다.

#### 공개 사용자 기능

- [ ] 공개된 글 목록 조회
- [ ] 공개된 글 상세 조회
- [ ] draft 글 숨김
- [ ] 태그/카테고리 표시

#### 관리자 기능

- [ ] 관리자 로그인
- [ ] 관리자만 접근 가능한 admin route 구성
- [ ] 글 추가
- [ ] 글 수정
- [ ] 글 삭제 또는 비공개 처리
- [ ] draft/published 상태 관리
- [ ] 태그 관리
- [ ] 카테고리 관리

#### Supabase 연동

- [ ] Supabase 프로젝트 생성
- [ ] Auth 설정
- [ ] posts 테이블 생성
- [ ] tags 테이블 생성
- [ ] categories 테이블 생성
- [ ] post_tags 관계 테이블 생성
- [ ] admin_users 테이블 생성
- [ ] RLS 정책 설정
- [ ] server client와 browser client 분리

완료 기준:

- [ ] 관리자인 나만 글을 추가/수정할 수 있다.
- [ ] 일반 방문자는 공개된 글만 볼 수 있다.
- [ ] draft 글은 공개 페이지에 보이지 않는다.
- [ ] Supabase key가 client에 잘못 노출되지 않는다.

### 블로그 사용성 개선

- [ ] Markdown/MDX 기반 상세 페이지 전환
- [ ] code block 스타일
- [ ] table/blockquote/list 스타일
- [ ] 태그 페이지
- [ ] 카테고리 페이지
- [ ] 제목/요약 검색
- [ ] 검색어 debounce
- [ ] 다크모드
- [ ] table of contents

### 3차 MVP: 모노레포와 Cloudflare 라우팅

목표: profile, blog, resume, craft를 독립 앱으로 나누되 하나의 모노레포에서 관리하고, 단일 도메인에서는 Cloudflare Pages Functions로 경로 기반 프록시를 구성한다.

#### 모노레포 앱 구조

- [ ] `apps/profile`
- [ ] `apps/blog`
- [ ] `apps/resume`
- [ ] `apps/craft`

#### 공통 패키지

- [ ] `packages/ui`
- [ ] `packages/meta`
- [ ] `packages/config`
- [ ] 공통 Tailwind 테마
- [ ] 공통 GNB
- [ ] 공통 Footer

#### Cloudflare 라우팅

- [ ] `rhei.me/` 요청을 profile 앱으로 연결
- [ ] `rhei.me/blog/...` 요청을 blog 앱으로 프록시
- [ ] `rhei.me/resume/...` 요청을 resume 앱으로 프록시
- [ ] `rhei.me/craft/...` 요청을 craft 앱으로 프록시
- [ ] 각 앱은 독립 배포 가능하게 유지

#### Craft

- [ ] Debounce/Throttle 실험
- [ ] Event Loop 시각화
- [ ] Browser Rendering 시각화

완료 기준:

- [ ] 코드는 하나의 모노레포에서 관리된다.
- [ ] 각 앱은 독립적으로 배포 가능하다.
- [ ] 단일 도메인 경로가 적절한 앱으로 라우팅된다.
- [ ] 공통 테마와 GNB/Footer를 여러 앱에서 공유한다.

### 후순위 인프라

- [ ] GitHub API 기반 활동 기록
