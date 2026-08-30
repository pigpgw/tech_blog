# Backend 초기 세팅

## 목적

Java 21, Spring Boot와 Gradle Wrapper로 독립 실행 가능한 최소 Backend를 구성하고 각 설정의 역할을 확인합니다.

## 언제 보는가

- Spring Initializr 항목을 다시 확인할 때
- 새 컴퓨터에서 Backend 빌드 환경을 확인할 때
- Gradle Wrapper, package와 main class 기준을 찾을 때

새 팀원이 기존 프로젝트를 실행하기만 한다면 [빠른 시작](README.md#빠른-시작)을 먼저 사용합니다.

## 선수조건

- Java 21
- 저장소의 `backend/` 디렉터리

```bash
java --version
cd backend
./gradlew --version
```

두 명령에서 Java 21이 확인되어야 합니다.

## Spring Initializr 기준

프로젝트를 처음 만들 때 사용한 기준입니다.

| 항목      | 값                    |
| --------- | --------------------- |
| Project   | Gradle - Groovy       |
| Language  | Java                  |
| Group     | `com.pigpgw`          |
| Artifact  | `techblog`            |
| Name      | `techblog`            |
| Package   | `com.pigpgw.techblog` |
| Packaging | Jar                   |
| Java      | 21                    |

초기 의존성은 Web MVC, Validation과 Actuator만 선택했습니다. PostgreSQL과 Flyway 의존성은 Database 접속 정보를 준비한 뒤 별도 단계에서 추가했습니다.

## 핵심 파일

```text
backend/
├─ build.gradle
├─ settings.gradle
├─ gradlew
├─ gradlew.bat
├─ gradle/wrapper/
└─ src/
   ├─ main/java/com/pigpgw/techblog/TechBlogApplication.java
   ├─ main/resources/application.properties
   └─ test/java/com/pigpgw/techblog/TechBlogApplicationTests.java
```

- `build.gradle`: plugin, Java version과 의존성
- `settings.gradle`: Gradle project 이름
- `gradlew`, `gradle/wrapper`: 팀원이 같은 Gradle 기준으로 실행하는 Wrapper
- `TechBlogApplication`: Spring Boot 시작점
- `application.properties`: 애플리케이션과 외부 설정 연결

Gradle을 시스템에 별도로 설치하지 않고 Wrapper인 `./gradlew`를 사용합니다.

## 현재 package 기준

최상위 package는 `com.pigpgw.techblog`로 고정합니다. 기능 구현은 `post`, `category`, 이후 `auth`, `user`, `token`, `ai`처럼 도메인별로 나눕니다.

```text
com.pigpgw.techblog
├─ TechBlogApplication
├─ category
├─ post
└─ common
```

초기 세팅 단계에서는 미래 package를 미리 만들지 않습니다.

## 실행과 확인

Database 의존성을 추가하기 전의 최소 확인은 다음과 같습니다.

```bash
cd backend
./gradlew compileJava
./gradlew test
./gradlew bootRun
```

현재 프로젝트는 PostgreSQL 의존성이 있으므로 실제 실행에는 [로컬 Database 세팅](database.md)과 [Backend–Database 연결](backend-database.md)이 먼저 필요합니다.

정상 실행 로그:

```text
Tomcat started on port 8080
Started TechBlogApplication
```

## 자주 발생하는 문제

### Java 버전이 21이 아닌 경우

```bash
./gradlew --version
```

Gradle이 사용하는 JVM을 확인하고 IDE와 터미널의 JDK를 모두 Java 21로 맞춥니다.

### `gradlew` 실행 권한 오류

Git에서 실행 권한이 보존되어야 합니다. 파일을 새로 생성해 대체하지 말고 현재 Git 상태를 먼저 확인합니다.

### main class 이름이 다른 경우

main class와 test의 import·참조를 함께 확인합니다. 이 프로젝트의 기준 이름은 `TechBlogApplication`입니다.

## 완료 기준

- Java 21과 Gradle Wrapper 버전을 확인함
- `com.pigpgw.techblog.TechBlogApplication`이 main class임
- `compileJava`와 test가 성공함
- 최소 Backend 실행 구조를 설명할 수 있음

다음 단계: [로컬 Database 세팅](database.md)
