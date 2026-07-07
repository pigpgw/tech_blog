# 블로그 공개 API 명세

## 공통 규칙

- Base URL: `/api`
- 응답 형식: JSON
- 공개 API는 인증이 필요 없다.
- 지원 method는 `GET`이다.
- 지원하지 않는 method는 `405 Method Not Allowed`를 반환한다.
- 서버 오류는 `500 Internal Server Error`를 반환한다.
- 상세 조회는 `id`만 사용한다.
- `slug` 상세 조회 API는 제공하지 않는다.
- `draft` 글은 공개 API 응답에서 제외한다.

## 공통 에러 응답

```json
{
  "message": "Error message"
}
```

## `GET /categories`

카테고리 목록을 조회한다.

### Request

```http
GET /api/categories
```

### Status Codes

| Status | Description             |
| ------ | ----------------------- |
| `200`  | 카테고리 목록 조회 성공 |
| `405`  | 지원하지 않는 method    |
| `500`  | 서버 오류               |

### Response `200 OK`

카테고리가 없으면 빈 배열을 반환한다.

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

### Response Fields

| Field      | Type             | Required | Description                  |
| ---------- | ---------------- | -------- | ---------------------------- |
| `id`       | `string`         | yes      | 카테고리 식별자              |
| `name`     | `string`         | yes      | 화면에 표시할 카테고리 이름  |
| `slug`     | `string`         | yes      | URL에 사용할 카테고리 문자열 |
| `parentId` | `string \| null` | yes      | 상위 카테고리 식별자         |
| `order`    | `number`         | yes      | 같은 부모 안에서의 정렬 순서 |

## `GET /posts`

공개 글 목록을 조회한다.
검색어, 카테고리, 페이지네이션 조건은 query string으로 전달한다.

### Request

```http
GET /api/posts
```

### Query Parameters

| Name         | Type       | Required | Description                              |
| ------------ | ---------- | -------- | ---------------------------------------- |
| `query`      | `string`   | no       | 검색어                                   |
| `categoryId` | `string[]` | no       | 카테고리 식별자. 여러 번 전달할 수 있다. |
| `page`       | `number`   | no       | 페이지 번호. 기본값은 `1`이다.           |
| `pageSize`   | `number`   | no       | 페이지당 글 수. 기본값은 `10`이다.       |

카테고리 필터 정책:

- `categoryId`는 카테고리 `id`를 받는다.
- `categoryId`는 여러 번 전달할 수 있다.
- 여러 `categoryId`는 OR 조건으로 조회한다.
- 부모 카테고리를 전달하면 해당 부모의 하위 카테고리 글도 포함한다.
- 예: `categoryId=ai`는 `ai`와 `ai/prompt-engineering`에 속한 글을 함께 조회한다.
- 존재하지 않는 `categoryId`가 전달되면 `400 Bad Request`를 반환한다.

### Request Examples

```http
GET /api/posts
GET /api/posts?query=react
GET /api/posts?categoryId=ai
GET /api/posts?categoryId=ai&categoryId=ai/prompt-engineering
GET /api/posts?categoryId=ai&query=prompt
GET /api/posts?page=1&pageSize=10
```

### Status Codes

| Status | Description                     |
| ------ | ------------------------------- |
| `200`  | 공개 글 목록 조회 성공          |
| `400`  | query parameter가 유효하지 않음 |
| `405`  | 지원하지 않는 method            |
| `500`  | 서버 오류                       |

### Response `200 OK`

빈 결과도 `200 OK`로 반환한다.

```json
{
  "items": [
    {
      "id": "1",
      "slug": "claude-prompt-engineering-guide",
      "title": "Claude Prompt Engineering 튜토리얼 정리: 좋은 요청은 어떻게 만드는가",
      "description": "Anthropic Prompt Engineering Interactive Tutorial을 공부하며 중요해 보였던 역할, 지시사항, 출력 형식, 예시, 근거, 도구 사용 내용을 정리합니다.",
      "publishedAt": "2026-05-22",
      "draft": false,
      "categoryId": "ai/prompt-engineering"
    }
  ],
  "page": 1,
  "pageSize": 10,
  "total": 1
}
```

빈 결과:

```json
{
  "items": [],
  "page": 1,
  "pageSize": 10,
  "total": 0
}
```

### Response Fields

| Field      | Type                | Required | Description            |
| ---------- | ------------------- | -------- | ---------------------- |
| `items`    | `BlogPostSummary[]` | yes      | 공개 글 요약 목록      |
| `page`     | `number`            | yes      | 현재 페이지 번호       |
| `pageSize` | `number`            | yes      | 페이지당 글 수         |
| `total`    | `number`            | yes      | 조건에 맞는 전체 글 수 |

### `items` Fields

| Field         | Type      | Required | Description                                             |
| ------------- | --------- | -------- | ------------------------------------------------------- |
| `id`          | `string`  | yes      | 글의 내부 식별자                                        |
| `slug`        | `string`  | yes      | 공개 URL 표시용 문자열. 상세 조회 키로 사용하지 않는다. |
| `title`       | `string`  | yes      | 글 제목                                                 |
| `description` | `string`  | yes      | 글 요약                                                 |
| `publishedAt` | `string`  | yes      | 공개일. `YYYY-MM-DD` 형식                               |
| `draft`       | `boolean` | yes      | 공개 API에서는 항상 `false`                             |
| `categoryId`  | `string`  | yes      | 글이 속한 카테고리 식별자                               |

### Error Response `400 Bad Request`

```json
{
  "message": "Invalid query parameter"
}
```

## `GET /posts/{id}`

공개 글 상세 정보를 조회한다.

### Request

```http
GET /api/posts/{id}
```

### Path Parameters

| Name | Type     | Required | Description      |
| ---- | -------- | -------- | ---------------- |
| `id` | `string` | yes      | 글의 내부 식별자 |

### Request Example

```http
GET /api/posts/1
```

### Status Codes

| Status | Description                    |
| ------ | ------------------------------ |
| `200`  | 공개 글 상세 조회 성공         |
| `400`  | path parameter가 유효하지 않음 |
| `404`  | id에 해당하는 공개 글이 없음   |
| `405`  | 지원하지 않는 method           |
| `500`  | 서버 오류                      |

### Response `200 OK`

```json
{
  "id": "1",
  "slug": "claude-prompt-engineering-guide",
  "title": "Claude Prompt Engineering 튜토리얼 정리: 좋은 요청은 어떻게 만드는가",
  "description": "Anthropic Prompt Engineering Interactive Tutorial을 공부하며 중요해 보였던 역할, 지시사항, 출력 형식, 예시, 근거, 도구 사용 내용을 정리합니다.",
  "publishedAt": "2026-05-22",
  "draft": false,
  "categoryId": "ai/prompt-engineering",
  "content": "Markdown 본문"
}
```

### Response Fields

| Field         | Type      | Required | Description                                             |
| ------------- | --------- | -------- | ------------------------------------------------------- |
| `id`          | `string`  | yes      | 글의 내부 식별자                                        |
| `slug`        | `string`  | yes      | 공개 URL 표시용 문자열. 상세 조회 키로 사용하지 않는다. |
| `title`       | `string`  | yes      | 글 제목                                                 |
| `description` | `string`  | yes      | 글 요약                                                 |
| `publishedAt` | `string`  | yes      | 공개일. `YYYY-MM-DD` 형식                               |
| `draft`       | `boolean` | yes      | 공개 API에서는 항상 `false`                             |
| `categoryId`  | `string`  | yes      | 글이 속한 카테고리 식별자                               |
| `content`     | `string`  | yes      | Markdown 본문                                           |

### Error Response `400 Bad Request`

```json
{
  "message": "Invalid path parameter"
}
```

### Error Response `404 Not Found`

```json
{
  "message": "Post not found"
}
```
