# pigpgw.cloud 개발 체크포인트

이 문서는 그대로 따라 만드는 정답지가 아니라, 직접 설계하고 구현한 뒤 빠뜨린 부분을 확인하는 체크포인트입니다. 현재 코드, 테스트 결과와 운영 요구가 문서보다 우선합니다.

## 사용하는 방법

1. 각 단계의 **먼저 고민할 것**에 자신의 답을 정합니다.
2. 가능한 방법과 장단점을 비교하고 현재 프로젝트에 맞는 가장 단순한 방식을 선택합니다.
3. 필요한 코드를 직접 구현하고 테스트·HTTP·화면 또는 배포 결과로 확인합니다.
4. 확인된 결과만 체크하고, 순서나 범위를 바꿨다면 이유를 의사결정 로그에 남깁니다.

- 학습은 `직접 실행 → 설정 파일로 재현 → 팀 환경 검증 → 운영 적용` 순서로 확장합니다.
- 체크박스 때문에 필요 없는 class, library, index 또는 서비스를 만들지 않습니다.
- 구현 중 더 나은 순서가 확인되면 단계를 합치거나 나눌 수 있습니다.
- 이름과 구조는 계약을 깨지 않는 범위에서 직접 고민해 정합니다.
- Codex에는 정답 코드보다 선택지, 반례, 검토와 검증을 우선 요청합니다.

## 단계별 아키텍처

| 단계 | 체크포인트 범위                         | 구조 문서                                                  |
| ---- | --------------------------------------- | ---------------------------------------------------------- |
| 1차  | 1~7: Blog·PostgreSQL·배포·Frontend 연결 | [1차 Blog](architecture/phase-1-blog.md)                   |
| 2차  | 8~9: 회원가입·로그인·관리자·Spring AI   | [2차 Auth·Admin·AI](architecture/phase-2-auth-admin-ai.md) |
| 3차  | 10: 운영 근거가 있을 때 AI 서비스 분리  | [3차 AI Service](architecture/phase-3-ai-service.md)       |
| 후속 | 11~12: Markdown UI·GitHub 연동          | 각 TODO 항목                                               |

전체 비교는 [단계별 아키텍처](architecture/README.md)를 따릅니다. Spring AI는 2차에서 단일 Backend 기능으로 먼저 운영 검증하고, 호출량·장애 격리·독립 배포 또는 자원 사용 근거가 있을 때만 3차에서 분리합니다.

## 단계별 체크포인트

### 1. Frontend·Backend 디렉터리 분리·Spring Boot 세팅

Backend 생성 기준과 실행 방법은 [Backend 초기 세팅](setup/backend.md)을 따릅니다.

**먼저 고민할 것:** Frontend와 Backend를 왜 분리하고, 지금 실행에 꼭 필요한 Spring 의존성은 무엇인지 설명할 수 있는가?

- [x] 현재 Next.js 기준선 결과를 확인한 뒤 `frontend/`를 만든다.
- [x] `src`, `content`, Next.js package·lock 파일과 관련 설정을 `frontend/`로 이동한다.
- [x] `.git`, `README.md`, `AGENTS.md`와 공통 `docs/`는 저장소 루트에 유지한다.
- [x] `frontend/`에서 `npm ci`, `lint`, `format:check`, `type-check`, `test`, `build`를 다시 실행한다.
- [x] 저장소의 `backend/`에 Java 21·Spring Boot·Gradle Groovy DSL 프로젝트를 만든다.
- [x] Render Root Directory를 `backend`로 사용할 수 있게 Backend 내부에서 독립 빌드되도록 구성한다.
- [x] package를 `com.pigpgw.techblog`로 설정한다.
- [x] Spring Web, Validation과 Actuator를 추가한다.
- [x] Gradle Wrapper로 `./gradlew test`와 `./gradlew bootRun`이 실행되는지 확인한다.

Spring 핵심은 3단계의 IoC/DI·PSA와 4단계의 AOP·Actuator 구현에서 확인합니다.

Spring Security, Spring AI, MyBatis와 Testcontainers는 아직 추가하지 않습니다.

### 2. PostgreSQL schema·Flyway·SQL

**먼저 고민할 것:** 화면의 `slug`·`categoryId`와 DB의 PK·FK 역할을 어떻게 나누고, 어떤 무결성을 DB와 Service가 각각 책임져야 하는가?

로컬 Role·Database 생성과 접속 확인은 [로컬 Database 세팅](setup/database.md), Spring 연결은 [Backend–Database 연결](setup/backend-database.md), migration은 [Flyway migration](setup/flyway.md)을 따릅니다.

- [x] PostgreSQL 공식 image tag를 `postgres:17`로 정하고 Docker CLI로 내려받아 확인한다.
- [x] `docker run`의 container 이름, port mapping, 환경변수와 Named Volume을 직접 정해 PostgreSQL 하나를 실행한다.
- [x] Docker PostgreSQL에 DB client로 접속해 Database·Role을 확인하고 container 중지·재시작 후 다시 연결한다.
- [x] Docker CLI에서 사용한 각 option의 역할과 Compose 항목의 대응 관계를 설명한다.
- [x] 동일한 PostgreSQL 설정을 로컬 개발용 `.env.example`과 `compose.yaml`로 옮긴다.
- [x] CLI로 실행한 container와 port 충돌이 없게 중지한 뒤 PostgreSQL Compose를 실행한다.
- [x] `.env.example`을 복사한 로컬 `.env`와 새 Named Volume에서 Role·Database가 자동 생성되는지 확인한다.
- [x] PostgreSQL 접속 확인 후 Spring Data JPA, PostgreSQL Driver, Flyway와 PostgreSQL용 Flyway 모듈을 추가한다.
- [x] Compose와 Backend 환경변수 파일을 분리하고 DB URL·username·password와 실제 Secret을 Git에서 제외한다.
- [x] Mac에서 `./gradlew bootRun`으로 Spring을 실행해 Compose PostgreSQL 연결과 Actuator health를 확인한다.

V1 Blog schema:

- `categories`: id, name, slug, path, parent_id, sort_order
- `posts`: id, category_id, title, slug, description, content, status, published_at, created_at, updated_at

DB의 숫자 `categories.id`는 FK로 사용하고 API의 문자열 `categoryId`에는 `categories.path`를 매핑합니다. `status=PUBLISHED`인 글만 공개 DTO의 `draft=false`로 반환합니다.
상세 ERD, 컬럼 타입, 관계, 제약조건과 API 매핑은 [기술 블로그 데이터베이스 설계](database-design.md)를 따릅니다.

- [x] 전체 목표 ERD와 V1 schema·V2 data·V3 schema 변경 범위를 구분한다.
- [x] Category 자기참조와 Category 1:N Post 관계를 그린다.
- [x] `IDENTITY`, `TEXT`, `TIMESTAMPTZ` 선택 이유를 기록한다.
- [x] PK·FK·NOT NULL·DEFAULT·UNIQUE·CHECK를 포함한 V1 DDL을 작성하고 로컬 PostgreSQL 적용을 확인한다.
- [x] 보호된 `미분류` Category와 기존 글을 `V2__seed_initial_post.sql`로 작성한다.
- [x] 빈 PostgreSQL에 Flyway V1·V2가 순서대로 적용되는지 확인한다.
- [ ] 중복 slug와 잘못된 status가 제약조건으로 거부되는지 확인한다.
- [ ] JOIN, 상태 필터, slug 조회와 발행일 정렬 SQL을 직접 작성한다.
- [ ] `BEGIN` → UPDATE → 확인 → `ROLLBACK` 후 데이터 복원을 확인한다.
- [x] slug UNIQUE index와 FK index 존재 여부를 확인한다.

### 3. JPA Blog 읽기 API

**먼저 고민할 것:** 공개 Blog 조회 use case에서 Controller·Service·Repository·DTO가 각각 어떤 책임을 가져야 하는가?

- [ ] `Category`, `Post` Entity와 연관관계를 구현한다.
- [ ] `post`, `category` 안에 `controller`, `service`, `repository`, `domain`, `dto`를 나누고 `common/config`, `common/exception`만 공통으로 둔다.
- [ ] Repository, Service, Controller 책임을 분리하고 Controller에서 Repository를 직접 호출하지 않는다.
- [ ] `CategoryResponse`, `PostSummaryResponse`, `PostDetailResponse`를 Entity와 분리한다.
- [ ] 객체를 직접 생성하지 않고 Spring Bean과 생성자 주입으로 의존성을 연결한다.
- [ ] 조회 Service에 `@Transactional(readOnly = true)`를 적용하고 Validation·Repository·Transaction의 Spring 추상화를 확인한다.
- [ ] `GET /api/categories`를 구현한다.
- [ ] `GET /api/posts`를 구현한다.
- [ ] `GET /api/posts/{slug}`와 404를 구현한다.
- [ ] 기존 `items`, `page`, `pageSize`, `total`과 Frontend 필드명을 유지한다.
- [ ] `ErrorCode`, `ErrorResponse`, 도메인 예외와 `GlobalExceptionHandler`를 구현해 `{ "code": "...", "message": "..." }`를 반환한다.
- [ ] Validation `400`, 공개 Post `404`, 예상하지 못한 오류 `500`과 `X-Request-Id`를 통합 테스트한다.
- [ ] 로컬·운영 Origin을 분리한 CORS 설정을 작성한다.
- [ ] CORS에서 `X-Request-Id` 응답 header를 Frontend에 노출한다.
- [ ] Testcontainers PostgreSQL을 추가하고 Flyway, Repository와 API 통합 테스트를 실행한다.

공통 성공 응답 wrapper와 불필요한 interface는 추가하지 않습니다. 관리자 인증은 1차 공개 API가 운영 연결된 뒤 8단계에서 추가합니다.

### 4. Query 분석·튜닝·MyBatis 판단·AOP

**먼저 고민할 것:** 실제로 느린 query나 반복되는 횡단 관심사가 확인됐는가? 측정 없이 어떤 도구를 먼저 추가하려는 것은 아닌가?

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
- [ ] AOP 적용 후 Actuator health와 애플리케이션 로그에 민감정보가 없는지 다시 확인한다.

MyBatis와 AOP를 사용했다는 사실만을 위한 코드는 만들지 않습니다.

### 5. Docker Compose

**먼저 고민할 것:** 로컬에서 Spring과 PostgreSQL을 함께 재현할 때 필요한 연결·시작 순서·데이터 보존 경계는 무엇인가?

현재 PostgreSQL Compose 구성과 관리 명령은 [로컬 Database 세팅](setup/database.md)을 따릅니다.

- [ ] Spring Boot multi-stage Dockerfile을 작성한다.
- [x] PostgreSQL과 Named Volume을 Compose에 먼저 정의하고 환경변수로 Role·Database 최초 생성을 자동화한다.
- [ ] 기존 PostgreSQL Compose에 Spring을 추가한다.
- [ ] healthcheck 이후 Spring이 시작되게 한다.
- [ ] 빈 Compose PostgreSQL에 기존 Flyway V1·V2가 자동 적용되는지 확인한다.
- [ ] 서비스 이름으로 DB에 연결되는지 확인한다.
- [ ] 재시작 후 데이터 유지, health, 로그와 API를 확인한다.

#### 개인 개발에서 팀 재현으로 확장

- [x] 후속 팀 브랜치·PR·공유 계약은 `AGENTS.md`, 온보딩·Secret 기준은 `docs/setup`에 문서화한다.
- [ ] 개인 환경에서 PostgreSQL → Flyway → Backend → Frontend 전체 흐름을 먼저 검증한다.
- [ ] 새 컴퓨터에서 루트·Backend 환경변수 예시 → PostgreSQL → Backend → Frontend 온보딩 절차를 검증한다.
- [ ] 처음 참여한 개발자가 문서만으로 실행하며 발견한 누락을 가이드에 반영한다.
- [ ] Pull Request에서 Frontend와 Backend 기본 검증을 자동 실행할 CI 범위를 결정하고 구성한다.

Next.js는 Vercel을 유지하므로 컨테이너화하지 않습니다.
PostgreSQL의 Role·Database bootstrap은 2단계부터 사용하고, 테이블과 seed는 Compose init SQL이 아니라 기존 Flyway V1·V2를 사용합니다.
Testcontainers는 3단계 통합 테스트, Compose는 개인·팀 로컬 실행, Render·Aiven은 운영 배포에 사용하며 환경별 목적을 섞지 않습니다.

### 6. Backend·PostgreSQL 운영 배포

**먼저 고민할 것:** 로컬과 운영의 Secret·TLS·연결 수·장애 복구 차이를 어떻게 확인할 것인가?

- [ ] Aiven PostgreSQL을 만들고 TLS 연결 정보를 확인한다.
- [ ] DB 정보를 Render Secret으로 주입한다.
- [ ] HikariCP 연결 수를 Aiven 제한보다 작게 설정한다.
- [ ] Spring Dockerfile이 Render 메모리 제한에서 실행되는지 확인한다.
- [ ] Render에 배포하고 Aiven 연결·Flyway·Actuator health를 확인한다.
- [ ] Render URL에서 Category·Post 목록·상세 API를 확인한다.
- [ ] 운영 CORS에 `https://www.pigpgw.cloud`만 허용한다.
- [ ] 로그, 재배포, rollback과 `pg_dump --schema-only` 복구 절차를 확인한다.

### 7. 기존 Next.js를 운영 Backend에 연결

**먼저 고민할 것:** 기존 화면과 URL을 유지하면서 데이터 공급자만 교체하려면 어느 계층을 변경해야 하는가?

- [ ] 기존 `/`, `/resume`, `/blog`, `/blog/[slug]`, `/blog/categories/[...segments]`를 유지한다.
- [ ] `frontend/src/services/blog.ts`의 mock 호출만 운영 Spring Boot API `fetch`로 교체한다.
- [ ] API 주소를 Next.js 환경변수로 분리한다.
- [ ] 목록·상세·metadata의 fetch와 `revalidate` 정책을 정한다.
- [ ] 검색, 카테고리, error, empty와 404가 기존처럼 동작하는지 확인한다.
- [ ] Frontend `ErrorCode` 타입과 `ApiError`를 만들고 `src/services`에서 HTTP·네트워크 오류를 변환해 loading·empty·not-found·error를 구분한다.
- [ ] `type-check`, `test`, `build`와 Blog 목록 → 상세 흐름을 확인한다.
- [ ] Vercel에 Render API URL을 설정하고 실제 도메인에서 확인한다.
- [ ] 전체 흐름 확인 후 `api.pigpgw.cloud`를 연결하고 API 주소를 갱신한다.

### 8. Spring Security·JWT·USER/ADMIN

**먼저 고민할 것:** 공개 조회, 가입한 사용자와 관리자의 권한 경계를 어디에서 검사하고, role 상승과 token 탈취·재사용을 어떻게 제한할 것인가?

#### 8-1. 로그인·Token

- [x] 전체 ERD에 User 1:N RefreshToken과 User 1:N Post 작성자 관계를 반영한다.
- [x] signup, login, refresh, logout과 me API의 요청·응답·상태 코드를 문서화한다.
- [ ] `users`, `email_verification_tokens`, `refresh_tokens`와 nullable `posts.created_by` migration을 추가한다.
- [ ] `auth`, `user`, `token` 도메인의 Controller·Service·Repository·domain·DTO를 분리한다.
- [ ] `User`, `UserRole(USER, ADMIN)`, `UserStatus(PENDING, ACTIVE, SUSPENDED)`, `EmailVerificationToken`, `RefreshToken`을 구현한다.
- [ ] `SecurityConfig`, `JwtTokenService`, `JwtAuthenticationFilter` 책임을 분리한다.
- [ ] 비밀번호를 `PasswordEncoder`로 단방향 해시한다.
- [ ] signup, email verification·resend, login, refresh, logout과 me API를 구현한다.
- [ ] 회원가입은 항상 `USER`, `ADMIN`은 서버 측에서만 부여한다.
- [ ] 이메일 provider, 발신 주소, 인증 link의 Frontend URL, token 만료시간과 재발송 제한을 비교해 선택하고 Secret은 환경변수로 관리한다.
- [ ] 회원가입 User를 `PENDING`으로 만들고 일회용 이메일 token은 hash로 저장하며 인증 완료 후 `ACTIVE`로 전환한다.
- [ ] 인증 메일 재발송은 email 존재 여부를 노출하지 않고 호출 제한을 적용한다.
- [ ] access token은 짧은 RSA JWT와 Bearer header를 사용한다.
- [ ] refresh token은 hash 저장·회전·폐기와 `HttpOnly`, `Secure`, `SameSite=Lax` Cookie를 사용한다.
- [ ] Blog 조회는 공개, 질문 API는 이메일 인증을 완료한 `ACTIVE` 사용자, `/api/admin/**`는 `ADMIN`만 허용한다.
- [ ] 정상·실패 로그인, 만료, 재발급, logout 후 재사용, `401`과 `403`을 테스트한다.
- [ ] `AUTH_ACCESS_TOKEN_EXPIRED`일 때만 refresh를 한 번 시도하고 재실패 시 로그인 상태를 정리하며 `403`은 권한 부족으로 구분한다.
- [ ] Origin 검증, credential CORS, 호출 제한과 운영 Secret을 확인한다.
- [ ] Next.js `/signup`에 email·password·password confirmation을 구현하되 Backend에는 email·password만 전송하고 role 입력은 제공하지 않는다.
- [ ] 회원가입 성공 후 `/verify-email` 안내를 표시하고 link token 처리 후 URL에서 token을 제거한 뒤 `/login`으로 이동한다.
- [ ] 중복 email·Validation·만료·사용·변조 token·메일 재발송·네트워크 오류의 message와 재시도를 구분한다.
- [ ] Next.js 공통 `/login`에서 credential·호출 제한·네트워크 오류를 구분하고 비밀번호를 URL·로그·`localStorage`에 남기지 않는다.
- [ ] 재발급 실패와 logout UI를 연결하고 USER·ADMIN 흐름을 운영에서 검증한다.

#### 8-2. 관리자 Category·게시글 관리

- [x] 관리자 Category 목록·생성·삭제 API와 Frontend·Backend 책임을 문서화한다.
- [x] 관리자 Post 목록·상세·생성·수정·삭제 API 계약을 문서화한다.
- [ ] 초기 Category를 Flyway seed로 등록하고 공개 Category API에서 계층을 확인한다.
- [ ] 관리자용 Category 목록·생성 API를 구현하고 path를 생성 트랜잭션의 INSERT 직전에 Backend에서 계산한다.
- [ ] Next.js 관리자 Category 생성 화면에서 이름·slug·부모를 입력하고 공개 URL을 미리보기로 제공한다.
- [ ] 존재하지 않는 부모와 중복 path를 거부하고 누락된 상위 Category가 자동 생성되지 않는지 확인한다.
- [ ] 관리자 Category 삭제 화면에 직접 연결된 Post 수와 이동 대상 선택을 제공하고 `미분류`를 기본값으로 표시한다.
- [ ] Backend가 한 트랜잭션에서 Post의 `category_id`를 선택한 Category로 이동한 뒤 기존 Category를 삭제하게 한다.
- [ ] `미분류`와 하위 Category가 있는 Category 삭제를 거부하고 Post가 연쇄 삭제되거나 `category_id=NULL`이 되지 않는지 통합 테스트한다.
- [ ] 관리자용 Post 목록·상세·생성·수정·삭제 API를 구현하고 새 글의 `created_by`에 인증된 ADMIN을 기록한다.
- [ ] Next.js 관리자 글 목록과 Markdown 작성·수정 화면에서 기존 Category를 선택하게 하고 USER 접근이 `403`인지 확인한다.
- [ ] Frontend 관리자 route 보호는 사용자 안내용으로 적용하고 최종 권한 검사는 Backend가 수행하는지 확인한다.
- [ ] 관리자 form의 slug·Category·네트워크 오류에서 작성 내용을 유지하고 생성·수정·삭제 요청을 자동 재시도하지 않는다.

Category slug·부모 변경은 하위 path 일괄 변경 정책을 결정하기 전까지 구현하지 않습니다.

WYSIWYG editor, 휴대폰 번호 인증, 비밀번호 찾기, 소셜 로그인과 MFA는 현재 제외합니다.

### 9. Spring AI 글 질문

**먼저 고민할 것:** 이 글의 내용만 Context로 제한하려면 무엇을 전달해야 하며, 모델 실패가 Blog 기능에 번지지 않게 하려면 어떻게 해야 하는가?

- [ ] Spring AI `ChatClient`와 모델 Secret을 추가한다.
- [ ] `POST /api/posts/{slug}/questions`를 구현한다.
- [ ] 해당 글의 title·description·content만 Context로 전달한다.
- [ ] 글에 없는 질문은 모른다고 답하게 한다.
- [ ] 정상 질문 3개와 범위 밖 질문 2개를 평가한다.
- [ ] 빈 질문, 길이 제한, timeout, 오류와 호출 제한을 처리한다.
- [ ] 모델 오류·timeout을 질문 영역의 `502`·`504`로 처리하고 Blog 본문은 유지한다.
- [ ] 질문 API는 이메일 인증을 완료한 로그인 사용자만 사용하게 한다.
- [ ] Next.js에 질문·로딩·오류·답변 UI를 연결한다.
- [ ] 운영 재배포 후 health·로그·메모리를 확인한다.

Vector DB, embedding, 범용 RAG와 AI Agent는 현재 방식으로 해결되지 않는 요구가 확인될 때 추가합니다.

### 10. 최소 MSA 분리·전체 배포

**먼저 고민할 것:** 단일 Backend에서 실제로 확인된 배포·장애·자원 문제는 무엇이며, 서비스 분리가 그 문제를 해결한다는 근거가 있는가?

- [ ] Blog·Auth·AI를 단일 Spring Boot로 먼저 개발·배포하고 전체 흐름을 검증한다.
- [ ] 동작하는 단일 Backend의 Blog·Auth·AI package 경계를 확인한다.
- [ ] AI만 `ai-service`로 분리하고 Blog·Auth는 `blog-service`에 유지한다.
- [ ] `ai-service`는 DB를 공유하지 않고 보호된 Context API를 호출한다.
- [ ] 두 서비스가 JWT 공개 키·만료·issuer·audience를 검증하게 한다.
- [ ] 서비스 credential, URL, timeout과 Secret을 환경변수로 분리한다.
- [ ] 요청 ID를 두 서비스 로그에 연결하고 장애 시 503을 확인한다.
- [ ] Context API 사용 불가 `503`과 timeout `504`를 구분하고 내부 오류 원문을 외부 응답에 노출하지 않는다.
- [ ] 두 서비스와 PostgreSQL을 Compose로 실행하고 계약 테스트를 수행한다.
- [ ] 두 Render 서비스를 배포하고 Vercel에서 전체 흐름을 검증한다.

#### 사용자·인증 추가 분리는 이 단계에서 판단

- [ ] AI 분리 후 두 서비스의 인증 중복·배포 독립성·장애 경계를 확인하고 `identity-service` 분리 필요성을 결정한다.
- [ ] `identity-service`가 필요하면 User·비밀번호·Role·Refresh Token을 소유하고 `blog-service`는 `authorId`만 참조하도록 경계를 기록한다.

Eureka, Gateway, Kafka와 Outbox는 실제 필요가 생길 때만 추가합니다. `identity-service`는 위 판단 TODO에 근거가 남을 때만 추가합니다.

### 11. Markdown·코드 블록 UI

**먼저 고민할 것:** 실제 글을 읽고 코드를 복사하는 과정에서 발생하는 가독성·접근성 문제는 무엇인가?

- [ ] 밝은 highlight.js 테마와 어두운 `<pre>` 배경 충돌을 재현한다.
- [ ] 밝은 조합 또는 어두운 조합 중 하나로 통일한다.
- [ ] Markdown 렌더링을 별도 component로 분리한다.
- [ ] fenced code 언어 label, 복사 button과 접근 가능한 성공 상태를 추가한다.
- [ ] inline code, 긴 code 가로 scroll, 제목·목록·인용문·link·table을 확인한다.
- [ ] JavaScript, Java와 SQL code fixture를 검증한다.
- [ ] `type-check`, `test`, `build`와 실제 글 화면을 확인한다.

공개 Markdown 표시 품질은 이 단계에서 다루고 관리자 작성 화면은 인증 단계의 단순 Markdown 입력으로 구현합니다. WYSIWYG editor는 현재 제외합니다.

### 12. GitHub 연동·운영 검증·분리 판단

**먼저 고민할 것:** GitHub 연동으로 해결하려는 사용자 문제가 무엇이며, 단순 링크보다 Backend 연동이 필요한 이유가 있는가?

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
- Tag, 서버 검색과 실제 pagination
- Next.js 컨테이너화와 여러 Frontend app 모노레포
- 모바일, PWA와 React Native
- Kubernetes, EKS와 Harbor
- Eureka, Gateway, Kafka, Outbox와 별도 auth-service
- 댓글, 휴대폰 번호 인증, 비밀번호 찾기, 소셜 로그인과 MFA
- 범용 Vector DB, RAG와 AI Agent

제외 항목은 영구 포기가 아닙니다. 구현 중 실제 필요가 확인되면 근거와 함께 TODO에 추가합니다.

## 다음 탐구 후보

1단계 Frontend·Backend 분리, Spring Boot 초기 세팅과 Compose PostgreSQL 직접 연결, Flyway V1 Blog schema와 V2 초기 데이터 적용은 완료했습니다. 다음 후보는 중복 slug·잘못된 status의 제약조건 실패, 기본 조회 SQL과 transaction rollback을 직접 확인하는 것입니다.

공통 code 문자열은 [에러 코드 계약](error-codes.md), Backend 예외 변환과 Frontend 오류 화면 기준은 [Frontend·Backend 오류 처리 설계](error-handling.md)를 따릅니다.
