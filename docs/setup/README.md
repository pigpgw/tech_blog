# 로컬 개발 세팅 안내

이 디렉터리는 두 가지 사용 방식을 지원합니다.

- **새 팀원 온보딩:** 아래 빠른 시작으로 이미 구성된 프로젝트를 clone하고 실행합니다.
- **단계별 학습:** Backend → Database → 연결 → Flyway 순서로 읽으며 SKALA에서 배운 개념을 직접 확인합니다.

설계와 개발 순서는 [개발 체크포인트](../development-roadmap.md), 선택 이유는 [의사결정 로그](../decision-log.md)에서 관리합니다. 이 디렉터리에는 실제 로컬 환경을 만들고 확인하는 방법만 둡니다.

## 문서 선택

| 순서 | 문서                                         | 필요한 경우                                    | 완료 결과                                    |
| ---- | -------------------------------------------- | ---------------------------------------------- | -------------------------------------------- |
| 1    | [Backend 초기 세팅](backend.md)              | Spring Boot 프로젝트 구성과 Gradle을 학습할 때 | 최소 Backend가 Java 21에서 실행됨            |
| 2    | [로컬 Database 세팅](database.md)            | PostgreSQL과 Docker Compose를 준비할 때        | `tech_blog` DB와 Role이 실행됨               |
| 3    | [Backend–Database 연결](backend-database.md) | Spring에서 PostgreSQL에 접속할 때              | HikariCP 연결과 Actuator health가 확인됨     |
| 4    | [Flyway migration](flyway.md)                | Schema 변경 이력을 적용하고 검증할 때          | V1 테이블과 `flyway_schema_history`가 생성됨 |

처음부터 학습하려면 표의 순서대로 읽습니다. 이미 Backend가 실행된다면 Database나 Flyway처럼 필요한 문서만 바로 확인해도 됩니다.

## 빠른 시작

필수 도구는 Git, Java 21과 실행 중인 Docker Desktop입니다. Frontend까지 실행하려면 Node.js 22.x와 npm이 필요합니다.

```bash
git --version
java --version
docker --version
docker compose version
docker info
```

### 1. 저장소 준비

```bash
git clone https://github.com/pigpgw/tech_blog.git
cd tech_blog
```

이미 clone한 저장소가 있다면 저장소 루트로 이동합니다.

### 2. 환경변수 준비

```bash
cp .env.example .env
cp backend/.env.example backend/.env
```

두 파일의 `DB_PASSWORD`는 같은 로컬 값으로 설정합니다. 실제 `.env`는 Git에서 제외되며 공유하거나 커밋하지 않습니다.

### 3. PostgreSQL 실행

```bash
docker compose up -d postgres
docker compose ps
```

`postgres` service가 `Up`이고 `5432:5432`가 표시되면 정상입니다.

### 4. Backend 실행

```bash
cd backend
./gradlew test
./gradlew bootRun
```

`Started TechBlogApplication`이 나오면 정상입니다. `bootRun`은 서버를 계속 실행하므로 진행률이 `80% EXECUTING`에 머무릅니다. 종료할 때는 `Ctrl+C`를 누릅니다.

### 5. 연결 확인

Backend가 실행 중일 때 저장소 루트의 다른 터미널에서 확인합니다.

```bash
curl http://localhost:8080/actuator/health
```

`status`가 `UP`이면 Spring Boot와 PostgreSQL 연결이 정상입니다.

```bash
docker compose exec postgres psql -U tech_blog_user -d tech_blog -c "\dt"
```

현재는 `categories`, `posts`, `flyway_schema_history`가 보여야 합니다. DBeaver에서 보이지 않으면 `public` schema를 새로고침하거나 연결을 다시 연결합니다.

### 6. Frontend 실행

Backend와 별개로 Frontend까지 실행할 때 저장소 루트의 새 터미널에서 사용합니다.

```bash
cd frontend
nvm use
npm ci
npm run dev
```

<http://localhost:3000>에서 확인합니다. Frontend 품질 검증 명령은 루트 [README](../../README.md#로컬-frontend-실행)를 따릅니다.

## 현재 확인된 범위

- PostgreSQL 17과 Named Volume을 사용하는 Compose 실행
- `tech_blog` Database와 `tech_blog_user` Role 생성
- Spring Boot의 PostgreSQL 연결과 Actuator health `UP`
- Backend test 성공
- 빈 PostgreSQL에 Flyway V1·V2 순차 적용
- `미분류`, 공개 Category와 기존 Markdown 글 초기 데이터 확인

아직 새 clone·빈 Volume에서 다른 개발자가 수행한 전체 온보딩, Hibernate Schema validation과 Blog API는 완료하지 않았습니다.

## 공통 원칙

- 실행 명령은 이 디렉터리의 가이드를 단일 기준으로 사용합니다.
- 실제 Secret, 개인 절대 경로와 credential은 문서나 Git에 남기지 않습니다.
- 이미 적용하거나 공유한 Flyway migration은 수정하지 않습니다.
- Volume 삭제처럼 데이터를 잃을 수 있는 명령은 대상과 보존할 데이터를 먼저 확인합니다.
- 문서와 코드가 다르면 현재 코드와 실제 실행 결과를 먼저 확인한 뒤 문서를 갱신합니다.
