---
slug: "browser-rendering-pipeline"
title: "브라우저 렌더링 파이프라인 깊게 알아보기"
description: "HTML, CSS, JavaScript가 화면으로 바뀌는 과정을 DOM, style, layout, paint, layerize, composite 흐름으로 정리합니다."
publishedAt: "2026-04-25"
category: "Frontend"
---

## 글의 배경

브라우저 렌더링 과정은 보통 "DOM 트리와 CSSOM을 합쳐 render tree를 만들고, layout과 paint를 거쳐 화면에 그린다"로 요약된다.

이 요약만으로는 layout, paint, composite가 각각 무엇을 다시 계산하는지 설명하기 어렵다. `transform`이 애니메이션에 자주 쓰이는 이유도 렌더링 단계와 연결해서 이해해야 한다.

이 글은 HTML, CSS, JavaScript가 화면으로 바뀌는 과정을 단계별로 정리하고, 각 단계가 프론트엔드 성능과 어떤 관계를 가지는지 설명한다.

## 큰 흐름

브라우저 렌더링 파이프라인에서 파이프라인은 여러 작업이 순서대로 이어지는 흐름을 뜻한다. 여기서는 HTML, CSS, JavaScript가 실제 화면으로 바뀌기까지 브라우저가 거치는 작업 흐름을 의미한다.

한 문장으로 정리하면 다음과 같다.

```txt
HTML, CSS, JavaScript를 읽고
화면에 그릴 구조와 스타일을 계산한 뒤
픽셀로 바꿔서 사용자 화면에 합성하는 과정
```

단계는 다음 흐름으로 나뉜다.

```txt
Parse -> Style -> Layout -> Paint -> Layerize -> Composite
```

각 단계의 역할은 다음과 같다.

- Parse: HTML을 브라우저가 이해할 수 있는 구조로 바꿉니다.
- Style: 각 요소에 적용될 CSS 결과를 계산합니다.
- Layout: 각 요소의 위치와 크기를 계산합니다.
- Paint: 무엇을 어떤 순서로 그릴지 명령을 만듭니다.
- Layerize: 필요한 부분을 여러 레이어로 나눕니다.
- Composite: 레이어를 합쳐 최종 화면으로 만듭니다.

위 흐름은 큰 단위의 요약이다. Chromium RenderingNG 공식 문서는 렌더링 단계를 `Animate`, `Style`, `Layout`, `Pre-paint`, `Scroll`, `Paint`, `Commit`, `Layerize`, `Raster`, `Activate`, `Aggregate`, `Draw`처럼 더 세분화한다. 이 글은 animation과 scroll의 세부 단계보다 HTML 파싱, 스타일 계산, layout, paint, layer, raster, composite 흐름에 집중한다.

HTML은 문서 구조가 되고, CSS는 스타일 규칙이 되고, JavaScript는 중간에 DOM이나 스타일을 바꿀 수 있습니다. 브라우저는 이 정보를 모아서 어떤 요소를 어디에, 어떤 크기로, 어떤 색으로 그릴지 결정합니다.

여기서 중요한 점은 모든 변경이 같은 비용을 만들지 않는다는 것입니다. 어떤 변경은 layout부터 다시 계산하게 만들고, 어떤 변경은 paint만 다시 하게 만들며, 어떤 변경은 이미 만들어진 레이어를 합성하는 composite 단계에서 끝날 수 있습니다.

## 브라우저는 여러 프로세스로 나뉘어 동작한다

렌더링 과정을 이해하려면 Chromium, 프로세스, GPU의 역할을 먼저 구분해야 한다.

Chrome은 Chromium 오픈소스 브라우저 프로젝트를 기반으로 만들어졌다. Microsoft Edge, 네이버 웨일, 삼성 인터넷도 Chromium을 기반으로 한다. Chromium 구조는 최신 브라우저가 화면을 처리하는 방식을 이해하는 기준이 된다.

Chromium 기반 브라우저는 하나의 큰 프로그램처럼 보이지만 내부적으로는 여러 프로세스로 나뉘어 동작한다. 프로세스는 실행 중인 프로그램의 독립 작업 공간이다. 브라우저는 안정성과 성능을 위해 일을 프로세스 단위로 나눈다.

예를 들어 하나의 탭에서 무거운 JavaScript가 실행되거나 오류가 나더라도, 다른 탭과 브라우저 전체가 최대한 영향을 덜 받도록 만들 수 있습니다.

대표적으로 다음 역할이 있습니다.

- 브라우저 프로세스: 주소창, 탭, 북마크, 파일 접근, 네트워크 요청 같은 브라우저 전체 기능을 관리합니다.
- 렌더러 프로세스: 각 탭의 웹 페이지를 해석하고 화면에 그릴 준비를 합니다.
- GPU 프로세스: 렌더러가 만든 그리기 명령을 실제 화면 출력에 가깝게 처리합니다.

이 글에서 특히 많이 보게 되는 곳은 렌더러 프로세스입니다. 렌더러 프로세스 안에서 HTML 파싱, CSS 계산, JavaScript 실행, layout, paint 같은 일이 일어납니다.

렌더러 프로세스 안에서도 일을 처리하는 흐름이 나뉩니다. 이 실행 흐름을 스레드라고 부릅니다. 메인 스레드는 HTML 파싱, JavaScript 실행, layout, paint처럼 중요한 일을 많이 처리하고, Compositor Thread는 만들어진 레이어를 합성해 화면에 내보내는 일을 돕습니다.

GPU는 그래픽 처리에 특화된 장치다. CPU가 일반 계산을 처리한다면, GPU는 픽셀을 그리고 레이어를 합성하는 작업에 강하다. 브라우저는 GPU를 활용해 스크롤과 애니메이션 같은 화면 작업을 더 부드럽게 처리한다.

## 1. Parse: HTML을 DOM으로 바꾼다

Parse는 "읽고 해석한다"는 뜻으로 보면 이해하기 쉬웠습니다. 브라우저는 서버에서 받은 HTML을 위에서 아래로 읽습니다. 그리고 HTML 태그를 객체 형태로 바꿔 트리 구조를 만듭니다. 이 트리가 DOM입니다.

예를 들어 다음 HTML이 있다고 해보겠습니다.

```html
<article>
  <h1>브라우저 렌더링</h1>
  <p>HTML은 DOM 트리로 변환됩니다.</p>
</article>
```

브라우저는 이 코드를 단순한 문자열로 두지 않고, `article` 아래에 `h1`과 `p`가 있는 트리 구조로 이해합니다.

중요한 점은 HTML을 읽는 중간에 일반 `script`를 만나면 JavaScript 다운로드와 실행 때문에 HTML 파싱이 멈출 수 있다는 것입니다. HTML 파싱이 멈추면 DOM 생성도 늦어지고, DOM 생성이 늦어지면 화면을 그리기 시작하는 시점도 밀릴 수 있습니다.

```html
<script src="/app.js"></script>
```

`defer`를 사용하면 브라우저는 HTML 파싱을 계속 진행하면서 JavaScript 파일을 미리 다운로드하고, DOM 생성이 끝난 뒤 실행한다.

```html
<script defer src="/app.js"></script>
```

`async`는 HTML 파싱을 막지 않고 다운로드하지만, 다운로드가 끝나는 즉시 실행됩니다. 그래서 실행 순서가 중요하지 않은 광고나 분석 스크립트에 더 어울립니다.

```html
<script async src="/analytics.js"></script>
```

DOM을 조작하고 실행 순서가 중요한 스크립트에는 `defer`를 사용한다. 독립적으로 실행되는 광고나 분석 스크립트에는 `async`를 검토한다.

## 2. Style: CSS를 계산한다

Style 단계는 "이 요소가 최종적으로 어떤 모양을 가져야 하는지"를 계산하는 단계입니다. HTML만으로는 화면을 어떻게 그릴지 알 수 없습니다. 브라우저는 CSS를 읽고 각 DOM 요소에 어떤 스타일이 적용되는지 계산합니다.

이때 브라우저는 다음 정보를 모두 고려합니다.

- 브라우저 기본 스타일
- 외부 CSS 파일
- style 태그
- inline style
- selector 우선순위
- 상속되는 속성

결과적으로 각 요소마다 최종 스타일이 계산된다. 이 계산 결과를 CSSOM이라고 부른다. CSSOM은 CSS 규칙을 브라우저가 다루는 객체 모델로 만든 구조다. 개발자가 DOM처럼 직접 탐색하는 대상이라기보다, 브라우저가 최종 스타일을 계산하기 위해 사용하는 내부 구조다.

`getComputedStyle`은 브라우저가 계산을 끝낸 최종 스타일 값을 JavaScript에서 확인하는 메서드다. CSS에서 직접 `width`를 지정하지 않아도 브라우저가 계산한 실제 너비나 색상 값을 확인한다.

```js
const card = document.querySelector(".card");
const style = getComputedStyle(card);

console.log(style.width);
console.log(style.color);
```

`getComputedStyle`로 확인하는 값은 "CSS 파일에 적어둔 값"이 아니라 브라우저가 상속, 우선순위, 기본 스타일을 모두 계산한 결과다.

CSS는 렌더링을 막을 수 있습니다. 브라우저는 스타일을 모르면 화면을 정확히 그릴 수 없기 때문에, 중요한 CSS 파일을 늦게 받으면 초기 화면 표시도 늦어질 수 있습니다.

## 3. Layout: 요소의 위치와 크기를 계산한다

Layout은 "어디에, 얼마나 크게 놓을지"를 계산하는 단계입니다. 스타일을 알았다고 바로 화면을 그릴 수 있는 것은 아닙니다. 브라우저는 각 요소가 화면의 어디에 놓이고, 얼마나 큰지 계산해야 합니다.

예를 들어 다음 CSS는 layout에 영향을 줍니다.

```css
.card {
  width: 320px;
  padding: 24px;
  margin-top: 16px;
}
```

`width`, `height`, `padding`, `margin`, `display`, `position` 같은 속성은 요소의 크기와 위치를 바꾼다. 이런 값이 바뀌면 브라우저는 layout을 다시 계산한다.

이런 재계산을 흔히 reflow라고 부릅니다.

예를 들면 다음 속성 변경은 layout을 다시 계산하게 만들 수 있습니다.

- `width`
- `height`
- `margin`
- `padding`
- `display`
- `position`
- `top`, `left`

layout 단계에서는 화면에 실제로 표시되는 요소를 중심으로 layout tree가 만들어집니다. 예를 들어 `display: none`인 요소는 화면에 표시되지 않으므로 layout tree에 포함되지 않습니다. 반면 `visibility: hidden`은 보이지 않을 뿐 공간은 차지하기 때문에 layout 계산에는 영향을 줍니다.

이미지도 layout과 연결됩니다. 이미지의 `width`와 `height`를 미리 정하지 않으면 이미지가 늦게 로드되었을 때 주변 콘텐츠가 밀릴 수 있습니다. 이것이 CLS가 발생하는 대표적인 이유입니다.

```html
<img src="/thumbnail.png" width="640" height="360" alt="게시글 썸네일" />
```

브라우저는 이미지가 완전히 로드되기 전에도 필요한 공간을 미리 확보할 수 있고, 화면이 갑자기 밀리는 문제를 줄일 수 있습니다.

## 4. Pre-Paint: 그리기 전에 필요한 정보를 정리한다

Pre-Paint는 실제 그리기 전에 필요한 정보를 정리하는 단계다. layout이 끝나면 브라우저는 스크롤, clip, transform, opacity처럼 이후 단계에서 쓰이는 정보를 정리한다.

이 단계는 개발자가 직접 다루는 API는 아니지만, paint와 composite를 이해하는 중간 단계다.

## 5. Paint: 무엇을 어떤 순서로 그릴지 명령을 만든다

Paint는 바로 픽셀을 찍는 단계가 아니다. 무엇을 어떤 순서로 그릴지 명령 목록을 만드는 단계다.

예를 들어 다음 명령이 만들어진다.

```txt
배경을 흰색으로 칠한다.
테두리를 그린다.
텍스트를 그린다.
이미지를 그린다.
```

`color`, `background`, `border`, `box-shadow` 같은 속성은 paint 비용과 연결된다. 요소의 색이나 그림자만 바뀌면 layout은 유지되지만 repaint가 발생한다.

repaint는 위치나 크기는 그대로인데 색, 배경, 그림자처럼 다시 칠해야 하는 경우입니다. 예를 들면 다음 속성 변경이 관련됩니다.

- `color`
- `background-color`
- `border-color`
- `box-shadow`

layout보다는 가볍지만, 여전히 다시 그리는 비용이 있습니다.

## 6. Commit: 메인 스레드의 결과를 합성 스레드로 넘긴다

Commit은 메인 스레드에서 만든 결과를 다음 작업 흐름으로 넘기는 단계다. layout, pre-paint, paint까지의 결과는 렌더러 프로세스의 메인 스레드에서 만들어진다. 이후 브라우저는 이 결과를 Compositor Thread로 넘긴다.

이렇게 나누는 이유는 메인 스레드가 JavaScript 실행 등으로 바쁘더라도, 합성 작업은 별도 흐름에서 처리할 수 있게 하기 위해서입니다.

## 7. Layerize: 화면을 여러 레이어로 나눈다

Layerize는 화면을 여러 층으로 나누는 단계입니다. 브라우저는 모든 것을 하나의 큰 종이에 그리지 않습니다. 필요한 경우 display list를 여러 composited layer로 나눕니다.

대표적으로 다음과 같은 요소는 별도 레이어가 될 수 있습니다.

- `position: fixed`
- `transform`
- `opacity`
- `will-change`
- 3D transform

레이어를 나누면 특정 부분만 따로 움직이거나 합성한다. 모달, 고정 헤더, transform 애니메이션은 별도 레이어로 다룰 때 효율이 좋아진다.

하지만 `will-change`를 무조건 많이 쓰면 메모리를 더 사용하게 됩니다. 최적화 속성도 필요한 곳에만 써야 합니다.

레이어가 많다고 항상 빨라지지는 않는다. 레이어를 관리하는 비용과 GPU 메모리 사용량도 늘어난다. 레이어 분리는 움직임이 잦거나 다른 요소와 독립적으로 합성할 때 이득이 있는 곳에만 적용한다.

프론트엔드에서 `transform`이나 `opacity` 기반 애니메이션이 성능에 유리하다고 말하는 이유도 여기에 있습니다. 경우에 따라 layout과 paint를 다시 하지 않고 composite 단계에서 처리할 수 있기 때문입니다.

이미 그려진 레이어를 GPU가 합성하는 단계를 composite라고 한다. 대표적으로 다음 속성이 관련된다.

- `transform`
- `opacity`

그래서 애니메이션을 만들 때 `top`, `left`보다 `transform`을 사용하는 것이 더 유리한 경우가 많습니다.

```css
/* layout을 다시 계산할 수 있음 */
.bad {
  left: 100px;
}

/* composite 단계에서 처리될 가능성이 큼 */
.good {
  transform: translateX(100px);
}
```

이 블로그의 글 카드 hover 효과도 같은 기준으로 판단한다.

```css
.post-card {
  transition: transform 150ms ease;
}

.post-card:hover {
  transform: translateY(-2px);
}
```

카드 hover 효과를 `margin-top`이나 `top`으로 처리하면 요소 위치를 다시 계산한다. `transform`을 사용하면 layout 재계산 없이 composite 단계에서 처리될 가능성이 높다.

`transform`과 `opacity`를 쓴다고 모든 비용이 사라지지는 않는다. 요소가 별도 레이어로 분리되어 있고, 브라우저가 composite 단계에서 처리할 때 효과가 크다. 성능 최적화는 속성 이름만으로 판단하지 않고 DevTools Performance 탭에서 layout과 paint 발생 여부를 확인한다.

## 8. Tiling: 화면을 작은 타일로 나눈다

Tiling은 화면을 작은 조각으로 나누는 단계입니다. 브라우저는 긴 페이지 전체를 한 번에 처리하지 않습니다. 화면을 작은 타일 단위로 나눠 필요한 부분부터 처리합니다.

사용자가 보고 있는 영역을 우선 처리하고, 스크롤로 곧 보일 영역을 준비하는 식입니다. 이렇게 하면 큰 페이지에서도 필요한 부분을 더 빠르게 보여줄 수 있습니다.

## 9. Raster: 그리기 명령을 픽셀로 바꾼다

Raster는 그리기 명령을 실제 픽셀 데이터로 바꾸는 단계다. paint 단계에서 만든 명령은 아직 실제 픽셀이 아니다. raster 단계에서는 그리기 명령을 비트맵, 즉 픽셀 데이터로 바꾼다.

간단히 말하면 다음 변화입니다.

```txt
"파란 사각형을 그려라"라는 명령
-> 실제 파란 픽셀 데이터
```

이 결과는 GPU 메모리에 저장되고, 이후 화면 합성에 사용됩니다.

## 10. Activate: 화면에 내보낼 프레임을 준비한다

Activate는 화면에 내보낼 준비가 된 프레임을 고르는 단계다. raster가 끝나면 브라우저는 여러 타일과 레이어 정보를 모아 지금 화면에 내보낼 단위로 만든다.

이 단계까지 오면 화면 출력에 필요한 재료가 거의 준비된 상태입니다.

## 11. Aggregate: 여러 화면 조각을 합친다

Aggregate는 여러 화면 조각을 하나의 compositor frame으로 합치는 단계입니다. 탭 안의 페이지뿐 아니라 iframe, 브라우저 UI 등 여러 출처의 화면 조각이 합쳐질 수 있습니다.

공식 RenderingNG 문서에서는 이 다음에 `Draw` 단계도 따로 설명합니다. `Draw`는 합쳐진 compositor frame을 GPU에서 실행해 실제 화면 픽셀로 출력하는 단계입니다. 이 글에서는 초보자 관점에서 Aggregate와 Draw를 최종 출력 흐름으로 묶어서 이해해도 충분합니다.

최종 결과가 GPU를 통해 사용자 화면에 출력됩니다.

## 이 내용을 블로그 프로젝트에 적용할 방향

브라우저 렌더링 과정을 정리한 이유는 면접 답변을 외우기 위해서만은 아닙니다. 앞으로 이 블로그 프로젝트에서 UI를 직접 개선하고, 그 과정을 다시 글로 남기기 위한 기준으로 쓰려고 합니다.

먼저 현재 블로그에 바로 적용할 수 있는 부분은 다음과 같습니다.

- 글 카드 hover 효과는 `top`, `margin`이 아니라 `transform` 중심으로 만든다.
- 페이지 전환이나 카드 등장 애니메이션은 `opacity`와 `transform` 기반으로 작게 시작한다.
- 애니메이션을 추가한 뒤 DevTools Performance에서 layout, paint, composite 비용을 확인한다.
- 이미지나 인터랙티브 예제를 넣을 때 `width`, `height`, aspect ratio를 먼저 정해 CLS를 줄인다.
- 긴 글, 코드 블록, 표가 있는 상세 페이지에서 모바일 overflow가 생기지 않는지 확인한다.
- Lighthouse와 Web Vitals로 LCP, CLS, INP를 측정하고 개선 전후를 기록한다.

이후에는 채용 공고에서 자주 보이는 프론트엔드 역량을 이 블로그에 하나씩 적용한다. 중요한 기준은 "써봤다"가 아니라 "왜 필요했고, 어떻게 적용했고, 어떤 기준으로 검증했는지"까지 남기는 것이다.

## 앞으로 구현하고 글로 남길 주제

이 글은 브라우저 렌더링과 성능의 시작점이다. 다음 단계에서는 아래 주제들을 실제 프로젝트에 적용한 뒤 블로그 글로 정리한다.

### TypeScript, React, Next.js

- Markdown 글 데이터와 frontmatter를 TypeScript 타입으로 안전하게 다루기
- `BlogPost`, `BlogPostDetail`, `Category`, `Tag` 같은 도메인 타입 분리하기
- Next.js App Router에서 Server Component와 Client Component를 나누는 기준 정리하기
- `metadata`, `sitemap`, `robots`로 기본 SEO 구성하기
- `next/image`, `next/font`, `next/link`를 실제 블로그 화면에 맞게 적용하기

### UI/UX, 디자인 감각, 디자인 기본 원칙

- 홈, 이력서, 블로그 목록, 블로그 상세의 사용자 목적을 다시 정의하기
- 글 목록에서 제목, 설명, 날짜, 카테고리의 시각적 위계 개선하기
- 본문 폭, 줄 높이, 문단 간격, 코드 블록 스타일을 조정해 읽기 경험 개선하기
- 타이포그래피, 컬러, 레이아웃 원칙을 적용한 전후 화면 비교하기
- 버튼, 링크, 카드, 배지 같은 공통 UI의 사용 기준 정리하기

### 애니메이션

- CSS transition으로 hover/focus 피드백 만들기
- `prefers-reduced-motion`으로 움직임 감소 설정 대응하기
- Framer Motion으로 카드 등장 또는 페이지 전환 애니메이션 실험하기
- GSAP, Lottie는 실제 필요 사례가 있을 때만 적용하고 성능 비용 확인하기
- 애니메이션이 layout thrashing을 만들지 않는지 Performance 탭으로 검증하기

### Canvas, WebGL, Three.js

- Canvas로 rendering pipeline 흐름을 시각화하는 작은 데모 만들기
- Three.js로 layer, composite, raster 개념을 설명하는 인터랙티브 예제 실험하기
- 무거운 인터랙티브 예제는 dynamic import로 초기 로딩에서 분리하기
- Canvas/WebGL 콘텐츠에는 텍스트 설명과 접근성 대체 정보를 함께 제공하기

### 반응형 웹과 크로스 브라우징

- 360px, 390px, 768px, 1280px 기준으로 레이아웃 점검하기
- 모바일에서 header, navigation, post card, code block이 겹치지 않게 만들기
- Safari, Chrome, Firefox에서 focus, sticky, font rendering 차이 확인하기
- 긴 URL, 긴 코드, 표가 모바일에서 가로 스크롤을 만들 때 처리 방식 정리하기

### 상태관리

- local state, global client state, server state를 구분하는 기준 정리하기
- 블로그 검색어, 카테고리 필터, 다크모드를 상태관리 실습 후보로 삼기
- Zustand로 검색/필터 UI 상태를 작게 구현해보기
- Redux, Recoil, Zustand를 이 프로젝트 기준으로 비교하기
- Next.js fetch cache와 TanStack Query가 각각 어울리는 상황 구분하기

### 성능 최적화와 접근성

- Lighthouse 점수를 개선하기 전에 현재 점수와 병목을 먼저 기록하기
- LCP, CLS, INP를 블로그 페이지의 실제 요소와 연결해서 분석하기
- 이미지 크기 지정, font loading, dynamic import, 불필요한 dependency 제거 실험하기
- heading 순서, landmark, link/button 역할, focus-visible을 점검하기
- WCAG 기준으로 색상 대비와 키보드 접근성을 확인하기

### 디자인 시스템

- 색상, 타이포그래피, spacing, radius 같은 기본 토큰 정리하기
- Button, Link, Card, Badge, Header, Footer, PostCard 기준 세우기
- shadcn/ui를 사용할 때 그대로 붙이는 것이 아니라 프로젝트 규칙에 맞게 조정하기
- 작은 개인 블로그에서 디자인 시스템을 어디까지 만들면 충분한지 글로 정리하기

## 참고자료

- [브라우저 렌더링 파이프라인 관련 YouTube 영상](https://www.youtube.com/watch?v=idgsruQl9f4)을 보고 정리했습니다.
- [Chrome for Developers - RenderingNG architecture](https://developer.chrome.com/docs/chromium/renderingng-architecture)를 함께 참고했습니다.
