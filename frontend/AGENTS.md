# Frontend AGENTS.md

이 파일은 `frontend/` 아래에 적용하며 루트 `AGENTS.md`를 함께 따른다.

## 구조

- `src/app`: App Router 페이지, 레이아웃과 라우트 UI
- `src/components`: 화면과 공통 UI
- `src/services/blog.ts`: Blog 데이터 접근 경계
- `src/lib`, `src/types`: 공통 로직과 타입
- `content/blog`: Markdown 블로그 글

## 기능 보존

- `/`, `/resume`, `/blog`, `/blog/[slug]`, `/blog/categories/[...segments]` 경로를 유지한다.
- 검색, 카테고리, Markdown 본문과 공개 URL을 유지한다.
- Markdown은 `src/lib/blog-api.mock.ts`에서 읽고 화면은 `src/services/blog.ts`를 사용한다.
- `draft: true`인 글은 공개하지 않고 공개 글은 `slug`로 조회한다.
- 기존 Blog 타입의 `id`, `slug`, `description`, `publishedAt`, `draft`, `categoryId`, `content`를 유지한다.

## 구현 규칙

- Server Component를 기본으로 하고 상호작용이 필요한 부분만 Client Component로 만든다.
- 요청 범위 밖의 UI 재설계와 라우트 변경은 하지 않는다.
- UI 변경 시 semantic JSX, 접근성과 관련 화면을 확인한다.
- `src/lib` 함수는 `lowerCamelCase`와 `동작 + 도메인 + 대상` 순서를 우선한다.
- 동작에 따라 `get`, `parse`, `slugify`, `build`, `format`, `filter`, `sort`, `validate`처럼 의미가 드러나는 동사를 사용한다.

## 실행과 검증

모든 명령은 `frontend/`에서 실행한다.

```bash
npm ci
npm run dev
npm run lint
npm run format:check
npm run type-check
npm run test
npm run build
```

- UI 변경은 build와 브라우저 확인을 함께 수행한다.
- 테스트 파일이 없어서 통과한 경우 실제 테스트 성공처럼 표현하지 않는다.

## Skill 활용

- UI 작업은 `blog-ui-publisher`, React·Next.js 코드리뷰는 `react-next-frontend-code-review`를 활용한다.
