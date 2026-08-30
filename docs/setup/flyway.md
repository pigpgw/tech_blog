# Flyway migration

## 목적

PostgreSQL Schema 변경을 버전이 있는 SQL로 관리하고 로컬·테스트·운영 환경에 같은 순서로 적용합니다.

## 언제 보는가

- Flyway 의존성과 Spring Boot 자동 설정을 확인할 때
- 새로운 Schema 또는 초기 데이터 migration을 작성할 때
- `flyway_schema_history`와 적용 상태를 확인할 때
- 이미 적용된 migration 변경 오류를 해결할 때

## 선수조건

- [Backend–Database 연결](backend-database.md) 완료
- PostgreSQL에 연결되는 Backend
- [데이터베이스 설계](../database-design.md)의 해당 migration 범위 확인

## 의존성

`backend/build.gradle`:

```groovy
implementation 'org.springframework.boot:spring-boot-starter-flyway'
runtimeOnly 'org.flywaydb:flyway-database-postgresql'
```

- `spring-boot-starter-flyway`: Flyway Core와 Spring Boot 자동 설정
- `flyway-database-postgresql`: PostgreSQL 전용 지원

`flyway-core`만 직접 추가하지 않습니다. Spring Boot 4에서는 starter가 자동 설정까지 함께 제공합니다.

## 파일 위치와 이름

기본 위치:

```text
backend/src/main/resources/db/migration/
```

이름 형식:

```text
V{번호}__{설명}.sql
```

현재 계획:

| 버전 | 파일                         | 역할                                  | 상태      |
| ---- | ---------------------------- | ------------------------------------- | --------- |
| V1   | `V1__create_blog_schema.sql` | `categories`, `posts`와 제약조건 생성 | 적용 확인 |
| V2   | `V2__seed_initial_post.sql`  | `미분류`와 기존 공개 글 초기 데이터   | 적용 확인 |
| V3   | `V3__create_auth_schema.sql` | User·Email·Refresh Token Schema       | 설계      |

한 파일에는 이름으로 설명할 수 있는 하나의 Schema 또는 Data 변경 목적만 둡니다.

## V1·V2 적용

Spring Boot는 기존 datasource를 사용해 시작 시 migration을 자동 적용합니다.

```bash
cd backend
./gradlew test
./gradlew bootRun
```

빈 PostgreSQL에서는 Flyway가 `flyway_schema_history`를 만들고 V1, V2를 순서대로 실행합니다. V1까지 적용된 DB에서는 checksum을 검증한 뒤 V2만 실행하며 이미 성공한 migration은 다시 실행하지 않습니다.

## 적용 결과 확인

```bash
docker compose exec postgres psql -U tech_blog_user -d tech_blog -c "SELECT installed_rank, version, description, success FROM flyway_schema_history ORDER BY installed_rank;"
```

V1과 V2의 `success`가 모두 `true`이면 정상입니다.

```bash
docker compose exec postgres psql -U tech_blog_user -d tech_blog -c "\dt"
```

현재 확인 대상:

```text
categories
flyway_schema_history
posts
```

DBeaver에서 테이블이 보이지 않으면 `public` schema를 새로고침하거나 연결을 다시 연결합니다.

## 책임 경계

- PostgreSQL image 환경변수: 빈 Volume에 Role과 Database 생성
- Flyway: 테이블, 제약조건, index와 초기 데이터 변경
- JPA Entity: 애플리케이션의 영속성 모델
- Service: Category 순환 방지, path 조합처럼 DB 제약만으로 표현하지 않는 규칙

Docker init SQL과 Flyway에서 같은 테이블을 중복 생성하지 않습니다.

## 적용된 migration 변경 금지

Flyway는 적용된 파일의 checksum을 기록합니다. 적용 후 migration을 수정하면 다른 개발자·CI·운영 DB의 이력과 달라집니다.

- 이미 적용하거나 공유한 migration은 수정하지 않음
- Schema 변경은 다음 번호의 migration으로 추가
- 로컬, Testcontainers와 운영에 같은 파일을 같은 순서로 적용

아직 공유하지 않은 migration을 수정해야 하는 학습 상황에서도 현재 DB의 적용 이력과 데이터 초기화 범위를 먼저 확인합니다.

## Hibernate Schema validation

Entity와 V2까지 준비된 뒤 다음 설정을 추가합니다.

```properties
spring.jpa.hibernate.ddl-auto=validate
```

Hibernate의 `create`나 `update`로 Schema를 만들지 않고 Entity와 Flyway Schema가 일치하는지만 확인합니다.

## 자주 발생하는 문제

### Flyway 로그가 전혀 없는 경우

`spring-boot-starter-flyway`와 PostgreSQL용 Flyway 모듈이 runtime classpath에 있는지 확인합니다.

### migration이 다시 실행되지 않는 경우

이미 성공한 버전은 재실행하지 않는 것이 정상입니다. `flyway_schema_history`를 확인합니다.

### checksum mismatch

적용된 migration 파일이 변경됐다는 뜻입니다. 이력을 임의로 수정하거나 repair하기 전에 Git diff와 적용 환경을 확인하고 다음 migration으로 변경할지 판단합니다.

### SQL 실패

Flyway 오류의 SQLSTATE, constraint 이름과 실패한 migration 버전을 확인합니다. 운영 DB의 적용 이력을 직접 삭제하지 않습니다.

## 완료 기준

- Flyway starter와 PostgreSQL 모듈 포함
- 빈 PostgreSQL의 V1·V2 적용 이력 성공
- `categories`, `posts`, PK·FK·UNIQUE·CHECK와 FK index 생성 확인
- `미분류`, 공개 Category와 기존 Markdown 글 seed 확인
- migration 변경 원칙 문서화

다음 단계: [개발 체크포인트의 JPA Blog 읽기 API](../development-roadmap.md#3-jpa-blog-읽기-api)
