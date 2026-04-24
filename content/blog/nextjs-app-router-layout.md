---
slug: "nextjs-app-router-layout"
title: "Next.js App Router에서 레이아웃을 먼저 나누는 이유"
description: "App Router 기반 블로그에서 layout, page, route segment의 책임을 정리한다."
publishedAt: "2026-04-23"
category: "Next.js"
---

## 레이아웃은 반복을 줄이는 장치다

App Router의 layout 파일은 여러 페이지가 공유하는 UI를 안정적으로 묶어준다. 헤더, 푸터, 공통 최대 너비, 배경색처럼 페이지마다 반복되는 요소를 layout에 두면 각 page 파일은 자기 화면의 정보 구조에 집중할 수 있다.

## page는 화면의 목적을 드러내야 한다

page 파일은 라우트에서 실제로 보이는 화면이다. 홈은 소개와 주요 링크를 보여주고, 블로그 목록은 글 탐색에 집중하며, 상세 페이지는 읽기 경험을 우선해야 한다. page가 너무 많은 공통 코드를 품으면 라우트의 목적이 흐려진다.

## segment는 확장 단위다

`/blog/[id]`처럼 라우트 segment를 나누면 목록과 상세의 책임이 분리된다. 이후 카테고리, 태그, 검색 같은 기능을 붙일 때도 어느 segment에 어떤 책임을 둘지 판단하기 쉬워진다.

## 작게 시작하기

처음부터 복잡한 폴더 구조를 만들 필요는 없다. 다만 공통 UI와 페이지별 UI를 섞지 않는 기준은 초기에 정하는 편이 좋다. 작은 기준이 이후 리팩터링 비용을 줄인다.
