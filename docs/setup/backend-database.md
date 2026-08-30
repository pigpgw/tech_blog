# Backend–Database 연결

## 목적

Mac에서 실행한 Spring Boot가 Compose PostgreSQL에 JDBC로 연결되게 하고 로컬·운영 환경변수의 책임을 분리합니다.

## 언제 보는가

- Spring Data JPA와 PostgreSQL Driver를 추가할 때
- datasource URL·username·password 위치를 확인할 때
- `bootRun`의 DB 연결 오류를 해결할 때
- HikariCP와 Actuator로 연결 결과를 확인할 때

## 선수조건

- [Backend 초기 세팅](backend.md) 완료
- [로컬 Database 세팅](database.md)의 PostgreSQL 실행

```bash
docker compose ps
```

`postgres` service가 `Up`이어야 합니다.

## 필요한 의존성

`backend/build.gradle`의 핵심 DB 의존성입니다.

```groovy
implementation 'org.springframework.boot:spring-boot-starter-data-jpa'
runtimeOnly 'org.postgresql:postgresql'
```

- Spring Data JPA: JPA, Hibernate와 Repository 추상화
- PostgreSQL Driver: JDBC URL을 실제 PostgreSQL 연결로 변환

Flyway 의존성은 [Flyway migration](flyway.md)에서 별도로 설명합니다.

## Backend 환경변수 준비

```bash
cd backend
cp .env.example .env
```

```text
DB_URL=jdbc:postgresql://localhost:5432/tech_blog
DB_USERNAME=tech_blog_user
DB_PASSWORD=루트 .env와 같은 로컬 값
```

루트 `.env`는 Compose, `backend/.env`는 Spring Boot가 소유합니다. 실제 파일은 Git에서 제외하고 각 위치의 `.env.example`만 공유합니다.

## Spring 설정

`backend/src/main/resources/application.properties`:

```properties
spring.application.name=techblog
spring.config.import=optional:file:.env[.properties]

spring.datasource.url=${DB_URL}
spring.datasource.username=${DB_USERNAME}
spring.datasource.password=${DB_PASSWORD}
```

`spring.config.import`는 Backend 폴더의 `.env`를 선택적으로 읽습니다. 그래서 `backend`에서 별도 `source` 명령 없이 `./gradlew bootRun`을 실행할 수 있습니다.

운영에서는 `.env`를 배포하지 않고 Render 환경변수가 같은 이름의 값을 제공합니다. `optional:`이므로 파일이 없어도 외부 환경변수가 있으면 실행할 수 있습니다.

## 실행과 확인

```bash
cd backend
./gradlew test
./gradlew bootRun
```

다음 로그는 실제 PostgreSQL 연결 성공을 뜻합니다.

```text
HikariPool-1 - Added connection
HikariPool-1 - Start completed.
Database JDBC URL [jdbc:postgresql://localhost:5432/tech_blog]
Database driver: PostgreSQL JDBC Driver
Started TechBlogApplication
```

`80% EXECUTING`은 `bootRun` 서버가 실행 중인 정상 상태입니다.

다른 터미널에서 확인합니다.

```bash
curl http://localhost:8080/actuator/health
```

`status`가 `UP`이면 정상입니다. 확인 후 `Ctrl+C`로 Backend를 종료할 수 있습니다.

## 환경별 연결 주소

| 환경                     | `DB_URL`                                                     | 값 관리 위치     |
| ------------------------ | ------------------------------------------------------------ | ---------------- |
| Mac에서 실행한 Spring    | `jdbc:postgresql://localhost:5432/tech_blog`                 | `backend/.env`   |
| 향후 Compose 내부 Spring | `jdbc:postgresql://postgres:5432/tech_blog`                  | Compose 환경변수 |
| Render 운영 Spring       | `jdbc:postgresql://Aiven-host:port/database?sslmode=require` | Render Secret    |

Container 내부에서 `localhost`는 자기 자신을 뜻하므로 향후 Spring을 Compose에 추가하면 PostgreSQL service 이름인 `postgres`를 사용합니다.

## 자주 발생하는 오류

### `'url' must start with "jdbc"`

`DB_URL`이 비어 있거나 `postgresql://...`처럼 JDBC prefix 없이 입력된 경우입니다.

```text
jdbc:postgresql://localhost:5432/tech_blog
```

### `Failed to determine a suitable driver class`

PostgreSQL Driver가 runtime classpath에 있는지 `build.gradle`을 확인합니다.

### 비밀번호 인증 실패

루트 `.env`와 `backend/.env`의 비밀번호가 같은지 확인합니다. 기존 Named Volume에서는 루트 `.env` 값을 바꿔도 Role 비밀번호가 자동 변경되지 않습니다.

### 연결 거부 또는 timeout

```bash
docker compose ps
lsof -i:5432
```

PostgreSQL 상태와 port 충돌을 확인합니다.

### `open-in-view is enabled` 경고

DB 연결 실패가 아니라 JPA 기본 설정 경고입니다. Entity와 API 구현 단계에서 transaction 경계를 구성하며 `spring.jpa.open-in-view=false` 적용 여부를 결정합니다.

## 완료 기준

- Backend `.env`와 datasource 참조 구성
- PostgreSQL JDBC Driver 연결 성공
- HikariCP connection 생성
- Actuator health `UP`
- 실제 Secret이 Git에서 제외됨

다음 단계: [Flyway migration](flyway.md)
