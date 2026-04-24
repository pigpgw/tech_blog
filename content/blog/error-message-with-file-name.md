---
slug: "error-message-with-file-name"
title: "콘텐츠 검증 에러에 파일명을 넣어야 하는 이유"
description: "Markdown frontmatter 오류를 빠르게 찾기 위한 에러 메시지 작성 기준을 정리한다."
publishedAt: "2026-04-07"
category: "Debugging"
---

## 에러는 원인을 찾게 해야 한다

`incorrect blog form data` 같은 메시지는 문제가 있다는 사실만 알려준다. 어떤 파일의 어떤 데이터가 잘못됐는지 알 수 없으면 디버깅 시간이 늘어난다.

## 파일명을 포함한다

Markdown 글을 여러 개 읽는 로더에서는 파일명이 가장 중요한 단서다. `Invalid blog post frontmatter: debounce.md`처럼 알려주면 바로 해당 파일을 열어 확인할 수 있다.

## 검증 위치도 중요하다

글 목록을 렌더링한 뒤 어딘가에서 undefined가 터지는 것보다, frontmatter를 읽는 순간 실패시키는 편이 낫다. 데이터 경계에서 검증하면 문제의 위치가 선명해진다.

## 좋은 실패는 유지보수 비용을 줄인다

에러를 친절하게 만든다는 것은 사용자를 위한 것만이 아니다. 개발자가 다음에 같은 문제를 만났을 때 더 빨리 수정할 수 있게 만드는 유지보수 장치다.
