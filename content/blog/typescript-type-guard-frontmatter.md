---
slug: "typescript-type-guard-frontmatter"
title: "TypeScript 타입 가드로 Markdown frontmatter 검증하기"
description: "gray-matter가 반환한 data를 안전하게 BlogPost 타입으로 좁히는 방법을 정리한다."
publishedAt: "2026-04-22"
category: "TypeScript"
---

## data는 처음에 믿을 수 없다

`gray-matter`가 반환하는 `data`는 런타임에 읽은 객체다. TypeScript는 이 객체 안에 `title`, `slug`, `category`가 있다고 확신할 수 없다. 그래서 바로 `BlogPostDetail`로 반환하면 필수 속성이 없다는 타입 오류가 발생한다.

## unknown으로 받고 검사하기

외부 입력처럼 다뤄야 하는 값은 `any`보다 `unknown`이 낫다. `unknown`은 사용하기 전에 검사하도록 강제한다. `typeof data === "object"`를 확인한 뒤 `Record<string, unknown>`으로 다루면 개별 필드 타입을 검사할 수 있다.

## 타입 가드의 역할

`data is Omit<BlogPost, "id">` 형태의 반환 타입을 쓰면, 조건문을 통과한 이후 TypeScript가 data의 구조를 인정한다. 런타임 검증과 정적 타입 추론을 같은 함수에서 해결하는 셈이다.

## 실패는 조용히 넘기지 않는다

frontmatter가 잘못된 글은 목록에서 빠지는 것보다 빌드나 개발 중에 바로 실패하는 편이 낫다. `throw new Error`로 파일명을 함께 알려주면 문제를 빨리 찾을 수 있다.
