# AGENTS.md

이 파일은 저장소 전체에 적용되는 최소 작업 규칙이다.
세부 작업 기준은 `.agents/skills`의 전용 Skill을 우선한다.

## 절대 규칙

- 사용자가 별도로 요청하지 않으면 `dev`에서 작업한다.
- `main` 브랜치에는 직접 작업하지 않는다.
- 요청 범위 밖의 리팩터링, 문서 정리, 하위 `AGENTS.md` 추가는 하지 않는다.
- 사용자가 요청하지 않은 하위 `AGENTS.md`를 만들지 않는다.
- 사용자가 만든 변경사항을 되돌리지 않는다.
- 실제로 실행하지 않은 테스트, 빌드, 검증을 실행했다고 쓰지 않는다.
- 실제로 수행하지 않은 작업을 AI 활용 기록에 남기지 않는다.

## 작업 전 확인

작업 시작 전 아래 문서를 우선 확인한다.

- `README.md`
- `AGENTS.md`
- `docs` 중 현재 작업과 관련된 문서

## 변경 원칙

- 필요한 파일만 최소 범위로 수정한다.
- 관련 없는 파일의 포맷팅 변경을 하지 않는다.
- import 정렬만을 위한 수정은 하지 않는다.
- 아키텍처나 라이브러리 변경 시 이유를 `docs` 또는 PR 설명에 남긴다.

## GitHub 작업 흐름

- 작은 수정, 오타, 단순 스타일 조정은 이슈 없이 `dev`에서 바로 작업할 수 있다.
- 기능 범위, 재현 절차, 검증 기준을 정리해야 하는 작업은 이슈를 만든다.
- 주요 기능, 버그 수정, 문서 구조 변경, 설정 변경은 PR을 만든다.
- PR 본문에는 목적, 변경 내용, 검증 결과, 관련 이슈, AI 활용 여부를 남긴다.
- 실행하지 않은 검증 항목은 PR 본문이나 작업 보고에 이유를 적는다.
- PR은 `dev`로 병합하고, 배포 준비가 끝난 변경만 `main`에 반영한다.

브랜치 기준:

- `main`: production 배포 브랜치. 직접 작업하지 않는다.
- `dev`: 기본 통합 브랜치. 사용자가 별도로 요청하지 않으면 여기서 작업한다.
- `feature/<slug>`: 기능, 화면, 사용자 경험 추가
- `fix/<slug>`: 버그 수정
- `docs/<slug>`: 문서, 블로그 글, 기록
- `chore/<slug>`: 설정, 템플릿, 빌드 도구

브랜치 이름의 `<slug>`는 영어 kebab-case로 작성한다.

## 아키텍처

기술 스택:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- npm

폴더 구조:

- `src/app`: Next.js App Router 페이지, 레이아웃, 라우트 단위 UI
- `src/lib`: 게시글 조회 등 공통 로직
- `src/types`: 프로젝트 공통 타입
- `content/blog`: Markdown 블로그 글
- `docs`: 프로젝트 문서와 AI 활용 기록
- `.agents/skills`: 반복 작업을 위한 Codex Skill

현재는 루트 `AGENTS.md`만 유지한다. 프론트엔드 전용 규칙의 차이가 명확해지면 `src/AGENTS.md`로 분리한다.

## 빌드/테스트

패키지 설치:

```bash
npm install
```

개발 서버:

```bash
npm run dev
```

품질 확인:

```bash
npm run lint
npm run format:check
npm run type-check
npm run build
```

- 문서만 수정한 경우에는 필요한 최소 검증만 수행한다.
- UI를 수정한 경우에는 빌드 검증과 함께 브라우저에서 주요 화면을 확인한다.
- 검증 결과를 보고할 때는 실행한 명령어, 성공/실패 여부, 실패 시 원인, 미실행 항목을 함께 적는다.

## 도메인 컨텍스트

- 프로젝트 목적은 개인 기술 블로그를 만들고 개발 과정의 문제 해결을 기록하는 것이다.
- 1차 MVP 범위는 홈, 이력서, 블로그 목록, 블로그 상세 페이지다.
- 블로그 글은 `content/blog`의 Markdown 파일로 관리한다.
- 게시글 frontmatter는 `src/lib/blog-posts.ts`에서 검증하고 읽는다.
- `draft: true`인 글은 공개 목록과 상세 조회에서 제외한다.
- 공개 글은 `slug`로 접근한다.
- 관리자 기능과 Supabase 기반 글 관리는 2차 MVP 범위다.
- 모노레포와 Cloudflare 라우팅은 3차 MVP 범위다.
- README에 적힌 MVP 범위와 프로젝트 결정을 우선한다.

## 코딩 컨벤션

- 프로젝트 문서는 한국어로 작성한다.
- 커밋 메시지는 Conventional Commits 형식을 따른다.
- 커밋 내용은 한국어로 작성한다.
- subject 문장은 `~한다` 형식으로 끝낸다.
- 기본 형식은 `type: subject`를 사용한다.
- 공식 문서는 참고용으로만 사용하고, 이 프로젝트의 요약 규칙을 우선한다.
- 참고: <https://www.conventionalcommits.org/>
- AI와 함께 작업했거나 AI가 커밋되는 산출물 작성, 수정, 진단에 직접 관여한 경우 공동 작성자 footer를 남긴다.
- 커밋 메시지와 공동 작성자 footer 규칙은 이 문서와 README의 커밋 컨벤션을 기준으로 한다.

## Skill 활용

- 커밋 메시지 작성이나 검토가 필요하면 `commit-message-generator`를 활용한다.
- AI 활용 기록 초안이 필요하면 `ai-usage-recorder`를 활용한다.
- UI 퍼블리싱 작업에는 `blog-ui-publisher`를 활용한다.
- 코드리뷰 요청에는 `code-review-fundamentals`를 활용한다.
