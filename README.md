# 기술 블로그

기존 Next.js 기술 블로그를 유지하면서 Spring Boot, PostgreSQL, Docker, Cloud, Spring Security, Spring AI와 MSA를 단계적으로 적용하는 SKALA 복습 프로젝트입니다. 먼저 개인 환경에서 개념과 연결을 직접 확인하고, 검증된 실행 방법을 반복 가능한 설정과 팀 개발 기준으로 확장합니다.

- 운영: <https://www.pigpgw.cloud/>
- 저장소: <https://github.com/pigpgw/tech_blog>
- 개발 체크포인트: [docs/development-roadmap.md](docs/development-roadmap.md)
- API: [docs/api-spec.md](docs/api-spec.md)
- 에러 코드: [docs/error-codes.md](docs/error-codes.md)
- 오류 처리: [docs/error-handling.md](docs/error-handling.md)
- 데이터베이스 설계: [docs/database-design.md](docs/database-design.md)
- 로컬 세팅과 단계별 학습: [docs/setup/README.md](docs/setup/README.md)
- 단계별 아키텍처: [docs/architecture/README.md](docs/architecture/README.md)
- 주요 결정: [docs/decision-log.md](docs/decision-log.md)
- 작업 규칙: [AGENTS.md](AGENTS.md)

## 현재 기능

- `/`: Home
- `/resume`: 자기소개와 이력서
- `/blog`: 공개 글 목록과 검색
- `/blog/[slug]`: Markdown 글 상세
- `/blog/categories/[...segments]`: 카테고리별 글 목록
- Vercel 배포와 `www.pigpgw.cloud`

화면, URL, 검색, 카테고리와 Markdown 글은 유지하고 Blog 데이터만 Spring Boot·PostgreSQL로 전환합니다.

## 단계별 아키텍처

| 단계                                              | 개발 범위                          | 구조                                         |
| ------------------------------------------------- | ---------------------------------- | -------------------------------------------- |
| [1차](docs/architecture/phase-1-blog.md)          | 공개 Blog·PostgreSQL·Frontend 연결 | 단일 Spring Boot의 Category·Post             |
| [2차](docs/architecture/phase-2-auth-admin-ai.md) | 회원가입·로그인·관리자·Spring AI   | Blog·Auth·Admin·AI를 포함한 단일 Spring Boot |
| [3차](docs/architecture/phase-3-ai-service.md)    | 검증된 AI 기능 분리                | Blog Backend + 독립 `ai-service`             |

Spring AI는 2차에서 기존 Backend 안에 먼저 구현·배포합니다. 호출량, 장애 격리, 독립 배포 또는 자원 사용 근거가 확인된 경우에만 3차에서 분리하며, 근거가 없으면 단일 Backend를 유지합니다. 각 단계의 시스템 구성, 프로젝트 디렉터리와 ERD는 [단계별 아키텍처 문서](docs/architecture/README.md)에서 관리합니다.

## 저장소 공통 구조

```text
tech_blog/
├─ frontend/                  # Next.js 독립 프로젝트
│  └─ .env.example           # Frontend 환경변수 예시
├─ backend/                   # 1·2차 Spring Boot 독립 프로젝트
│  └─ .env.example           # Spring 환경변수 예시
├─ ai-service/                # 3차 분리가 확정된 경우에만 생성
├─ docs/
│  ├─ architecture/           # 단계별 시스템·디렉터리·ERD
│  ├─ api-spec.md
│  ├─ database-design.md
│  ├─ decision-log.md
│  ├─ error-codes.md
│  ├─ error-handling.md
│  ├─ setup/
│  │  ├─ README.md            # 새 팀원 빠른 시작과 문서 선택
│  │  ├─ backend.md           # Spring Boot·Gradle 초기 세팅
│  │  ├─ database.md          # PostgreSQL·Docker Compose 세팅
│  │  ├─ backend-database.md  # datasource와 연결 검증
│  │  └─ flyway.md            # migration 작성·적용·확인
│  └─ development-roadmap.md
├─ AGENTS.md
├─ .env.example               # PostgreSQL Compose 환경변수 예시
├─ compose.yaml               # 로컬 PostgreSQL 재현용
└─ README.md
```

루트 `.env.example`은 Compose, `backend/.env.example`은 Spring, `frontend/.env.example`은 Next.js가 소유합니다. 실제 값은 각 위치의 Git에서 제외된 `.env` 또는 `.env.local`에 두며 `ai-service/`만 3차 목표 구조입니다.

## 권장 개발 흐름

1. **개인 학습:** PostgreSQL을 `docker run`으로 실행해 image·container·port·volume·환경변수를 확인
2. **개인 개발 재현:** 같은 PostgreSQL 설정을 `compose.yaml`로 옮기고 Spring을 로컬에서 직접 연결
3. **1차:** Blog API 구현 → Spring Dockerfile → Spring·PostgreSQL Compose → Backend 배포 → 기존 Next.js 연결
4. **팀 확장:** `.env.example`·온보딩 절차·CI를 새 clone과 빈 volume에서 검증
5. **2차:** Spring Security·JWT 회원가입·로그인 → 관리자 Markdown 게시글 관리 → 같은 Backend에 Spring AI 글 질문 추가
6. **3차:** 운영 근거 확인 → 필요한 경우에만 AI 기능을 `ai-service`로 분리·배포
7. **후속:** Markdown·코드 블록 UI → GitHub 연동과 추가 분리 필요성 판단

선택을 돕는 질문, 검증 체크박스와 완료 조건은 [개발 체크포인트](docs/development-roadmap.md)에서 관리합니다. 체크박스는 구현 순서를 대신하는 정답지가 아니며 현재 코드와 직접 내린 판단을 우선합니다.

### 환경별 도구 경계

| 환경·단계        | 목적                          | 사용 방식                                          |
| ---------------- | ----------------------------- | -------------------------------------------------- |
| 개인 학습        | Docker와 PostgreSQL 원리 확인 | PostgreSQL 공식 image + `docker run`               |
| 개인 로컬 재현   | 반복 가능한 DB 실행           | PostgreSQL Compose + 로컬 Spring                   |
| 로컬 통합        | Spring·PostgreSQL 함께 실행   | Spring Dockerfile + Docker Compose                 |
| 자동 통합 테스트 | migration·Repository·API 검증 | Testcontainers PostgreSQL                          |
| 팀 온보딩        | 새 환경 재현                  | 같은 Compose + `.env.example` + 실행 문서          |
| 운영 배포        | 실제 서비스 운영              | Vercel Frontend + Render Spring + Aiven PostgreSQL |

운영에서는 로컬 Compose를 배포하지 않고 각 서비스의 환경변수와 Secret으로 연결합니다. 환경별 Compose 파일은 실제로 다른 로컬 실행 요구가 확인될 때만 추가합니다.

## 목표 기술 스택

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

세부 package·DTO·예외·JWT·권한 규칙은 [AGENTS.md](AGENTS.md)를 따르고 Blog 테이블과 API 필드 매핑은 [데이터베이스 설계](docs/database-design.md)를 따릅니다.

## 공개 Blog API

- `GET /api/categories`
- `GET /api/posts`
- `GET /api/posts/{slug}`

기존 Frontend 응답 필드와 인증 API 계약은 [API 명세](docs/api-spec.md)를 따릅니다.

로그인·JWT 단계에서는 일반 사용자의 회원가입·로그인과 글 질문을 지원하고, 서버 측에서 생성한 `ADMIN`만 관리자 API와 화면에서 Category와 Markdown 게시글을 관리합니다. Category 삭제 시 Post는 관리자가 선택한 Category로 이동하고 기본 이동 대상은 보호된 `미분류`로 제공하며, Post를 연쇄 삭제하거나 Category 연결을 `NULL`로 만들지 않습니다. 회원가입 화면에는 role 선택을 제공하지 않으며 항상 `USER`로 생성합니다. 전체 User·Refresh Token·작성자 관계와 Category 삭제 정책은 [데이터베이스 설계](docs/database-design.md)를 따릅니다.

Spring AI 글 질문은 특정 Blog 상세에서 해당 글의 title·description·content만 Context로 전달해 답변하는 기능입니다. 이메일 인증을 완료한 로그인 사용자만 사용할 수 있고 글에 없는 내용은 모른다고 답하게 합니다.

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

## 로컬 Backend 실행

Java 21을 사용합니다. 최소 Spring Boot Backend와 Compose PostgreSQL이 준비되어 있고 Spring Data JPA·PostgreSQL Driver·Flyway 의존성과 datasource 환경변수 연결을 추가했습니다.

처음 실행하거나 특정 세팅을 복습할 때는 [로컬 세팅 안내](docs/setup/README.md)에서 빠른 시작 또는 Backend·Database·연결·Flyway 문서를 선택합니다.

Backend가 같은 폴더의 `.env`를 읽어 Compose PostgreSQL에 연결되고 Actuator health가 `UP`을 반환하는 것까지 확인했습니다. Flyway V1으로 Blog schema를 적용했으며 다음 단계는 제약조건 동작 검증과 V2 초기 데이터입니다.

```bash
cd backend
./gradlew test
./gradlew bootRun
```

## 배포 순서

1. Aiven PostgreSQL과 TLS 연결 준비
2. Render Secret·HikariCP 설정
3. Render 배포와 Flyway 확인
4. Render URL에서 health·Blog API 확인
5. Vercel API URL·CORS 연결
6. `api.pigpgw.cloud` 연결
7. 로그·재배포·rollback 검증

## 현재 제외

휴대폰 번호 인증, WYSIWYG editor, Supabase, Tag, 서버 검색, 실제 pagination, Next.js 컨테이너화, 모바일·PWA·React Native, Kubernetes·EKS·Harbor, Eureka·Gateway·Kafka, 별도 auth-service, Vector DB와 범용 RAG는 현재 MVP에서 제외합니다.

구현하지 않은 기능과 실행하지 않은 검증은 완료로 기록하지 않습니다.
