# 블로그 공개 API 명세

이 문서는 기존 Next.js 화면과 타입을 유지하면서 Spring Boot Backend로 전환할 때 사용할 최소 공개 API 계약입니다.

## 공통 규칙

- Base URL: 환경별 Backend URL + `/api`
- 응답 형식: JSON
- 공개 Blog 조회는 인증이 필요 없습니다.
- 공개 글은 PostgreSQL의 `status=PUBLISHED`인 글만 반환합니다.
- 날짜는 ISO 8601 문자열로 반환합니다.
- 지원하지 않는 method는 `405 Method Not Allowed`를 반환합니다.
- 예상하지 못한 서버 오류는 `500 Internal Server Error`를 반환합니다.

## 공통 에러 응답

```json
{
  "message": "Error message"
}
```

## Frontend 호환 필드

| API 필드 | Backend 원본 | 설명 |
| --- | --- | --- |
| `id` | `posts.id` | 기존 타입에 맞춘 문자열 |
| `slug` | `posts.slug` | 공개 URL과 상세 조회 키 |
| `description` | `posts.description` | 글 요약 |
| `publishedAt` | `posts.published_at` | 공개일 |
| `draft` | `posts.status` | 공개 응답에서는 항상 `false` |
| `categoryId` | `categories.path` | 기존 카테고리 경로 문자열 |
| `content` | `posts.content` | Markdown 본문, 상세에만 포함 |

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

### Status Codes

| Status | Description |
| --- | --- |
| `200` | 카테고리 목록 조회 성공 |
| `405` | 지원하지 않는 method |
| `500` | 서버 오류 |

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

| Status | Description |
| --- | --- |
| `200` | 공개 글 목록 조회 성공 |
| `405` | 지원하지 않는 method |
| `500` | 서버 오류 |

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

| Status | Description |
| --- | --- |
| `200` | 공개 글 상세 조회 성공 |
| `400` | slug 형식이 유효하지 않음 |
| `404` | 공개된 글이 없음 |
| `405` | 지원하지 않는 method |
| `500` | 서버 오류 |

## 후속 인증 API

로그인·JWT 단계에서 다음 경로를 구현합니다.

- `POST /api/auth/signup`: 항상 `USER`로 회원가입
- `POST /api/auth/login`: access token 응답과 refresh token Cookie 발급
- `POST /api/auth/refresh`: refresh token 회전 후 새 access token 발급
- `POST /api/auth/logout`: 저장된 refresh token 폐기와 Cookie 만료
- `GET /api/users/me`: 로그인한 사용자 정보 조회

공개 Blog 조회에는 인증이 필요 없고 글 질문 API는 로그인 사용자만 사용합니다. `/api/admin/**`는 `ADMIN`만 허용하지만 관리자 CRUD API와 화면은 현재 범위에 포함하지 않습니다.

access token은 짧은 RSA 서명 JWT와 Bearer header를 사용합니다. refresh token은 hash로 저장하고 `HttpOnly`, `Secure`, `SameSite=Lax` Cookie로 전달하며 재발급 때 회전합니다. 상세 request·response 필드는 인증 구현 단계에서 Entity를 노출하지 않는 DTO와 테스트 사례를 기준으로 확정합니다.

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

이 API는 로그인 사용자만 사용하고, 해당 글의 title·description·content만 Context로 전달합니다. 세부 응답과 오류 계약은 Spring AI 단계에서 테스트 사례와 함께 확정합니다.

## 현재 제외

- 관리자 CRUD API
- 서버 검색과 실제 pagination
- Tag API
- Supabase API
- 서비스 분리 전 내부 Context API
