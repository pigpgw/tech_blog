# AGENTS.md

이 파일은 저장소 전체에 적용되는 최소 작업 규칙이다.
세부 작업 기준은 `.agents/skills`의 전용 Skill을 우선한다.

## 절대 규칙

- 사용자가 별도로 요청하지 않으면 `dev`에서 작업한다.
- `main` 브랜치에는 직접 작업하지 않는다.
- 요청 범위 밖의 리팩터링, 문서 정리, 하위 `AGENTS.md` 추가는 하지 않는다.
- 사용자가 요청하지 않은 하위 `AGENTS.md`를 만들지 않는다.
- 사용자가 만든 변경사항을 되돌리지 않는다.
- 실제로 실행하지 않은 테스트, 빌드, 검증을 실행했다고 쓰지 않는다.
- 실제로 수행하지 않은 작업을 AI 활용 기록에 남기지 않는다.

## 작업 전 확인

작업 시작 전 아래 문서를 우선 확인한다.

- `README.md`
- `AGENTS.md`
- `docs` 중 현재 작업과 관련된 문서

## 변경 원칙

- 필요한 파일만 최소 범위로 수정한다.
- 관련 없는 파일의 포맷팅 변경을 하지 않는다.
- import 정렬만을 위한 수정은 하지 않는다.
- 아키텍처나 라이브러리 변경 시 이유를 `docs` 또는 PR 설명에 남긴다.

## Plan Review Harness

- 코드, 설정, 문서 구조, UI를 변경하거나 작업 계획을 세울 때는 사용자가 별도로 요청하지 않아도 계획을 HTML로 확인할 수 있게 한다.
- 계획은 현재 작업에 관련된 Skill을 먼저 확인한 뒤 작성한다.
- 계획 초안과 수정본은 `docs/plan/current.md`에 Markdown으로 작성하고, 작성하거나 고칠 때마다 `npm run plan:review`로 `docs/plan/index.html`을 갱신한다.
- 계획은 `docs/plan/template.md`의 구조를 따른다.
- `docs/plan/current.md`와 `docs/plan/index.html`은 작업자별 로컬 산출물이므로 커밋하지 않는다.
- 사용자가 계획을 검토하는 동안에는 채팅 요약만으로 확정하지 말고, 최신 HTML 검토 화면 기준으로 피드백을 반영한다.
- 구현은 사용자가 HTML 계획을 기준으로 승인하거나 수정 지시를 준 뒤 시작한다.
- 계획에는 목적, 변경 범위, 수정 파일 후보, 검증 방법, 미해결 질문을 포함한다.
- 시스템 Plan Mode처럼 파일 쓰기가 금지된 환경에서는 채팅 플랜으로만 진행할 수 있다. 이 경우 Default mode로 돌아오면 같은 내용을 즉시 `docs/plan`에 반영해 HTML 검토 화면을 생성한다.
- 오타 수정처럼 영향 범위가 한 줄 이하인 단순 변경은 사용자가 바로 수정을 요청한 경우에만 이 절차를 생략할 수 있다.

## GitHub 작업 흐름

- 작은 수정, 오타, 단순 스타일 조정은 이슈 없이 `dev`에서 바로 작업할 수 있다.
- 기능 범위, 재현 절차, 검증 기준을 정리해야 하는 작업은 이슈를 만든다.
- 주요 기능, 버그 수정, 문서 구조 변경, 설정 변경은 PR을 만든다.
- PR 본문에는 목적, 변경 내용, 검증 결과, 관련 이슈, AI 활용 여부를 남긴다.
- 실행하지 않은 검증 항목은 PR 본문이나 작업 보고에 이유를 적는다.
- PR은 `dev`로 병합하고, 배포 준비가 끝난 변경만 `main`에 반영한다.

브랜치 기준:

- `main`: production 배포 브랜치. 직접 작업하지 않는다.
- `dev`: 기본 통합 브랜치. 사용자가 별도로 요청하지 않으면 여기서 작업한다.
- `feature/<slug>`: 기능, 화면, 사용자 경험 추가
- `fix/<slug>`: 버그 수정
- `docs/<slug>`: 문서, 블로그 글, 기록
- `chore/<slug>`: 설정, 템플릿, 빌드 도구

브랜치 이름의 `<slug>`는 영어 kebab-case로 작성한다.

## 아키텍처

기술 스택:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- npm
- Java 21, Spring Boot와 Gradle Wrapper
- PostgreSQL과 Flyway
- Docker와 Docker Compose
- Spring Security, JWT와 Spring AI는 선행 단계 완료 후 추가

목표 폴더 구조:

- `frontend/src/app`: Next.js App Router 페이지, 레이아웃, 라우트 단위 UI
- `frontend/src/lib`: 게시글 조회 등 공통 로직
- `frontend/src/types`: 프로젝트 공통 타입
- `frontend/content/blog`: Markdown 블로그 글
- `docs`: 프로젝트 TODO, API, 의사결정과 AI 활용 기록
- `.agents/skills`: 반복 작업을 위한 Codex Skill
- `backend`: Spring Boot·Gradle 독립 프로젝트

현재 Next.js는 저장소 루트에 있으므로 첫 TODO에서 기준선을 확인한 뒤 `frontend/`로 이동합니다. 실제 이동이 확인되기 전에는 목표 경로가 이미 존재한다고 가정하지 않습니다.

현재는 루트 `AGENTS.md`만 유지한다. 프론트엔드 전용 규칙의 차이가 명확해지면 `src/AGENTS.md`로 분리한다.

## 빌드/테스트

패키지 설치:

```bash
cd frontend
npm install
```

개발 서버:

```bash
npm run dev
```

품질 확인:

```bash
npm run lint
npm run format:check
npm run type-check
npm run build
```

- 문서만 수정한 경우에는 필요한 최소 검증만 수행한다.
- UI를 수정한 경우에는 빌드 검증과 함께 브라우저에서 주요 화면을 확인한다.
- 검증 결과를 보고할 때는 실행한 명령어, 성공/실패 여부, 실패 시 원인, 미실행 항목을 함께 적는다.

## 도메인 컨텍스트

- 프로젝트 목적은 개인 기술 블로그를 만들고 개발 과정의 문제 해결을 기록하는 것이다.
- 프로젝트 TODO 원본은 `docs/development-roadmap.md`이며 `/Users/baggeon-u/Desktop/skala/SKALA_STUDY_ROADMAP.md`를 함께 동기화한다.
- 현재 구현된 Home, Resume, Blog 목록·상세, 카테고리 경로, 목록 검색, Markdown과 URL을 보존한다.
- 디렉터리 분리 후 블로그 글은 `frontend/content/blog`의 Markdown 파일로 관리한다.
- 디렉터리 분리 후 게시글 frontmatter와 본문은 `frontend/src/lib/blog-api.mock.ts`에서 읽고, 데이터 접근 경계는 `frontend/src/services/blog.ts`에 둔다.
- `draft: true`인 글은 공개 목록과 상세 조회에서 제외한다.
- 공개 글은 `slug`로 접근한다.
- 전환 순서는 `기준선 → frontend/backend 디렉터리 분리 → Backend 컨벤션·Spring 핵심 → PostgreSQL·Flyway → JPA Blog API·Testcontainers → query tuning·AOP·MyBatis 판단 → Docker Compose → Aiven·Render Backend 배포 → 기존 Next 연결 → JWT → Spring AI → AI 서비스 분리 → Markdown UI → GitHub 연동·분리 판단`이다.
- Frontend의 `id`, `slug`, `description`, `publishedAt`, `draft`, `categoryId`, `content` 모양은 유지하고 Spring DTO에서 DB 컬럼과 매핑한다.
- 공개 API는 먼저 `GET /api/categories`, `GET /api/posts`, `GET /api/posts/{slug}`만 구현한다.
- Next.js는 Vercel Root Directory `frontend`, Spring은 Render Root Directory `backend`, PostgreSQL은 Aiven에 배포한다.
- Blog·Auth·AI는 단일 Spring Boot에서 먼저 운영 검증하고 AI 기능을 첫 번째로 `ai-service`에 분리한다. `identity-service`는 AI 분리 후 인증 중복·배포·장애 근거가 있을 때만 추가한다. GitHub 연동은 Markdown 뒤 마지막 별도 기능 단계에서 구현하고, 운영 후 Webhook·동기화·재시도 근거가 있을 때만 전용 서비스나 worker 분리를 판단한다.
- Supabase, 관리자 CRUD, 모노레포, Cloudflare 라우팅, 모바일 최적화, Kubernetes, EKS, Harbor, Eureka, Gateway와 Kafka는 현재 범위에서 제외한다.
- README, `docs/development-roadmap.md`, `docs/api-spec.md`와 최신 의사결정 로그를 함께 적용한다.

## 학습 진행 방식

- 사용자가 코드를 직접 수정하는 것이 기본이다. 사용자가 명시적으로 구현을 요청하지 않으면 Codex는 코드 파일을 수정하지 않는다.
- 한 번에 개념 하나, 명령 하나 또는 코드 변경 하나만 제시하고 사용자의 결과를 확인한 뒤 다음 단계로 간다.
- SKALA 자료의 존재 여부로 구현 범위를 제한하지 않는다. 현재 서비스에 필요한 내용은 공식 문서, 현재 코드, 테스트와 실제 운영 요구를 기준으로 구현하고 SKALA 자료는 도움이 될 때만 참고한다.
- 체크박스는 코드, 테스트, HTTP, 화면 또는 배포 결과가 실제로 확인되었을 때만 완료 처리한다.
- 문서 계획과 실제 코드가 다르면 현재 코드를 먼저 확인하고 문서를 갱신한다.

## Backend 컨벤션

- Backend 위치는 저장소의 `backend/`, 최상위 Java package는 `com.pigpgw.techblog`로 고정한다.
- Java 21, Spring Boot, Gradle Groovy DSL과 Gradle Wrapper를 사용한다.
- package는 `post`, `category`, 이후 `auth`, `user`, `token`, `ai`처럼 도메인 우선으로 구성하고 각 도메인 안에서 `controller`, `service`, `repository`, `domain`, `dto`를 분리한다. `common/config`, `common/exception`만 공통으로 둔다.
- Entity를 Controller 응답으로 직접 반환하지 않고 `PostSummaryResponse`, `PostDetailResponse`, `CategoryResponse`처럼 목적이 드러나는 DTO로 변환한다.
- DTO는 가능한 경우 Java `record`, 의존성 주입은 생성자 주입을 사용한다. field `@Autowired`는 사용하지 않는다.
- Controller는 HTTP, Service는 use case·트랜잭션, Repository는 영속성 책임만 가진다.
- Controller가 Repository를 직접 호출하지 않으며 Entity에 화면·응답 조합 책임을 넣지 않는다.
- 조회 Service는 `@Transactional(readOnly = true)`, 쓰기는 필요한 Service method에 `@Transactional`을 사용한다.
- 공통 성공 응답 wrapper를 만들지 않고 `docs/api-spec.md`의 JSON 계약을 유지한다.
- 예외는 `GlobalExceptionHandler`에서 HTTP 상태와 `{ "message": "..." }`로 변환한다.
- DB·모델 비밀값은 환경변수로 주입하고 실제 `.env`, credential, private key를 커밋하지 않는다.
- Flyway는 `V1__create_blog_schema.sql` 형식을 사용하고 이미 적용된 migration을 수정하지 않는다.
- H2로 PostgreSQL 검증을 대신하지 않는다. Testcontainers는 Blog API 단계에서 추가하고 Frontend 연결 전에 migration·Repository·API 통합 테스트를 실행한다.
- 테스트 class는 `*Test`, PostgreSQL 통합 테스트는 `*IntegrationTest`로 구분한다.
- 공통 wrapper, BaseEntity, CQRS, 불필요한 interface와 멀티모듈은 실제 필요 전에는 만들지 않는다.

## JPA·SQL·MyBatis·AOP 규칙

- JPA와 Spring Data Repository를 기본으로 사용한다.
- 먼저 Hibernate 생성 SQL, N+1, projection·fetch join·`EntityGraph`와 실제 query plan을 확인한다.
- JPA derived query·JPQL·projection으로 요구와 성능을 충족하면 MyBatis를 추가하지 않는다.
- 복잡한 동적 SQL, 집계·리포트 query 또는 JPA로 표현하기 어려운 병목이 실제로 확인된 경우에만 해당 조회에 MyBatis mapper를 추가한다.
- MyBatis 추가 전후 SQL, 가독성, 테스트와 `EXPLAIN (ANALYZE, BUFFERS)` 결과를 기록한다.
- index는 query pattern과 실행계획을 근거로 추가하며 측정 없는 성능 향상을 주장하지 않는다.
- AOP는 요청 ID, Service 실행시간과 예외 위치 같은 횡단 관심사에만 사용하고 비즈니스 판단을 Aspect에 넣지 않는다.
- AOP 로그에 token, password, Cookie, 본문 전체와 개인정보를 남기지 않는다.
- IoC/DI는 생성자 주입, PSA는 Repository·Transaction·Validation 추상화에서 실제로 설명할 수 있어야 한다.

## 인증·권한 규칙

- 인증은 Blog 읽기 API와 단일 Backend 운영 배포가 끝난 뒤 같은 Spring 애플리케이션에 추가한다.
- `user/domain`에는 `User`, `UserRole(USER, ADMIN)`, `UserStatus`, `token/domain`에는 hash로 저장할 `RefreshToken`을 둔다.
- 회원가입은 항상 `USER`이며 요청의 role을 신뢰하지 않는다. `ADMIN`은 서버 측에서만 부여한다.
- 비밀번호는 `PasswordEncoder`로 단방향 해시하고 원문을 저장·응답·로그에 남기지 않는다.
- access token은 짧은 RSA JWT와 Bearer header, refresh token은 hash 저장·회전·폐기와 `HttpOnly`, `Secure`, `SameSite=Lax` Cookie를 사용한다.
- RSA private key, token 원문과 credential을 저장소 또는 브라우저 `localStorage`에 저장하지 않는다.
- 공개 Blog 조회, 로그인 사용자용 질문 API, `ADMIN` 전용 `/api/admin/**`를 Spring Security authorization rule로 분리한다.
- 인증 실패 `401`, 권한 부족 `403`, refresh token 재사용 실패와 logout 후 재사용 실패를 테스트한다.
- refresh·logout은 Origin을 검증하고 credential CORS는 로컬 Next.js와 운영 도메인만 허용한다.
- 관리자 CRUD와 화면은 현재 구현 범위가 아니며 Role·토큰·접근 제어 검증과 구분한다.

## 코딩 컨벤션

- 프로젝트 문서는 한국어로 작성한다.
- `frontend/src/lib`의 함수는 `lowerCamelCase`를 사용하고, 동사 또는 동사구로 시작한다.
- `frontend/src/lib` 함수명은 `동작 + 도메인 + 대상` 순서를 우선한다.
- 파일, DB, 외부 입력에서 값을 조회할 때는 `get`을 사용한다.
- 문자열이나 원본 데이터를 구조화된 값으로 해석할 때는 `parse`를 사용한다.
- 사람이 읽는 문자열을 URL slug로 변환할 때는 `slugify`를 사용한다.
- 여러 값을 조합해 최종 문자열이나 객체를 만들 때는 `build`를 사용한다.
- 화면 표시용 문자열로 변환할 때는 `format`을 사용한다.
- 목록 필터링, 정렬, 검증은 `filter`, `sort`, `validate`처럼 동작이 드러나는 동사를 사용한다.
- 커밋 메시지는 Conventional Commits 형식을 따른다.
- 커밋 내용은 한국어로 작성한다.
- subject 문장은 `~한다` 형식으로 끝낸다.
- 기본 형식은 `type: subject`를 사용한다.
- 공식 문서는 참고용으로만 사용하고, 이 프로젝트의 요약 규칙을 우선한다.
- 참고: <https://www.conventionalcommits.org/>
- AI와 함께 작업했거나 AI가 커밋되는 산출물 작성, 수정, 진단에 직접 관여한 경우 공동 작성자 footer를 남긴다.
- 커밋 메시지와 공동 작성자 footer 규칙은 이 문서와 README의 커밋 컨벤션을 기준으로 한다.

## Skill 활용

- 커밋 메시지 작성이나 검토가 필요하면 `commit-message-generator`를 활용한다.
- AI 활용 기록 초안이 필요하면 `ai-usage-recorder`를 활용한다.
- UI 퍼블리싱 작업에는 `blog-ui-publisher`를 활용한다.
- 코드리뷰 요청에는 `react-next-frontend-code-review`를 활용한다.
