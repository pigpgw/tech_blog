---
name: blog-ui-publisher
description: 이 블로그 프로젝트의 UI 퍼블리싱을 구현, 검토, 수정할 때 사용한다. Home, Resume, Blog, Lab, Admin, semantic JSX/HTML, 접근성, Tailwind/CSS 레이아웃, 반응형 점검, 디자인이 없는 요청, 현재 톤에 맞춘 UI 실행에 적용한다.
---

# 블로그 UI 퍼블리셔

## 역할

이 블로그 프로젝트의 기본 UI 퍼블리싱을 구현하고 점검한다. 화면 목적을 확인하고, semantic 구조를 먼저 잡고, 현재 시각 톤을 적용한 뒤 접근성, 레이아웃, 반응형 동작을 검증한다.

공개 페이지, Lab 페이지, Admin 화면, 로컬 JSX/HTML/CSS 퍼블리싱 작업에 사용한다. 코드는 기존 Next.js, React, TypeScript, Tailwind CSS, shadcn/ui 관례에 맞춘다.

## 사용할 때

사용자가 다음을 요청하면 이 Skill을 사용한다.

- 스크린샷, Figma 링크, 말로 적은 요구사항, 기존 페이지를 바탕으로 UI 퍼블리싱을 만들거나 고친다.
- Home, Resume, Blog list, Blog detail, category tree, Lab, Admin UI를 구현한다.
- 별도 디자인이 없고 현재 사이트 톤에 맞춰야 한다.
- semantic HTML, 접근성, 키보드 흐름, focus, overflow, responsive layout을 고친다.
- 다른 AI 도구에 전달할 퍼블리싱 프롬프트를 작성하거나 다듬는다.
- 컴포넌트 추출이나 리팩터링 없이 로컬 퍼블리싱만 수행한다.

다음 작업에는 사용하지 않는다.

- UI 영향이 없는 순수 backend, database, CI, deployment 작업.
- 리뷰 결과 형식만 필요한 작업. 리뷰 전용 요청은 `react-next-frontend-code-review`를 사용한다.
- 무거운 제품 전략, 글 기획, roadmap 재구성.
- 사용자가 명시적으로 요청하지 않은 refactoring, component extraction, headless UI pattern, compound component, abstraction design.

## 프로젝트 맥락

- 제품: 개인 기술 블로그, resume, lab, admin CMS.
- 공개 route: `/`, `/resume`, `/blog`, `/blog/[slug]`, `/blog/categories/[...segments]`, `/lab`, `/lab/[slug]`.
- Admin route: `/admin/login`, `/admin/posts`, `/admin/posts/new`, `/admin/posts/[id]/edit`, `/admin/posts/[id]/preview`.
- Stack: Next.js App Router, React, TypeScript, Tailwind CSS, shadcn/ui style conventions.
- 공개 UI 톤: 명확함, 콘텐츠 우선, 기술적, 절제됨, 읽기 쉬움.
- Admin UI 톤: 조용함, 밀도 있음, 작업 중심, form/list/status 중심.

## 절차

1. route, 사용자, 작업, 성공 상태를 이름 붙인다.
2. 입력 출처를 확인한다: screenshot, Figma link, verbal requirement, existing code, current page tone.
3. 기존 markup, token, Tailwind pattern, spacing, radius, focus, page structure를 확인한다.
4. 스타일보다 semantic 구조를 먼저 만든다.
5. 작업에 필요한 최소 레이아웃만 추가한다.
6. 관련 있는 상태를 추가한다: loading, empty, error, disabled, dirty, saving, success, validation, not-found.
7. keyboard flow, focus visibility, accessible name, overflow, responsive width를 확인한다.
8. 변경은 요청받은 page나 component에 국한한다. shared component 추출이나 ownership 재구성은 하지 않는다.
9. 반복이나 추상화가 필요해 보이면 구현하지 말고 후속 작업으로 언급한다.
10. Codex가 같은 UI 실수를 반복하면 다음 프롬프트에 의존하지 말고 이 Skill을 업데이트한다.

## 디자인이 없을 때 기본값

사용자가 "현재 톤과 비슷하게 퍼블리싱해줘"라고 하거나 별도 디자인이 없으면 다음을 따른다.

- 새 시각 방향을 만들기 전에 기존 페이지를 맞춘다.
- 프로젝트에 강한 로컬 패턴이 없다면 Tailwind 기본 spacing, font, color, radius, breakpoint scale을 사용한다.
- page title, supporting text, primary action, secondary action, content area의 위계를 명확히 한다.
- operational screen에는 장식적 section, gradient-only background, nested card, marketing-style composition을 피한다.
- visible border, restrained background, readable spacing, strong focus state를 선호한다.
- 디자인 판단을 추론했다면 최종 보고에 가정을 남긴다.

## 시맨틱과 접근성 규칙

- 문서화된 예외가 없으면 페이지마다 대표 `h1` 하나를 둔다.
- heading level은 시각 크기가 아니라 문서 구조에 맞춘다.
- `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`는 의미가 맞을 때만 사용한다.
- 의미 있는 section이 아닌 layout wrapper에는 `div`를 사용한다.
- 이동은 link, 동작은 button을 사용한다.
- native link나 button이 맞는데 비상호작용 요소에 click handler를 붙이지 않는다.
- icon-only link/button에는 accessible name을 제공한다.
- 유용한 visible text를 다른 `aria-label`로 덮어쓰지 않는다.
- 장식 icon은 `aria-hidden="true"`로 숨긴다.
- 날짜는 `time dateTime`으로 표현한다.
- 반복 콘텐츠는 list라면 `ul`/`ol`과 `li`로 표현한다.
- 독립적인 반복 콘텐츠는 각 항목이 단독으로 의미를 가지면 `article`로 감싼다.
- form control은 visible label 또는 정당한 hidden label과 연결한다.
- 현재 navigation item에는 `aria-current="page"`를 사용한다.
- disclosure-like control에는 `aria-expanded`, `aria-controls`, keyboard support를 제공한다.
- dynamic message는 사용자가 들어야 할 때만 `role="status"`나 `aria-live="polite"`를 사용한다.
- native HTML이 이미 역할, 이름, 상태를 제공하면 ARIA를 추가하지 않는다.

## Tailwind와 CSS 규칙

- custom CSS를 추가하기 전에 기존 Tailwind class pattern을 따른다.
- 1차원 정렬은 Flexbox, 2차원 layout이나 card list는 Grid를 사용한다.
- 긴 title, URL, code block, table, media로 인한 horizontal overflow를 막는다.
- Flexbox나 Grid를 사용해도 source order와 keyboard order가 어긋나지 않게 한다.
- focus outline을 전역에서 제거하지 않는다.
- 밝은 배경과 어두운 배경 모두에서 보이는 `:focus-visible` 스타일을 선호한다.
- content가 필요로 할 때만 responsive breakpoint를 사용한다.
- Admin은 먼저 768px, 1280px 작업 폭을 확인한다.
- 공개 페이지는 모바일 지원이 범위에 있으면 360px, 390px, 768px, 1280px에서 확인한다.
- 새 CSS 기능을 쓰면 browser support를 확인하거나 더 단순한 fallback을 둔다.

## Admin 퍼블리싱 규칙

- Admin은 Resume, Blog, Lab content를 create, edit, preview, publish, unpublish, delete하기 위한 화면이다.
- 브랜드 표현보다 작업 완료를 우선한다.
- 예측 가능한 구조를 선호한다: page header, primary action, filters/search, list/table/card list, form, preview, status region.
- form에는 label, validation message, disabled/saving state, dirty/reset behavior, server error display가 필요하다.
- list에는 loading, empty, error, retry, pagination 또는 filter state가 필요하다.
- 미리보기 화면은 draft/published 상태와 public URL 기대값을 명확히 보여준다.
- Admin edit route는 DB `id`, public detail route는 public `slug`를 사용한다.

## 리팩터링 경계

이 Skill은 기본 퍼블리싱 실행용이지 리팩터링용이 아니다.

- 사용자가 명시적으로 요청하지 않으면 shared component를 추출하지 않는다.
- headless, compound, polymorphic, slot-based pattern을 도입하지 않는다.
- folder, state ownership, data loading, component boundary를 재구성하지 않는다.
- 단일 화면을 퍼블리싱하면서 design system을 만들지 않는다.
- 반복 markup이 보이면 먼저 로컬 퍼블리싱을 끝내고 component extraction은 후속으로 언급한다.
- 사용자가 abstraction과 component design을 따로 학습하고 결정할 수 있게 리팩터링 결정권을 남긴다.

## 다른 AI 도구용 퍼블리싱 프롬프트 형식

다른 AI 도구에 전달할 프롬프트를 만들 때는 다음을 포함한다.

1. 역할
2. 프로젝트 맥락
3. 대상 route/component
4. 사용자 작업과 성공 기준
5. 맞춰야 할 기존 톤
6. 제외 범위
7. 시맨틱/접근성 요구사항
8. Tailwind/layout 제약
9. 반응형 요구사항
10. 구현할 상태
11. 검증 체크리스트

## 검증

수정 후 관련 검사를 실행한다.

```sh
npm run lint
npm run build
```

문서나 Skill만 수정한 경우에는 더 좁은 검증을 사용한다.

키보드 점검:

1. header에서 main content까지 Tab으로 이동한다.
2. link, button, input, card, tree control의 focus가 보이는지 확인한다.
3. Enter가 link를 활성화하는지 확인한다.
4. Space가 button을 활성화하는지 확인한다.
5. dynamic message가 필요할 때만 announce되는지 확인한다.

레이아웃 점검:

1. 합의한 width에서 horizontal overflow가 없는지 확인한다.
2. 긴 title, URL, code block, table, form error를 확인한다.
3. header, skip link, sticky element, focus outline이 서로 가리지 않는지 확인한다.
4. dark mode가 구현되었거나 요청되었을 때만 light/dark mode를 확인한다.

## 출력

이 Skill을 사용할 때는 요청에 필요한 핵심만 보고한다.

- `범위`: page/component와 입력 출처.
- `구현`: 변경 파일과 UI 구조.
- `접근성`: heading, label, ARIA, keyboard, focus.
- `레이아웃`: Tailwind/CSS 접근, overflow, responsive width.
- `상태`: loading, empty, error, validation, disabled, saving, success.
- `검증`: 명령, browser check, screenshot, 한계.
- `Skill 피드백`: 반복된 AI 실수나 다음에 추가할 규칙.
