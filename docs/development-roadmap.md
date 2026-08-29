# pigpgw.cloud TODO


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

현재 Next.js 파일은 저장소 루트에 있습니다. 첫 TODO에서 `frontend/`로 이동하고 검증한 뒤 아래 구조를 사용합니다.

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

## 개발 TODO

### 1. Frontend·Backend 디렉터리 분리·Spring Boot 세팅

- [ ] 현재 Next.js 기준선 결과를 확인한 뒤 `frontend/`를 만든다.
- [ ] `src`, `content`, Next.js package·lock 파일과 관련 설정을 `frontend/`로 이동한다.
- [ ] `.git`, `README.md`, `AGENTS.md`와 공통 `docs/`는 저장소 루트에 유지한다.
- [ ] `frontend/`에서 `npm ci`, `lint`, `format:check`, `type-check`, `test`, `build`를 다시 실행한다.
- [ ] 기존 Home·Resume·Blog URL과 Vercel 배포가 그대로 동작하는지 확인한다.
- [ ] Vercel Root Directory를 `frontend`로 지정한다.
- [ ] 저장소의 `backend/`에 Java 21·Spring Boot·Gradle Groovy DSL 프로젝트를 만든다.
- [ ] Render Root Directory를 `backend`로 사용할 수 있게 Backend 내부에서 독립 빌드되도록 구성한다.
- [ ] package를 `com.pigpgw.techblog`로 설정한다.
- [ ] Spring Web, JPA, PostgreSQL Driver, Validation, Flyway와 Actuator를 추가한다.
- [ ] `post`, `category` 안에 `controller`, `service`, `repository`, `domain`, `dto`를 나누고 `common/config`, `common/exception`만 공통으로 둔다.
- [ ] Entity 비노출, DTO `record`, 생성자 주입, Service 트랜잭션과 전역 예외 규칙을 확인한다.
- [ ] DB URL·username·password는 환경변수로 주입하고 실제 Secret은 커밋하지 않는다.
- [ ] Gradle Wrapper로 `./gradlew test`와 `./gradlew bootRun`이 실행되는지 확인한다.

#### Spring 핵심 적용 기준

- [ ] IoC/DI: 객체를 직접 생성하지 않고 Spring Bean과 생성자 주입으로 의존성을 연결한다.
- [ ] AOP: 비즈니스 로직에 섞이면 안 되는 요청 ID·실행시간·공통 로그만 분리한다.
- [ ] PSA: Spring Data Repository, `@Transactional`, Validation처럼 구현 세부사항을 Spring 추상화 뒤에 둔다.
- [ ] AOP에 인증 token, 비밀번호, 본문 전체와 개인정보를 기록하지 않는다고 정한다.

Spring Security, Spring AI, MyBatis와 Testcontainers는 아직 추가하지 않습니다.

### 2. PostgreSQL schema·Flyway·SQL

초기 schema:

- `categories`: id, name, slug, path, parent_id, sort_order
- `posts`: id, category_id, title, slug, description, content, status, published_at, created_at, updated_at

DB의 숫자 `categories.id`는 FK로 사용하고 API의 문자열 `categoryId`에는 `categories.path`를 매핑합니다. `status=PUBLISHED`인 글만 공개 DTO의 `draft=false`로 반환합니다.

- [ ] Category 자기참조와 Category 1:N Post 관계를 그린다.
- [ ] `IDENTITY`, `TEXT`, `TIMESTAMPTZ` 선택 이유를 기록한다.
- [ ] PK·FK·NOT NULL·DEFAULT·UNIQUE·CHECK를 포함한 DDL을 작성한다.
- [ ] DDL을 `V1__create_blog_schema.sql`, 기존 글을 `V2__seed_initial_post.sql`로 작성한다.
- [ ] 빈 PostgreSQL에 Flyway V1·V2가 순서대로 적용되는지 확인한다.
- [ ] 중복 slug와 잘못된 status가 제약조건으로 거부되는지 확인한다.
- [ ] JOIN, 상태 필터, slug 조회와 발행일 정렬 SQL을 직접 작성한다.
- [ ] `BEGIN` → UPDATE → 확인 → `ROLLBACK` 후 데이터 복원을 확인한다.
- [ ] slug UNIQUE index와 FK index 존재 여부를 확인한다.

### 3. JPA Blog 읽기 API

- [ ] `Category`, `Post` Entity와 연관관계를 구현한다.
- [ ] Repository, Service, Controller 책임을 분리하고 Controller에서 Repository를 직접 호출하지 않는다.
- [ ] `CategoryResponse`, `PostSummaryResponse`, `PostDetailResponse`를 Entity와 분리한다.
- [ ] `GET /api/categories`를 구현한다.
- [ ] `GET /api/posts`를 구현한다.
- [ ] `GET /api/posts/{slug}`와 404를 구현한다.
- [ ] 기존 `items`, `page`, `pageSize`, `total`과 Frontend 필드명을 유지한다.
- [ ] `GlobalExceptionHandler`가 `{ "message": "..." }`와 적절한 상태 코드를 반환하게 한다.
- [ ] 로컬·운영 Origin을 분리한 CORS 설정을 작성한다.
- [ ] Testcontainers PostgreSQL을 추가하고 Flyway, Repository와 API 통합 테스트를 실행한다.

공통 성공 응답 wrapper, 관리자 인증과 불필요한 interface는 추가하지 않습니다.

### 4. Query 분석·튜닝·MyBatis 판단·AOP

- [ ] Hibernate가 생성한 목록·상세 SQL을 확인한다.
- [ ] Category 연관관계에서 N+1 발생 여부를 통합 테스트와 SQL로 확인한다.
- [ ] 필요한 경우 DTO projection, fetch join 또는 `EntityGraph` 중 가장 단순한 방법을 적용한다.
- [ ] 실제 query를 `EXPLAIN (ANALYZE, BUFFERS)`로 확인한다.
- [ ] 충분한 테스트 데이터에서 `(category_id, published_at DESC)` index 전후 실행계획을 비교한다.
- [ ] 실행시간 수치는 반복 횟수·데이터 수·환경과 함께 기록한다.
- [ ] JPA derived query·JPQL·projection으로 요구와 성능을 충족하면 JPA만 유지한다.
- [ ] 복잡한 동적 SQL, 집계·리포트 query 또는 JPA로 표현하기 어려운 병목이 확인된 경우에만 MyBatis mapper를 해당 조회에 추가한다.
- [ ] MyBatis를 추가하면 같은 query의 JPA 방식과 SQL·가독성·실행계획을 비교하고 선택 이유를 기록한다.
- [ ] `spring-boot-starter-aop`를 추가하고 요청 ID·Service 실행시간·예외 발생 지점만 기록하는 Aspect를 작성한다.
- [ ] AOP 로그에서 token, password, Cookie, 본문과 개인정보가 제외되는지 테스트한다.
- [ ] Actuator health와 애플리케이션 로그를 확인한다.

MyBatis와 AOP를 사용했다는 사실만을 위한 코드는 만들지 않습니다.

### 5. Docker Compose

- [ ] Spring Boot multi-stage Dockerfile을 작성한다.
- [ ] PostgreSQL, Spring과 Named Volume을 Compose에 정의한다.
- [ ] healthcheck 이후 Spring이 시작되게 한다.
- [ ] 빈 Compose PostgreSQL에 기존 Flyway V1·V2가 자동 적용되는지 확인한다.
- [ ] 서비스 이름으로 DB에 연결되는지 확인한다.
- [ ] 재시작 후 데이터 유지, health, 로그와 API를 확인한다.

Next.js는 Vercel을 유지하므로 컨테이너화하지 않습니다.

### 6. Backend·PostgreSQL 운영 배포

- [ ] Aiven PostgreSQL을 만들고 TLS 연결 정보를 확인한다.
- [ ] DB 정보를 Render Secret으로 주입한다.
- [ ] HikariCP 연결 수를 Aiven 제한보다 작게 설정한다.
- [ ] Spring Dockerfile이 Render 메모리 제한에서 실행되는지 확인한다.
- [ ] Render에 배포하고 Aiven 연결·Flyway·Actuator health를 확인한다.
- [ ] Render URL에서 Category·Post 목록·상세 API를 확인한다.
- [ ] 운영 CORS에 `https://www.pigpgw.cloud`만 허용한다.
- [ ] 로그, 재배포, rollback과 `pg_dump --schema-only` 복구 절차를 확인한다.

### 7. 기존 Next.js를 운영 Backend에 연결

- [ ] 기존 `/`, `/resume`, `/blog`, `/blog/[slug]`, `/blog/categories/[...segments]`를 유지한다.
- [ ] `frontend/src/services/blog.ts`의 mock 호출만 운영 Spring Boot API `fetch`로 교체한다.
- [ ] API 주소를 Next.js 환경변수로 분리한다.
- [ ] 목록·상세·metadata의 fetch와 `revalidate` 정책을 정한다.
- [ ] 검색, 카테고리, error, empty와 404가 기존처럼 동작하는지 확인한다.
- [ ] `type-check`, `test`, `build`와 Blog 목록 → 상세 흐름을 확인한다.
- [ ] Vercel에 Render API URL을 설정하고 실제 도메인에서 확인한다.
- [ ] 전체 흐름 확인 후 `api.pigpgw.cloud`를 연결하고 API 주소를 갱신한다.

### 8. Spring Security·JWT·USER/ADMIN

- [ ] `users`, `refresh_tokens` migration을 추가한다.
- [ ] `auth`, `user`, `token` 도메인의 Controller·Service·Repository·domain·DTO를 분리한다.
- [ ] `User`, `UserRole(USER, ADMIN)`, `UserStatus`, `RefreshToken`을 구현한다.
- [ ] `SecurityConfig`, `JwtTokenService`, `JwtAuthenticationFilter` 책임을 분리한다.
- [ ] 비밀번호를 `PasswordEncoder`로 단방향 해시한다.
- [ ] signup, login, refresh, logout과 me API를 구현한다.
- [ ] 회원가입은 항상 `USER`, `ADMIN`은 서버 측에서만 부여한다.
- [ ] access token은 짧은 RSA JWT와 Bearer header를 사용한다.
- [ ] refresh token은 hash 저장·회전·폐기와 `HttpOnly`, `Secure`, `SameSite=Lax` Cookie를 사용한다.
- [ ] Blog 조회는 공개, 질문 API는 로그인 사용자, `/api/admin/**`는 `ADMIN`만 허용한다.
- [ ] 정상·실패 로그인, 만료, 재발급, logout 후 재사용, `401`과 `403`을 테스트한다.
- [ ] Origin 검증, credential CORS, 호출 제한과 운영 Secret을 확인한다.
- [ ] Next.js 로그인·재발급 실패·logout UI를 연결하고 운영에서 검증한다.

관리자 CRUD 화면, 이메일 인증, 비밀번호 찾기, 소셜 로그인과 MFA는 현재 제외합니다.

### 9. Spring AI 글 질문

- [ ] Spring AI `ChatClient`와 모델 Secret을 추가한다.
- [ ] `POST /api/posts/{slug}/questions`를 구현한다.
- [ ] 해당 글의 title·description·content만 Context로 전달한다.
- [ ] 글에 없는 질문은 모른다고 답하게 한다.
- [ ] 정상 질문 3개와 범위 밖 질문 2개를 평가한다.
- [ ] 빈 질문, 길이 제한, timeout, 오류와 호출 제한을 처리한다.
- [ ] 질문 API는 로그인 사용자만 사용하게 한다.
- [ ] Next.js에 질문·로딩·오류·답변 UI를 연결한다.
- [ ] 운영 재배포 후 health·로그·메모리를 확인한다.

Vector DB, embedding, 범용 RAG와 AI Agent는 현재 방식으로 해결되지 않는 요구가 확인될 때 추가합니다.

### 10. 최소 MSA 분리·전체 배포

- [ ] Blog·Auth·AI를 단일 Spring Boot로 먼저 개발·배포하고 전체 흐름을 검증한다.
- [ ] 동작하는 단일 Backend의 Blog·Auth·AI package 경계를 확인한다.
- [ ] AI만 `ai-service`로 분리하고 Blog·Auth는 `blog-service`에 유지한다.
- [ ] `ai-service`는 DB를 공유하지 않고 보호된 Context API를 호출한다.
- [ ] 두 서비스가 JWT 공개 키·만료·issuer·audience를 검증하게 한다.
- [ ] 서비스 credential, URL, timeout과 Secret을 환경변수로 분리한다.
- [ ] 요청 ID를 두 서비스 로그에 연결하고 장애 시 503을 확인한다.
- [ ] 두 서비스와 PostgreSQL을 Compose로 실행하고 계약 테스트를 수행한다.
- [ ] 두 Render 서비스를 배포하고 Vercel에서 전체 흐름을 검증한다.

#### 사용자·인증 추가 분리는 이 단계에서 판단

- [ ] AI 분리 후 두 서비스의 인증 중복·배포 독립성·장애 경계를 확인하고 `identity-service` 분리 필요성을 결정한다.
- [ ] `identity-service`가 필요하면 User·비밀번호·Role·Refresh Token을 소유하고 `blog-service`는 `authorId`만 참조하도록 경계를 기록한다.

Eureka, Gateway, Kafka와 Outbox는 실제 필요가 생길 때만 추가합니다. `identity-service`는 위 판단 TODO에 근거가 남을 때만 추가합니다.

### 11. Markdown·코드 블록 UI

- [ ] 밝은 highlight.js 테마와 어두운 `<pre>` 배경 충돌을 재현한다.
- [ ] 밝은 조합 또는 어두운 조합 중 하나로 통일한다.
- [ ] Markdown 렌더링을 별도 component로 분리한다.
- [ ] fenced code 언어 label, 복사 button과 접근 가능한 성공 상태를 추가한다.
- [ ] inline code, 긴 code 가로 scroll, 제목·목록·인용문·link·table을 확인한다.
- [ ] JavaScript, Java와 SQL code fixture를 검증한다.
- [ ] `type-check`, `test`, `build`와 실제 글 화면을 확인한다.

전체 Markdown editor와 관리자 작성 화면은 현재 제외합니다.

### 12. GitHub 연동·운영 검증·분리 판단

- [ ] GitHub 연동 목적을 단순 링크, GitHub 로그인, 저장소·커밋 조회 또는 Webhook 동기화 중에서 확정한다.
- [ ] 단순 링크라면 Next.js에서만 처리하고 불필요한 Backend 기능을 만들지 않는다.
- [ ] GitHub 로그인이라면 기존 Auth·User·Token 흐름과 연결하고 별도 사용자 체계를 만들지 않는다.
- [ ] 저장소·커밋 조회라면 우선 `blog-service`의 `github` package에서 Controller·Service·Client·DTO 책임을 분리한다.
- [ ] GitHub token과 Webhook Secret은 환경변수로 주입하고 저장소·응답·로그에 노출하지 않는다.
- [ ] GitHub API 호출 제한, cache·ETag, timeout, 오류와 빈 응답을 처리하고 테스트한다.
- [ ] 실제 도메인에서 GitHub 기능과 장애 시 기존 Blog 기능이 유지되는지 검증한다.

#### GitHub 기능 운영 후 분리 판단

- [ ] 단순 조회와 낮은 호출량이면 `blog-service`의 `github` package로 유지한다.
- [ ] Webhook·주기 동기화·재시도·호출 제한을 독립 배포해야 할 근거가 생길 때만 `github-service` 또는 worker 분리를 결정한다.
- [ ] 분리한다면 GitHub 데이터 소유권, Blog 연동 API, 인증, timeout과 장애 격리를 문서화한다.

## 현재 제외

- Resume·Project·Learning DB 이전
- 관리자 CRUD 화면
- Tag, 서버 검색과 실제 pagination
- Next.js 컨테이너화와 여러 Frontend app 모노레포
- 모바일, PWA와 React Native
- Kubernetes, EKS와 Harbor
- Eureka, Gateway, Kafka, Outbox와 별도 auth-service
- 댓글, 이메일 인증, 비밀번호 찾기, 소셜 로그인과 MFA
- 범용 Vector DB, RAG와 AI Agent

제외 항목은 영구 포기가 아닙니다. 구현 중 실제 필요가 확인되면 근거와 함께 TODO에 추가합니다.

## 현재 시작점

`1. Frontend·Backend 디렉터리 분리·Spring Boot 세팅`부터 진행합니다. Markdown UI 수정은 `11. Markdown·코드 블록 UI`까지 미룹니다.
