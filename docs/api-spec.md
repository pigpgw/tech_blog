# 기술 블로그 API 명세

이 문서는 기존 Next.js 화면과 타입을 유지하면서 Spring Boot Backend로 전환할 때 사용할 공개 Blog API 계약과 후속 인증·관리자 API 경계를 정의합니다.

## 단계별 적용

| 개발 단계         | API 범위                                                      | 상세 문서                                                           |
| ----------------- | ------------------------------------------------------------- | ------------------------------------------------------------------- |
| 1차 Blog          | 공개 Category·Post 목록·상세                                  | [1차 Blog 아키텍처](architecture/phase-1-blog.md)                   |
| 2차 Auth·Admin·AI | 이메일 인증, 관리자 Post 관리, 인증 사용자 글 질문            | [2차 Auth·Admin·AI 아키텍처](architecture/phase-2-auth-admin-ai.md) |
| 3차 AI 분리       | 외부 질문 API 계약은 유지하고 처리 주체만 `ai-service`로 이동 | [3차 AI Service 아키텍처](architecture/phase-3-ai-service.md)       |

3차의 보호된 Context API는 `backend`와 `ai-service` 사이의 내부 계약입니다. 서비스 분리가 실제로 결정될 때 별도 내부 명세를 확정하며, 현재 공개 API로 노출하지 않습니다.

## 공통 규칙

- 1·2차 Base URL: 환경별 Backend URL + `/api`
- 3차 Base URL: Blog·Auth·Admin은 Backend URL + `/api`, 질문 API는 `ai-service` URL + `/api`
- 응답 형식: JSON
- 공개 Blog 조회는 인증이 필요 없습니다.
- 공개 글은 PostgreSQL의 `status=PUBLISHED`인 글만 반환합니다.
- 날짜는 ISO 8601 문자열로 반환합니다.
- 지원하지 않는 method는 `405 Method Not Allowed`를 반환합니다.
- 예상하지 못한 서버 오류는 `500 Internal Server Error`를 반환합니다.

## 공통 에러 응답

상태 코드별 Backend 변환과 Frontend 화면 처리는 [Frontend·Backend 오류 처리 설계](error-handling.md)를 따릅니다.

```json
{
  "code": "POST_NOT_FOUND",
  "message": "게시글을 찾을 수 없습니다."
}
```

Frontend가 분기에 사용하는 전체 code는 [공통 에러 코드 계약](error-codes.md)을 따릅니다.

## Frontend 호환 필드

| API 필드      | Backend 원본         | 설명                                              |
| ------------- | -------------------- | ------------------------------------------------- |
| `id`          | `posts.id`           | `BIGINT` 내부 PK를 기존 타입에 맞춘 문자열로 변환 |
| `slug`        | `posts.slug`         | 공개 URL과 상세 조회 키                           |
| `description` | `posts.description`  | 글 요약                                           |
| `publishedAt` | `posts.published_at` | `Asia/Seoul` 기준 `YYYY-MM-DD` 공개일             |
| `draft`       | `posts.status`       | 공개 응답에서는 항상 `false`                      |
| `categoryId`  | `categories.path`    | Category JOIN으로 얻은 기존 카테고리 경로 문자열  |
| `content`     | `posts.content`      | Markdown 본문, 상세에만 포함                      |

## `GET /categories`

기존 카테고리 경로와 표시 순서를 유지할 카테고리 목록을 조회합니다.

### Request

```http
GET /api/categories
```

### Response `200 OK`

```json
[
  {
    "id": "ai",
    "name": "AI",
    "slug": "ai",
    "parentId": null,
    "order": 1
  },
  {
    "id": "ai/prompt-engineering",
    "name": "Prompt Engineering",
    "slug": "prompt-engineering",
    "parentId": "ai",
    "order": 1
  }
]
```

`id`와 `parentId`는 DB 숫자 PK가 아니라 기존 Frontend와 URL에서 사용하는 `categories.path`입니다. DB PK는 API 외부에 노출하지 않아도 됩니다.
Category `order`는 DB의 `sort_order`를 변환한 값입니다. 테이블 관계와 제약조건은 [기술 블로그 데이터베이스 설계](database-design.md)를 따릅니다.

### Status Codes

| Status | Description             |
| ------ | ----------------------- |
| `200`  | 카테고리 목록 조회 성공 |
| `405`  | 지원하지 않는 method    |
| `500`  | 서버 오류               |

## `GET /posts`

공개 글 요약 목록을 최신순으로 조회합니다. 첫 Backend 전환에서는 현재 Frontend 호환을 위해 전체 공개 목록을 반환하고, 검색과 카테고리 필터는 Frontend에서 유지합니다.

### Request

```http
GET /api/posts
```

### Response `200 OK`

```json
{
  "items": [
    {
      "id": "1",
      "slug": "claude-prompt-engineering-guide",
      "title": "Claude Prompt Engineering 튜토리얼 정리: 좋은 요청은 어떻게 만드는가",
      "description": "글 요약",
      "publishedAt": "2026-05-22",
      "draft": false,
      "categoryId": "ai/prompt-engineering"
    }
  ],
  "page": 1,
  "pageSize": 1,
  "total": 1
}
```

초기 단계의 `page`, `pageSize`, `total`은 기존 응답 모양을 보존하기 위한 값입니다. 실제 서버 pagination이 필요해질 때 query parameter와 경계 조건을 별도 결정합니다.

빈 결과도 `200 OK`와 빈 `items`를 반환합니다.

### Status Codes

| Status | Description            |
| ------ | ---------------------- |
| `200`  | 공개 글 목록 조회 성공 |
| `405`  | 지원하지 않는 method   |
| `500`  | 서버 오류              |

## `GET /posts/{slug}`

공개 URL과 같은 slug로 글 상세를 조회합니다.

### Request

```http
GET /api/posts/claude-prompt-engineering-guide
```

### Response `200 OK`

```json
{
  "id": "1",
  "slug": "claude-prompt-engineering-guide",
  "title": "Claude Prompt Engineering 튜토리얼 정리: 좋은 요청은 어떻게 만드는가",
  "description": "글 요약",
  "publishedAt": "2026-05-22",
  "draft": false,
  "categoryId": "ai/prompt-engineering",
  "content": "Markdown 본문"
}
```

### Status Codes

| Status | Description               |
| ------ | ------------------------- |
| `200`  | 공개 글 상세 조회 성공    |
| `400`  | slug 형식이 유효하지 않음 |
| `404`  | 공개된 글이 없음          |
| `405`  | 지원하지 않는 method      |
| `500`  | 서버 오류                 |

## 후속 인증 API

로그인·JWT 단계에서 구현합니다. 공개 Blog 조회에는 인증이 필요 없고 글 질문 API는 이메일 인증을 완료한 로그인 사용자만 사용합니다. 일반 회원가입은 항상 `PENDING` 상태의 `USER`이며 관리자 계정은 서버 측 일회성 bootstrap으로만 생성합니다.

### 공통 인증 응답

로그인과 refresh 성공 시 access token은 JSON으로 반환하고 refresh token은 Cookie로만 전달합니다.

```json
{
  "accessToken": "jwt-access-token",
  "tokenType": "Bearer",
  "expiresIn": 900,
  "user": {
    "id": "1",
    "email": "user@example.com",
    "role": "USER",
    "status": "ACTIVE"
  }
}
```

`expiresIn`은 초 단위이며 실제 값은 보안 설정에서 확정합니다. refresh token은 원문을 응답 body에 넣지 않고 `HttpOnly`, 운영 `Secure`, `SameSite=Lax`, 인증 경로로 제한한 Cookie로 전달합니다.

### `POST /auth/signup`

```json
{
  "email": "user@example.com",
  "password": "user-password"
}
```

- 성공: `201 Created`, `status=PENDING`인 비밀번호 없는 User 응답과 인증 메일 발송
- 중복 email: `409 Conflict`
- role이 요청에 포함되어도 저장하지 않으며 항상 `USER`로 생성

### `POST /auth/email-verifications/confirm`

Frontend `/verify-email?token=...`이 URL의 일회용 token을 읽어 다음 body로 전달합니다.

```json
{
  "token": "one-time-email-verification-token"
}
```

- 성공: User를 `ACTIVE`로 전환하고 `204 No Content`
- 변조 token: `400 Bad Request`
- 만료·이미 사용한 token: `410 Gone`
- Frontend는 처리 직후 history replace로 URL에서 token을 제거하고 저장소·로그에 남기지 않음

### `POST /auth/email-verifications/resend`

```json
{
  "email": "user@example.com"
}
```

- 존재 여부를 노출하지 않도록 항상 일반화된 `202 Accepted`
- 실제 미인증 User가 있으면 새 일회용 token을 발급하고 이전 token 대신 최신 token만 인정
- 재발송 호출 제한 초과: `429 Too Many Requests`

### `POST /auth/login`

```json
{
  "email": "user@example.com",
  "password": "user-password"
}
```

- 성공: `200 OK`, 공통 인증 응답과 refresh token Cookie
- 잘못된 credential 또는 `SUSPENDED` 사용자: 계정 존재 여부를 구분하지 않는 `401 Unauthorized`
- 이메일 미인증 사용자: `403 Forbidden`과 `AUTH_EMAIL_NOT_VERIFIED`

### `POST /auth/refresh`

- Request: refresh token Cookie와 허용된 Origin
- 성공: 기존 token을 폐기하고 같은 family의 새 refresh token으로 회전한 뒤 `200 OK`
- 만료·폐기·재사용 token: 해당 family를 폐기하고 `401 Unauthorized`

### `POST /auth/logout`

- Request: refresh token Cookie와 허용된 Origin
- 성공: 저장된 token 폐기, Cookie 만료와 `204 No Content`
- 이미 폐기된 token이어도 안전하게 반복 호출할 수 있도록 `204 No Content`

### `GET /users/me`

```http
GET /api/users/me
Authorization: Bearer <access-token>
```

- 성공: `200 OK`와 비밀번호가 없는 User 응답
- token 없음·만료·서명 실패: `401 Unauthorized`

### 인증 경로 요약

- `POST /api/auth/signup`: 항상 `USER`로 회원가입
- `POST /api/auth/email-verifications/confirm`: 일회용 token 확인과 User 활성화
- `POST /api/auth/email-verifications/resend`: 인증 메일 재발송 요청
- `POST /api/auth/login`: access token 응답과 refresh token Cookie 발급
- `POST /api/auth/refresh`: refresh token 회전 후 새 access token 발급
- `POST /api/auth/logout`: 저장된 refresh token 폐기와 Cookie 만료
- `GET /api/users/me`: 로그인한 사용자 정보 조회

access token은 짧은 RSA 서명 JWT와 Bearer header를 사용합니다. DB에는 refresh token 원문이 아니라 hash만 저장하며 비밀번호, token과 Cookie를 로그에 남기지 않습니다.

## 후속 관리자 카테고리 API

다음 경로는 모두 `ADMIN` role과 유효한 access token이 필요합니다.

- `GET /api/admin/categories`: 내부 id와 계층을 포함한 관리자용 Category 목록
- `POST /api/admin/categories`: Category 생성
- `DELETE /api/admin/categories/{id}?replacementCategoryId={replacementCategoryId}`: 연결된 Post를 이동한 뒤 Category 삭제

### 관리자 Category 생성 요청

```json
{
  "name": "JPA",
  "slug": "jpa",
  "parentId": "2"
}
```

- 최상위 Category의 `parentId`는 `null`
- Frontend는 `path`를 요청값으로 보내지 않고 부모 선택 결과로 완성될 공개 URL만 미리보기
- Backend는 생성 트랜잭션에서 부모를 조회한 뒤 INSERT 직전에 부모 path와 slug를 조합해 최종 path 생성
- 부모가 없으면 `path=slug`, 부모가 있으면 `path={parent.path}/{slug}`
- 존재하지 않는 부모나 누락된 상위 Category는 자동 생성하지 않음

### 관리자 Category 생성 응답 `201 Created`

```json
{
  "id": "3",
  "name": "JPA",
  "slug": "jpa",
  "path": "backend/spring/jpa",
  "parentId": "2",
  "order": 1
}
```

`id`와 `parentId`는 관리자 API에서 관계 선택에 사용하는 DB 식별자의 문자열 표현입니다. 공개 `GET /api/categories`의 `id`와 `parentId`는 기존 Frontend 계약을 위해 Category path를 사용합니다.

| Status | Description                             |
| ------ | --------------------------------------- |
| `201`  | Category 생성 성공                      |
| `400`  | 이름·slug·parentId 형식이 유효하지 않음 |
| `401`  | 인증되지 않음                           |
| `403`  | 로그인했지만 ADMIN이 아님               |
| `404`  | 부모 Category가 없음                    |
| `409`  | slug 조합으로 생성한 path가 중복됨      |

### 관리자 Category 삭제

```http
DELETE /api/admin/categories/3?replacementCategoryId=1
```

- 관리자 화면은 직접 연결된 Post 수와 이동 대상 Category를 표시하고 `미분류`를 기본 선택값으로 제공
- 연결된 Post가 있으면 `replacementCategoryId` 필수
- Backend는 하나의 트랜잭션에서 연결된 Post의 `category_id`를 이동 대상으로 변경한 후 기존 Category 삭제
- 연결된 Post가 없어도 하위 Category가 존재하면 삭제 거부
- `미분류` Category는 삭제 거부
- Category 삭제가 Post 삭제로 전파되지 않으며 `category_id`를 `NULL`로 변경하지 않음

성공하면 `204 No Content`를 반환합니다.

| Status | Description                                          |
| ------ | ---------------------------------------------------- |
| `204`  | Post 이동과 Category 삭제 성공                       |
| `400`  | 이동 대상이 필요하거나 삭제 대상과 이동 대상이 같음  |
| `401`  | 인증되지 않음                                        |
| `403`  | 로그인했지만 ADMIN이 아님                            |
| `404`  | 삭제 대상 또는 이동 대상 Category가 없음             |
| `409`  | 하위 Category가 있거나 보호된 `미분류` 삭제를 요청함 |

Category slug·부모 변경 API는 하위 path 일괄 변경 정책을 결정한 뒤 추가합니다.

## 후속 관리자 게시글 API

다음 경로는 모두 `ADMIN` role과 유효한 access token이 필요합니다.

- `GET /api/admin/posts`: 임시 저장 글을 포함한 관리자용 목록
- `GET /api/admin/posts/{id}`: 관리자용 게시글 상세
- `POST /api/admin/posts`: Markdown 게시글 생성
- `PUT /api/admin/posts/{id}`: 제목, slug, Category, 본문과 공개 상태 수정
- `DELETE /api/admin/posts/{id}`: 게시글 삭제

관리자 API의 `{id}`는 slug 변경과 무관한 내부 Post id를 문자열로 사용합니다.

### 관리자 Post 저장 요청

`POST`와 `PUT`은 같은 필드를 사용하고 `PUT`은 전체 값을 교체합니다.

```json
{
  "title": "Spring Boot Backend 시작하기",
  "slug": "spring-boot-backend-start",
  "description": "Spring Boot 초기 설정 과정",
  "content": "# Markdown 본문",
  "categoryId": "backend/spring",
  "status": "DRAFT",
  "publishedAt": null
}
```

- `status`: `DRAFT` 또는 `PUBLISHED`
- `PUBLISHED`이면 `publishedAt` 필수
- 요청 body의 `id`, `createdBy`, role은 무시하거나 validation 오류로 거부
- 생성 시 `created_by`에는 인증된 ADMIN의 User id 기록

### 관리자 Post 응답

```json
{
  "id": "1",
  "title": "Spring Boot Backend 시작하기",
  "slug": "spring-boot-backend-start",
  "description": "Spring Boot 초기 설정 과정",
  "content": "# Markdown 본문",
  "categoryId": "backend/spring",
  "status": "DRAFT",
  "publishedAt": null,
  "createdBy": "1",
  "createdAt": "2026-08-29T10:00:00Z",
  "updatedAt": "2026-08-29T10:00:00Z"
}
```

### 관리자 API 상태 코드

| Status | Description                                 |
| ------ | ------------------------------------------- |
| `200`  | 목록·상세·수정 성공                         |
| `201`  | 생성 성공                                   |
| `204`  | 삭제 성공                                   |
| `400`  | 요청값, slug 또는 공개 상태가 유효하지 않음 |
| `401`  | 인증되지 않음                               |
| `403`  | 로그인했지만 ADMIN이 아님                   |
| `404`  | Post 또는 Category가 없음                   |
| `409`  | slug 중복                                   |

공개 API는 관리자 기능과 관계없이 기존처럼 `PUBLISHED` 글만 반환합니다. 관리자 목록은 `DRAFT`, `PUBLISHED`를 모두 반환하며 실제 pagination은 글이 늘어난 뒤 추가합니다.

## 후속 AI API

단일 Backend에서 Spring AI를 구현할 때 다음 경로를 추가합니다.

```http
POST /api/posts/{slug}/questions
Authorization: Bearer <access-token>
Content-Type: application/json

{
  "question": "이 글에서 좋은 프롬프트의 핵심은 무엇인가요?"
}
```

이 API는 이메일 인증을 완료한 로그인 사용자만 사용하고, 해당 글의 title·description·content만 Context로 전달합니다. 세부 응답과 오류 계약은 Spring AI 단계에서 테스트 사례와 함께 확정합니다.

## 현재 제외

- 서버 검색과 실제 pagination
- Tag API
- Supabase API
- 서비스 분리 전 내부 Context API
