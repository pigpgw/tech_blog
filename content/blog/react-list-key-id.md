---
slug: "react-list-key-id"
title: "React 목록 key로 무엇을 써야 할까"
description: "블로그 글 목록에서 파일명 id, slug, index의 차이를 정리한다."
publishedAt: "2026-04-13"
category: "React"
---

## key는 렌더링 힌트다

React의 key는 목록 항목을 구분하기 위한 값이다. key가 안정적이면 항목의 순서가 바뀌어도 React가 어떤 컴포넌트를 유지해야 하는지 더 잘 판단할 수 있다.

## index는 마지막 선택지다

배열 index를 key로 쓰면 항목 추가, 삭제, 정렬에서 예상하지 못한 UI 상태가 이어질 수 있다. 정적인 목록이라면 큰 문제가 없을 수 있지만, 데이터에 고유값이 있다면 그 값을 쓰는 편이 낫다.

## 파일명 id의 장점

Markdown 블로그에서는 파일명에서 만든 id가 안정적인 key가 될 수 있다. `debounce-throttle-browser-events.md`처럼 파일명이 글의 정체성을 나타내면 목록 key와 상세 조회에 모두 활용하기 쉽다.

## slug와의 차이

slug는 공개 URL이나 표시용으로 바뀔 수 있다. 반면 파일명 id를 내부 기준으로 삼으면 slug 변경과 조회 기준을 분리할 수 있다. 프로젝트 규모가 작다면 둘을 같게 가져가는 것도 실용적이다.
