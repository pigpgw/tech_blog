# Integration Tests

여러 모듈이 함께 동작하는 흐름을 검증하는 테스트를 둔다.

- 파일명은 `*.test.ts` 또는 `*.spec.ts`를 사용한다.
- 실행 명령은 `npm run test:integration`이다.
- 예: Markdown 게시글 조회 함수와 fixture 데이터를 함께 사용하는 테스트.
- 현재는 Vitest 기반 Node 환경만 준비되어 있으며, 별도 DB나 네트워크 의존 테스트는 추가하지 않는다.
