# 의사결정 로그

프로젝트를 진행하며 이후 구현 방향에 영향을 주는 중요한 결정만 기록한다.
단순 작업 메모, 일회성 수정, 실행하지 않은 검증 결과는 남기지 않는다.

과거 결정은 당시의 근거로 보존한다. 이후 결정과 충돌하면 더 최신 결정의 `대체하는 결정` 항목을 따른다.

## 기록 기준

- 데이터 구조, API 경계, 라우팅, 배포, 인증처럼 이후 구현을 제한하거나 안내하는 결정
- 여러 선택지 중 하나를 고른 이유가 있어야 하는 결정
- 나중에 같은 논의를 반복할 가능성이 높은 결정

## 2026-06-01: 블로그 목록과 상세 조회 데이터 분리

- 상태: 결정
- 배경:
  - 블로그 목록 페이지와 우측 하단 카테고리 트리는 글 본문 전체가 아니라 공개 글의 요약 정보만 필요하다.
  - 카테고리 트리는 글이 존재하는 카테고리만 보여주면 된다.
  - 향후 블로그 목록은 첫 페이지를 먼저 보여주고, 사용자가 아래로 내리면 다음 페이지를 불러오는 방식으로 확장할 계획이다.
- 결정:
  - 목록/트리용 데이터와 상세 본문 데이터를 분리한다.
  - 목록 API는 글 요약 목록만 반환한다.
  - 상세 API는 사용자가 특정 글을 열 때 해당 글의 상세 본문만 반환한다.
  - 카테고리 트리는 목록 API가 반환한 요약 데이터의 `category`를 기준으로 글이 있는 경로만 구성한다.
- 요약 데이터 후보:
  - `id`
  - `slug`
  - `title`
  - `description`
  - `publishedAt`
  - `category`
- 상세 데이터 후보:
  - 요약 데이터 전체
  - `content`
- 이유:
  - 목록과 카테고리 트리에서 사용하지 않는 본문 데이터를 함께 들고 있지 않아도 된다.
  - 이후 Supabase 같은 DB 기반 관리로 전환할 때도 `content` 컬럼을 목록 조회에서 제외하기 쉽다.
  - 페이지네이션 또는 무한 스크롤을 붙일 때 목록 응답 크기를 작게 유지할 수 있다.
  - 글이 없는 카테고리를 숨기는 요구사항을 별도 더미 카테고리 목록 없이 실제 글 요약 데이터로 처리할 수 있다.
- 영향 범위:
  - `src/lib/blog-posts.ts`의 조회 함수는 요약 목록 조회와 상세 조회로 분리한다.
  - `/blog`는 요약 목록만 사용한다.
  - 우측 하단 카테고리 트리는 요약 목록에서 카테고리 경로를 만들어 렌더링한다.
  - `/blog/[slug]`는 해당 slug의 상세 데이터만 사용한다.
- 제외:
  - 이번 기록은 의사결정 문서화만 다룬다.
  - 실제 API 라우트, 페이지네이션, 무한 스크롤, 카테고리 트리 생성 로직 구현은 별도 작업으로 진행한다.

## 2026-07-06: 프로젝트 Skill 문서 한국어 전환

- 상태: 결정
- 배경:
  - `.agents/skills`의 Skill 본문과 OpenAI 메타데이터가 영어 중심으로 작성되어 있어, 팀원이 직접 읽고 고치기 어렵다.
  - 이 저장소는 프로젝트 문서를 한국어로 작성하는 규칙을 갖고 있고, Skill도 반복 작업을 위한 프로젝트 문서 성격이 강하다.
  - 공식 Skill 작성 가이드는 `SKILL.md`의 frontmatter와 Markdown 본문 구조를 요구하지만, 본문을 영어로만 작성해야 한다는 제한을 두지 않는다.
- 결정:
  - 프로젝트 전용 Skill의 사람이 읽는 설명, 절차, 출력 형식, 주의사항은 한국어로 작성한다.
  - `name`, 명령어, 라우트, 타입명, Conventional Commits 토큰처럼 식별자나 표준 규약에 해당하는 표현은 원문을 유지한다.
  - 검색과 트리거에 필요한 `review`, `PR review`, `code review` 같은 핵심 영어 키워드는 description에 필요한 범위에서 함께 둔다.
- 이유:
  - 한국어 본문은 팀원이 Skill을 검토하고 수정할 때 의도를 더 빨리 이해하게 한다.
  - 반복 작업 규칙이 영어로만 있으면 실제 운영 중 규칙을 고치지 않고 방치할 가능성이 커진다.
  - 식별자와 표준 토큰을 유지하면 Codex의 Skill 탐색, 도구 실행, 커밋 규칙과 충돌하지 않는다.
- 영향 범위:
  - `.agents/skills/*/SKILL.md`
  - `.agents/skills/*/agents/openai.yaml`
  - Skill 내부 reference 문서 중 사람이 읽는 제목과 설명

## 2026-07-06: 블로그 게시글 식별자와 타입 경계 정리

- 상태: 결정
- 배경:
  - 현재 블로그 글은 Markdown 파일로 관리하지만, 이후 Supabase 같은 DB 기반 관리로 전환할 계획이 있다.
  - 게시글의 `id`가 optional이면 관리자 수정/삭제, 미리보기, 관계 데이터 연결에서 게시글의 내부 정체성이 불안정해진다.
  - `slug`는 공개 URL에 사용되는 값이고, 내부 식별자인 `id`와 역할이 다르다.
  - 목록 페이지와 카테고리 트리는 본문 전체가 필요 없고, 상세 페이지에서만 `content`가 필요하다.
- 결정:
  - `BlogPostSummary`의 `id`는 optional이 아니라 필수값으로 둔다.
  - `id`는 내부 식별자이며, DB 전환 후에도 글의 정체성을 유지하는 기준값으로 사용한다.
  - DB가 없는 Markdown 관리 단계에서는 `id`를 `"1"`, `"2"`처럼 따옴표가 있는 숫자 문자열로 관리한다.
  - `slug`는 `/blog/[slug]` 공개 URL과 SEO, 공유 링크를 위한 값으로 유지한다.
  - `BlogPostSummary`와 `BlogPostDetail`은 분리한다.
  - `BlogPostDetail`은 `BlogPostSummary`에 `content`를 더한 타입으로 둔다.
  - 카테고리는 URL과 필터링에 쓰는 `path`, 화면 표시에 쓰는 `label`을 분리한다.
  - `category.path`는 `/blog/categories/[...segments]`와 카테고리 트리 비교에 쓰는 소문자 slug 경로로 둔다.
  - `category.label`은 사람이 읽는 표시 계층 원본으로 두고, 화면 컴포넌트에는 `/` 기준으로 나눈 배열을 전달해 `>` 구분자로 표시한다.
- 이유:
  - `id`와 `slug`를 분리하면 공개 URL 변경 가능성과 내부 데이터 정체성을 분리할 수 있다.
  - DB 전환 전에 Markdown frontmatter에 안정적인 `id`를 두면 마이그레이션 때 기존 글의 식별자를 유지하기 쉽다.
  - 현재 frontmatter 검증은 `id`를 문자열로 다루므로 YAML에서 숫자로 파싱되지 않게 따옴표를 붙인다.
  - 목록 조회에서 본문을 제외하면 이후 페이지네이션, 무한 스크롤, 카테고리 트리 생성 시 응답 크기를 줄일 수 있다.
  - `BlogPostDetail = BlogPostSummary & { content: string }` 구조는 중복을 줄이면서도 목록과 상세의 데이터 요구 차이를 드러낸다.
  - `path`와 `label`을 분리하면 URL 안정성과 화면 표시 문구를 서로 독립적으로 관리할 수 있다.
  - 카드와 배지 컴포넌트가 표시 세그먼트 배열을 받게 하면 이미 포맷된 문자열과 raw label path가 섞이는 문제를 줄일 수 있다.
- 영향 범위:
  - `src/types/blog.ts`에서 `id`를 필수값으로 바꾼다.
  - `content/blog`의 각 Markdown frontmatter에 `id`를 추가한다.
  - `src/lib/blog.ts`의 frontmatter 검증 schema도 `id` 필수 기준으로 맞춘다.
  - 공개 상세 URL은 계속 `slug`를 사용한다.
  - 공개 API의 상세 조회 식별자는 2026-07-07 결정에 따라 `id`만 사용한다.
  - `category` frontmatter는 `path`와 `label` 객체 구조로 관리한다.
  - 블로그 목록, 카테고리 목록, 상세 화면은 `category.label`을 표시 세그먼트 배열로 나눠 배지에 전달한다.
- 제외:
  - 이번 결정은 타입과 frontmatter 계약을 다룬다.
  - 실제 DB 스키마, slug 변경 이력, redirect 정책, 카테고리 트리 UI 구현은 별도 결정이나 작업으로 다룬다.

## 2026-07-07: 블로그 공개 API URL 계약

- 상태: 2026-08-29 결정으로 상세 조회 식별자와 초기 검색·pagination 범위가 대체됨
- 배경:
  - 현재는 Markdown 파일을 읽어 블로그 데이터를 만들지만, 이후 Supabase 같은 백엔드로 전환할 계획이 있다.
  - 백엔드 전환 시 프론트엔드 변경을 줄이려면 실제 구현보다 먼저 프론트엔드가 의존할 API URL 계약을 고정해야 한다.
  - `slug`는 공개 URL과 화면 표시에는 유용하지만, 중복 가능성과 변경 가능성이 있어 상세 조회 API의 안정 식별자로 쓰지 않는다.
  - 검색과 카테고리 필터는 특정 글 상세 조회가 아니라 공개 글 목록 조회의 조건이다.
- 결정:
  - 블로그 공개 API 명세는 `docs/api-spec.md`에 둔다.
  - 카테고리 목록은 `GET /categories`로 조회한다.
  - 공개 글 목록, 검색, 카테고리 필터, 페이지네이션은 `GET /posts`와 query string으로 처리한다.
  - 공개 글 상세 조회는 `GET /posts/{id}`만 사용한다.
  - `slug`로 상세 글을 조회하는 API는 제공하지 않는다.
  - `categoryId`는 query string에서 여러 번 전달할 수 있다.
  - 여러 `categoryId`가 전달되면 OR 조건으로 조회한다.
  - `draft` 글은 공개 API 응답에서 제외한다.
- 이유:
  - 상세 조회를 `id` 기준으로 고정하면 slug 변경이나 중복 가능성과 API 식별자 안정성을 분리할 수 있다.
  - 목록 API에 검색, 필터, 페이지네이션을 모으면 프론트엔드가 같은 목록 화면에서 조건만 바꿔 재사용하기 쉽다.
  - API URL 계약을 먼저 고정하면 현재 Markdown mock 구현을 나중에 실제 백엔드 호출로 바꿀 때 화면 변경 범위를 줄일 수 있다.
- 영향 범위:
  - `docs/api-spec.md`
  - 블로그 데이터 조회를 감싸는 service 함수
  - 향후 실제 API Route Handler 또는 Supabase 연동 구현
- 제외:
  - 이번 결정은 API URL 계약만 다룬다.
  - ERD, DB schema, 관리자 API, 인증 정책은 별도 결정으로 다룬다.
  - 실제 API Route Handler 구현은 이번 결정에 포함하지 않는다.

## 2026-07-10: Markdown 기반 공개 블로그 라우트 정적 생성

- 상태: 현재 Markdown 구현 기준. Spring API 연결 단계에서 2026-08-29 결정에 따라 렌더링 방식을 다시 검증
- 배경:
  - 현재 1차 MVP의 블로그 글은 `content/blog`의 Markdown 파일로 관리한다.
  - 글을 추가하거나 수정하려면 파일 변경, 커밋, 배포 과정을 거쳐야 하므로 공개 글 데이터는 빌드 시점에 모두 알 수 있다.
  - `/blog/[slug]`와 `/blog/categories/[...segments]`는 Dynamic Segment를 가진 라우트라, `generateStaticParams`를 제공하지 않으면 요청 시 서버 렌더링 대상으로 남는다.
  - 공개 블로그 상세와 카테고리 페이지는 사용자별 권한, 쿠키, 세션, 요청별 데이터가 필요하지 않다.
- 결정:
  - 1차 MVP의 공개 블로그 목록, 상세, 카테고리 라우트는 SSG를 기본 렌더링 전략으로 둔다.
  - `/blog/[slug]`에는 공개 글의 `slug` 목록을 반환하는 `generateStaticParams`를 적용한다.
  - `/blog/categories/[...segments]`에는 글이 존재하는 `categoryId`를 `/` 기준으로 나눈 `segments` 목록을 반환하는 `generateStaticParams`를 적용한다.
  - 두 동적 라우트 모두 `dynamicParams = false`를 설정해, 빌드 시 생성한 경로 목록에 없는 요청은 404로 처리한다.
  - 이후 Supabase 같은 DB 또는 백엔드 기반 글 관리로 전환해 배포 없이 글 데이터가 바뀔 수 있게 되면, SSG 유지, ISR, SSR 중 하나를 다시 판단한다.
- 이유:
  - Markdown 기반 글은 빌드 산출물에 포함되므로 ISR을 적용해도 배포 없이 새 데이터를 가져올 원천이 없다.
  - 공개 글 상세와 카테고리 페이지는 모든 방문자에게 같은 내용을 보여주므로 요청마다 SSR로 처리할 필요가 작다.
  - SSG는 공개 블로그의 SEO, 응답 속도, 배포 산출물 예측 가능성에 적합하다.
  - `dynamicParams = false`를 함께 사용하면 존재하지 않는 slug나 카테고리 경로를 런타임에서 불필요하게 렌더링 시도하지 않는다.
  - DB나 CMS 기반으로 전환하면 데이터 변경 시점이 배포와 분리되므로, 그때는 ISR로 정적 응답 속도와 데이터 갱신을 함께 가져갈지, SSR로 요청마다 최신 데이터를 조회할지 다시 비교해야 한다.
- 적용 내용:
  - `src/app/blog/[slug]/page.tsx`에 `generateStaticParams`와 `dynamicParams = false`를 추가한다.
  - `src/app/blog/categories/[...segments]/page.tsx`에 `generateStaticParams`와 `dynamicParams = false`를 추가한다.
- 검증:
  - `npm run type-check` 성공
  - `npm run build` 성공
  - 빌드 결과에서 `/blog/[slug]`와 `/blog/categories/[...segments]`가 `● SSG`로 표시된다.
- 영향 범위:
  - 공개 블로그 상세 라우트
  - 공개 블로그 카테고리 라우트
  - 존재하지 않는 공개 글 slug와 카테고리 경로의 404 처리
- 제외:
  - Supabase 연동, DB schema, 관리자 글 관리, ISR/SSR 전환 구현은 이번 결정에 포함하지 않는다.
  - DB 또는 백엔드 전환 후의 렌더링 전략은 2차 MVP 작업에서 별도로 결정한다.

## 2026-08-29: SKALA 복습형 Spring·PostgreSQL 전환

- 상태: 결정
- 배경:
  - 현재 Next.js에는 Home, Resume, Blog 목록·상세, 카테고리 경로, 목록 검색과 Markdown 글이 이미 구현되어 있다.
  - 기존 장기 계획은 Supabase 관리자 CRUD와 모노레포·Cloudflare 전환을 포함하지만, 현재 학습 목표는 SKALA에서 배운 Spring Boot, PostgreSQL, Docker, Cloud, JWT, Spring AI와 MSA를 실제 서비스에 적용하는 것이다.
  - 기존 화면과 기능을 다시 만드는 작업보다 데이터 경계와 Backend·배포를 작은 수직 흐름으로 완성할 필요가 있다.
- 결정:
  - 기존 Next.js 화면, 컴포넌트, 공개 URL, 검색, 카테고리와 Frontend 데이터 모양은 유지한다.
  - 현재 Markdown mock 데이터만 Spring Boot 공개 API와 PostgreSQL로 전환한다.
  - 공개 API는 먼저 `GET /api/categories`, `GET /api/posts`, `GET /api/posts/{slug}`만 구현한다.
  - 공개 상세 API는 현재 공개 URL과 같은 slug를 사용한다. DB의 숫자 id는 내부 식별자로 유지한다.
  - 기존 `categoryId` 문자열에는 DB의 `categories.path`를 매핑하고, DB의 `status=PUBLISHED`인 글은 공개 DTO에서 `draft=false`로 반환한다.
  - 기존 목록 응답의 `items`, `page`, `pageSize`, `total` 모양은 유지하되 초기에는 전체 공개 글을 반환한다. 서버 검색과 실제 pagination은 글이 늘어난 뒤 별도로 결정한다.
  - Spring·PostgreSQL을 Docker Compose로 재현한 뒤 단일 Spring Backend를 Render와 Aiven PostgreSQL에 먼저 배포한다.
  - 로그인·JWT와 Spring AI는 단일 Backend에서 검증한다. 이후 AI 기능만 `ai-service`로 분리하고 Blog·Auth는 `blog-service`에 유지한다.
  - Frontend는 Vercel과 `www.pigpgw.cloud`를 유지한다.
- 이유:
  - 기존 기능을 보존하면 Frontend 재작성 없이 Backend, Database와 Cloud 학습에 집중할 수 있다.
  - 공개 URL과 상세 API가 같은 slug를 사용하면 목록에서 id를 다시 찾는 중간 호출 없이 상세 글을 조회할 수 있다.
  - 단일 배포를 먼저 완료하면 인증, AI와 서비스 분리 문제를 한 번에 섞지 않고 단계별로 검증할 수 있다.
  - PostgreSQL 하나를 로컬, Docker와 운영에서 공통으로 사용하면 DB 차이로 생기는 변수를 줄일 수 있다.
- 배포 구조:
  - Frontend: Vercel의 기존 Next.js
  - Backend: Render의 단일 Spring Boot, 이후 `blog-service`와 `ai-service`
  - Database: Aiven PostgreSQL
  - AI: Spring AI와 Gemini Developer API
- 대체하는 결정:
  - 2026-07-07 결정의 `GET /posts/{id}` 상세 조회와 초기 검색·pagination 계약을 대체한다.
  - Supabase 관리자 CRUD와 모노레포·Cloudflare를 다음 MVP로 두었던 README 범위를 현재 활성 TODO에서 제외한다.
  - 2026-07-10의 SSG는 현재 Markdown 구현까지 유지하고, Spring API 연결 시 Server Component fetch와 `revalidate` 정책을 실제 Vercel build로 다시 결정한다.
- 유지하는 결정:
  - 목록 요약과 상세 본문을 분리한다.
  - DB id와 공개 slug의 역할을 구분한다.
  - Markdown 단계의 기존 동작과 과거 검증 기록은 삭제하지 않는다.
- 현재 제외:
  - Supabase, 관리자 CRUD, Tag, 서버 검색과 실제 pagination
  - 모노레포, pnpm workspace와 Cloudflare 프록시
  - 모바일 최적화, PWA와 React Native
  - Kubernetes, EKS, Harbor, Eureka, Gateway, Kafka와 별도 auth-service
  - Vector DB, 범용 RAG와 범용 AI Agent

## 2026-08-29: Backend 위치와 최소 코드 컨벤션

- 상태: 결정
- 배경:
  - 기존 Next.js는 저장소 루트와 Vercel 설정을 유지해야 한다.
  - Backend를 시작하기 전에 위치, package, DTO·예외·트랜잭션·migration·테스트 기준이 없으면 구현 중 구조가 반복해서 바뀔 수 있다.
  - 학습용 MVP이므로 대규모 프로젝트용 추상화보다 Spring의 기본 책임 분리를 직접 확인하는 편이 적합하다.
- 결정:
  - Spring Boot 프로젝트는 현재 저장소의 `backend/`에 두고 Next.js 루트는 이동하지 않는다.
  - npm/pnpm workspace나 여러 Frontend 앱을 만드는 모노레포 전환은 하지 않는다.
  - Vercel은 저장소 루트, Render는 `backend`를 Root Directory로 사용한다.
  - Java 21, Spring Boot, Gradle Groovy DSL과 Gradle Wrapper를 사용한다.
  - 최상위 package는 `com.pigpgw.techblog`로 고정한다.
  - `post`, `category`, 이후 `auth`, `ai`의 도메인 우선 package와 `common/config`, `common/exception`만 둔다.
  - Entity는 API에 직접 노출하지 않고 목적이 분명한 DTO로 변환한다. 응답 DTO는 가능한 경우 Java `record`를 사용한다.
  - 생성자 주입, Service 트랜잭션과 `GlobalExceptionHandler`를 사용한다.
  - 성공 응답 wrapper는 추가하지 않고 `docs/api-spec.md`의 JSON 계약을 유지한다.
  - 비밀값은 환경변수로 주입하고 Flyway는 `V{번호}__{설명}.sql` naming을 사용한다.
  - PostgreSQL 검증을 H2로 대체하지 않으며 Testcontainers는 Blog API 단계에서 추가해 Frontend 연결 전에 migration·Repository·API를 통합 검증한다.
- 이유:
  - 한 저장소에서 Frontend 계약과 Backend 변경을 함께 추적하면서도 각 배포의 Root Directory를 분리할 수 있다.
  - 도메인 우선 package는 이후 AI 기능을 분리할 때 경계를 확인하기 쉽다.
  - Entity·DTO 분리와 Service 트랜잭션은 SKALA Spring 수업 내용을 현재 Blog use case로 복습할 수 있다.
  - H2 차이를 피하고 로컬·통합 테스트·Docker·운영 DB를 PostgreSQL로 통일할 수 있다.
- 제외:
  - 공통 성공 응답 wrapper, BaseEntity, CQRS와 불필요한 interface
  - 멀티모듈 Gradle, npm/pnpm workspace와 여러 Frontend 앱
  - Spring Security와 Spring AI의 선행 설치

## 2026-08-29: 사용자·관리자 권한과 Token 경계

- 상태: 결정
- 배경:
  - Blog 조회는 공개 기능이지만 Spring AI 질문과 이후 관리자 기능은 사용자 식별과 권한 검사가 필요하다.
  - access token과 장기 token의 저장 위치, ADMIN 생성 방식과 401·403 기준을 미리 분리하지 않으면 인증 기능이 Frontend와 운영 Secret에 강하게 섞일 수 있다.
- 결정:
  - 인증은 Blog 읽기 API와 단일 Backend 운영 배포가 끝난 뒤 같은 Spring 애플리케이션에 추가한다.
  - `auth`, `user`, `token` 도메인을 나누고 각 도메인 안에서 Controller·Service·Repository·domain·DTO 책임을 분리한다.
  - `User`, `UserRole(USER, ADMIN)`, `UserStatus`, `RefreshToken`을 분리하고 Entity를 API 응답에 직접 노출하지 않는다.
  - 회원가입은 항상 `USER`이며 요청에서 받은 role을 무시한다. `ADMIN`은 서버 측 작업으로만 부여한다.
  - 비밀번호는 `PasswordEncoder`로 단방향 해시한다.
  - access token은 짧은 RSA 서명 JWT와 Bearer header를 사용한다.
  - refresh token은 서버에 hash로 저장하고 `HttpOnly`, `Secure`, `SameSite=Lax` Cookie로 전달하며 재발급 때 회전·폐기한다.
  - 공개 Blog, 로그인 사용자용 질문 API와 `ADMIN` 전용 `/api/admin/**` authorization rule을 분리한다.
  - 인증 실패는 `401`, 로그인했지만 권한이 부족한 요청은 `403`으로 구분한다.
- 보안 기준:
  - RSA private key, 비밀번호 원문, refresh token 원문과 credential을 저장소·응답·로그·브라우저 `localStorage`에 남기지 않는다.
  - refresh·logout은 허용 Origin을 검증하고 credential CORS를 허용 도메인으로 제한한다.
  - refresh token 재사용과 logout 후 재사용이 실패하는지 테스트한다.
- 현재 제외:
  - 관리자 CRUD API와 관리자 화면
  - 이메일 인증, 비밀번호 찾기, 소셜 로그인과 MFA
  - 별도 auth-service 분리

## 2026-08-29: Backend 우선 순서와 JPA·MyBatis·AOP 기준

- 상태: 결정
- 배경:
  - Markdown UI보다 Backend 계층, PostgreSQL, query, 운영 배포와 Frontend 데이터 연결을 먼저 완성하는 것이 현재 우선순위다.
  - JPA와 MyBatis를 근거 없이 함께 도입하면 같은 영속성 책임이 중복되고 학습·테스트 범위가 불필요하게 커질 수 있다.
  - AOP도 사용 자체보다 어떤 횡단 관심사를 분리했는지가 중요하다.
- 결정:
  - 기준선 확인 후 Backend 세팅, PostgreSQL·Flyway, JPA API, query tuning·AOP, Docker, Backend 운영 배포를 먼저 완료한다.
  - 운영 Backend가 검증된 뒤 기존 Next.js를 연결한다.
  - Markdown·코드 블록 UI는 인증·AI·MSA 이후로 미룬다.
  - JPA를 기본으로 하고 Hibernate SQL, N+1, fetch join·projection·`EntityGraph`, index와 실행계획을 먼저 검토한다.
  - 복잡한 동적 SQL, 집계·리포트 query 또는 JPA로 해결하기 어려운 성능 병목이 확인된 경우에만 해당 조회에 MyBatis를 추가한다.
  - AOP는 요청 ID, Service 실행시간과 공통 예외 지점에만 사용하고 비즈니스 규칙과 민감정보는 포함하지 않는다.
  - Spring 핵심은 IoC/DI를 생성자 주입, AOP를 횡단 관심사, PSA를 Repository·Transaction·Validation 추상화로 코드와 테스트에서 확인한다.
- 검증:
  - JPA 유지 또는 MyBatis 선택은 동일 query의 SQL·가독성·테스트·실행계획 근거로 설명한다.
  - 성능 수치는 데이터 수, 반복 횟수와 환경을 함께 기록한다.
  - AOP 로그에 token, password, Cookie, 본문 전체와 개인정보가 없는지 테스트한다.

## 2026-08-29: 단일 Spring Boot 우선과 추가 MSA 판단 시점

- 상태: 결정
- 결정:
  - Blog·Auth·AI는 단일 Spring Boot 애플리케이션에서 먼저 개발·배포한다.
  - 운영 흐름을 확인한 뒤 AI를 첫 번째 `ai-service`로 분리한다.
  - `identity-service`는 AI 분리 후 인증 중복, 독립 배포와 장애 경계의 이점이 확인될 때 판단한다.
  - GitHub 연동은 AI 분리와 Markdown 작업 뒤 마지막 별도 기능 단계에서 진행한다.
  - GitHub 기능을 먼저 운영한 뒤 Webhook, 주기 동기화, 재시도와 API 호출 제한을 독립 운영해야 할 때만 전용 서비스나 worker를 검토한다.
- 현재 제외:
  - 개발 시작 전 identity-service 생성과 GitHub 연동 선행 구현
  - GitHub 기능 운영 근거가 없는 github-service 또는 worker 생성

## 2026-08-29: Frontend·Backend 형제 디렉터리로 변경

- 상태: 결정
- 이전 결정 대체:
  - `Next.js 루트 유지, backend/ 추가` 구조를 대체한다.
- 결정:
  - 같은 저장소 안에 `frontend/`와 `backend/`를 형제 디렉터리로 둔다.
  - 현재 루트의 Next.js는 기준선 확인 후 `frontend/`로 이동하고 모든 검증과 운영 URL을 다시 확인한다.
  - `.git`, `README.md`, `AGENTS.md`와 공통 `docs/`는 저장소 루트에 유지한다.
  - Vercel Root Directory는 `frontend`, Render Root Directory는 `backend`로 지정한다.
- 제외:
  - GitHub 연동 목적을 확인하지 않은 OAuth·Webhook 선행 구현

## 2026-08-29: Blog ERD와 PostgreSQL 제약조건

- 상태: 결정
- 배경:
  - 기존 Frontend는 Category 전체 경로 문자열과 Post slug를 공개 URL과 조회 키로 사용한다.
  - JPA Entity와 Flyway DDL을 작성하기 전에 DB 내부 식별자, 계층 관계, 공개 필드 매핑과 삭제 규칙을 고정할 필요가 있다.
- 결정:
  - 전체 목표 schema는 `categories`, `posts`, `users`, `email_verification_tokens`, `refresh_tokens`를 사용하되 V1 Blog schema는 `categories`, `posts`만 생성한다.
  - 초기 Spring Boot는 Web, Validation과 Actuator만으로 실행 가능한 상태를 유지하고 JPA, PostgreSQL Driver와 Flyway는 PostgreSQL 접속 정보 준비와 함께 추가한다.
  - 각 테이블의 PK는 `BIGINT GENERATED BY DEFAULT AS IDENTITY`로 생성하고 API에는 DB 식별자를 그대로 노출하지 않는다.
  - Category는 nullable `parent_id` 자기참조로 계층을 표현하고, Post는 필수 `category_id`로 Category와 N:1 관계를 맺는다.
  - 기존 URL과 Frontend `categoryId`를 유지하기 위해 `categories.path`를 저장하고 `UNIQUE`로 보호한다.
  - 공개 Post slug도 `UNIQUE`로 보호하고 공개 API는 `status=PUBLISHED`인 데이터만 반환한다.
  - 두 FK는 `ON DELETE RESTRICT`를 사용한다. Category 계층 순환과 parent·path 일치는 Service와 통합 테스트에서 검증한다.
  - Markdown 본문은 `TEXT`, 공개·생성·수정 시점은 `TIMESTAMPTZ`, 상태는 `VARCHAR`와 `CHECK`를 사용한다.
  - Unique 제약조건이 만드는 index는 중복 생성하지 않고 FK index만 우선 추가한다. 공개 목록용 index는 실제 query plan을 확인한 뒤 결정한다.
  - 상세 컬럼, 제약조건과 API 매핑은 `docs/database-design.md`를 기준 문서로 사용한다.
- 이유:
  - 내부 숫자 PK와 공개 경로를 분리하면 FK 무결성을 유지하면서 기존 Frontend URL 계약을 보존할 수 있다.
  - `ON DELETE RESTRICT`는 관리자 기능이 추가된 뒤에도 계층, 게시글과 작성자의 우발적인 연쇄 삭제를 막는다.
  - DB trigger와 선행 성능 index를 만들지 않으면 현재 두 테이블 MVP의 복잡도를 제한하고 실제 Service·query 검증 결과로 확장할 수 있다.
- 현재 V1 제외:
  - User, RefreshToken, 작성자 FK와 AI 관련 테이블
  - Category 계층 trigger와 게시글 revision
  - 측정 전 공개 목록 복합·부분 index

## 2026-08-29: 관리자 전용 게시글 관리와 Auth ERD 확장

- 상태: 결정
- 대체하는 결정:
  - 기존 인증 결정의 관리자 CRUD API·화면 제외를 대체한다.
- 결정:
  - 공개 Blog 조회는 계속 인증 없이 제공하고 이메일 인증을 완료한 로그인 사용자는 글 질문 기능을 사용한다.
  - 일반 회원가입은 항상 `USER`이며 요청의 role을 무시한다. 본인용 `ADMIN` 계정은 credential을 migration이나 저장소에 넣지 않는 서버 측 일회성 bootstrap으로만 생성한다.
  - 전체 ERD에 `users`, `email_verification_tokens`, `refresh_tokens`와 nullable `posts.created_by`를 포함한다.
  - 기존 이관 글은 `created_by=NULL`을 허용하고 관리자 API로 새로 만드는 글은 인증된 ADMIN의 User id를 반드시 기록한다.
  - `GET`, `POST`, `PUT`, `DELETE /api/admin/posts/**`는 `ADMIN`만 접근하며 USER 접근은 `403`, 미인증 접근은 `401`로 응답한다.
  - Next.js에는 일반 사용자 회원가입, 사용자·관리자 공통 로그인과 단순 Markdown 기반 관리자 글 목록·작성·수정 화면을 추가한다.
  - 회원가입 화면은 role 입력을 제공하지 않고 email·password만 Backend에 전송하며 이메일 인증 완료 후 로그인 화면으로 이동한다.
  - refresh token은 원문 대신 SHA-256 hash를 저장하고 family와 교체 token 관계로 회전·재사용 탐지를 지원한다.
- 이유:
  - role을 DB와 Spring Security에서 함께 제한하면 공개 회원가입으로 관리자 권한을 획득하는 경로를 차단할 수 있다.
  - 작성자 FK는 관리자 작업의 출처를 남기면서 기존 Markdown 이관 글을 깨뜨리지 않는다.
  - 단순 Markdown 입력은 현재 콘텐츠 형식과 맞고 WYSIWYG editor의 추가 복잡도를 피할 수 있다.
- 현재 제외:
  - WYSIWYG editor, 이미지 업로드와 게시글 revision
  - 휴대폰 번호 인증, 비밀번호 찾기, 소셜 로그인과 MFA

## 2026-08-29: 3단계 아키텍처와 Spring AI 분리 시점

- 상태: 결정
- 대체하는 결정:
  - 기존 `운영 흐름 확인 후 AI를 분리한다`는 표현을 `운영 근거가 확인된 경우에만 분리한다`로 대체한다.
- 결정:
  - 1차는 Category·Post, PostgreSQL, 공개 Blog API와 기존 Next.js 연결까지만 완료한다.
  - 2차는 같은 Spring Boot Backend에 Auth·관리자 글 관리·Spring AI를 순서대로 추가하고 단일 배포로 운영 검증한다.
  - 3차는 호출량, 장애 격리, 독립 배포 또는 자원 사용 근거가 확인된 경우에만 AI 기능을 `ai-service`로 분리한다.
  - 분리 근거가 없으면 2차 단일 Backend 구조를 유지하며 MSA 자체를 완료 목표로 삼지 않는다.
  - 3차에서도 `backend`가 Blog·Auth 데이터와 PostgreSQL을 소유하고 `ai-service`는 보호된 Context API만 호출한다.
  - 시스템 구조, 목표 프로젝트 디렉터리와 단계별 ERD는 `docs/architecture/phase-1-blog.md`, `phase-2-auth-admin-ai.md`, `phase-3-ai-service.md`로 나눠 관리한다.
- 이유:
  - Spring AI 기능과 API 계약을 먼저 검증해야 실제 분리 경계, 장애 영향과 배포 필요성을 판단할 수 있다.
  - 단계별 목표 구조를 분리하면 미래의 Auth·AI 폴더와 테이블을 현재 구현된 것으로 오해하지 않을 수 있다.
- 현재 제외:
  - 2차 검증 전 `ai-service` 생성
  - 근거 없는 `identity-service`, Gateway, Eureka, Kafka와 Kubernetes 도입

## 2026-08-29: Frontend·Backend 오류 처리 경계

- 상태: 결정
- 결정:
  - Backend는 HTTP 상태와 `{ "code": "...", "message": "..." }`를 `GlobalExceptionHandler`에서 일관되게 반환한다.
  - Frontend는 `src/services`에서 HTTP·네트워크 오류를 공통 오류로 변환하고 화면은 loading, empty, not-found와 error를 구분한다.
  - Frontend가 message 문구가 아닌 안정적인 code로 분기할 수 있도록 공통 목록을 `docs/error-codes.md`에서 관리한다.
  - 공개 상세 `404`, 인증 `401`, 권한 `403`, 충돌 `409`, 호출 제한 `429`, 외부 서비스 오류 `502`, 의존 서비스 장애 `503`과 timeout `504`를 구분한다.
  - 응답 header와 Backend 로그의 `X-Request-Id`로 장애를 추적하고 내부 예외·SQL·credential은 응답에 노출하지 않는다.
  - Auth refresh는 한 번만 자동 시도하고, 관리자 쓰기 요청은 자동 재시도하지 않는다.
  - AI 오류는 질문 영역에 격리해 Blog 본문과 공개 조회를 유지한다.
- 이유:
  - Backend 예외와 Frontend 화면 상태를 하나의 계약으로 정해야 빈 결과를 장애로 오인하거나 인증 재시도가 반복되는 문제를 방지할 수 있다.
  - 서비스 분리 뒤에도 요청 ID와 상태 코드 경계를 유지하면 내부 오류 원문을 노출하지 않고 장애 위치를 추적할 수 있다.
- 기준 문서:
  - `docs/error-codes.md`
  - `docs/error-handling.md`

## 2026-08-29: AI 질문 공개 전 이메일 인증

- 상태: 결정
- 대체하는 결정:
  - 기존 Auth 범위에서 이메일 인증을 제외한 결정을 대체한다.
- 결정:
  - 일반 회원가입 User는 `PENDING`으로 생성하고 이메일 인증 완료 후 `ACTIVE`로 전환한다.
  - 이메일 인증을 완료한 `ACTIVE` 사용자만 Spring AI 글 질문을 사용할 수 있다.
  - Email Verification Token은 원문 대신 hash만 저장하고 만료·사용·재발송 제한을 검증한다.
  - 회원가입 성공 후 `/verify-email`에서 인증 link를 처리하고 완료 후 공통 `/login`으로 이동한다.
  - 인증 메일 재발송은 email 존재 여부를 노출하지 않는다.
  - 휴대폰 번호는 수집하거나 인증하지 않는다.
- 이유:
  - 특정 글에 대한 AI 질문은 모델 호출 비용이 발생하므로 공개 운영 전에 가짜 계정과 무분별한 가입을 제한할 필요가 있다.
  - 휴대폰 번호는 현재 기능에 필요하지 않고 개인정보 수집·보관 부담이 더 크다.
- 현재 제외:
  - 휴대폰 번호 인증, 비밀번호 찾기, 소셜 로그인과 MFA

## 2026-08-30: 게시글과 카테고리 공개 URL 분리

- 상태: 결정
- 배경:
  - 게시글 URL에 카테고리 계층을 포함하면 카테고리를 이동하거나 이름을 변경할 때 기존 게시글 URL도 함께 바뀐다.
  - 카테고리별 글 목록에서는 상위·하위 카테고리의 계층을 URL로 표현할 필요가 있다.
- 결정:
  - 게시글 상세 URL은 카테고리 경로와 분리하고 전역에서 고유한 Post slug만 사용한다.
  - 게시글 상세 URL은 `/blog/{postSlug}` 형식을 유지한다.
  - 카테고리별 글 목록 URL은 `/blog/categories/{categoryPath}` 형식을 사용한다.
  - `categoryPath`는 `backend/spring/jpa`처럼 상위 Category부터 각 Category slug를 `/`로 연결한다.
  - DB 내부에서는 `posts.category_id`가 `categories.id`를 참조하고, 공개 카테고리 경로에는 `categories.path`를 사용한다.
  - 1차 Blog API에서 사용할 초기 Category는 Flyway seed로 등록한다.
  - 관리자 기능 단계에서 Frontend에 Category 이름·slug 입력, 부모 Category 선택과 완성될 공개 URL 미리보기를 제공한다.
  - Frontend는 `name`, `slug`, `parentId`만 Backend에 전달하고 `path`를 저장값으로 보내지 않는다.
  - Backend Service는 Category 생성 트랜잭션에서 부모를 조회하고, INSERT 직전에 부모 path와 현재 slug를 조합해 최종 path를 생성·검증한다.
  - 존재하지 않는 부모나 전체 path의 누락된 Category를 자동 생성하지 않는다.
  - 관리자 Post 작성 화면은 Backend에 저장된 기존 Category 중 하나를 선택하게 한다.
  - V2 초기 데이터에 이름 `미분류`, slug·path `uncategorized`인 최상위 보호 Category를 추가한다.
  - Category 삭제 시 연결된 Post는 삭제하지 않고 관리자가 선택한 다른 Category로 이동하며, Frontend의 기본 이동 대상은 `미분류`로 제공한다.
  - Backend는 하나의 트랜잭션에서 연결된 Post의 `category_id`를 변경한 후 기존 Category를 삭제한다.
  - `미분류` Category와 하위 Category가 존재하는 Category는 삭제하지 못하게 한다.
  - Post FK는 `ON DELETE RESTRICT`를 유지하고 `CASCADE`와 `SET NULL`을 사용하지 않는다.
- 이유:
  - 게시글이 다른 카테고리로 이동해도 기존 공유 링크, 북마크와 검색엔진에 노출된 게시글 URL이 영향을 받지 않는다.
  - 카테고리별 조회에서는 계층형 path를 사용해 사용자가 현재 분류 구조를 URL에서 확인할 수 있다.
  - Frontend의 path 미리보기는 사용성을 높이고 Backend의 재계산·검증은 조작된 요청과 계층 불일치를 방지한다.
  - 이동 대상을 명시하면 Post를 보존하면서도 관리자가 글의 의미에 맞는 Category를 선택할 수 있고, 기본 `미분류`는 빠뜨린 선택을 안전하게 처리한다.
- 예시:
  - 게시글 상세: `/blog/jpa-entity-mapping`
  - 카테고리별 글 목록: `/blog/categories/backend/spring/jpa`
- 후속 결정:
  - Category slug 또는 부모 변경과 그에 따른 하위 path 일괄 변경 정책은 수정 기능을 구현하기 전에 별도로 결정한다.

## 2026-08-30: 로컬 PostgreSQL bootstrap과 Flyway 책임 분리

- 상태: 결정
- 배경:
  - 개인 Homebrew PostgreSQL에 Role과 Database를 직접 한 번 만드는 과정은 연결 원리를 학습하는 데 유용하지만 새 컴퓨터와 팀원의 동일 환경을 반복해서 보장하지 못한다.
  - Docker 초기화 SQL과 Flyway가 같은 Schema를 만들면 최초 Volume과 기존 Volume의 상태가 달라지고 변경 이력이 이중으로 관리된다.
- 결정:
  - 새 로컬 환경의 기본 경로는 루트 `compose.yaml`의 PostgreSQL 서비스로 통일한다.
  - `.env.example`에는 변수 이름과 교체할 예시만 두고 실제 `.env`와 비밀번호는 커밋하지 않는다.
  - PostgreSQL 공식 이미지의 `POSTGRES_USER`, `POSTGRES_DB`, `POSTGRES_PASSWORD`로 빈 Named Volume에 Role과 Database를 자동 생성한다.
  - Compose의 PostgreSQL bootstrap은 Role과 Database까지만 담당하고 Category·Post 테이블, 제약조건과 seed는 Flyway V1·V2만 담당한다.
  - Spring은 PostgreSQL·Flyway와 Blog API를 직접 실행으로 먼저 검증하고 기존 Docker Compose 단계에서 같은 Compose 파일에 추가한다.
  - Homebrew PostgreSQL 수동 생성은 연결 구조 학습과 Docker를 사용할 수 없는 환경의 대체 절차로 유지한다.
  - Aiven 운영 Database와 계정은 로컬 Compose credential과 분리한다.
- 이유:
  - 팀원은 `cp .env.example .env`와 `docker compose up -d postgres`로 같은 PostgreSQL major version과 초기 Role·Database를 재현할 수 있다.
  - Named Volume은 재실행 시 데이터를 보존하고 Flyway는 신규·기존 환경에 같은 migration 이력을 적용한다.
  - Spring 컨테이너화를 뒤로 유지하면 PostgreSQL 연결 학습과 애플리케이션 이미지 문제를 한 단계에서 섞지 않을 수 있다.

## 2026-08-30: 개인 서비스의 팀 개발 기준

- 상태: 결정
- 배경:
  - 서비스 소유자는 한 명이지만 개인 컴퓨터와 구두 합의에 의존하면 새 개발자, 새 컴퓨터와 CI 환경에서 같은 결과를 재현하기 어렵다.
  - API, 오류 code, DB migration과 환경변수는 Frontend·Backend 작업자가 함께 의존하는 공유 계약이다.
- 결정:
  - 저장소는 여러 개발자가 함께 작업하는 것을 기본 전제로 설계·설정한다.
  - 브랜치·PR과 공유 계약은 루트 `AGENTS.md`, 로컬 온보딩과 단계별 세팅은 `docs/setup`에서 관리한다.
  - 환경변수는 `.env.example`에 이름과 대체 가능한 예시만 공유하고 실제 값은 개발자별 `.env` 또는 배포 Secret으로 관리한다.
  - API·오류 code·공개 URL·DB migration 변경은 관련 코드, 기준 문서, 테스트와 호환성 영향을 같은 작업에서 확인한다.
  - 이미 공유·적용된 Flyway migration은 수정하지 않고 새 migration으로 변경한다.
  - 온보딩 완료는 개인의 기존 DB가 아니라 새 clone과 빈 Named Volume에서 실제로 검증한 뒤 기록한다.
  - Pull Request 기본 검증을 자동화할 CI는 별도 설정 작업으로 추가하고 구성 전에는 완료로 표시하지 않는다.
- 이유:
  - 실행 환경과 계약을 저장소에서 재현하면 특정 개발자의 컴퓨터에만 존재하는 지식과 설정을 줄일 수 있다.
  - 변경 단위와 검증 근거를 Pull Request에 남기면 Frontend·Backend·DB 변경의 영향을 다른 작업자가 검토할 수 있다.

## 2026-08-30: 개인 학습에서 팀 재현으로 확장하는 순서

- 상태: 결정
- 배경:
  - 이 프로젝트는 SKALA 수업 내용을 직접 복기하며 Docker, PostgreSQL과 Spring의 연결 원리를 단계적으로 학습하는 목적이 있다.
  - 처음부터 Compose·온보딩·CI를 완성하면 각 Docker option과 애플리케이션 연결이 어떤 문제를 해결하는지 확인하지 못한 채 설정만 따라갈 수 있다.
  - 앞서 정한 팀 개발 기준은 최종 목표로 유효하지만 현재 학습의 시작 순서를 의미하지는 않는다.
- 결정:
  - PostgreSQL 공식 image를 먼저 Docker CLI의 `docker run`으로 실행해 image·container·port·환경변수·volume을 각각 확인한다.
  - 같은 PostgreSQL 설정을 `compose.yaml`로 옮겨 개인 개발 환경에서 반복 실행한다.
  - Spring은 Mac에서 직접 실행해 Compose PostgreSQL, Flyway와 Blog API 연결을 먼저 검증한다.
  - 검증된 Spring을 `backend/Dockerfile`로 image화하고 Compose에 추가해 로컬 통합 실행을 확인한다.
  - 개인 환경의 전체 흐름이 동작한 뒤 `.env.example`, 새 clone·빈 volume 온보딩과 CI를 검증해 팀 개발 단계로 확장한다.
  - Testcontainers는 통합 테스트, Compose는 로컬 실행, Render·Aiven은 운영 배포에 사용하며 별도 개발·테스트·운영 Compose 파일은 실제 필요가 확인되기 전에는 만들지 않는다.
- 이유:
  - 수동 실행과 선언적 설정을 순서대로 비교하면 Docker와 Compose의 역할 차이를 직접 설명할 수 있다.
  - 개인 환경에서 확인된 최소 설정만 공유하므로 학습과 무관한 초기 자동화나 환경별 파일 중복을 줄일 수 있다.
  - 이후 팀원은 검증된 실행 경로를 재현하면서 온보딩 문서의 누락과 개인 환경 의존성을 찾을 수 있다.

## 2026-08-30: 환경변수 파일의 프로젝트별 소유권 분리

- 상태: 결정
- 배경:
  - 루트 `.env`를 Spring이 상위 경로로 찾아 읽으면 Compose 설정과 Backend 설정의 소유 경계가 섞인다.
  - Frontend, Backend와 Compose는 배포 위치와 필요한 Secret이 서로 다르다.
- 결정:
  - 루트 `.env`와 `.env.example`은 PostgreSQL Compose 초기화 변수만 소유한다.
  - `backend/.env`와 `backend/.env.example`은 Spring datasource와 Backend Secret을 소유한다.
  - `frontend/.env.local`과 `frontend/.env.example`은 Next.js 공개·서버 환경변수를 소유하고 현재 필요한 값이 없으면 실제 `.env.local`을 만들지 않는다.
  - `application.properties`는 `optional:file:.env[.properties]`로 Backend 폴더의 `.env`만 선택적으로 읽는다.
  - 운영에서는 로컬 환경변수 파일을 배포하지 않고 Vercel·Render Secret이 같은 변수 이름의 실제 값을 제공한다.
- 이유:
  - 각 애플리케이션이 자신의 실행 설정만 관리하므로 로컬 실행, 팀 온보딩과 배포 설정의 책임이 분명해진다.
  - 실제 환경변수 파일은 Git에서 제외하고 예시 파일만 공유할 수 있다.
