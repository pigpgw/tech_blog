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

1차 MVP에서 하지 않는다.

- 검색
- 태그/카테고리 페이지
- 다크모드
- 관리자 페이지
- DB 연동
- 모바일 앱
- 모노레포

---

## 작업 순서

### 1. 프로젝트 생성

목표: 개발을 시작할 수 있는 Next.js 환경을 만든다.

- [x] Git repository 초기화
- [x] `main`, `dev` 브랜치 생성
- [ ] Next.js 프로젝트 생성 옵션 확정
  - [ ] TypeScript
  - [ ] App Router
  - [ ] Tailwind CSS
  - [ ] ESLint
  - [ ] `src/` 디렉토리 사용
  - [ ] import alias 설정
- [ ] `create-next-app` 실행
- [ ] 기본 의존성 설치
  - [ ] Next.js
  - [ ] React
  - [ ] TypeScript
  - [ ] Tailwind CSS
  - [ ] ESLint
  - [ ] Prettier
- [ ] Tailwind CSS 설정
  - [ ] `tailwind.config` 확인
  - [ ] `postcss.config` 확인
  - [ ] `globals.css`에 Tailwind 지시문 추가
  - [ ] 기본 CSS 변수 또는 색상 토큰 정리
- [ ] ESLint 설정
  - [ ] Next.js 권장 설정 적용
  - [ ] TypeScript 규칙 적용
  - [ ] `lint` script 연결
  - [ ] `lint:fix` script 연결
- [ ] Prettier 설정
  - [ ] `.prettierrc` 작성
  - [ ] `.prettierignore` 작성
  - [ ] `eslint-config-prettier` 적용
  - [ ] `prettier-plugin-tailwindcss` 적용
  - [ ] `format` script 연결
  - [ ] `format:check` script 연결
- [ ] shadcn/ui 초기 설정
  - [ ] `components.json` 생성
  - [ ] `cn` 유틸 함수 준비
  - [ ] 기본 UI 컴포넌트 추가 여부 결정
- [ ] 기본 폴더 생성
  - [ ] `src/app`
  - [ ] `src/components`
  - [ ] `src/lib`
  - [ ] `src/data`
  - [ ] `src/types`
  - [ ] `content/posts`
- [ ] npm scripts 정리
  - [ ] `dev`
  - [ ] `build`
  - [ ] `lint`
  - [ ] `lint:fix`
  - [ ] `format`
  - [ ] `format:check`
  - [ ] `type-check`
- [x] `.gitignore` 작성
  - [x] `node_modules`
  - [x] `.next`
  - [x] `out`
  - [x] `dist`
  - [x] `coverage`
  - [x] `.env*.local`
  - [x] `.vercel`
  - [x] `.DS_Store`
- [ ] `.env.example` 작성
- [ ] README에 실행 방법 추가

완료 기준:

- [ ] `npm run dev`가 실행된다.
- [ ] `npm run lint`가 통과한다.
- [ ] `npm run format:check`가 통과한다.
- [ ] `npm run type-check`가 통과한다.
- [ ] `npm run build`가 통과한다.
- [ ] `.gitignore`, `.prettierrc`, `.prettierignore`, `.env.example`이 있다.
- [ ] README만 보고 로컬 실행이 가능하다.

---

### 2. 공통 레이아웃 만들기

목표: 모든 페이지가 같은 기본 구조를 사용하게 만든다.

- [ ] App Router 기본 레이아웃 구성
- [ ] Header 구현
  - [ ] 좌측: 이름
  - [ ] 우측: `Home`, `Resume`, `Blog`, `GitHub`
- [ ] Footer 구현
- [ ] 페이지 공통 최대 너비 설정
- [ ] 모바일에서 Header가 깨지지 않게 처리
- [ ] 현재 페이지 표시 처리

완료 기준:

- [ ] `/`, `/resume`, `/blog`, `/blog/[slug]`에서 같은 Header/Footer가 보인다.
- [ ] 모바일에서도 navigation을 사용할 수 있다.
- [ ] GitHub 링크는 외부 링크로 동작한다.

---

### 3. 홈 페이지 만들기

목표: 방문자가 첫 화면에서 누구의 블로그인지 이해하고 다음 페이지로 이동할 수 있게 한다.

- [ ] 이름 표시
- [ ] 어떤 개발자인지 짧게 소개
- [ ] GitHub 이동 링크 추가
- [ ] Resume 이동 링크 추가
- [ ] Blog 이동 버튼 추가
- [ ] 모바일 화면에서 문구와 버튼이 겹치지 않게 처리

완료 기준:

- [ ] 첫 화면에서 이름과 소개가 바로 보인다.
- [ ] GitHub, Resume, Blog로 이동할 수 있다.
- [ ] 과한 랜딩 페이지가 아니라 빠르게 탐색 가능한 화면이다.

학습 포인트:

- semantic HTML
- link와 button 구분
- responsive layout
- Tailwind spacing

---

### 4. 자기소개 및 이력서 페이지 만들기

목표: 사용해온 기술, 경력/프로젝트, 관심 분야를 짧고 명확하게 보여준다.

- [ ] 사용해온 기술 스택 정리
  - [ ] JavaScript
  - [ ] TypeScript
  - [ ] React
  - [ ] Next.js
  - [ ] HTML/CSS
  - [ ] Git
- [ ] 해온 학습과 프로젝트 경험 정리
- [ ] 경력 또는 활동 이력 정리
- [ ] 관심 분야 정리
- [ ] GitHub 이동 링크 추가
- [ ] Blog 이동 링크 추가
- [ ] 모바일에서 긴 기술명과 문장이 넘치지 않게 처리

완료 기준:

- [ ] 어떤 기술을 다뤄봤는지 한눈에 보인다.
- [ ] 경험이 과장 없이 정리되어 있다.
- [ ] 이력서 페이지가 너무 무겁지 않고 가볍게 읽힌다.

학습 포인트:

- 정보 구조
- list/table/card 중 적절한 표현 선택
- 텍스트 계층 구조
- 접근 가능한 링크 구성

---

### 5. 블로그 목록 페이지 만들기

목표: 작성한 글을 목록으로 보여주고, 각 글 상세 페이지로 이동할 수 있게 만든다.

- [ ] 샘플 글 데이터 3개 작성
- [ ] 글 목록 렌더링
- [ ] 글 제목 표시
- [ ] 글 설명 표시
- [ ] 작성일 표시
- [ ] 태그 또는 카테고리 표시
- [ ] 글 상세 페이지 링크 연결
- [ ] 빈 목록 상태 처리
- [ ] 최신순 정렬
- [ ] 모바일에서 카드가 읽기 좋게 보이도록 처리

완료 기준:

- [ ] `/blog`에서 글 목록이 보인다.
- [ ] 제목, 설명, 작성일, 태그 또는 카테고리가 보인다.
- [ ] 글 카드를 누르면 `/blog/[slug]`로 이동한다.
- [ ] 글이 없어도 빈 상태가 어색하지 않다.

학습 포인트:

- 배열 렌더링
- key 처리
- 날짜 정렬
- UI empty state
- 카드형 목록 레이아웃

---

### 6. 블로그 상세 페이지 만들기

목표: 선택한 글의 본문을 읽을 수 있는 상세 페이지를 만든다.

- [ ] `/blog/[slug]` route 생성
- [ ] slug로 글 데이터 찾기
- [ ] 존재하지 않는 slug 처리
- [ ] 글 제목 표시
- [ ] 글 설명 표시
- [ ] 작성일 표시
- [ ] 태그 또는 카테고리 표시
- [ ] 본문 렌더링
- [ ] 목록으로 돌아가기 링크 추가
- [ ] 모바일에서 본문 줄 길이와 여백 확인

완료 기준:

- [ ] `/blog/[slug]`에서 글 본문을 읽을 수 있다.
- [ ] 없는 글은 어색한 빈 화면이 아니라 not found 상태로 처리한다.
- [ ] 목록 페이지로 돌아갈 수 있다.

학습 포인트:

- dynamic route
- route params
- not-found 처리
- article typography
- 읽기 중심 레이아웃

---

### 7. 콘텐츠 데이터 구조 만들기

목표: 나중에 Markdown/MDX로 확장할 수 있는 글 데이터 구조를 먼저 정한다.

1차 MVP에서는 샘플 데이터로 시작하고, 이후 Markdown/MDX로 옮긴다.

```ts
type PostMeta = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  category: string;
  tags: string[];
  draft: boolean;
};

type Post = PostMeta & {
  content: string;
};
```

- [ ] `PostMeta` 타입 작성
- [ ] `Post` 타입 작성
- [ ] 샘플 post 배열 작성
- [ ] 최신순 정렬 함수 작성
- [ ] draft 필터링 함수 작성
- [ ] 글 목록 페이지에서 샘플 데이터 연결
- [ ] slug 기반 상세 조회 함수 작성

완료 기준:

- [ ] 글 데이터 구조가 타입으로 정의되어 있다.
- [ ] draft 글은 목록에서 제외할 수 있다.
- [ ] slug로 상세 글을 찾을 수 있다.
- [ ] 나중에 Markdown/MDX frontmatter로 옮기기 쉽다.

학습 포인트:

- TypeScript type/interface
- 도메인 모델링
- filter/sort
- UI 데이터 분리

---

### 8. 반응형 웹 대응

목표: 모바일에서도 홈, 이력서, 블로그 목록, 블로그 상세를 읽고 탐색할 수 있게 만든다.

- [ ] 360px 화면 확인
- [ ] 390px 화면 확인
- [ ] 768px 화면 확인
- [ ] 1280px 화면 확인
- [ ] Header navigation 줄바꿈/간격 확인
- [ ] 버튼 터치 영역 확인
- [ ] 카드 텍스트 넘침 확인
- [ ] 글 상세 본문 줄 길이 확인
- [ ] 이력서 페이지 기술 스택 줄바꿈 확인

완료 기준:

- [ ] 모바일에서 가로 스크롤이 생기지 않는다.
- [ ] 버튼과 링크를 손가락으로 누르기 쉽다.
- [ ] 텍스트가 카드나 버튼 밖으로 넘치지 않는다.

학습 포인트:

- mobile-first CSS
- flex/grid
- width/max-width
- responsive typography

---

### 9. 기본 SEO와 접근성

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

학습 포인트:

- Next.js metadata
- semantic HTML
- keyboard navigation
- accessibility basics

---

### 10. 린트/포맷/타입 체크

목표: 기본 코드 품질 검사를 자동화한다.

- [ ] ESLint 설정 확인
- [ ] Prettier 설정
- [ ] `type-check` script 추가
- [ ] `lint` 실행
- [ ] `format:check` 실행
- [ ] `type-check` 실행
- [ ] `build` 실행

완료 기준:

- [ ] `npm run lint`가 통과한다.
- [ ] `npm run format:check`가 통과한다.
- [ ] `npm run type-check`가 통과한다.
- [ ] `npm run build`가 통과한다.

---

### 11. Vercel 1차 배포

목표: 공개 URL을 만든다.

- [ ] Vercel 프로젝트 생성
- [ ] GitHub repository 연결
- [ ] build command 확인
- [ ] production deploy 확인
- [ ] preview deploy 확인
- [ ] 배포 URL README에 추가

완료 기준:

- [ ] 배포 URL이 있다.
- [ ] `main`에 머지하면 production deployment가 실행된다.
- [ ] 작업 브랜치 또는 PR에서 preview deployment를 확인할 수 있다.

---

## AI 퍼블리싱 사용 방식

디자인을 따로 길게 잡지 않고, 페이지별로 AI에게 퍼블리싱을 맡기면서 만든다.

사용 스킬:

- `$blog-ui-publisher`

사용 단위:

1. 홈 페이지 퍼블리싱 프롬프트 생성
2. 이력서 페이지 퍼블리싱 프롬프트 생성
3. 블로그 목록 페이지 퍼블리싱 프롬프트 생성
4. 블로그 상세 페이지 퍼블리싱 프롬프트 생성
5. 모바일 레이아웃 검수
6. 접근성/SEO 검수

프롬프트에 반드시 포함할 것:

- 구현할 페이지
- 페이지 목적
- 들어갈 콘텐츠
- 제외할 기능
- 모바일 요구사항
- 접근성 요구사항
- 완료 기준

---

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

학습 포인트:

- Supabase Auth
- RLS
- server/client data fetching
- form handling
- 권한 기반 UI
- 공개 데이터와 관리자 데이터 분리

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

### 모바일 확장 검토

먼저 반응형 웹으로 대응한다.

- [ ] PWA가 필요한지 검토
- [ ] React Native 또는 Expo가 필요한지 검토

React Native는 아래 요구가 생길 때만 검토한다.

- 푸시 알림
- 네이티브 공유
- 파일/카메라/알림 같은 OS 기능
- App Store 또는 Play Store 배포
- 웹과 다른 모바일 전용 흐름

### 후순위 인프라

- [ ] GitHub API 기반 활동 기록
