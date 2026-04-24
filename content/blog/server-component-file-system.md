---
slug: "server-component-file-system"
title: "Server Component에서 파일 시스템을 읽을 때 주의할 점"
description: "Next.js에서 fs 기반 Markdown 로딩을 사용할 때의 실행 위치와 제약을 정리한다."
publishedAt: "2026-04-19"
category: "Next.js"
---

## fs는 서버에서만 사용할 수 있다

`fs`와 `path`는 Node.js API다. 브라우저에서 실행되는 Client Component에서는 사용할 수 없다. Markdown 파일을 직접 읽는 로직은 Server Component나 서버 전용 유틸리티에서만 호출해야 한다.

## import 경로보다 실행 위치가 중요하다

파일을 어디에 두느냐보다 그 코드가 어디에서 실행되느냐가 중요하다. Server Component에서 호출하는 유틸리티는 빌드와 요청 처리 과정에서 서버 환경으로 실행된다. 반대로 `"use client"`가 붙은 컴포넌트에서 호출하면 문제가 된다.

## process.cwd 기준 경로

`process.cwd()`는 프로젝트 루트를 기준으로 경로를 만들 때 유용하다. `content/blog`처럼 루트 기준 콘텐츠 폴더를 두면 파일 이동이 줄고, 로더 코드도 단순해진다.

## 배포 환경도 고려하기

로컬에서 읽히는 파일이 배포 결과물에도 포함되는지 확인해야 한다. 정적 Markdown을 저장소에 포함하고 빌드 시 읽는 구조라면 관리가 쉽다. 사용자 업로드나 동적 파일 저장은 별도 스토리지를 고려해야 한다.
