---
slug: "web-accessibility-basics"
title: "웹 접근성 기본: 키보드, 스크린 리더, ARIA"
description: "키보드 탐색, 스크린 리더 구조, accessible name, ARIA 사용 기준을 프론트엔드 기본기 관점에서 정리합니다."
publishedAt: "2026-05-12"
category: "Accessibility"
---

## 글의 배경

AI를 활용하면 화면 구현 시간을 줄인다. 다만 접근성 기준이 없으면 빠르게 만든 UI가 사용자에게 불편한 구조가 된다. 긴 프롬프트보다 중요한 것은 결과물을 검수할 기본 기준이다.

웹 접근성은 그 기준 중 하나다. 이미지에는 `alt`가 필요한지, ARIA는 언제 필요한지, 스크린 리더 사용자는 어떤 정보로 페이지를 탐색하는지, 키보드 사용자는 어떤 순서로 조작하는지 알아야 한다. 접근성은 나중에 붙이는 체크리스트가 아니라 UI 작성 기준이다.

프론트엔드에서 접근성은 사용자가 웹을 이해하고 조작하는 방식에 맞춰 HTML과 UI를 작성하는 기본기다. 화면을 보는 사용자는 색상, 위치, 크기, 간격으로 구조를 파악한다. 키보드 사용자와 스크린 리더 사용자는 focus 순서, 링크와 버튼의 이름, landmark, heading, form label의 영향을 받는다.

접근성 기본은 “어떤 속성을 붙였는가”보다 “어떤 이름, 역할, 상태가 보조 기술에 전달되는가”로 판단한다.

semantic HTML은 접근성의 출발점이다. `header`, `nav`, `main`, `article`을 쓰고 제목 순서를 맞추면 페이지 구조가 명확해진다. 접근성은 태그 이름 변경에서 끝나지 않는다. 현재 페이지 상태, focus 표시, 링크와 버튼 이름, 장식 요소 숨김, 동적 변경 안내까지 함께 판단한다.

이 글은 키보드 탐색, 스크린 리더, accessible name, ARIA를 프론트엔드 기본기 관점에서 정리합니다. 설명은 개념에서 출발하되, Header, Blog list, Blog detail, Resume 링크 같은 화면 예시를 통해 실제 적용 기준까지 연결합니다.

## 접근성은 왜 프론트엔드 기본기일까?

웹 접근성은 장애가 있는 사용자만을 위한 별도 기능이 아니다. 사용자의 능력, 나이, 기기, 입력 방식, 네트워크 상황과 관계없이 웹의 정보와 기능을 사용할 수 있게 만드는 기본 품질이다.

프론트엔드는 사용자가 실제로 만나는 화면과 상호작용을 구현합니다. 그래서 다음 결정들이 모두 접근성과 연결됩니다.

- 이 영역을 `div`로 둘지 `nav`로 둘지
- 이동 동작을 `Link`로 만들지 `button`으로 만들지
- input에 placeholder만 둘지 label을 연결할지
- focus 상태를 눈에 보이게 할지
- 현재 페이지 상태를 시각 스타일로만 표현할지
- 동적으로 바뀐 내용을 보조 기술에도 알려줄지

W3C WAI는 접근성이 잘 설계되고 구현된 웹에서 장애가 있는 사람도 웹사이트와 도구를 사용한다고 설명한다. 잘못 설계된 웹은 사용을 어렵게 하거나 불가능하게 만든다.

프론트엔드가 작성한 HTML, CSS, JavaScript는 누군가에게 화면이고, 누군가에게 키보드 이동 순서이며, 누군가에게 스크린 리더가 읽는 이름과 역할이다.

## 접근성은 무엇을 맞추는 일인가?

접근성은 스크린 리더 대응만 의미하지 않습니다. 실제로 코드를 볼 때는 다음 세 가지가 같이 맞아야 합니다.

첫째, 이름이다. 사용자가 요소를 무엇으로 이해하는지 결정한다. 링크 텍스트, 버튼 텍스트, input label, 이미지 alt가 여기에 들어간다.

둘째, 역할이다. 요소가 링크인지, 버튼인지, 검색 input인지, 주요 메뉴인지, 글 본문인지 나타낸다. HTML 태그를 의미에 맞게 쓰면 브라우저가 기본 role을 제공한다.

셋째, 상태다. 현재 페이지인지, 펼쳐졌는지, 선택됐는지, 비활성화됐는지, 값이 바뀌었는지 나타낸다. 상태를 시각적으로만 표현하면 보조 기술 사용자에게 전달되지 않는다.

접근성 작업의 핵심은 ARIA 속성 추가가 아니라 이름, 역할, 상태를 코드로 결정하는 일이다.

## 먼저 HTML과 기본 동작을 믿는다

접근성을 공부하다 보면 ARIA 속성이 먼저 눈에 들어옵니다. 하지만 실제 구현 순서는 반대가 더 안전합니다.

```txt
1. 의미에 맞는 HTML 태그를 먼저 쓴다.
2. 브라우저가 제공하는 기본 키보드 동작을 유지한다.
3. 보이는 텍스트, label, alt로 이름을 제공한다.
4. HTML만으로 부족한 상태와 알림만 ARIA로 보완한다.
```

예를 들어 버튼처럼 보이는 요소를 `div`로 만들고 클릭 이벤트만 붙일 수도 있습니다.

```tsx
// 피해야 하는 방향
<div role="button" onClick={handleOpenMenu}>
  메뉴 열기
</div>
```

하지만 이렇게 만들면 키보드 focus, Enter/Space 실행, disabled 상태, form 안에서의 동작까지 직접 챙겨야 합니다.

반대로 처음부터 `button`을 쓰면 브라우저가 버튼의 기본 동작을 제공합니다.

```tsx
<button type="button" onClick={handleOpenMenu}>
  메뉴 열기
</button>
```

접근성의 첫 단계는 특별한 코드를 추가하는 것이 아니라, 브라우저가 이미 제공하는 의미와 동작을 깨지 않는 것입니다.

## 키보드 사용자는 어떻게 탐색할까?

키보드 사용자는 주로 `Tab`과 `Shift + Tab`으로 focus 가능한 요소 사이를 이동합니다.

```txt
Tab
-> 다음 링크, 버튼, input으로 이동

Shift + Tab
-> 이전 focus 가능한 요소로 이동
```

링크와 버튼은 기본 키보드 동작이 다릅니다.

```txt
링크
-> Enter로 이동

버튼
-> Enter 또는 Space로 실행
```

기준은 단순하다.

```txt
주소가 바뀌거나 다른 위치로 이동한다
-> Link 또는 a

현재 화면에서 기능을 실행한다
-> button
```

내부 페이지 이동에는 Next.js `Link`를 사용합니다.

```tsx
<Link href="/blog">Blog</Link>
<Link href="/resume">Resume</Link>
```

외부 URL, 이메일, 전화번호처럼 브라우저의 기본 링크 기능을 써야 하는 곳은 `a`를 사용합니다.

```tsx
<a href="mailto:ceh20002@naver.com">ceh20002@naver.com</a>
<a href="tel:01094737427">010-9473-7427</a>
```

이렇게 하면 새 탭 열기, 링크 주소 복사, 방문 기록, 기본 키보드 이동 같은 기능을 브라우저가 그대로 처리합니다.

## focus는 보여야 한다

키보드 사용자는 현재 focus가 어디에 있는지 보면서 이동합니다. focus 표시가 없으면 사용자는 지금 어떤 링크나 버튼 위에 있는지 알 수 없습니다.

주요 링크에는 `focus-visible` 스타일을 적용한다.

```tsx
<Link
  href="/blog"
  className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
>
  Blog
</Link>
```

`focus-visible`은 사용자가 키보드로 이동하는 것처럼 focus 표시가 필요한 상황에서 focus 스타일을 보여주는 CSS pseudo-class입니다.

여기서 중요한 점은 `outline: none`으로 기본 focus 표시를 없애고 끝내지 않는 것입니다. 디자인상 기본 outline이 어색하다면 없애는 대신, 더 잘 보이는 focus 스타일로 교체해야 합니다.

예시 프로젝트에서는 파란 outline과 offset을 사용한다. 요소 바깥쪽에 focus ring이 생겨 배경색이나 border와 구분된다.

## 스크린 리더 사용자는 무엇을 기준으로 이해할까?

스크린 리더 사용자는 화면을 시각적으로 훑기보다 제목, 링크, 버튼, form control, landmark를 단위로 탐색합니다.

화면 배치보다 HTML에 노출되는 구조와 이름이 더 중요하다.

예시 프로젝트의 큰 구조는 다음과 같습니다.

```tsx
<header>
  <nav aria-label="주요 메뉴">...</nav>
</header>

<main id="main-content">
  <article>
    <h1>글 제목</h1>
  </article>
</main>
```

`header`, `nav`, `main`, `article`은 큰 구조를 알려줍니다. `h1`은 현재 페이지 또는 글의 대표 제목입니다. Blog detail에서는 글 전체를 `article`로 감싸서 독립적인 콘텐츠라는 의미를 드러냈습니다.

이 구조는 보조 기술에 “상단 영역”, “주요 메뉴”, “본문”, “글”을 구분해 전달한다. 코드를 읽는 사람도 레이아웃 wrapper와 의미 있는 영역을 구분한다.

semantic tag만으로 모든 정보가 전달되지는 않는다. 현재 페이지 상태, 장식 아이콘 숨김, 보이지 않는 label, 동적 업데이트 안내는 별도로 보완한다.

## accessible name

accessible name은 보조 기술이 UI 요소를 사용자에게 어떤 이름으로 전달할지 결정하는 이름입니다.

가장 좋은 accessible name은 보통 화면에 보이는 텍스트입니다.

```tsx
<Link href="/blog">Blog</Link>
```

이 링크의 이름은 `Blog`입니다.

input은 `label`을 연결하는 것이 기본입니다.

```tsx
<label htmlFor="blog-search" className="sr-only">
  블로그 글 검색
</label>
<input
  id="blog-search"
  type="search"
  placeholder="검색할 블로그 제목을 입력하세요"
/>
```

여기서 label은 화면에 보이지 않더라도 input의 안정적인 이름이 된다. 디자인상 label을 화면에 항상 보여주기 어렵다면 `sr-only` label을 사용한다.

`placeholder`는 label을 대체하기 어렵습니다. 입력을 시작하면 사라지고, 사용자가 값을 입력한 뒤에는 그 칸이 무엇을 의미했는지 알기 어려워질 수 있기 때문입니다.

## `aria-label`은 언제 쓸까?

`aria-label`은 화면에 보이는 텍스트만으로 목적이 부족하거나, 텍스트가 없는 UI에 이름을 줄 때 사용합니다.

아이콘만 있는 버튼은 화면을 보는 사람에게는 의미가 보일 수 있지만, 보조 기술에는 안정적인 이름이 없을 수 있습니다.

```tsx
<button type="button" aria-label="닫기">
  <XIcon aria-hidden="true" />
</button>
```

예시 프로젝트에는 완전한 icon-only 링크가 많지 않다. 대신 문맥 없이 들으면 목적이 흐려지는 링크가 있다.

Header의 홈 링크는 화면에 `PG` 배지와 `Park Gunwoo`를 함께 보여준다. 실제 목적은 홈 이동이다.

```tsx
<Link href="/" aria-label="Park Gunwoo 홈으로 이동">
  <span aria-hidden="true">PG</span>
  <span>Park Gunwoo</span>
</Link>
```

GitHub 링크는 화면에 `GitHub`라고 보인다. accessible name에는 누구의 GitHub인지와 새 탭 이동을 함께 담는다.

```tsx
<a
  href="https://github.com/pigpgw"
  target="_blank"
  rel="noopener noreferrer"
  aria-label="박건우 GitHub 새 탭에서 열기"
>
  GitHub
</a>
```

이메일과 전화 링크는 값만 읽히면 동작이 약하게 전달된다. accessible name으로 동작을 보강한다.

```tsx
<a
  href="mailto:ceh20002@naver.com"
  aria-label="이메일 보내기: ceh20002@naver.com"
>
  ceh20002@naver.com
</a>
```

모든 링크에 `aria-label`을 붙이지 않는다. 보이는 텍스트만으로 목적이 충분하면 visible text를 accessible name으로 사용한다.

visible text와 `aria-label`이 다르면 사용자가 보는 이름과 보조 기술이 듣는 이름이 달라진다. `aria-label`은 부족한 이름을 보완할 때만 사용한다.

## `aria-current`는 현재 상태를 알려준다

Header에는 `Home`, `Blog`, `Resume`, `GitHub` 링크가 있습니다.

시각적으로는 현재 페이지 링크를 굵게 하거나 밑줄로 표시한다. 스크린 리더 사용자는 그 시각적 스타일을 알지 못한다.

그래서 현재 페이지 링크에는 `aria-current="page"`를 붙입니다.

```tsx
<Link href="/blog" aria-current={isBlogPage ? "page" : undefined}>
  Blog
</Link>
```

의미는 다음과 같습니다.

```txt
이 링크는 관련된 페이지 링크 묶음 안에서 현재 페이지를 나타낸다.
```

현재 페이지가 아닐 때는 `false`를 넣기보다 속성을 아예 빼는 방식으로 작성합니다.

```tsx
aria-current={isBlogPage ? "page" : undefined}
```

이렇게 하면 현재 페이지 링크 하나에만 상태가 노출됩니다.

## 왜 `"page"`이고 `true`나 `"Home"`이 아닐까?

`aria-current`는 단순 boolean 속성이 아니라 “무엇이 현재인지”를 알려주는 속성입니다.

대표 값은 다음과 같습니다.

| 값         | 의미                      |
| ---------- | ------------------------- |
| `page`     | 현재 페이지               |
| `step`     | 현재 단계                 |
| `location` | 현재 위치                 |
| `date`     | 현재 날짜                 |
| `time`     | 현재 시간                 |
| `true`     | 현재 항목이지만 종류 일반 |

Header의 `Home`, `Blog`, `Resume`은 페이지 링크입니다. 그래서 현재 페이지를 나타내는 값인 `"page"`가 가장 정확합니다.

`true`도 “현재 항목”이라는 의미는 전달하지만, 페이지인지 단계인지 위치인지가 덜 구체적입니다.

`"Home"`은 값으로 쓰면 안 됩니다. `aria-current`는 링크 이름을 넣는 자리가 아니라 현재 상태의 종류를 넣는 자리입니다.

```tsx
// 적절하지 않음
aria-current={pathname === "/" ? "Home" : undefined}

// 적절함
aria-current={pathname === "/" ? "page" : undefined}
```

## Header는 서버 컴포넌트인데 pathname은 어떻게 가져올까?

Next.js App Router에서 `usePathname()`은 클라이언트 컴포넌트에서만 사용한다.

Header 전체에서 현재 경로를 가져오면 구현은 단순해 보인다. 하지만 현재 페이지 표시 때문에 Header 전체를 클라이언트 컴포넌트로 바꾸면 범위가 커진다.

그래서 현재 경로가 필요한 내비게이션만 분리하는 방식이 적합합니다.

```tsx
// src/components/layout/header/index.tsx
import Link from "next/link";
import { HeaderNav } from "@/components/layout/header/HeaderNav";

export const Header = () => {
  return (
    <header>
      <Link href="/" aria-label="Park Gunwoo 홈으로 이동">
        <span aria-hidden="true">PG</span>
        <span>Park Gunwoo</span>
      </Link>
      <HeaderNav />
    </header>
  );
};
```

```tsx
// src/components/layout/header/HeaderNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export const HeaderNav = () => {
  const pathname = usePathname();
  const isBlogPage = pathname === "/blog" || pathname.startsWith("/blog/");

  return (
    <nav aria-label="주요 메뉴">
      <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
        Home
      </Link>
      <Link href="/blog" aria-current={isBlogPage ? "page" : undefined}>
        Blog
      </Link>
    </nav>
  );
};
```

이렇게 나누면 Header의 정적인 부분은 서버 컴포넌트로 유지하고, 현재 경로에 따라 바뀌는 nav 상태만 클라이언트에서 처리한다.

## `aria-hidden`은 무엇을 숨기는가?

`aria-hidden="true"`는 요소를 화면에서 숨기는 속성이 아닙니다. 접근성 트리에서 제외하는 속성입니다.

장식용 아이콘이나 반복 배지처럼 보조 기술이 읽으면 오히려 방해되는 요소에 사용합니다.

```tsx
<BookOpen className="size-4" aria-hidden="true" />
<span>Blog</span>
```

이 경우 아이콘은 장식이고 실제 이름은 `Blog`입니다. 아이콘까지 읽히면 이름이 중복되거나 의미가 흐려질 수 있습니다.

Resume 페이지의 작은 bullet dot, Header의 `PG` 배지처럼 시각적 리듬을 위한 요소도 같은 기준으로 숨긴다.

다만 `aria-hidden`은 조심해야 합니다.

```txt
중요한 텍스트에 붙이면 안 된다.
focus 가능한 요소에 붙이면 안 된다.
focus 가능한 요소의 부모에 붙이는 것도 위험하다.
```

숨기는 순간 보조 기술 사용자에게는 그 정보가 없는 것처럼 전달됩니다. 그래서 “읽히면 방해되는 장식인가?”를 먼저 확인하고 사용해야 합니다.

## `aria-live`는 언제 필요할까?

`aria-live`는 화면 내용이 동적으로 바뀔 때 보조 기술 사용자에게 변경을 알리는 영역입니다.

예를 들어 검색어를 입력할 때 결과 개수가 바뀌는 UI가 있다고 가정합니다.

화면을 보는 사용자는 결과 개수 변경을 본다. 스크린 리더 사용자는 focus가 검색 input에 있으면 결과 영역 변경을 바로 알기 어렵다.

이럴 때 결과 안내에 `aria-live="polite"`를 둘 수 있습니다.

```tsx
<p aria-live="polite">검색 결과 3개</p>
```

`polite`는 사용자가 현재 듣고 있는 내용을 바로 끊지 않고 적절한 시점에 변경을 알려줍니다. 검색 결과 개수, 저장 완료 메시지처럼 중요하지만 긴급하지 않은 안내에 어울립니다.

반대로 `assertive`는 현재 읽는 내용을 끊는다. 오류, 세션 만료, 결제 시간 만료처럼 즉시 알아야 하는 상황에만 제한한다.

예시 프로젝트의 검색은 아직 단순한 제목 필터입니다. 현재는 결과 영역이 바로 아래에 있고 화면 변화가 크지 않아 별도 `aria-live`를 적용하지 않았습니다. 다만 검색 결과 개수를 명시적으로 보여주는 UI를 추가한다면 `aria-live="polite"`를 함께 적용할 후보가 됩니다.

## skip link는 왜 필요할까?

공통 Header는 모든 페이지에 반복됩니다.

마우스 사용자는 본문을 바로 클릭하거나 스크롤한다. 키보드 사용자는 페이지에 들어올 때마다 Header 링크를 순서대로 지난다.

반복 영역을 건너뛰고 본문으로 이동하는 skip link를 추가한다.

```tsx
<a href="#main-content">본문으로 바로 이동</a>

<main id="main-content">
  {children}
</main>
```

실제 layout에서는 평소에 숨기고, focus를 받았을 때만 보이게 만든다.

```tsx
<a
  href="#main-content"
  className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
>
  본문으로 바로 이동
</a>
```

핵심은 “반복되는 Header를 매번 지나지 않아도 된다”는 점입니다. WCAG의 Bypass Blocks 기준도 반복되는 블록을 건너뛰어 주요 콘텐츠에 더 직접 접근할 수 있어야 한다는 문제를 다룹니다.

## 색상과 시각 정보만 믿지 않기

이 글의 중심은 키보드, 스크린 리더, ARIA지만, 접근성에서 색상도 빼놓기 어렵습니다.

현재 페이지를 파란색으로만 표시하면 색을 구분하기 어려운 사용자는 상태를 놓칠 수 있습니다. 그래서 Header의 현재 페이지 링크는 색상만 바꾸지 않고, font weight와 underline도 함께 사용합니다.

```tsx
const navLinkClass =
  "aria-[current=page]:font-semibold aria-[current=page]:underline";
```

focus 상태도 마찬가지다. 색상 변화만 쓰지 않고 outline과 offset처럼 형태가 분명한 표시를 사용한다.

접근성 점검 질문은 “보이는 사람에게만 전달되는 정보가 있는가?”다. 색상, 아이콘, 위치, 굵기만으로 의미를 전달한다면 텍스트나 HTML 상태로 보완한다.

## 예시 프로젝트에 적용한 것

이 글의 예시 프로젝트에 적용한 접근성 기준은 다음과 같습니다.

- 공통 Header는 `header`, 주요 메뉴는 `nav`로 구성합니다.
- 페이지 본문은 root layout의 `main#main-content` 안에 들어갑니다.
- Blog detail의 글 전체는 독립 콘텐츠이므로 `article`로 감쌉니다.
- Header의 현재 페이지 링크에는 `aria-current="page"`를 붙입니다.
- pathname이 필요한 `HeaderNav`만 클라이언트 컴포넌트로 분리합니다.
- 내부 이동은 `Link`, 외부 URL과 이메일, 전화는 `a`를 사용합니다.
- GitHub, 이메일, 전화, 외부 프로젝트 링크에는 필요한 경우 accessible name을 보강합니다.
- lucide 아이콘, `PG` 배지, bullet dot처럼 장식용 요소는 `aria-hidden="true"`로 숨깁니다.
- 검색 input은 `label`을 연결해 accessible name을 제공합니다.
- 반복 Header를 건너뛸 수 있도록 skip link와 `main#main-content`를 연결합니다.
- focus 가능한 주요 링크에는 `focus-visible` 스타일을 적용합니다.
- 현재 페이지 상태는 색상뿐 아니라 underline과 굵기로도 구분합니다.

## 적용하지 않은 것과 보류한 것

접근성은 많이 붙이는 작업이 아니라 필요한 정보를 정확히 전달하는 작업이다. 일부 속성이나 구현은 필요해질 때까지 보류한다.

`aria-live`는 개념만 정리했고 현재 검색 UI에는 적용하지 않았다. 결과 개수 안내를 화면에 추가할 때 함께 적용한다.

모든 링크에 `aria-label`을 붙이지 않는다. 링크 텍스트만으로 목적이 충분하면 visible text를 accessible name으로 쓴다.

`tabindex`도 추가하지 않았습니다. 현재 구조에서는 native link와 input만으로 자연스러운 Tab 순서가 만들어집니다. 임의로 `tabindex`를 넣으면 DOM 순서와 focus 순서가 어긋날 수 있습니다.

커스텀 role도 기본 선택지가 아닙니다. `button`, `a`, `nav`, `main`, `article`, `label` 같은 기본 HTML로 표현할 수 있는 부분은 HTML을 우선해야 합니다.

## 점검 기준

접근성을 점검할 때는 다음 기준을 확인합니다.

- 이동 동작은 link, 실행 동작은 button으로 만든다.
- 링크나 버튼 이름만 들어도 목적이 드러나야 한다.
- input에는 placeholder가 아니라 안정적인 label을 제공한다.
- 키보드 사용자가 현재 focus 위치를 확인해야 한다.
- focus 순서는 화면의 읽는 순서와 자연스럽게 맞아야 한다.
- 현재 페이지 상태를 시각적으로만 표현하지 않는다.
- 장식용 아이콘이나 배지가 불필요하게 읽히지 않게 한다.
- 중요한 텍스트나 focus 가능한 요소에 `aria-hidden`을 붙이지 않는다.
- 동적으로 바뀌는 중요한 정보는 보조 기술에도 전달한다.
- 공통 Header처럼 반복되는 영역은 건너뛸 수 있게 한다.
- 색상만으로 상태나 의미를 전달하지 않는다.

이 질문들은 접근성 점수 체크리스트가 아니라 HTML과 UI의 의미가 실제 사용자 동작과 맞는지 확인하는 기준이다.

## 정리

접근성은 별도의 장식 작업이 아니라 HTML을 정확히 쓰는 일에서 시작합니다.

먼저 semantic HTML, link/button 구분, label 연결, focus 표시처럼 기본 HTML과 CSS로 해결할 수 있는 것을 처리합니다. 그다음 HTML만으로 부족한 현재 상태, 보이지 않는 이름, 장식 요소 숨김, 동적 변경 안내를 ARIA로 보완합니다.

기준은 명확합니다.

```txt
HTML로 해결할 수 있으면 HTML을 쓴다.
보이는 텍스트로 이름을 줄 수 있으면 보이는 텍스트를 쓴다.
ARIA는 부족한 이름, 상태, 변경 사항을 보완할 때만 쓴다.
```

접근성은 한 번 체크하고 끝나는 항목이 아니라, UI를 만들 때마다 다시 확인해야 하는 기본기입니다. 검색 결과 개수, 관리자 폼, 에러 메시지, 비동기 저장 상태 같은 기능이 추가되면 `aria-live`, form validation, error message 연결까지 이어서 점검해야 합니다.

## 참고 링크

- [W3C WAI - Introduction to Web Accessibility](https://www.w3.org/WAI/fundamentals/accessibility-intro/)
- [W3C WAI - Understanding SC 2.4.1 Bypass Blocks](https://www.w3.org/WAI/WCAG22/Understanding/bypass-blocks)
- [W3C WAI - Understanding SC 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG22/Understanding/name-role-value.html)
- [MDN - ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)
- [MDN - :focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible)
- [MDN - aria-current](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-current)
- [MDN - aria-label](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label)
- [MDN - aria-hidden](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-hidden)
- [MDN - aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-live)
