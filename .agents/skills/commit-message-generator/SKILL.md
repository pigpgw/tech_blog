---
name: commit-message-generator
description: '코드나 문서 변경사항을 바탕으로 커밋 메시지를 생성, 검토, 다듬을 때 사용한다. 이 프로젝트의 한국어 Conventional Commits 규칙을 적용하며, subject의 "~한다" 종결, 선택적 body/footer, Co-authored-by 규칙을 포함한다.'
---

# 커밋 메시지 생성기

## 한 줄 정의

실제 diff를 분석해 이 프로젝트 규칙에 맞는 커밋 메시지를 만든다.

## 역할

현재 변경사항을 분석하고, 이 프로젝트의 커밋 컨벤션에 맞는 커밋 메시지를 제안한다.

## 커밋 규칙

- Conventional Commits 형식을 사용한다.
- 커밋 내용은 한국어로 작성한다.
- subject 문장은 `~한다` 형식으로 끝낸다.
- body와 footer는 필요할 때만 작성한다.
- 기본적으로 `type: subject` 형식을 사용한다.
- scope는 명확성을 높일 때만 추가한다.
- breaking change는 `!` 또는 footer의 `BREAKING CHANGE:`로 표시한다.
- Codex가 커밋될 코드, 문서, 설정, workflow, Skill 산출물 작성/수정/진단에 직접 관여했을 때만 `Co-authored-by: Codex <codex@openai.com>`를 제안한다.
- 사용자가 실제 작업을 했고 Codex가 가벼운 답변, 표현 검토, 반영되지 않은 제안만 했다면 `Co-authored-by`를 넣지 않는다.
- 단순 포맷팅, 간단한 질문, 낮은 가치의 boilerplate 생성에는 `Co-authored-by`를 넣지 않는다.

## 형식

```txt
type(scope)!: subject

body

footer
```

대부분의 커밋은 다음 한 줄이면 충분하다.

```txt
type: subject
```

## 커밋 Type 선택

- `feature`: 새로운 기능 추가
- `fix`: 버그 수정
- `refactor`: 동작 변경 없는 코드 구조 개선
- `docs`: 문서 수정
- `style`: UI 스타일 또는 CSS 수정
- `chore`: 설정, 패키지, 빌드 관련 작업
- `test`: 테스트 추가 또는 수정

여러 type이 가능하면 커밋의 주된 사용자 영향 또는 프로젝트 관리 목적을 가장 잘 설명하는 type을 고른다.

## 절차

1. `git status --short`로 변경 파일을 확인한다.
2. staged change가 있으면 우선 확인한다.
   - `git diff --cached --stat`
   - 필요하면 `git diff --cached`
3. staged change가 없으면 unstaged change를 확인한다.
   - `git diff --stat`
   - 필요하면 `git diff`
4. 변경사항이 하나의 논리적 커밋인지 판단한다.
5. 서로 다른 목적의 변경이 섞였으면 단일 메시지를 만들기 전에 커밋 분리를 권한다.
6. 가장 좁고 정확한 type을 고른다.
7. scope가 명확성을 높일 때만 추가한다.
8. 추천 메시지 하나를 만들고, 유용할 때만 대안 1-2개를 덧붙인다.

## 본문 작성 기준

subject만으로 이유나 의도가 부족할 때만 body를 쓴다.

좋은 본문 내용:

- 변경 이유
- 중요한 구현 맥락
- 트레이드오프 또는 마이그레이션 참고 사항

subject를 반복하지 않는다.

## 푸터 작성 기준

footer는 다음 경우에만 쓴다.

- `BREAKING CHANGE:`
- 관련 issue나 reference
- Codex가 커밋될 산출물에 직접 관여한 경우

```txt
Co-authored-by: Codex <codex@openai.com>
```

`Co-authored-by`는 Codex가 실제로 작성하거나 의미 있게 기여한 산출물이 커밋에 포함될 때만 사용한다. README의 제외 기준도 유지한다.

## 출력

사용자가 커밋 메시지를 요청하면 다음을 제공한다.

- 추천 메시지
- type/scope 선택 이유
- 유용할 때만 대안
- 변경이 섞여 있으면 커밋 분리 제안

사용자가 커밋까지 요청하면, 정확한 메시지를 이미 제공한 경우가 아니라면 커밋 전에 선택한 메시지를 보여준다.

## 예시

```txt
docs: 기술스택 선정 이유를 정리한다
feature: 홈 페이지를 구현한다
feature(blog): slug 기반 게시글 상세 페이지를 구현한다
fix: draft 게시글이 노출되는 문제를 수정한다
refactor: 게시글 조회 로직을 별도 함수로 분리한다
style: 모바일 글 목록 레이아웃을 개선한다
chore: Next.js 초기 설정을 추가한다
test: 게시글 정렬 로직 테스트를 추가한다
fix(post)!: 게시글 slug 생성 방식을 변경한다
```

Codex 공동 작성자 footer가 필요한 예시:

```txt
docs: 1차 프로젝트 문서와 AI 활용 기록을 정리한다

Co-authored-by: Codex <codex@openai.com>
```

나쁜 예시:

```txt
update
fix stuff
docs: 문서 수정
style: CSS 고침
```

나쁜 이유:

- 실제 변경 내용을 설명하지 않는다.
- 한국어 subject가 `~한다`로 끝나지 않는다.
