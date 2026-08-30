# 공통 에러 코드 계약

이 문서는 Frontend와 Backend가 함께 사용하는 에러 코드의 단일 기준입니다. HTTP 상태는 오류의 큰 범주를 표현하고 `code`는 Frontend가 처리할 구체적인 이유를 표현합니다.

## 응답 형식

```json
{
  "code": "POST_NOT_FOUND",
  "message": "게시글을 찾을 수 없습니다."
}
```

- `code`: 변경하지 않고 유지하는 대문자 `UPPER_SNAKE_CASE` 식별자
- `message`: 사용자에게 표시할 수 있는 한국어 설명
- `X-Request-Id`: 응답 body가 아닌 header로 전달하는 로그 추적값

Frontend는 `message` 문자열을 조건문에서 비교하지 않고 `code`로 분기합니다. Backend는 내부 class명, SQL, stack trace, credential과 외부 서비스 오류 원문을 `message`에 포함하지 않습니다.

## 네이밍 규칙

- 도메인이 분명하면 `도메인_이유` 순서를 사용합니다.
- 같은 의미의 코드를 HTTP method별로 중복 생성하지 않습니다.
- 화면 문구가 달라져도 의미가 같으면 기존 `code`를 유지합니다.
- 새 코드는 실제 Frontend 분기, 테스트 또는 운영 추적 필요가 있을 때만 추가합니다.

예시:

```text
POST_NOT_FOUND
AUTH_ACCESS_TOKEN_EXPIRED
AI_PROVIDER_ERROR
```

## 1차 Blog

| HTTP 상태 | Code                        | 사용 기준                                            |
| --------- | --------------------------- | ---------------------------------------------------- |
| `400`     | `COMMON_INVALID_REQUEST`    | JSON, query parameter 또는 요청 형식이 유효하지 않음 |
| `400`     | `POST_INVALID_SLUG`         | Post slug 형식이 유효하지 않음                       |
| `404`     | `POST_NOT_FOUND`            | 공개된 Post를 찾을 수 없음                           |
| `405`     | `COMMON_METHOD_NOT_ALLOWED` | 지원하지 않는 HTTP method                            |
| `500`     | `COMMON_INTERNAL_ERROR`     | 분류하지 못한 Backend 오류                           |
| 응답 없음 | `COMMON_NETWORK_ERROR`      | Frontend에서 네트워크 연결 자체가 실패함             |
| 해석 불가 | `COMMON_UNKNOWN_ERROR`      | Frontend가 알 수 없는 code 또는 응답 형식을 받음     |

## 2차 Auth·Admin

| HTTP 상태 | Code                                   | 사용 기준                               |
| --------- | -------------------------------------- | --------------------------------------- |
| `400`     | `AUTH_INVALID_REQUEST`                 | email·password 등 인증 요청 형식 오류   |
| `401`     | `AUTH_INVALID_CREDENTIALS`             | 로그인 정보가 올바르지 않음             |
| `401`     | `AUTH_TOKEN_MISSING`                   | 필요한 access·refresh token이 없음      |
| `401`     | `AUTH_ACCESS_TOKEN_EXPIRED`            | access token이 만료됨                   |
| `401`     | `AUTH_REFRESH_TOKEN_EXPIRED`           | refresh token이 만료됨                  |
| `401`     | `AUTH_TOKEN_INVALID`                   | 서명·issuer·audience 등 token 검증 실패 |
| `401`     | `AUTH_REFRESH_TOKEN_REUSED`            | 폐기된 refresh token 재사용 감지        |
| `403`     | `AUTH_EMAIL_NOT_VERIFIED`              | 이메일 인증을 완료하지 않은 사용자      |
| `403`     | `AUTH_ACCESS_DENIED`                   | 인증됐지만 요청 권한이 없음             |
| `409`     | `USER_EMAIL_CONFLICT`                  | 이미 사용 중인 email                    |
| `400`     | `AUTH_EMAIL_VERIFICATION_INVALID`      | 이메일 인증 token이 유효하지 않음       |
| `410`     | `AUTH_EMAIL_VERIFICATION_EXPIRED`      | 이메일 인증 token이 만료됨              |
| `410`     | `AUTH_EMAIL_VERIFICATION_USED`         | 이메일 인증 token이 이미 사용됨         |
| `429`     | `AUTH_EMAIL_VERIFICATION_RATE_LIMITED` | 인증 메일 재발송 제한 초과              |
| `502`     | `AUTH_EMAIL_DELIVERY_ERROR`            | 인증 메일 provider 호출 실패            |
| `404`     | `CATEGORY_NOT_FOUND`                   | 관리자 요청의 Category를 찾을 수 없음   |
| `409`     | `CATEGORY_PATH_CONFLICT`               | 생성한 Category path가 이미 존재함      |
| `400`     | `CATEGORY_REPLACEMENT_REQUIRED`        | Post 이동 대상 Category가 필요함        |
| `400`     | `CATEGORY_INVALID_REPLACEMENT`         | 삭제 대상과 이동 대상 Category가 같음   |
| `409`     | `CATEGORY_HAS_CHILDREN`                | 하위 Category가 있어 삭제할 수 없음     |
| `409`     | `CATEGORY_PROTECTED`                   | 보호된 `미분류` Category 삭제 요청      |
| `400`     | `POST_INVALID_STATUS`                  | Post 상태와 발행일 조합이 유효하지 않음 |
| `409`     | `POST_SLUG_CONFLICT`                   | 이미 사용 중인 Post slug                |
| `429`     | `AUTH_RATE_LIMITED`                    | 로그인·재발급 호출 제한 초과            |

로그인 실패는 email 존재 여부를 노출하지 않도록 `AUTH_INVALID_CREDENTIALS` 하나로 반환합니다. 다만 올바른 credential의 `PENDING` User는 인증 화면으로 안내할 수 있도록 `AUTH_EMAIL_NOT_VERIFIED`로 구분합니다. 인증 메일 재발송 응답은 email 존재 여부를 노출하지 않습니다.

## 2차 Spring AI

| HTTP 상태 | Code                  | 사용 기준                                 |
| --------- | --------------------- | ----------------------------------------- |
| `400`     | `AI_INVALID_QUESTION` | 질문이 비어 있거나 길이 제한을 벗어남     |
| `429`     | `AI_RATE_LIMITED`     | 질문 호출 제한 초과                       |
| `502`     | `AI_PROVIDER_ERROR`   | 모델 provider가 유효하지 않은 응답을 반환 |
| `504`     | `AI_TIMEOUT`          | 모델 호출 시간 초과                       |

## 3차 AI Service

| HTTP 상태 | Code                     | 사용 기준                            |
| --------- | ------------------------ | ------------------------------------ |
| `503`     | `AI_CONTEXT_UNAVAILABLE` | Backend Context API를 사용할 수 없음 |
| `504`     | `AI_CONTEXT_TIMEOUT`     | Backend Context API 호출 시간 초과   |

`ai-service`는 Backend나 모델의 내부 오류 코드를 그대로 외부에 전달하지 않고 위 코드로 변환합니다.

## Backend 적용

- `ErrorCode` enum에 HTTP 상태, code와 기본 message를 둡니다.
- 도메인 예외는 해당 `ErrorCode`를 가집니다.
- `GlobalExceptionHandler`가 `ErrorResponse(code, message)`로 변환합니다.
- 예상하지 못한 예외는 `COMMON_INTERNAL_ERROR`로 변환합니다.
- `code`와 HTTP 상태의 조합을 통합 테스트로 고정합니다.

목표 구조:

```text
backend/src/main/java/com/pigpgw/techblog/common/exception/
├─ ErrorCode.java
├─ ErrorResponse.java
├─ BusinessException.java
└─ GlobalExceptionHandler.java
```

공통 예외 class는 도메인 판단을 대신하지 않습니다. `PostNotFoundException`처럼 도메인 의미가 필요한 예외는 해당 도메인에 두고 공통 `ErrorCode`를 사용합니다.

## Frontend 적용

- `ErrorCode`는 이 문서의 문자열 literal union으로 정의합니다.
- `ApiError`는 HTTP 상태, code, message와 request ID를 가집니다.
- `frontend/src/services`가 Backend 오류 응답을 한 번만 해석합니다.
- page와 component는 `ApiError.code`로 not-found, 로그인 이동, 권한 부족과 재시도를 결정합니다.
- 네트워크 연결 실패는 `COMMON_NETWORK_ERROR`, 알 수 없는 code나 JSON 해석 실패는 `COMMON_UNKNOWN_ERROR`와 일반 message로 처리합니다.

목표 구조:

```text
frontend/src/
├─ types/error.ts              # ErrorCode, ErrorResponse
├─ lib/api-error.ts            # ApiError
└─ services/api-client.ts      # HTTP·네트워크 오류 변환
```

Frontend와 Backend 사이에 별도 공유 package나 코드 생성 도구는 도입하지 않습니다. 구현 시 양쪽 테스트가 이 문서의 code 문자열을 기준으로 계약을 검증합니다.

## 변경 규칙

- 기존 code의 의미를 바꾸거나 다른 HTTP 상태에 재사용하지 않습니다.
- 더 이상 사용하지 않는 code는 즉시 다른 의미로 재활용하지 않습니다.
- code 추가·폐기 시 Backend enum, Frontend 타입, API 테스트와 이 문서를 같은 변경에서 갱신합니다.
- 사용자에게 노출할 message 변경은 가능하지만 Frontend 로직은 영향을 받지 않아야 합니다.
- 아직 구현·테스트하지 않은 code는 설계 상태이며 완료로 표시하지 않습니다.
