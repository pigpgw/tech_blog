---
slug: "semantic-html"
title: "HTML 문서 구조와 Semantic Tag"
description: "HTML 문서 구조, semantic tag, section과 article 선택 기준을 프론트엔드 기본기 관점에서 정리합니다."
publishedAt: "2026-05-11"
category: "Frontend"
---

## 글의 배경

AI를 활용하면 퍼블리싱 속도가 올라간다. 다만 검수 기준이 없으면 결과물의 품질은 쉽게 흔들린다. 긴 프롬프트보다 중요한 것은 HTML, 접근성, 반응형 같은 기본기를 명확한 기준으로 정리하는 일이다.

이 프로젝트는 AI 퍼블리싱과 Skill 활용을 실험하면서 프론트엔드 기본기를 문서화한다. 목적은 “AI로 만들었다”가 아니라, AI가 만든 결과를 어떤 기준으로 확인하고 고칠지 정하는 것이다. 기준이 쌓이면 개발 생산성, 코드 품질, 지식 공유가 함께 개선된다.

시맨틱 HTML은 그 기준 중 하나다. `header`, `nav`, `main`, `section`, `article`은 `div`를 대체하는 이름표가 아니다. 각 영역의 역할을 HTML 구조에 남기는 태그다. 브라우저, 검색 엔진, 스크린 리더, 개발자는 이 구조를 기준으로 문서를 이해한다.

화면을 보는 사용자는 글자 크기, 여백, 위치로 Header와 본문을 구분한다. 보조 기술은 HTML에 남겨진 heading, landmark, link, form control을 기준으로 페이지를 탐색한다. 시맨틱 태그는 접근성 점수를 위한 장식이 아니라, 콘텐츠 구조를 프로그램이 이해하도록 만드는 기본기다.

이 글은 HTML 문서 구조, Next.js App Router의 기본 HTML 처리, semantic tag 선택 기준을 기본기 가이드처럼 정리합니다.

## 기본 페이지 구조

예시 프로젝트의 페이지 구조는 다음과 같다.

```tsx
<body>
  <a href="#main-content">본문으로 바로 이동</a>
  <div>
    <Header />
    <main id="main-content">{children}</main>
  </div>
</body>
```

핵심은 Header와 본문 분리다.

Header는 모든 페이지에 반복되는 공통 탐색 영역이다. `main`은 현재 페이지의 핵심 본문이다. Header는 `main` 밖에 두고, 페이지별 내용만 `main` 안에 넣는다.

이 구조는 “반복되는 상단 메뉴”와 “현재 페이지의 핵심 콘텐츠”를 분리한다.

## HTML 문서 기본 뼈대

HTML 문서의 기본 뼈대는 브라우저가 문서를 어떤 기준으로 해석해야 하는지 알려줍니다. 순수 HTML 파일을 작성할 때는 다음 구조가 기본입니다. 에디터에서 `!` 단축키를 사용하면 비슷한 HTML 보일러플레이트를 빠르게 만들 수 있습니다.

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>박건우 Tech Blog</title>
  </head>
  <body></body>
</html>
```

Next.js App Router에서는 이 구조를 그대로 `index.html`에 작성하지 않습니다. 대신 `app/layout.tsx`의 root layout이 전체 문서의 바깥 구조를 담당합니다.

```tsx
<html lang="ko" className="h-full antialiased">
  <body>{children}</body>
</html>
```

구분하면 다음과 같습니다.

| 항목                     | Next.js App Router에서의 처리                                                     |
| ------------------------ | --------------------------------------------------------------------------------- |
| `<!DOCTYPE html>`        | 개발자가 layout에 직접 쓰지 않는다. Next.js가 렌더링 결과의 문서 선언을 처리한다. |
| `<html>`, `<body>`       | root layout에서 반드시 정의한다. Next.js가 자동으로 만들어주지 않는다.            |
| `lang="ko"`              | 프로젝트가 직접 정한다. 한국어 중심 사이트라면 `ko`로 지정한다.                   |
| `<meta charset>`         | Next.js Metadata API가 기본 meta 태그로 처리한다.                                 |
| `<meta name="viewport">` | Next.js가 기본 viewport meta를 추가한다. 보통 직접 설정하지 않아도 된다.          |
| `<title>`, `description` | `metadata` 또는 `generateMetadata`로 관리한다.                                    |

따라서 “Next가 해주는 것”과 “프로젝트가 직접 정하는 것”을 섞어 말하면 안 됩니다. `charset`과 기본 `viewport`는 Next가 기본으로 처리하지만, root layout의 `<html>`, `<body>` 구조와 `lang` 값은 프로젝트 코드에서 명시해야 합니다.

## `DOCTYPE`이 필요한 이유

`DOCTYPE`은 이 문서가 HTML5 문서라는 것을 브라우저에 알려주는 선언입니다.

```html
<!DOCTYPE html>
```

이 선언이 있으면 브라우저는 문서를 표준 모드로 렌더링한다. 없거나 잘못되면 오래된 웹사이트와의 호환을 위한 Quirks Mode로 동작하고, CSS 박스 모델이나 레이아웃 계산이 예상과 달라진다.

즉 `DOCTYPE`은 화면에 직접 보이는 태그는 아니지만, 브라우저가 “이 문서를 어떤 규칙으로 해석할지” 정하는 출발점입니다. Next.js App Router 프로젝트에서는 이 선언을 layout에 직접 작성하지 않고, 프레임워크가 생성하는 HTML 문서 출력에 맡깁니다.

## `html lang="ko"`가 필요한 이유

`lang`은 문서의 주 언어를 알려주는 속성입니다.

```html
<html lang="ko"></html>
```

`create-next-app`이나 공식 예시 코드에는 `lang="en"` 형태가 자주 등장한다. 이것은 영어 예시일 뿐, 모든 프로젝트의 정답이 아니다. 한국어 콘텐츠가 중심인 사이트라면 root layout의 `<html>`에 `lang="ko"`를 명시한다.

`lang`이 필요한 이유는 단순히 SEO 때문만은 아닙니다.

- 스크린 리더가 한국어 문장을 한국어 발음 규칙으로 읽는다.
- 브라우저 번역 기능이 원문 언어를 더 정확히 판단한다.
- 검색 엔진이 페이지의 언어를 이해하는 데 도움이 됩니다.

한국어 페이지에 `lang="en"`이 남아 있으면 보조 기술이 한국어 문장을 영어 발음 규칙으로 읽는다. `html lang`은 기본 접근성 설정이다.

## `meta charset`과 `viewport`

`charset`은 문자를 어떤 방식으로 해석할지 알려줍니다.

```html
<meta charset="UTF-8" />
```

UTF-8은 한글, 영어, 특수문자, 여러 나라의 문자를 표현한다. 잘못 설정되면 한글이 깨진다.

순수 HTML에서는 직접 `<meta charset="UTF-8" />`를 작성합니다. Next.js App Router에서는 route가 metadata를 따로 정의하지 않아도 기본 `meta charset`이 추가됩니다.

`viewport`는 모바일 화면에서 페이지 너비와 초기 배율을 제어합니다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

이 설정이 없으면 모바일 브라우저가 페이지를 데스크톱 폭으로 렌더링한 뒤 축소한다. 반응형 CSS를 작성해도 모바일 화면에서 의도한 크기로 보이지 않는다.

Next.js App Router는 기본 viewport meta도 추가한다. 특별한 theme color나 viewport 정책이 필요할 때만 `viewport` export 또는 `generateViewport`를 사용한다.

## Semantic Tag란?

semantic tag는 HTML에 콘텐츠의 역할을 드러내는 태그입니다.

다음 코드는 화면으로 보면 Header, 메뉴, 본문, Footer처럼 보인다.

```html
<div class="header"></div>
<div class="nav"></div>
<div class="content"></div>
<div class="footer"></div>
```

하지만 HTML 자체만 보면 모두 `div`다. 역할은 class 이름을 읽어야 추측한다.

반면 아래 구조는 태그만 봐도 의미가 더 분명합니다.

```html
<header></header>
<nav></nav>
<main></main>
<footer></footer>
```

semantic tag의 목적은 태그를 더 멋지게 보이게 만드는 것이 아니라, 문서의 구조를 HTML 자체에 표현하는 것입니다.

## 자주 쓰는 태그와 선택 기준

| 태그      | 의미                           | 예시 프로젝트에서의 사용            |
| --------- | ------------------------------ | ----------------------------------- |
| `header`  | 페이지나 섹션의 소개 영역      | 공통 Header, 글 상세의 글 머리말    |
| `nav`     | 탐색 링크 묶음                 | Home, Blog, Resume, GitHub 메뉴     |
| `main`    | 현재 페이지의 핵심 본문        | root layout의 `main#main-content`   |
| `section` | 하나의 주제를 가진 콘텐츠 구역 | Blog list의 “전체 글” 영역          |
| `article` | 독립 콘텐츠                    | BlogPostCard, Blog detail 전체      |
| `aside`   | 본문과 간접 관련된 보조 정보   | 나중에 관련 글 목록을 둘 때         |
| `footer`  | 페이지나 섹션의 하단 정보      | 저작권, 작성자, 관련 링크           |
| `div`     | 의미 없는 범용 컨테이너        | 레이아웃, 여백, 카드 스타일 wrapper |

기준은 “이 영역이 문서 구조상 의미를 가지는가?”다. 의미가 있으면 semantic tag를 쓰고, 스타일링이나 배치를 위한 wrapper라면 `div`를 쓴다.

## Header와 Nav

공통 Header는 사이트의 반복되는 상단 영역입니다.

```tsx
<header>
  <Link href="/">Park Gunwoo</Link>
  <nav aria-label="주요 메뉴">
    <Link href="/">Home</Link>
    <Link href="/blog">Blog</Link>
    <Link href="/resume">Resume</Link>
    <a href="https://github.com/pigpgw">GitHub</a>
  </nav>
</header>
```

여기서 `header`는 페이지 상단 소개 영역이고, `nav`는 주요 페이지로 이동하는 링크 묶음입니다.

링크가 여러 개 있다고 항상 `nav`를 쓰지는 않는다. 본문 안의 참고 링크나 카드 내부의 단일 링크는 탐색 메뉴가 아니다. 예시 프로젝트의 Header 링크는 사이트의 기본 이동 메뉴이므로 `nav`가 맞다.

`GitHub`는 외부 URL로 이동하므로 Next.js `Link`가 아니라 일반 `a`를 사용합니다.

```tsx
<a href="https://github.com/pigpgw" target="_blank" rel="noopener noreferrer">
  GitHub
</a>
```

이처럼 semantic HTML은 태그 하나만 고르는 문제가 아니라, 링크의 목적과 브라우저 기본 동작까지 같이 맞추는 일입니다.

## Main은 왜 한 번만 두는가?

`main`은 현재 페이지의 핵심 콘텐츠입니다.

예시 프로젝트에서는 root layout에 `main`을 한 번만 둡니다.

```tsx
<Header />
<main id="main-content" className="flex flex-1 flex-col">
  {children}
</main>
```

이렇게 하면 Home, Resume, Blog list, Blog detail의 내용이 모두 같은 `main` 안에 들어갑니다.

각 페이지 컴포넌트에서 다시 `main`을 만들지 않는 이유는 중첩된 `main`이 생기지 않게 하기 위해서입니다. 페이지별 최상위 wrapper는 의미 있는 본문 영역이라기보다 레이아웃 역할이므로 `div`, `section`, `article` 중 문맥에 맞는 태그를 사용합니다.

예를 들어 Resume 페이지는 이미 root layout의 `main` 안에 있다. 페이지 최상위는 `div`로 두고, 내부에서 “이력 상세 정보”처럼 의미 있는 구역만 `section`으로 나눈다.

## Section은 주제 구역이다

`section`은 하나의 주제를 가진 구역입니다.

```tsx
<section aria-labelledby="blog-list" className="mt-8 sm:mt-10">
  <h2 id="blog-list">전체 글</h2>
  {/* 글 목록 */}
</section>
```

Blog list에서 “전체 글”은 하나의 주제 구역입니다. 그래서 `section`으로 감싸고, 제목과 연결합니다.

반대로 카드 내부에서 여백을 주기 위한 wrapper는 `section`이 아닙니다.

```tsx
<div className="mt-5">
  <h2>{title}</h2>
  <p>{description}</p>
</div>
```

이 `div`는 문서의 주제 구역을 만들기 위한 것이 아니라 카드 내부 배치를 위한 wrapper입니다. 이런 곳까지 `section`으로 바꾸면 의미가 더 좋아지는 것이 아니라, 필요 없는 문서 구역이 늘어납니다.

## Article은 독립 콘텐츠다

`article`은 독립적으로 가져가도 의미가 유지되는 콘텐츠입니다.

Blog list의 글 카드에는 `article`을 사용한다.

```tsx
<Link href={href} className="block">
  <article>
    <h2>{title}</h2>
    <p>{description}</p>
  </article>
</Link>
```

이 카드 하나는 제목, 설명, 발행일, 카테고리를 가진 글 요약입니다. 목록에서 떼어내도 “하나의 글 소개”로 의미가 유지됩니다. 그래서 `article`이 자연스럽습니다.

Blog detail에서는 글 전체가 독립 콘텐츠이므로 최상위를 `article`로 감쌉니다.

```tsx
<article className="flex flex-1 flex-col py-10 sm:py-14">
  <header>
    <h1>{blogItem.title}</h1>
  </header>
  <div className="blog-markdown">{blogItem.content}</div>
</article>
```

이 구조에서 `article`은 글 전체, `header`는 글 제목과 메타 정보, 본문 wrapper는 Markdown 렌더링 영역입니다.

## Section과 Article 선택 기준

선택 기준은 다음과 같다.

```txt
여러 콘텐츠를 묶는 주제 구역
-> section

하나를 따로 떼어도 의미가 유지되는 독립 콘텐츠
-> article

여백, 배치, 배경, 그림자를 위한 wrapper
-> div
```

이 기준으로 보면 Blog list는 다음처럼 나뉩니다.

```txt
Blog list page
-> section: 전체 글 목록이라는 주제 영역
-> article: 각 글 카드
-> div: 카드 내부 레이아웃 wrapper
```

Blog detail 구조는 다음과 같다.

```txt
Blog detail page
-> article: 글 전체
-> header: 글 제목과 메타 정보
-> div: Markdown 본문 스타일링 wrapper
```

## Semantic Tag만으로 충분하지는 않다

semantic tag는 접근성의 출발점입니다. 하지만 이것만으로 접근성이 완성되지는 않습니다.

예를 들어 Header에 `nav`를 썼다고 해서 현재 페이지가 어딘지 자동으로 알려주지는 않습니다. 그래서 현재 페이지 링크에는 `aria-current="page"`를 따로 적용해야 합니다.

```tsx
<Link href="/blog" aria-current={isBlogPage ? "page" : undefined}>
  Blog
</Link>
```

아이콘이 들어간 링크에서 아이콘이 장식이라면 `aria-hidden`으로 숨긴다.

```tsx
<BookOpen className="size-4" aria-hidden="true" />
<span>Blog</span>
```

적용 순서는 다음과 같다.

```txt
1. 먼저 의미에 맞는 HTML 태그를 쓴다.
2. 링크와 버튼의 동작을 구분한다.
3. label, heading, link text처럼 기본 HTML로 이름을 제공한다.
4. HTML만으로 부족한 상태나 이름은 ARIA로 보완한다.
```

ARIA와 키보드 접근성은 별도 글에서 더 자세히 다룹니다.

## 정리

semantic HTML의 핵심은 `div`를 없애는 것이 아니라, 콘텐츠의 역할을 HTML 구조에 드러내는 것입니다.

예시 프로젝트 기준으로는 공통 Header와 페이지 본문을 분리하고, `main`을 root layout에 한 번 두고, Blog list는 `section`, 글 카드는 `article`, 글 상세는 전체를 `article`로 구성합니다.

태그를 고를 때는 “이 태그가 이 영역의 의미를 설명하는가”를 먼저 확인한다. 의미가 있으면 semantic tag, 단순 배치라면 `div`를 사용한다.

## 참고 링크

- [MDN - HTML elements reference](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements)
- [MDN - Doctype](https://developer.mozilla.org/en-US/docs/Glossary/Doctype)
- [MDN - lang HTML global attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/lang)
- [MDN - Character encoding](https://developer.mozilla.org/en-US/docs/Glossary/Character_encoding)
- [MDN - meta name viewport](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/name/viewport)
- [Next.js - layout.js](https://nextjs.org/docs/app/api-reference/file-conventions/layout)
- [Next.js - generateMetadata](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Next.js - generateViewport](https://nextjs.org/docs/app/api-reference/functions/generate-viewport)
