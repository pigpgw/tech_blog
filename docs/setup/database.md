# 로컬 Database 세팅

## 목적

PostgreSQL 17을 Docker Compose로 반복 실행하고 팀원이 같은 Database·Role·Volume 구성을 재현하게 합니다.

## 언제 보는가

- 로컬 PostgreSQL을 처음 실행할 때
- Docker Compose, port와 Volume의 역할을 확인할 때
- DBeaver 연결이나 `5432` port 충돌을 해결할 때
- Docker CLI 설정이 Compose의 어느 항목으로 이동했는지 복습할 때

## 선수조건

- 실행 중인 Docker Desktop
- 저장소 루트의 `compose.yaml`, `.env.example`

```bash
docker --version
docker compose version
docker info
```

## 환경변수 준비

저장소 루트에서 실행합니다.

```bash
cp .env.example .env
```

루트 `.env`는 PostgreSQL 공식 image가 빈 Named Volume을 초기화할 때 사용합니다.

```text
DB_NAME=tech_blog
DB_USERNAME=tech_blog_user
DB_PASSWORD=로컬에서만 사용할 값
```

실제 `.env`는 Git에서 제외합니다. `.env.example`에는 변수 이름과 교체 가능한 예시만 둡니다.

## Compose 구성 이해

```yaml
services:
  postgres:
    image: postgres:17
    ports:
      - "5432:5432"
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data

volumes:
  postgres-data:
```

- `image`: 팀에서 사용할 PostgreSQL major version
- `ports`: Mac `5432`와 Container `5432` 연결
- `environment`: 빈 Volume에서 최초 Role·Database 생성
- service `volumes`: PostgreSQL 데이터 경로와 Named Volume 연결
- 최상위 `volumes`: Compose가 관리할 Named Volume 선언

Container 이름은 Compose project와 service를 기준으로 자동 생성되므로 저장소 위치에 따라 달라질 수 있습니다.

## 실행과 확인

```bash
docker compose config --quiet
docker compose up -d postgres
docker compose ps
```

`postgres` service가 `Up`이고 `5432:5432`가 표시되면 정상입니다.

```bash
docker compose exec postgres psql -U tech_blog_user -d tech_blog -c "SELECT current_database(), current_user;"
```

결과가 `tech_blog`, `tech_blog_user`이면 Role과 Database가 정상입니다.

## Named Volume 동작

PostgreSQL 공식 image의 초기 환경변수는 **빈 Volume의 최초 실행에서만** Role과 Database를 만듭니다. 이후 `.env` 값을 변경해도 기존 Role 비밀번호나 Database는 자동으로 바뀌지 않습니다.

```bash
docker compose stop postgres
docker compose start postgres
```

중지·재시작 후에도 데이터가 남는 것이 정상입니다.

`docker compose down -v`는 Role, Schema와 데이터를 포함한 Named Volume까지 삭제합니다. 완전 초기화를 결정하고 대상을 확인한 경우가 아니면 실행하지 않습니다.

## 관리 명령

```bash
# 상태
docker compose ps

# 로그
docker compose logs postgres

# 중지와 시작
docker compose stop postgres
docker compose start postgres

# Container와 Network 종료, Volume 유지
docker compose down
```

## DBeaver 연결

| 항목     | 값               |
| -------- | ---------------- |
| Host     | `localhost`      |
| Port     | `5432`           |
| Database | `tech_blog`      |
| Username | `tech_blog_user` |
| Password | 루트 `.env` 값   |

테이블이 바로 보이지 않으면 `public` schema를 새로고침하거나 연결을 다시 연결합니다.

## 포트 충돌

```bash
lsof -i:5432
```

Homebrew PostgreSQL이 사용 중이면 중지한 뒤 Compose를 실행할 수 있습니다.

```bash
brew services stop postgresql@17
```

Homebrew PostgreSQL을 유지한다면 `compose.yaml`의 host port와 `backend/.env`의 JDBC port를 같은 대체값으로 변경합니다. 예를 들어 Compose를 `5433:5432`로 바꾸면 Backend는 `localhost:5433`에 연결합니다.

## 선택 학습: Docker CLI와 Compose 대응

현재 프로젝트의 권장 실행 경로는 Compose입니다. 아래 내용은 Docker option을 직접 복습할 때만 확인합니다.

| Docker CLI                   | Compose                              | 역할                    |
| ---------------------------- | ------------------------------------ | ----------------------- |
| `--name`                     | project와 service 기반 자동 이름     | Container 식별          |
| `--publish 5432:5432`        | `ports`                              | host와 container 연결   |
| `--env POSTGRES_*`           | `environment`                        | 최초 Role·Database 생성 |
| `--volume name:/var/lib/...` | service `volumes`와 최상위 `volumes` | 데이터 보존             |
| `postgres:17`                | `image: postgres:17`                 | PostgreSQL 버전 고정    |

학습용 CLI Container와 Compose PostgreSQL을 같은 port에서 동시에 실행하지 않습니다.

## 대체 경로: Homebrew PostgreSQL

Docker를 사용할 수 없을 때만 프로젝트 전용 Role과 Database를 직접 만듭니다.

```bash
psql postgres
```

```sql
CREATE ROLE tech_blog_user
WITH LOGIN
NOSUPERUSER
NOCREATEDB
NOCREATEROLE;

\password tech_blog_user

CREATE DATABASE tech_blog
WITH
OWNER = tech_blog_user
ENCODING = 'UTF8'
TEMPLATE = template0;

\q
```

비밀번호는 `\password`에서 대화형으로 입력하고 문서나 Git에 남기지 않습니다. 이미 존재하면 삭제하지 말고 `\du tech_blog_user`, `\l tech_blog`로 확인합니다.

```bash
psql -h localhost -U tech_blog_user -d tech_blog
```

Homebrew와 Compose는 둘 다 수행하는 필수 단계가 아니라 서로 다른 실행 방법입니다.

## 완료 기준

- Compose 설정 검증과 PostgreSQL 실행 성공
- `tech_blog`, `tech_blog_user` 확인
- Named Volume의 데이터 보존 경계 설명
- 실제 `.env`가 Git에서 제외됨

다음 단계: [Backend–Database 연결](backend-database.md)
