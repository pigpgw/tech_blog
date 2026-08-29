# AGENTS.md

이 파일은 저장소 전체에 적용한다.
`frontend/` 작업에는 `frontend/AGENTS.md`를 함께 적용하고, 세부 작업 기준은 `.agents/skills`의 전용 Skill을 우선한다.

## 공통 규칙

- 사용자가 별도로 요청하지 않으면 `dev`에서 작업하고 `main`에는 직접 작업하지 않는다.
- 요청 범위 밖의 리팩터링, 문서 정리와 하위 `AGENTS.md` 추가는 하지 않는다.
- 사용자가 만든 변경사항을 되돌리지 않는다.
- 실행하지 않은 작업이나 검증을 완료했다고 기록하지 않는다.
- 실제로 수행하지 않은 작업을 AI 활용 기록에 남기지 않는다.

## 작업 전 확인

- `README.md`, 루트 `AGENTS.md`와 현재 경로에 더 가까운 `AGENTS.md`를 확인한다.
- `docs`에서는 현재 작업과 관련된 문서만 확인한다.
- 문서와 코드가 다르면 현재 코드를 먼저 확인하고 문서를 갱신한다.

## 변경과 검증

- 필요한 파일만 최소 범위로 수정하고 관련 없는 포맷팅이나 import 정리는 하지 않는다.
- 아키텍처나 라이브러리 변경 이유는 `docs` 또는 PR 설명에 남긴다.
- 문서만 수정한 경우에는 필요한 최소 검증만 수행한다.
- 체크박스는 코드, 테스트, HTTP, 화면 또는 배포 결과가 실제로 확인됐을 때만 완료한다.
- 결과에는 실행한 명령, 성공·실패, 실패 원인과 미실행 항목을 구분해 적는다.

## GitHub 작업 흐름

- 작은 수정, 오타와 단순 스타일 조정은 이슈 없이 `dev`에서 작업할 수 있다.
- 기능, 주요 버그, 문서 구조와 설정 변경은 필요에 따라 이슈와 PR을 사용한다.
- PR에는 목적, 변경 내용, 검증 결과, 관련 이슈와 AI 활용 여부를 남기고 `dev`로 병합한다.
- 배포 준비가 끝난 변경만 `main`에 반영한다.

브랜치는 `feature/<slug>`, `fix/<slug>`, `docs/<slug>`, `chore/<slug>` 형식을 사용하고 `<slug>`는 영어 kebab-case로 작성한다.

## 프로젝트 기준

- `frontend`: Next.js App Router, React, TypeScript, Tailwind CSS와 shadcn/ui
- `backend`: Java 21, Spring Boot, Gradle Wrapper, PostgreSQL과 Flyway
- `docs`: 개발 로드맵, API 명세, 의사결정과 AI 활용 기록
- `.agents/skills`: 반복 작업용 Skill

현재 Home, Resume, Blog 목록·상세·카테고리, 검색, Markdown과 공개 URL을 보존한다.
Frontend는 Vercel Root Directory `frontend`, Backend는 Render Root Directory `backend`를 사용한다.
상세 구현 순서와 제외 범위는 `README.md`, `docs/development-roadmap.md`, `docs/api-spec.md`와 최신 `docs/decision-log.md`를 따른다.

## 학습 진행 방식

- 사용자가 명시적으로 구현을 요청하지 않으면 코드를 대신 수정하지 않는다.
- 사용자가 직접 진행할 때는 한 번에 개념, 명령 또는 코드 변경 하나만 제시하고 결과를 확인한다.
- 구현 범위는 현재 코드, 공식 문서, 테스트와 운영 요구를 기준으로 판단한다.

## 문서와 커밋

- 프로젝트 문서와 커밋 내용은 한국어로 작성한다.
- 커밋 메시지는 `type: ~한다` 형태의 Conventional Commits를 사용한다.
- AI가 커밋 산출물 작성, 수정 또는 진단에 직접 관여했다면 프로젝트 규칙에 맞는 공동 작성자 footer를 남긴다.

## Skill 활용

- 커밋 메시지는 `commit-message-generator`, AI 활용 기록은 `ai-usage-recorder`를 활용한다.
- Frontend 전용 Skill은 `frontend/AGENTS.md`를 따른다.
