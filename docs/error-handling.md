# Frontend·Backend 오류 처리 설계

이 문서는 공개 Blog, Auth·Admin, Spring AI와 서비스 분리 단계에서 공통으로 사용할 오류 경계를 정의합니다. 에러 코드 목록은 [공통 에러 코드 계약](error-codes.md), API별 정상 응답은 [API 명세](api-spec.md), 구현 판단과 검증 항목은 [개발 체크포인트](development-roadmap.md)를 참고합니다.

## 공통 원칙

- 정상적인 빈 결과, 사용자 입력 오류, 인증·권한 오류, 외부 서비스 장애와 예상하지 못한 서버 오류를 구분합니다.
- Backend는 HTTP 상태 코드와 `{ "code": "...", "message": "..." }` JSON을 반환합니다.
- Frontend는 상태 코드에 따라 화면을 결정하고 Backend의 내부 예외명이나 stack trace에 의존하지 않습니다.
- 비밀번호, access·refresh token, Cookie, Authorization header, AI prompt 전체와 개인정보를 응답·로그에 남기지 않습니다.
- 같은 요청 ID를 응답 header와 Backend 로그에 남겨 사용자에게 내부 정보를 노출하지 않고 장애를 추적합니다.
- 재시도는 안전한 조회와 일시적인 장애에만 제한적으로 사용하고 쓰기 요청을 자동으로 반복하지 않습니다.

## 공통 오류 응답

```json
{
  "code": "COMMON_INTERNAL_ERROR",
  "message": "요청을 처리할 수 없습니다."
}
```

Backend는 `X-Request-Id` 응답 header를 함께 반환합니다. 운영 환경의 `message`에는 SQL, class명, 파일 경로, credential과 외부 모델 원문 오류를 포함하지 않습니다.
Frontend가 다른 Origin의 Backend 응답 header를 읽을 수 있도록 CORS의 `Access-Control-Expose-Headers`에 `X-Request-Id`를 포함합니다.

## Backend 처리 기준

### 상태 코드

| 상태                        | 사용 기준                             | 예시                                            |
| --------------------------- | ------------------------------------- | ----------------------------------------------- |
| `400 Bad Request`           | 형식·Validation·JSON 해석 실패        | 잘못된 slug, 빈 질문, 유효하지 않은 게시글 상태 |
| `401 Unauthorized`          | 인증 정보 없음·만료·검증 실패         | access token 없음, refresh token 재사용         |
| `403 Forbidden`             | 인증됐지만 권한 부족                  | USER의 관리자 API 접근                          |
| `404 Not Found`             | 요청한 공개 리소스가 없음             | 존재하지 않거나 비공개인 Post                   |
| `405 Method Not Allowed`    | 지원하지 않는 HTTP method             | 조회 API에 `POST` 요청                          |
| `409 Conflict`              | 현재 데이터와 충돌                    | email 또는 Post slug 중복                       |
| `429 Too Many Requests`     | 호출 제한 초과                        | 로그인·질문 API 제한 초과                       |
| `502 Bad Gateway`           | 외부 서비스가 유효하지 않은 응답 반환 | 모델 provider 응답 오류                         |
| `503 Service Unavailable`   | 의존 서비스가 일시적으로 사용 불가    | 3차 Context API 장애                            |
| `504 Gateway Timeout`       | 외부 서비스 호출 시간 초과            | 모델 또는 Context API timeout                   |
| `500 Internal Server Error` | 분류하지 못한 서버 오류               | 예상하지 못한 예외                              |

### Spring 구현 경계

```text
Controller Validation
→ Service 도메인 예외
→ GlobalExceptionHandler
→ HTTP 상태 + { "code": "...", "message": "..." }
```

- `GlobalExceptionHandler`가 Validation, 리소스 없음, 충돌과 예상하지 못한 예외를 일관된 응답으로 변환합니다.
- 도메인 예외는 HTTP 응답 객체를 직접 만들지 않고 의미만 표현합니다.
- PostgreSQL 제약조건 위반은 사용자에게 제약조건명이나 SQL을 노출하지 않고 `409` 또는 `400`으로 변환합니다.
- 예상하지 못한 예외는 요청 ID와 함께 서버에 기록하고 사용자에게 일반화된 `500` message만 반환합니다.
- AOP는 요청 ID·Service 실행시간·예외 위치만 기록하며 오류 응답을 결정하지 않습니다.

## Frontend 처리 기준

### 데이터 접근 경계

`frontend/src/services`에서 HTTP 실패를 공통 `ApiError`로 변환합니다.

```text
ApiError
├─ status: HTTP 상태 또는 네트워크 오류 구분값
├─ code: 공통 에러 코드
├─ message: 사용자에게 표시 가능한 message
└─ requestId: X-Request-Id 값, 없으면 null
```

Backend 응답을 JSON으로 해석할 수 없거나 네트워크 연결 자체가 실패하면 Frontend의 일반 message를 사용합니다. 화면 component가 `fetch` 응답과 Backend 오류 형식을 직접 해석하지 않습니다.

### 화면 상태

| 상황                     | Frontend 처리                                                                                            |
| ------------------------ | -------------------------------------------------------------------------------------------------------- |
| 빈 목록                  | 오류가 아닌 empty state 표시                                                                             |
| 공개 상세 `404`          | App Router `notFound()`와 기존 not-found 화면 사용                                                       |
| 목록·상세 네트워크/`5xx` | route `error.tsx` 또는 해당 영역 오류 UI와 수동 재시도 제공                                              |
| 입력 `400`               | 회원가입·로그인·관리자 입력값을 유지하고 form 가까이에 message 표시                                      |
| 인증 `401`               | `AUTH_ACCESS_TOKEN_EXPIRED`일 때만 refresh를 한 번 시도하고 실패하면 로그인 상태 정리 후 로그인으로 이동 |
| 권한 `403`               | 로그인 화면으로 보내지 않고 권한 부족 안내 표시                                                          |
| 충돌 `409`               | 작성값을 유지하고 중복 email·slug message 표시                                                           |
| 호출 제한 `429`          | 즉시 반복하지 않고 잠시 후 재시도 안내                                                                   |
| AI `502`·`503`·`504`     | 질문 영역만 오류 처리하고 Blog 본문은 유지                                                               |

- loading, empty, not-found와 error 상태를 서로 구분합니다.
- 자동 refresh가 다시 `401`이면 반복 호출하지 않습니다.
- 관리자 생성·수정·삭제 요청은 사용자가 명시적으로 다시 실행할 때만 재시도합니다.
- 사용자에게 request ID를 복사할 수 있게 제공할 수 있지만 stack trace와 내부 URL은 표시하지 않습니다.

### Auth·Admin 화면별 처리

| 화면                | 예상 오류                                                        | 처리 기준                                                        |
| ------------------- | ---------------------------------------------------------------- | ---------------------------------------------------------------- |
| `/signup`           | Frontend password confirmation 불일치                            | 요청을 보내지 않고 password 입력 가까이에 안내                   |
| `/signup`           | `AUTH_INVALID_REQUEST`                                           | 입력값을 유지하고 잘못된 항목을 확인하도록 안내                  |
| `/signup`           | `USER_EMAIL_CONFLICT`                                            | email 입력값을 유지하고 중복 안내                                |
| `/signup`           | `AUTH_EMAIL_DELIVERY_ERROR`                                      | 가입 상태를 안내하고 인증 메일 수동 재발송 경로 제공             |
| `/signup`           | `COMMON_NETWORK_ERROR`·`5xx`                                     | 비밀번호를 로그나 저장소에 남기지 않고 수동 재시도 제공          |
| `/verify-email`     | `AUTH_EMAIL_VERIFICATION_INVALID`                                | 잘못된 link 안내와 재발송 경로 제공                              |
| `/verify-email`     | `AUTH_EMAIL_VERIFICATION_EXPIRED`·`AUTH_EMAIL_VERIFICATION_USED` | 만료·사용 완료를 구분하고 재발송 경로 제공                       |
| `/verify-email`     | `AUTH_EMAIL_VERIFICATION_RATE_LIMITED`                           | 자동 반복 없이 잠시 후 재발송하도록 안내                         |
| `/login`            | `AUTH_INVALID_CREDENTIALS`                                       | email 존재 여부를 구분하지 않는 동일한 안내                      |
| `/login`            | `AUTH_EMAIL_NOT_VERIFIED`                                        | 이메일 확인 안내와 재발송 동작 제공                              |
| `/login`            | `AUTH_RATE_LIMITED`                                              | 자동 재시도 없이 잠시 후 다시 시도하도록 안내                    |
| `/login`            | `COMMON_NETWORK_ERROR`·`5xx`                                     | 입력값을 유지하되 비밀번호를 영구 저장하지 않고 수동 재시도 제공 |
| `/admin/categories` | `CATEGORY_PATH_CONFLICT`                                         | 입력값과 부모 선택을 유지하고 중복 경로 안내                     |
| `/admin/categories` | `CATEGORY_REPLACEMENT_REQUIRED`·`CATEGORY_INVALID_REPLACEMENT`   | 삭제 dialog를 유지하고 올바른 이동 대상 선택 요구                |
| `/admin/categories` | `CATEGORY_HAS_CHILDREN`·`CATEGORY_PROTECTED`                     | 하위 Category 정리 또는 삭제 불가 이유 안내                      |
| `/admin/categories` | `CATEGORY_NOT_FOUND`·`COMMON_NETWORK_ERROR`·`5xx`                | 목록을 다시 확인하게 하고 쓰기 요청은 자동 재시도하지 않음       |
| `/admin/posts/**`   | `AUTH_ACCESS_DENIED`                                             | 로그인 화면으로 보내지 않고 권한 부족 안내                       |
| `/admin/posts/**`   | `POST_SLUG_CONFLICT`·`CATEGORY_NOT_FOUND`                        | 작성 중인 제목·본문을 유지하고 form 가까이에 안내                |
| `/admin/posts/**`   | `COMMON_NETWORK_ERROR`·`5xx`                                     | 작성 내용을 유지하고 쓰기 요청은 사용자가 다시 실행              |

예상 가능한 form 오류는 route `error.tsx`로 던지지 않고 해당 form에서 처리합니다. 렌더링 중 예상하지 못한 오류와 페이지 단위 조회 실패만 route error boundary에서 처리합니다. 비밀번호는 오류 복구를 위해 `localStorage`, URL 또는 로그에 저장하지 않습니다. 이메일 link의 token은 처리 직후 URL에서 제거하고 analytics·로그·브라우저 저장소에 남기지 않습니다.

## 단계별 적용

### 1차 Blog

- Backend: Validation `400`, 공개 Post `404`, 예상하지 못한 오류 `500`
- Frontend: 목록 empty/error, 상세 not-found/error와 네트워크 실패
- 검증: 정상·빈 목록·잘못된 slug·없는 글·Backend 중단 사례

### 2차 Auth·Admin·Spring AI

- Auth: `401`, `403`, `409`, `429`와 refresh 1회 제한
- Signup: password confirmation은 Frontend에서 확인하고 중복 email·Validation·네트워크 오류에서 입력값 유지
- Login: credential 오류와 Backend 장애를 구분하고 비밀번호를 영구 저장하지 않음
- Admin: 입력 보존, Category 이동·삭제 확인, slug/path 충돌과 쓰기 요청 수동 재시도
- AI: 질문 영역만 `400`, `429`, `502`, `504` 처리

### 3차 AI Service

- `ai-service`는 Backend Context API 장애와 모델 장애를 구분합니다.
- Context API 사용 불가에는 `503`, timeout에는 `504`를 반환합니다.
- 서비스 간 내부 오류 원문은 외부 응답으로 전달하지 않고 요청 ID로 두 서비스 로그를 연결합니다.
- AI 장애 중에도 공개 Blog·로그인·관리자 기능은 정상 동작해야 합니다.

## 검증 기준

- Backend API 통합 테스트에서 상태 코드와 `{ "code": "...", "message": "..." }`를 함께 확인합니다.
- Frontend 테스트에서 상태별 UI, 입력 보존, refresh 1회 제한과 수동 재시도를 확인합니다.
- 운영과 같은 CORS·Cookie 설정에서 `401`과 네트워크 오류를 구분합니다.
- 로그에서 token, Cookie, password, 본문 전체와 개인정보가 제외되는지 확인합니다.
- 실제 실행하지 않은 장애·복구 시나리오는 완료로 표시하지 않습니다.
