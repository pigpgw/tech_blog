# 기술 블로그

기존 Next.js 기술 블로그를 유지하면서 Spring Boot, PostgreSQL, Docker, Cloud, Spring Security, Spring AI와 MSA를 단계적으로 적용하는 SKALA 복습 프로젝트입니다.

- 운영: <https://www.pigpgw.cloud/>
- 저장소: <https://github.com/pigpgw/tech_blog>
- 개발 TODO: [docs/development-roadmap.md](docs/development-roadmap.md)
- API: [docs/api-spec.md](docs/api-spec.md)
- 주요 결정: [docs/decision-log.md](docs/decision-log.md)
- 작업 규칙: [AGENTS.md](AGENTS.md)

## 현재 기능

- `/`: Home
- `/resume`: 자기소개와 이력서
- `/blog`: 공개 글 목록과 검색
- `/blog/[slug]`: Markdown 글 상세
- `/blog/categories/[...segments]`: 카테고리별 글 목록
- Vercel 배포와 `www.pigpgw.cl아니 아oud`

화면, URL, 검색, 카테고리와 Markdown 글은 유지하고 Blog 데이터만 Spring Boot·PostgreSQL로 전환합니다.

## 전체 구조

### 1차: 단일 Spring Boot 배포

```text
사용자 Browser
    ↓ HTTPS
Vercel: Next.js Frontend
    ├─ App Router 화면·URL
    ├─ Component UI
    ├─ Blog API 호출
    └─ Markdown 표시
    ↓ REST JSON
Render: Spring Boot 단일 애플리케이션
    ├─ Blog: Post·Category
    ├─ Auth: User·JWT·Spring Security
    ├─ AI: Spring AI
    └─ Controller → Service → Repository
           ↓ JPA·Flyway
Aiven: PostgreSQL
    ├─ categories·posts
    └─ users·refresh_tokens

Spring AI → Gemini Developer API
```

먼저 Blog·Auth·AI를 하나의 Spring Boot 애플리케이션에서 개발하고 Backend·PostgreSQL을 배포한 뒤 기존 Next.js를 연결합니다.

### 최종: AI만 Spring Boot 서비스로 분리

```text
사용자 Browser
    ↓
Vercel: Next.js Frontend
    ├─ Blog·Auth 요청 → Render: Spring Boot blog-service → Aiven PostgreSQL
    └─ 글 질문 요청   → Render: Spring Boot ai-service(Spring AI)
                              ├─ 보호된 Context API → blog-service
                              └─ Gemini Developer API
```

`blog-service`는 Blog·Auth와 PostgreSQL을 담당합니다. `ai-service`는 글 질문만 담당하고 PostgreSQL에 직접 접근하지 않습니다. 사용자·인증의 추가 분리는 두 서비스 운영을 확인한 뒤 판단하며 Kubernetes와 Gateway는 사용하지 않습니다. GitHub 연동은 이 구조를 완료한 뒤 마지막 별도 단계에서 진행합니다.

### Frontend 디렉터리

Next.js 파일은 `frontend/`에 있으며 아래 구조를 사용합니다.

```text
tech_blog/
├─ frontend/                  # Next.js 독립 프로젝트
│  ├─ src/
│  │  ├─ app/                 # App Router 페이지·레이아웃·라우트
│  │  ├─ components/          # 화면·공통 UI
│  │  ├─ services/
│  │  │  └─ blog.ts           # Spring Boot API 호출 경계
│  │  ├─ lib/                 # 공통 로직·현재 mock 데이터 접근
│  │  └─ types/
│  │     └─ blog.ts           # Frontend Blog 타입
│  ├─ content/blog/           # 현재 Markdown 원본
│  ├─ AGENTS.md               # Frontend 전용 작업 규칙
│  ├─ .gitignore              # Frontend 생성물 제외
│  └─ package.json            # Next.js 실행·검증 명령
├─ backend/                   # Spring Boot 독립 프로젝트
├─ docs/                      # 공통 API·TODO·결정 문서
├─ AGENTS.md
└─ README.md
```

### Backend 디렉터리

1차 개발에서는 하나의 Spring Boot 프로젝트 안에서 도메인과 계층을 분리합니다.

```text
backend/
├─ build.gradle
├─ settings.gradle
├─ gradlew
├─ gradlew.bat
├─ gradle/wrapper/
└─ src/
   ├─ main/
   │  ├─ java/com/pigpgw/techblog/
   │  │  ├─ TechBlogApplication.java
   │  │  ├─ common/
   │  │  │  ├─ config/
   │  │  │  ├─ exception/
   │  │  │  └─ aop/
   │  │  ├─ post/
   │  │  │  ├─ controller/
   │  │  │  ├─ service/
   │  │  │  ├─ repository/
   │  │  │  ├─ domain/
   │  │  │  └─ dto/
   │  │  ├─ category/         # controller·service·repository·domain·dto
   │  │  ├─ auth/             # 로그인·인증 API와 Service·DTO
   │  │  ├─ user/             # User Entity·Repository·Service·DTO
   │  │  ├─ token/            # JWT·Refresh Token
   │  │  ├─ ai/               # Spring AI 질문 Controller·Service·DTO
   │  │  └─ github/           # 마지막 GitHub 연동 단계에서 추가
   │  └─ resources/
   │     ├─ application.yml
   │     └─ db/migration/      # Flyway SQL
   └─ test/java/com/pigpgw/techblog/
```

MSA 단계에서는 `ai` package를 먼저 독립 Spring Boot `ai-service`로 분리합니다. `identity-service`는 두 서비스의 운영 근거를 확인한 시점에 판단합니다. GitHub는 Markdown 작업 뒤 별도 단계로 연동하고, 기능이 운영된 뒤 전용 서비스나 worker 분리를 판단합니다.

## 개발 순서

1. 기존 Next.js 기준선 확인
2. Next.js를 `frontend/`로 이동·검증하고 `backend/`에 Spring Boot 세팅
3. PostgreSQL schema·migration·SQL 작성
4. JPA Blog API와 Testcontainers 통합 테스트
5. Query 분석·tuning·MyBatis 필요성 판단·AOP
6. Docker Compose 재현
7. Aiven·Render에 Backend·PostgreSQL 배포
8. 기존 Next.js를 운영 Spring Boot API에 연결
9. Spring Security·JWT·USER/ADMIN
10. Spring AI 글 질문
11. AI 기능 MSA 분리·전체 배포
12. Markdown·코드 블록 UI 수정
13. GitHub 연동·운영 검증·분리 판단

세부 체크박스와 완료 조건은 [개발 TODO](docs/development-roadmap.md)에서 관리합니다.

## 기술 스택

- Frontend: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui
- Backend: Java 21, Spring Boot, Spring Data JPA, Spring Security, Gradle
- Database: PostgreSQL, Flyway, Testcontainers
- Infra: Docker Compose, Vercel, Render, Aiven
- AI: Spring AI, Gemini Developer API

## Backend 기준

- 위치: `backend/`
- package: `com.pigpgw.techblog`
- 도메인: `post`, `category`, 이후 `auth`, `user`, `token`, `ai`
- 계층: `Controller → Service → Repository`
- Entity와 DTO 분리, 생성자 주입, Service 트랜잭션
- 환경변수 Secret과 Flyway migration 사용
- H2 대신 PostgreSQL·Testcontainers로 통합 검증
- JPA를 기본으로 사용하고 복잡한 query나 성능 근거가 있을 때만 MyBatis 추가
- IoC/DI·AOP·PSA를 실제 책임 분리, 공통 logging과 Spring 추상화에 적용
- Vercel Root Directory는 `frontend`, Render Root Directory는 `backend`로 설정

세부 package·DTO·예외·JWT·권한 규칙은 [AGENTS.md](AGENTS.md)를 따릅니다.

## 공개 Blog API

- `GET /api/categories`
- `GET /api/posts`
- `GET /api/posts/{slug}`

기존 Frontend 응답 필드와 인증 API 계약은 [API 명세](docs/api-spec.md)를 따릅니다.

## 로컬 Frontend 실행

Node.js `22.x`를 사용합니다.

```bash
cd frontend
nvm use
npm ci
npm run dev
```

<http://localhost:3000>

검증:

```bash
npm run lint
npm run format:check
npm run type-check
npm run test
npm run build
```

Backend 실행 명령은 Spring 프로젝트를 만든 뒤 추가합니다.

## 배포 순서

1. Aiven PostgreSQL과 TLS 연결 준비
2. Render Secret·HikariCP 설정
3. Render 배포와 Flyway 확인
4. Render URL에서 health·Blog API 확인
5. Vercel API URL·CORS 연결
6. `api.pigpgw.cloud` 연결
7. 로그·재배포·rollback 검증

## 현재 제외

관리자 CRUD 화면, Supabase, Tag, 서버 검색, 실제 pagination, Next.js 컨테이너화, 모바일·PWA·React Native, Kubernetes·EKS·Harbor, Eureka·Gateway·Kafka, 별도 auth-service, Vector DB와 범용 RAG는 현재 MVP에서 제외합니다.

구현하지 않은 기능과 실행하지 않은 검증은 완료로 기록하지 않습니다.
