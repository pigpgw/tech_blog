# AI 활용 기록

목적: AI를 사용했다는 사실 자체가 아니라, 실제 작업에서 어떤 문제를 해결하기 위해 AI를 어떻게 활용했는지 기록한다. 모든 AI 대화를 남기지 않고, 의미 있는 설계, 구현, 디버깅, 자동화, 검증 사례만 남긴다.

이 문서는 앞으로 AI 활용 사례를 기록하기 위한 기준과 형식을 정리한 문서이다. 실제로 하지 않은 작업, 검증하지 않은 내용, 발생하지 않은 문제 해결 과정은 기록하지 않는다.

AI 활용 역량을 보여주기 위해 단순 결과물만 적지 않는다. 사용자가 어떤 질문을 했고, 대화 중 어떤 요구사항을 추가하거나 제거했으며, 어떤 Skill, MCP, 도구, 작업 흐름을 활용했는지 함께 기록한다.

---

## 기록 원칙

- 실제로 수행한 작업만 기록한다.
- 사용자가 한 판단과 Codex가 한 작업을 구분한다.
- 결과보다 문제, 판단, 소통, 프롬프트 개선, 수정 과정을 중심으로 적는다.
- 중요한 프롬프트는 원문 또는 핵심 문장을 남긴다.
- 한 번에 완성된 것처럼 쓰지 않고, 대화 과정에서 요구사항이 어떻게 구체화되었는지 적는다.
- Skill, MCP, Git, 브라우저 검증, 터미널, CI 등 사용한 하네스와 도구를 구분해 적는다.
- 검증하지 않은 내용은 검증한 것처럼 쓰지 않는다.
- 단순 질문, 단순 포맷 변경, 보일러플레이트 생성은 기록하지 않는다.

---

## 기록할 대상

- 새로운 기능 구현 또는 구조 설계
- 문제 해결 또는 디버깅
- 반복 작업 자동화 또는 Codex Skill 제작
- 중요한 기술 선택 또는 의사결정
- AI 결과를 검토한 뒤 직접 수정한 경험
- AI 활용으로 작업 속도, 일관성, 유지보수성, 구조가 개선된 경우

---

## 기록하지 않을 대상

- 단순 문법 질문
- 간단한 개념 확인
- 단순 번역 또는 문장 다듬기
- 의미 없는 작업 로그
- 실제 검증 없이 추측으로 작성한 내용
- 사용자가 직접 한 작업인데 AI가 한 것처럼 보이는 내용

---

## 기록 형식

````md
## [제목]

상황 / 문제:

- 어떤 작업을 하던 중 어떤 문제가 있었는지 작성

내가 한 판단 / 작업:

- 내가 고민한 지점, 결정한 기준, 직접 지시하거나 수정한 내용 작성

Codex가 한 작업:

- Codex가 제안, 정리, 작성, 수정, 검증한 구체적인 내용 작성

프롬프트 원문 / 핵심 질문:

```txt
실제로 사용한 프롬프트나 핵심 질문을 적는다.
긴 대화라면 대표 문장과 요구사항이 바뀐 지점을 중심으로 적는다.
```
````

커뮤니케이션 / 프롬프트 개선 과정:

- 처음 요청에서 부족했던 점 작성
- 추가 질문이나 피드백으로 요구사항을 어떻게 좁혔는지 작성
- AI 답변을 보고 어떤 부분을 거절, 수정, 보완했는지 작성

사용한 AI 하네스 / 도구:

- 사용한 Skill, MCP, Git, 터미널, 브라우저 검증, CI, 문서 검색 등을 작성
- 각 도구를 왜 사용했는지 작성

산출물:

- 생성되거나 수정된 파일, 코드, 문서, 설정 작성

검증 / 수정:

- AI 결과에서 발견한 문제점 작성
- 직접 수정한 부분 작성
- 실제 검증 방법 작성
- 아직 검증하지 않았다면 `아직 검증하지 않음`으로 작성

선택 이유:

- 왜 이 방식으로 AI를 활용했는지 작성
- 속도, 일관성, 유지보수, 구조 관점 중 하나 이상 포함

배운 점:

- 다음 개발 작업에 적용할 수 있는 형태로 작성

````

---

## 현재 등록한 AI 활용 자동화

### `blog-ui-publisher`

목적:

- 홈, 이력서, 블로그 목록, 블로그 상세 페이지의 퍼블리싱 프롬프트 생성
- Next.js App Router 구조, semantic HTML, 접근성 기본, metadata, 기본기 가이드형 글쓰기 기준 검수
- AI가 생성한 UI 결과를 그대로 쓰지 않고 구조 기준으로 다시 확인하기 위한 절차 제공
- CSS/반응형 세부 규칙은 별도 `publishing` Skill 또는 CSS 학습 이후 업데이트로 분리

파일:

- `.codex/skills/blog-ui-publisher/SKILL.md`

### `publishing`

목적:

- HTML/CSS 퍼블리싱, 반응형 레이아웃, 크로스브라우저, 접근성 기준을 반복 적용
- semantic markup, CSS token, BEM, Flex/Grid, form, modal, tab 같은 공통 패턴 검수
- 블로그 전용 Next 구조와 분리된 범용 퍼블리싱 기준 제공

파일:

- `.codex/skills/publishing/SKILL.md`

### `commit-message-generator`

목적:

- 변경 내용을 분석해 한국어 Conventional Commit 메시지 제안
- 사용자가 한 작업과 Codex가 직접 만든 산출물을 구분
- Codex가 직접 작성/수정한 산출물이 있는 경우에만 `Co-authored-by: Codex <codex@openai.com>` 제안

파일:

- `.codex/skills/commit-message-generator/SKILL.md`

### `ai-usage-recorder`

목적:

- 작업이 AI 활용 기록으로 남길 가치가 있는지 먼저 판단
- 기록할 가치가 있는 경우에만 구조화된 기록 초안 생성
- 실제로 하지 않은 검증이나 결과를 지어내지 않도록 제한

파일:

- `.codex/skills/ai-usage-recorder/SKILL.md`

### `branch-starter`

목적:

- 새 작업을 시작할 때 작업 내용을 기준으로 브랜치 타입과 이름 제안
- `dev` 기준으로 작업 브랜치를 만드는 흐름 정리
- 변경 중인 파일이 있을 때 브랜치 전환 전에 멈추고 처리 방법을 확인

파일:

- `.codex/skills/branch-starter/SKILL.md`

### `agent-skill-builder`

목적:

- 반복 업무를 Agent Skill로 만들 때 범위, 트리거, 리소스, 검증 기준을 정리
- `SKILL.md`를 지식 글이 아니라 실행 가능한 업무 매뉴얼로 작성하도록 안내
- `agents/openai.yaml`, validation, 실제 사용 후 개선 기준까지 함께 확인

파일:

- `.codex/skills/agent-skill-builder/SKILL.md`

---

## 기록 예시에서 반드시 드러낼 것

- 사용자가 어떤 문제를 인식했는지
- 사용자가 어떤 방향을 직접 결정했는지
- 어떤 프롬프트 원문이나 핵심 질문으로 AI를 움직였는지
- 대화 중 어떤 피드백으로 결과를 수정했는지
- 어떤 Skill, MCP, 터미널, Git, 브라우저 검증 같은 하네스를 활용했는지
- AI 결과를 그대로 쓰지 않고 어떤 기준으로 검토했는지
- 실제 산출물이 무엇인지

---

## 앞으로 기록할 것

- AI 퍼블리싱 프롬프트를 사용해 실제 페이지를 만든 과정
- AI가 만든 UI 결과에서 접근성, semantic HTML, 모바일 문제가 발견되어 수정한 과정
- Codex가 제안한 코드나 설정을 검토하고 직접 수정한 과정
- 디버깅 과정에서 Codex가 원인 분석이나 해결 방향을 도운 사례
- 배포, CI, 성능, 접근성 검증에서 AI를 활용한 사례

---

## Home MVP 1차 퍼블리싱을 단일 파일로 정리한 작업

상황 / 문제:

- 블로그 MVP 1차 홈 화면이 기본 문장만 있는 상태였고, 방문자가 누군지, 무엇을 하는 사이트인지, 어디로 이동해야 하는지 바로 이해하기 어려웠다.
- 사용자는 `Home` 한 페이지 안에서만 퍼블리싱을 끝내고 싶었고, 다른 컴포넌트로 분리하지 않는 제약을 먼저 명확히 줬다.

내가 한 판단 / 작업:

- 퍼블리싱 범위를 Home으로 한정하고, 헤더 내비게이션, 소개, 다음 액션, Resume/Blog 진입 동선을 한 화면 흐름 안에 넣도록 방향을 정했다.
- 컴포넌트 분리 없이 `src/app/page.tsx` 단일 파일에 구현하라고 명확히 지시했다.
- 퍼블리싱용 작업 브랜치를 먼저 만들고 그 위에서 진행하도록 했다.

Codex가 한 작업:

- `branch-starter`, `blog-ui-publisher`, `ai-usage-recorder` 스킬 문서를 확인해 브랜치 생성 규칙, 홈 퍼블리싱 기준, AI 활용 기록 기준을 맞췄다.
- `src/app/page.tsx`를 단일 파일 구조로 재작성해 `header`, `nav`, `main`, `section`, `article`, `footer`를 갖춘 홈 화면을 구현했다.
- 모바일에서도 바로 눌릴 수 있는 링크 크기와 상하 간격을 적용하고, Resume/Blog/GitHub 이동 동선을 홈 첫 화면에서 확인 가능하게 정리했다.
- `lucide-react` 아이콘 export 문제로 빌드가 실패한 것을 확인하고, 지원되지 않는 아이콘 이름을 다른 기본 아이콘으로 교체해 빌드를 통과시켰다.
- `npm run lint -- src/app/page.tsx`와 `npm run build`로 결과를 검증했다.

프롬프트 원문 / 핵심 질문:

```txt
퍼블리싱용 브랜치만들고 이동해줘

mvp 1차용 퍼블리싱 해줘 Home에 전부 해줘 다른 컴포넌트로 분리하지 말고
````

커뮤니케이션 / 프롬프트 개선 과정:

- 첫 요청은 브랜치 생성만 있었고, 이후 사용자가 MVP 1차 홈 퍼블리싱을 추가로 요청했다.
- 사용자는 구현 범위를 `Home`으로 제한하고, 컴포넌트 분리를 금지해 결과물의 구조를 빠르게 확정했다.
- Codex는 구현 후 빌드 과정에서 아이콘 export 오류를 발견했고, 그에 맞춰 안전한 대체 아이콘으로 수정했다.

사용한 AI 하네스 / 도구:

- `branch-starter`: 작업 브랜치 생성 규칙과 기준 브랜치를 확인하기 위해 사용
- `blog-ui-publisher`: 홈 MVP에 필요한 정보 구조와 모바일/semantic 기준을 맞추기 위해 사용
- `ai-usage-recorder`: 이번 작업이 기록할 가치가 있는지 판단하고 문서 형식을 맞추기 위해 사용
- 웹 검색: 토스 디자인 시스템, Godly, Lapa Ninja에서 밝고 정돈된 레이아웃 레퍼런스를 확인
- 터미널: `git status`, `git branch -vv`, `git switch`, `npm run lint -- src/app/page.tsx`, `npm run build`
- `apply_patch`: `src/app/page.tsx`, `docs/04-ai-usage-log.md` 수정

산출물:

- `src/app/page.tsx`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `npm run lint -- src/app/page.tsx` 실행
- `npm run build` 실행
- 빌드 중 `lucide-react`에서 `GitHub` 계열 export가 없어서 실패한 것을 확인했고, `ArrowUpRight` 아이콘으로 교체해 다시 빌드했다.

선택 이유:

- Home 퍼블리싱을 단일 파일로 먼저 정리하면 속도가 빠르고, 초반 MVP 범위에서 구조 결정을 과하게 늘리지 않을 수 있다.
- 스킬 기반 기준을 먼저 읽고 적용하면 semantic 구조, 모바일 동선, 첫 인상 같은 품질 기준을 일관되게 맞출 수 있다.

배운 점:

- 초기 MVP에서는 컴포넌트 분리보다 방문자가 바로 이해하는 정보 구조를 먼저 만드는 편이 효율적이다.
- 퍼블리싱 후에는 시각 결과만 보지 말고 빌드까지 돌려서 아이콘 export 같은 사소한 의존성 문제도 바로 정리해야 한다.
- 레퍼런스를 찾을 때는 막연히 "예쁘게"보다, 배경색 톤, 카드 밀도, CTA 대비처럼 바로 코드로 옮길 수 있는 기준으로 쪼개서 보는 편이 수정 속도가 빠르다.

---

## 파일 기반 블로그 콘텐츠 20개를 생성한 작업

상황 / 문제:

- 블로그 목록과 상세 페이지가 Markdown 콘텐츠를 읽는 구조로 바뀌는 중이었고, 실제 목록에서 확인할 수 있는 다양한 글 데이터가 부족했다.
- 기존 `content/blog`에는 중복된 slug와 비슷한 내용의 짧은 샘플만 있어 목록, 카테고리, 상세 페이지 확인에 한계가 있었다.

내가 한 판단 / 작업:

- 사용자는 `content`에 블로그 글을 약 20개 작성하라고 요청했고, 각 글이 서로 다른 내용까지 갖추기를 요구했다.
- 앞선 대화에서 `BlogPost`, `BlogPostDetail`, slug/id 사용 방식, frontmatter 검증 기준을 조정하며 Markdown 기반 콘텐츠 구조를 잡았다.

Codex가 한 작업:

- 기존 `content/blog/debounce.md`, `content/blog/tailwind.md`의 중복 샘플을 제거하고, 서로 다른 파일명과 slug를 가진 Markdown 글 20개를 작성했다.
- 각 글에 `slug`, `title`, `description`, `publishedAt`, `category` frontmatter를 넣고, 본문은 여러 섹션으로 구성했다.
- 목록 카드에서 slug 기반 링크를 사용하도록 정리하고, Markdown frontmatter 검증 함수와 타입 파일 분리 상태가 빌드 가능한지 확인했다.

프롬프트 원문 / 핵심 질문:

```txt
content에 블로그 글 20개정도 써줘 다 다르게 내용까지 채워서
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 먼저 `gray-matter` 설치, `BlogPost` 타입 변경, `BlogPostDetail` 분리, frontmatter 타입 가드 구현을 순서대로 질문했다.
- Codex는 `readFileSync`와 `readdirSync` 사용 위치, `unknown` 기반 타입 가드, `throw`를 통한 검증 실패 처리 방식을 설명했다.
- 최종 요청에서 사용자는 실제 콘텐츠 생성을 요구했고, Codex는 기존 중복 샘플을 20개 글로 교체했다.

사용한 AI 하네스 / 도구:

- `ai-usage-recorder`: 이번 콘텐츠 대량 생성과 구조 정리 과정이 기록할 가치가 있는지 판단하고 문서 형식을 맞추기 위해 사용
- 터미널: `find`, `rg`, `npm run build`, `npm run type-check`, `npm run lint`
- `apply_patch`: `content/blog` Markdown 파일, 블로그 로더, 목록 페이지, AI 활용 로그 수정

산출물:

- `content/blog/*.md` 20개
- `src/types/blog.ts`
- `src/lib/blog-posts.ts`
- `src/app/blog/page.tsx`
- `src/app/blog/[slug]/page.tsx`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- Markdown 파일 수가 20개인지 확인했다.
- `rg`로 slug 목록을 확인하고 중복 slug가 없음을 확인했다.
- `npm run build`, `npm run type-check`, `npm run lint`를 실행해 통과를 확인했다.
- 초기에 24개 글이 생성되어 요청 범위보다 많았고, 보조 주제 4개를 삭제해 20개로 맞췄다.

선택 이유:

- 다양한 샘플 콘텐츠를 한 번에 준비하면 목록, 상세, 카테고리 표시를 빠르게 검증할 수 있다.
- frontmatter 형식을 모든 글에 일관되게 적용하면 이후 검색, 필터, 정렬 기능을 붙일 때 유지보수하기 쉽다.
- 파일 기반 콘텐츠는 초기 MVP에서 속도가 빠르고, 저장소 diff로 글 변경 내역을 확인하기 쉽다.

배운 점:

- Markdown 기반 블로그는 콘텐츠 수가 늘어날수록 frontmatter 검증과 slug 중복 확인이 중요해진다.
- 샘플 데이터라도 실제 화면에서 읽을 수 있는 수준으로 작성해야 목록과 상세 UI의 밀도, 줄바꿈, 카테고리 분포를 제대로 확인할 수 있다.
- 대량 생성 작업은 결과 개수와 중복 여부를 반드시 별도 명령으로 검증하는 편이 안전하다.

---

## Developer 이력 페이지를 실제 경험 중심으로 재구성한 작업

상황 / 문제:

- `/resume` 페이지가 기본 안내 문구만 있는 상태였고, 실제 이력서·경력기술서·포트폴리오의 핵심 내용을 보여주지 못했다.
- 사용자는 프론트엔드 포지션명보다 범용적인 `Developer` 표현을 원했고, 제공한 Developer/프론트엔드 이력 자료와 직접 정리한 경험 메모를 바탕으로 사이트용 이력 페이지를 만들고자 했다.
- 초기 문구 중 실제 경험보다 과장처럼 보이는 표현, 공식적으로 하지 않은 수상/수료 표현, 로드맵과 무관한 항목을 제거해야 했다.

내가 한 판단 / 작업:

- 사용자는 기존 PDF 경로를 제공하고, 특정 직무명에 갇히지 않도록 `Developer`로 표현하라고 방향을 정했다.
- `어떤 개발자인가`처럼 자기규정으로 보이는 문구를 거절하고, 실제 맡은 프로젝트와 구현 범위 중심으로 서술하도록 수정 방향을 줬다.
- 스마일게이트 우수 수료처럼 사실과 다른 표현과 이번 페이지에 넣지 않을 교육 경험을 제거하도록 요구했다.
- AWS Bedrock, Knowledge Base, Trace, API Gateway 타임아웃 관련 내용은 공식 문서 기준으로 근거를 확인하고, 비용 절감을 단정하지 않도록 요청했다.

Codex가 한 작업:

- `src/app/resume/page.tsx`를 실제 이력서형 페이지로 교체하고, 포지션명을 `Developer`로 구성했다.
- CPPM, 프비티, SmileTogether, Code Sync, 시스템 프로그래밍 경험을 React UI, API, AWS 서버리스, 데이터 파이프라인, 협업 도구 관점으로 재구성했다.
- 사용자의 후속 피드백에 따라 `Developer 이력서와 경력기술서 기준` 문구를 제거하고, 프로젝트 중심의 설명으로 바꿨다.
- OpenSearch는 기술 스택 표시에서 제거하고, 실제 구현 흐름 설명이 필요한 파이프라인 문장 안에서만 언급했다.
- AWS 공식 문서에서 Bedrock 모델 가격이 입력/출력 token 기준으로 제시되는 점, Knowledge Base가 관련 source chunk를 검색해 RAG에 사용하는 점, Agent Trace를 실시간으로 볼 수 있는 점, API Gateway WebSocket 통합 타임아웃 범위를 확인했다.
- Knowledge Base 전환 효과는 “비용 절감 확정”이 아니라 “매 요청 직접 주입하던 긴 지침을 관련 chunk 중심으로 줄일 수 있는 구조”로 표현했다.
- 학력/수상/교육 영역에 조선대학교, ICICT 2023 포스터상, 캡스톤디자인 은상, 총장배 모범상, 부스트코스, 단기 인턴 경험을 추가하고 제외 요청된 교육 항목은 넣지 않았다.

프롬프트 원문 / 핵심 질문:

```txt
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(경력기술서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(이력서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(포트폴리오).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(경력기술서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(이력서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(포트폴리오).pdf

이거 참고해서 만들어줘 developer라고 만들고 프론트엔드라고 하기에는 범용적으로 써야해서

이력서 포트폴리오 정량적 수치나 ㅍ트러블 슈팅들 어필해

자기소개및 이력 페이지니 자연스럽게 녹여야지 다른 개발자들은 어떻게 적는지 확인하고 반영해 200개 정도 확인해봐

/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(경력기술서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(이력서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/Developer_박건우(포트폴리오).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(경력기술서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(이력서).pdf
/Users/baggeon-u/Desktop/자료모음/이력서/프론트엔드_박건우(포트폴리오).pdf

다시 확인하고 적어줘

스마일게이트 우수수료 한적 ㅇ벗어
이력 경험 요약하고 숫자로 남은 결과 제거해
오픈서치 기술스택에서 제거해

Developer 이력서와 경력기술서 기준으로, 실제 맡았던 프로젝트와 구현 범위를 요약했습니다.
이 말은 왜 넣는거야

PoC
외부 LLM 사용 제한 대기업 보안 환경에서 AWS Bedrock 기반 AI 멀티에이전트 챗봇 아키텍처 설계 및 구현
...
공식문서 찾아서 예를들어 토큰 비용은 인푹 프롬프트 아웃 프롬프트 글자수 합친거?
...
이거 반영해

[제외 요청한 교육 항목] 이야기는 제거하고
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 참고 자료와 표현 방향을 함께 제공해 페이지의 톤을 `Developer`로 확정했다.
- 첫 구현 이후 사용자는 수상/수료, 자기규정 문구, 숫자 중심 요약, 기술 스택 표기처럼 사실성과 톤이 어긋나는 부분을 직접 지적했다.
- Codex는 지적된 항목을 제거하고, 실제 수행 범위와 트러블슈팅 중심으로 bullet을 다시 작성했다.
- 사용자는 CPPM의 Bedrock PoC, Knowledge Base RAG 전환, Trace 기반 대기 UX 개선, XSS/API Key/IAM 보안 처리, 프롬프트 엔지니어링과 하네스 엔지니어링 경험을 구체적으로 제공했다.
- Codex는 해당 내용을 이력 페이지 문장으로 압축하면서, 공식 문서로 확인할 수 있는 기술 근거와 사용자의 실제 경험 서술을 분리했다.
- 이후 사용자는 `CPPM_AI_챗봇_이력서용_정리.md`를 포함한 최신 이력 자료를 다시 제공했고, Codex는 CPPM AX 챗봇, 입력 자동화, CVVE, 영업관리 독립 서비스 분리 내용을 현재 이력 페이지에 맞게 보강했다.
- 사용자는 PDF도 직접 열 수 있음을 지적했고, Codex는 Quick Look thumbnail로 Developer/프론트엔드 이력서와 경력기술서를 확인해 누락된 기술 스택과 문구를 추가 반영했다.
- 이후 사용자는 “많이 적는 것이 좋은 게 아니라 어필하고 싶은 핵심만 남겨야 한다”고 방향을 다시 잡았고, Codex는 `/resume` 페이지의 긴 CPPM·프비티·정글 설명을 사용자가 제공한 최신 이력서 문장 중심으로 재정리했다.

사용한 AI 하네스 / 도구:

- `ai-usage-recorder`: 의미 있는 AI 작성 산출물인지 판단하고 기록 형식을 맞추기 위해 사용
- 터미널: `sed`, `rg`, `git status`, `npm run lint`, `npm run type-check`, `npm run build`
- Quick Look: `qlmanage -t`로 PDF 첫 페이지를 이미지로 렌더링해 이력서와 경력기술서 내용을 확인
- 웹 검색: AWS 공식 문서에서 Bedrock Pricing, Knowledge Bases Retrieval, Agent Trace, API Gateway WebSocket timeout 근거 확인
- `apply_patch`: `src/app/resume/page.tsx`, `docs/04-ai-usage-log.md` 수정

산출물:

- `src/app/resume/page.tsx`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `rg`로 제외 요청된 교육 항목 관련 문자열이 이력 페이지에 남아 있지 않은지 확인했다.
- OpenSearch가 기술 스택 표시에는 남지 않고, 실제 파이프라인 설명에서만 언급되는지 확인했다.
- `npm run lint`, `npm run type-check`, `npm run build`를 실행해 통과를 확인했다.
- 최신 수정에서도 이전 사용자 요구를 반영해 OpenSearch는 기술 스택 표시에서 제거하고, 구현 파이프라인 설명에만 남기도록 수정했다.
- Quick Look으로 PDF를 확인한 뒤 `Styled Components`, `FastAPI`, CPPM의 MySQL/채팅 히스토리, `나의 저장소/불편해요` 운영 보조 기능, Cursor 활용 내용을 보강했다.
- 최신 수정에서는 CPPM/프비티/스마일게이트/정글/아티피셜 경험을 핵심 bullet 중심으로 줄이고, 수상과 학력을 분리했다.
- 최신 수정 후 `npm run lint`, `npm run type-check`, `npm run build`를 다시 실행해 통과를 확인했다.

선택 이유:

- PDF 이력서를 웹 페이지에 그대로 옮기면 정보가 과밀해질 수 있어, 핵심 역량과 프로젝트를 먼저 보여주는 구조가 더 빠르게 이해된다.
- `Developer` 표현은 React 중심 경험을 유지하면서도 API, AWS, 데이터, 협업 도구까지 다룬 범위를 일관되게 설명할 수 있다.
- AWS 비용과 RAG 효과는 실제 과금·검색 조건에 따라 달라질 수 있으므로, 공식 문서로 확인 가능한 원리와 사용자의 구현 의도를 구분해 쓰는 편이 유지보수와 면접 대응에 안전하다.

배운 점:

- 이력서 웹 페이지는 PDF와 목적이 다르므로 전체 내용을 복제하기보다 사용자가 바로 판단할 수 있는 요약과 근거를 나눠 보여주는 편이 좋다.
- 직무명을 좁게 쓰기 어려울 때는 실제 수행 범위를 기준으로 `Developer`처럼 넓은 표현을 쓰되, 프로젝트 bullet에서 구체성을 확보해야 한다.
- 기술 성과를 적을 때는 “왜 줄어드는지”와 “어디까지 공식 문서로 근거를 댈 수 있는지”를 분리해야 과장 없이 설득력을 만들 수 있다.

---

## 기술 블로그 방향을 프론트엔드 UX 중심으로 정리한 작업

상황 / 문제:

- 홈, 블로그, 문서 설명이 일반적인 기술 블로그에 가까워 사용자가 원하는 프론트엔드 중심성과 사용자 경험 개선 방향이 첫 화면에서 충분히 드러나지 않았다.
- 블로그 글의 카테고리와 설명도 브라우저 렌더링 지식 자체에 머물러 있어 프론트엔드 성능과 UX 개선 관점이 약했다.

내가 한 판단 / 작업:

- 사용자는 기술 블로그의 방향을 프론트엔드 위주의 사용자 경험 개선으로 잡고, 사이트와 콘텐츠를 프론트엔드 중심으로 가져가자고 결정했다.
- 기존 이력서 수정분은 유지하면서 사이트 포지셔닝과 블로그 설명을 먼저 맞추는 방향을 제시했다.

Codex가 한 작업:

- 홈, 블로그 목록, 메타데이터, README의 설명을 프론트엔드 구현, 성능, 접근성, 인터랙션, 사용자 경험 개선 중심으로 수정했다.
- 헤더에 `Home`, `Blog`, `Resume`, `GitHub` 링크를 명확히 노출해 주요 이동 경로를 보강했다.
- 기존 브라우저 렌더링 글의 제목, 설명, 카테고리, 도입부를 프론트엔드 UX와 성능 관점으로 조정했다.
- 이력서 상단 소개를 프론트엔드 구현과 사용자 피드백 기반 화면 개선 방향이 드러나도록 다듬었다.

프롬프트 원문 / 핵심 질문:

```txt
기술블로그 내용을 프론트엔드 위주의 사용자 경험을 개선하기위한것 그리고 프론트엔드 로 가자
```

커뮤니케이션 / 프롬프트 개선 과정:

- 처음 요청은 짧았지만, 저장소의 홈/블로그/이력서/README 구조를 확인해 사이트 전체에서 반복 노출되는 핵심 문구를 조정하는 방식으로 구체화했다.
- `blog-ui-publisher` 기준에 맞춰 방문자가 첫 화면에서 블로그의 목적과 이동 경로를 바로 이해할 수 있는지 확인했다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 개인 기술 블로그의 홈, 블로그 목록, 이력서, 내비게이션 방향을 점검하기 위해 사용
- `ai-usage-recorder`: 이번 작업이 기록할 가치가 있는 AI 활용 사례인지 판단하고 기록 형식을 맞추기 위해 사용
- 터미널: `sed`, `rg`, `git status`, `npm run lint`, `npm run type-check`, `npm run build`, `npm run format:check`
- `apply_patch`: `src/app/page.tsx`, `src/app/blog/page.tsx`, `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `src/app/resume/page.tsx`, `content/blog/browser-rendering-pipeline.md`, `README.md`, `docs/04-ai-usage-log.md` 수정

산출물:

- `src/app/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/layout.tsx`
- `src/components/layout/Header.tsx`
- `src/app/resume/page.tsx`
- `content/blog/browser-rendering-pipeline.md`
- `README.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `npm run lint`, `npm run type-check`, `npm run build`를 실행해 통과를 확인했다.
- `npm run format:check`에서 `src/app/blog/page.tsx`, `src/app/resume/page.tsx` 포맷 이슈가 나와 Prettier로 두 파일만 정리한 뒤 다시 통과를 확인했다.

선택 이유:

- 전체 UI를 크게 바꾸기보다 반복 노출되는 문구와 내비게이션부터 조정하면 빠르게 일관된 방향을 만들 수 있다.
- README, 메타데이터, 화면 문구, 글 frontmatter를 함께 맞춰야 검색 노출, 방문자 첫인상, 향후 콘텐츠 작성 기준이 같은 구조로 유지된다.

배운 점:

- 기술 블로그는 글 목록만 바꿔서는 방향성이 충분히 전달되지 않으므로 홈, 메타데이터, README, 글 카테고리를 함께 맞춰야 한다.
- 프론트엔드 블로그의 주제를 “기술을 공부했다”보다 “사용자 경험을 어떻게 개선했는가”로 잡으면 글의 평가 기준이 더 분명해진다.

---

## 프론트엔드 문제 해결형 글감과 카테고리를 정리한 작업

상황 / 문제:

- 사용자는 블로그가 프론트엔드 개념 정리에만 머무르지 않고, 실제 프론트엔드에서 생길 수 있는 문제를 만들고 분석하고 해결하는 글도 포함하길 원했다.
- 기존 로드맵에는 개념별 학습 주제는 있었지만, 문제 재현형 글감과 카테고리 기준이 같은 문서 안에서 충분히 구체화되어 있지 않았다.

내가 한 판단 / 작업:

- 사용자는 블로그 화면 수정이 아니라 글 작성거리용 md와 로드맵에 반영하라고 범위를 정정했다.
- 카테고리는 기술명보다 문제 유형 중심으로 잡고, 글 순서는 현재 블로그에서 바로 재현 가능한 문제부터 배포/운영 문제까지 단계적으로 배치하는 방향을 선택했다.

Codex가 한 작업:

- 처음에는 별도 `docs/05-blog-writing-topics.md`를 만들었지만, 사용자가 이미 있는 글감/학습 로드맵 파일에 합치라는 의도를 다시 지적해 해당 파일을 삭제했다.
- `docs/02-study-blogging-roadmap.md` 안에 카테고리 기준, 추가 글감 목록, 문제 재현/확인 메모를 직접 합쳤다.
- 이후 사용자가 “직접 문제를 일으켜보고 해결해보며 글로 적는 것”이라고 의도를 다시 설명해, `docs/02-study-blogging-roadmap.md`의 글감 섹션을 `프론트엔드 문제 실험실` 중심으로 재구성했다.
- `docs/01-blog-project-roadmap.md`에 문제 해결형 글 작성 흐름을 추가해 기능 개발 로드맵과 블로그 글 작성 순서를 연결했다.
- web.dev, MDN, React, Next.js 공식 문서 기준으로 성능 지표, 접근성, effect cleanup, memoization, 이미지/최적화 글감의 근거를 확인했다.

프롬프트 원문 / 핵심 질문:

```txt
프론트엔드 개념에 대한것만 쓰는게 아니라 프론트엔드에서 생길수있는 문제들 이런거 만들어서 해결해보는거 분석하고 이런것도 적을거란 말이야 카테고리 뭘로할까 그리고 그런 문제들 많이 찾아서 블로그글 순서에 알맞게 추가해줘 카테고리도 추가해주고

아니 블로그 글 작성거리 md랑 로드맵에 추가하라는거야
```

커뮤니케이션 / 프롬프트 개선 과정:

- 처음 요청만 보면 화면 카테고리 수정으로 해석될 수 있었지만, 사용자가 중간에 중단하고 “블로그 글 작성거리 md랑 로드맵”이라고 범위를 바로잡았다.
- 이후 Codex가 별도 글감 문서를 만든 것도 사용자의 의도와 달랐고, 사용자는 이미 있는 `docs/02-study-blogging-roadmap.md`를 쓰라고 다시 지적했다.
- Codex는 새 문서를 삭제하고 기존 로드맵 파일에 글감과 카테고리를 합치는 방식으로 수정했다.
- 마지막으로 사용자는 문제 해결형 글감의 핵심이 “실제 프론트엔드 문제를 직접 일으켜보고 해결하는 실험”이라고 다시 설명했고, Codex는 단순 글감 목록보다 `문제 일으키기`와 `해결/검증`이 드러나는 구조로 정리했다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 개인 기술 블로그의 글감 체계가 실제 블로그 UX와 연결되는지 확인하기 위해 사용
- `ai-usage-recorder`: 문서 구조 변경과 AI 활용 기록 작성 기준을 맞추기 위해 사용
- 웹 검색: web.dev, MDN, React, Next.js 공식 문서에서 최신 성능/접근성/React/Next.js 기준 확인
- 터미널: `rg`, `sed`, `git status`, `npm run format:check`
- `apply_patch`: `docs/02-study-blogging-roadmap.md`, `docs/01-blog-project-roadmap.md`, `docs/04-ai-usage-log.md` 수정 및 잘못 만든 `docs/05-blog-writing-topics.md` 삭제

산출물:

- `docs/02-study-blogging-roadmap.md`
- `docs/01-blog-project-roadmap.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `npm run format:check`에서 새로 만들었던 `docs/05-blog-writing-topics.md` 포맷 이슈가 나왔지만, 이후 해당 파일은 삭제하고 기존 `docs/02-study-blogging-roadmap.md`에 내용을 합쳤다.
- 추가 수정 후 `npm run format:check`를 다시 실행해 통과를 확인했다.

선택 이유:

- 카테고리를 개념 단위로만 두면 글이 학습 노트처럼 보이기 쉬워, 문제 상황과 해결 과정을 중심으로 분류하는 편이 블로그의 방향과 유지보수에 맞다.
- 이미 글감/학습 로드맵 역할을 하는 파일이 있으므로 별도 문서를 늘리기보다 기존 로드맵 안에서 카테고리와 문제 해결형 글감을 함께 관리하는 편이 낫다.

배운 점:

- 프론트엔드 블로그는 “무엇을 안다”보다 “어떤 문제를 어떻게 재현하고 검증했는가”를 기준으로 글감을 잡으면 프로젝트 경험과 면접 답변으로 연결하기 쉽다.
- 같은 주제라도 접근성, 성능, React 상태, 네트워크, 배포 문제 중 어디에 초점을 두는지에 따라 카테고리와 글의 구조가 달라진다.

---

## 홈, 이력서, 헤더 표현을 간결하게 정리한 작업

상황 / 문제:

- 홈과 블로그 소개 문구가 중복되거나 프론트엔드 방향으로만 좁게 보이는 문제가 있었다.
- 이력 페이지의 경험 설명은 자세한 정보가 많아 핵심 기여와 성과가 한눈에 들어오지 않았고, 개인 GitHub 링크도 홈과 이력서, 헤더에 반복 노출됐다.

내가 한 판단 / 작업:

- 사용자는 소개 문구를 `개발하며 마주친 문제와 해결 과정을 기록합니다.`로 정하고, 홈에서는 중복 제목과 부가 설명을 제거하라고 지시했다.
- 이력서의 주요 경험은 프로젝트별 최대 4개 bullet로 줄이고, 첫 bullet은 소개, 나머지는 핵심 기여와 성과만 남기도록 방향을 잡았다.
- Code Sync의 우수 프로젝트 공식 링크는 증거 링크로 남기되, 개인 GitHub 프로필 링크는 헤더에서만 제공하는 구조를 선택했다.

Codex가 한 작업:

- 홈 화면에서 GitHub CTA, 중복 설명, `최근 글 보러 가기` 링크를 제거하고 Blog/Resume 이동만 남겼다.
- 이력 페이지의 소개를 전자공학, 스타트업 인턴, 국제 학회, 대기업 프로젝트 경험이 드러나는 문장으로 다듬고, 주요 경험을 프비티, LG 공통업무 플랫폼, 크래프톤 정글/Code Sync 중심으로 압축했다.
- Code Sync의 `우수 프로젝트`와 `팀 문서` 링크는 유지하고, 개인 GitHub 링크와 수상 섹션의 GitHub 링크는 제거했다.
- 공통 헤더 버튼에 흰 배경, 얇은 ring, 그림자, hover shadow를 적용해 버튼 영역을 더 명확하게 보이도록 수정했다.
- README, 블로그 목록 헤더, 메타데이터를 현재 사이트 방향인 Tech Blog와 문제 해결 기록 중심으로 맞췄다.

프롬프트 원문 / 핵심 질문:

```txt
보완한게 있으면 하고 필요없는건 하지말고 자세하게 적는게 아니라 최대 불릿은 4개 첫번쨰는 소개 2~4는 핵심기여및 성과

코드싱크 우수프로젝트와 하이퍼링크는 어디갔어

Tech Blog
박건우 Tech Blog
중복이잔아

개발하며 마주친 문제와 해결 과정을 기록합니다.
이걸로 추가해줘

깃헙 링크는 헤더에만그리고 헤더버튼들에 무언가 그림자나 갼의 흰색배경? 이런게 필요할거같은데
```

커뮤니케이션 / 프롬프트 개선 과정:

- 처음에는 경험 DB 전체를 기반으로 이력서 내용을 보완하는 흐름이었지만, 사용자는 자격증이나 세부 경험보다 큰 핵심만 남기라고 범위를 줄였다.
- 사용자는 Code Sync의 우수 프로젝트 링크 누락, 주요 경험의 `작성 글 보기` 버튼, 홈 제목 중복, 불필요한 설명 문구, GitHub 링크 위치를 차례로 지적했다.
- Codex는 각 피드백을 반영하면서 경험의 양을 줄이고, 증거 링크와 내비게이션 링크를 구분하는 방식으로 구조를 정리했다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 홈, 이력서, 블로그 목록, 공통 헤더가 개인 기술 블로그의 MVP 구조에 맞는지 확인하기 위해 사용
- `ai-usage-recorder`: 이번 UI/문서 정리 과정이 기록할 가치가 있는 AI 활용 사례인지 판단하고 기록 형식을 맞추기 위해 사용
- 터미널: `sed`, `rg`, `git status`, `npm run lint`, `npm run type-check`, `npm run build`
- `apply_patch`: `src/app/page.tsx`, `src/app/resume/page.tsx`, `src/app/blog/page.tsx`, `src/app/layout.tsx`, `src/components/layout/Header.tsx`, `README.md`, `docs/04-ai-usage-log.md` 수정
- Prettier: 수정한 TSX/MD 파일 포맷 정리

산출물:

- `src/app/page.tsx`
- `src/app/resume/page.tsx`
- `src/app/blog/page.tsx`
- `src/app/layout.tsx`
- `src/components/layout/Header.tsx`
- `README.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `rg`로 `src` 안의 개인 GitHub 링크가 `src/components/layout/Header.tsx`에만 남았는지 확인했다.
- `npm run lint`, `npm run type-check`, `npm run build`를 실행해 통과를 확인했다.
- 중간에 `type-check`가 `.next/types` 생성 타입 문제로 한 번 실패했지만, `next build`로 생성 타입을 정리한 뒤 `type-check`를 다시 실행해 통과를 확인했다.

선택 이유:

- 핵심 링크와 경험을 줄이면 방문자가 홈과 이력서에서 바로 다음 행동을 선택할 수 있고, 유지보수할 문장도 줄어든다.
- 개인 GitHub 링크는 공통 헤더에만 두고, 프로젝트 증거 링크는 해당 프로젝트 안에 남기면 내비게이션과 근거 자료의 역할이 분리된다.

배운 점:

- 이력 페이지는 많은 경험을 넣는 것보다 사용자가 직접 보고 싶은 핵심 근거를 빠르게 찾게 하는 구조가 더 중요하다.
- 링크는 모두 많이 보여주는 것보다 `개인 프로필`, `프로젝트 증거`, `공식 소개`처럼 역할을 나누어 배치해야 혼란이 줄어든다.

---

## 토스 Frontend Fundamentals 기반 코드리뷰 기준과 Skill 자동화

상황 / 문제:

- 앞으로 사용자가 `리뷰` 또는 `코드리뷰`를 요청했을 때, 단순 취향이나 일반적인 코드 스타일이 아니라 명확한 코드 품질 기준으로 리뷰해야 했다.
- 사용자는 토스 Frontend Fundamentals의 좋은 코드 기준을 기반으로, 가독성·예측 가능성·응집도·결합도 관점에서 리뷰하도록 문서와 Skill 자동화를 요청했다.

내가 한 판단 / 작업:

- 사용자는 좋은 프론트엔드 코드를 `변경하기 쉬운 코드`로 보고, 코드리뷰 기준을 가독성, 예측 가능성, 응집도, 결합도 네 가지로 고정하라고 지시했다.
- `리뷰`와 `코드리뷰`라는 단어가 나오면 해당 기준으로 자동 적용되도록 Skill까지 등록하는 방향을 정했다.

Codex가 한 작업:

- Toss Frontend Fundamentals의 공식 사이트와 GitHub 저장소를 조사해 Code Quality, Bundling, A11y, Debug 문서 링크를 정리했다.
- `docs/05-code-review-fundamentals.md`를 만들어 코드리뷰 기준, 출력 형식, 원문 링크를 저장했다.
- `.codex/skills/code-review-fundamentals` Skill을 만들고, `리뷰`/`코드리뷰` 요청에서 findings-first 방식으로 코드 품질을 점검하도록 지침을 작성했다.
- Skill 본문은 짧게 유지하고, 세부 기준은 `references/toss-frontend-fundamentals.md`로 분리했다.

프롬프트 원문 / 핵심 질문:

```txt
이걸 링크들까지 전부 조사해서 적어두고 내가 리뷰해달라 코드리뷰 해달라하면 저 기준으로 해줘
우선 docs에 토스펀드멘탈 전부 읽고 기록해둬 docs에 md만들어서
그리고 리뷰나 코드리뷰 라는 단어를위한 스킬을 만들어서 스킬로 등록해서 자동화시켜
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 먼저 토스 Frontend Fundamentals의 핵심 내용을 제공했고, 이후 단순 요약이 아니라 실제 코드리뷰 요청에 자동 적용되는 구조를 요구했다.
- Codex는 문서와 Skill을 분리해, 사람이 검토할 기준 문서와 Codex가 실행할 자동화 지침이 같은 기준을 참조하도록 정리했다.

사용한 AI 하네스 / 도구:

- `skill-creator`: 코드리뷰 자동화 Skill을 만들고 검증하기 위해 사용
- `ai-usage-recorder`: 이번 Skill 생성과 문서화 작업이 기록할 가치가 있는 AI 활용 사례인지 판단하고 로그 형식을 맞추기 위해 사용
- 웹 검색 및 GitHub 공식 저장소 확인: Toss Frontend Fundamentals 원문 링크와 문서 구조 확인
- 터미널: `curl`, `rg`, `sed`, `find`, `git status`, Skill 검증 스크립트 실행
- `apply_patch`: 문서와 Skill 파일 작성

산출물:

- `docs/05-code-review-fundamentals.md`
- `.codex/skills/code-review-fundamentals/SKILL.md`
- `.codex/skills/code-review-fundamentals/references/toss-frontend-fundamentals.md`
- `.codex/skills/code-review-fundamentals/agents/openai.yaml`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- Skill 생성 중 `short_description` 길이 조건에 맞지 않아 `agents/openai.yaml` 생성이 실패했고, 문구 길이를 조정해 다시 생성했다.
- `quick_validate.py` 실행 시 기본 Python 환경에 `PyYAML`이 없어 실패했기 때문에 전역 환경을 건드리지 않고 `/tmp/codex-skill-validate-venv` 임시 venv에서 `PyYAML`을 설치해 검증했다.
- 최종적으로 `quick_validate.py`에서 `Skill is valid!`를 확인했다.

선택 이유:

- 코드리뷰 기준을 문서로만 남기면 매번 적용이 흔들릴 수 있으므로, Skill로 자동화해 일관성을 높이는 편이 유지보수에 유리하다.
- 리뷰 기준을 코드 품질 네 축과 보조 기준으로 분리하면, 취향성 코멘트보다 변경 위험과 영향 범위 중심으로 리뷰할 수 있다.

배운 점:

- 좋은 코드 기준은 하나의 정답보다 가독성, 예측 가능성, 응집도, 결합도의 균형을 현재 변경 맥락에 맞게 판단하는 방식으로 써야 한다.
- 코드리뷰 자동화는 “무조건 추상화” 같은 규칙을 강제하기보다, 어떤 기준을 우선해야 하는지 설명하게 만들 때 더 실무적으로 사용할 수 있다.

---

## 블로그 UI 퍼블리싱 Skill 통합

상황 / 문제:

- `blog-ui-publisher`와 `frontend-publishing`이 모두 프론트엔드 퍼블리싱 기준을 다루고 있어, 실제 작업에서 어떤 Skill을 먼저 써야 하는지 혼란이 있었다.

내가 한 판단 / 작업:

- 사용자는 퍼블리싱 Skill을 하나로 합치라고 지시했다.
- 이 저장소 전용 화면 기준이 있는 `blog-ui-publisher`를 남기고, 범용 React/Next.js 퍼블리싱 기준을 그 안으로 흡수하는 방향이 적합하다고 판단했다.

Codex가 한 작업:

- `frontend-publishing`의 Figma 확인, 기존 컴포넌트 재사용, SEO, 시맨틱 HTML, 접근성, 반응형, API 상태 기준을 `blog-ui-publisher`에 통합했다.
- 기존 프로젝트 정책에 맞춰 GitHub 링크는 Home/Resume 개별 영역이 아니라 공통 Header에서만 제공하도록 Skill 기준을 수정했다.
- 중복 Skill인 `.codex/skills/frontend-publishing`을 제거하고, `blog-ui-publisher`의 `agents/openai.yaml` 메타데이터를 생성했다.

프롬프트 원문 / 핵심 질문:

```txt
퍼블리싱 스킬이 2개인거야?
하나로 합쳐
```

커뮤니케이션 / 프롬프트 개선 과정:

- 처음에는 두 Skill의 역할 차이를 설명했지만, 사용자는 설명보다 중복 제거를 원했다.
- Codex는 하나를 유지하는 방식으로 기준을 정리하고, 삭제 대상은 범용 Skill인 `frontend-publishing`으로 좁혔다.

사용한 AI 하네스 / 도구:

- `skill-creator`: Skill 통합 구조와 메타데이터 생성 기준 확인
- `ai-usage-recorder`: Skill 통합 작업을 AI 활용 기록으로 남길지 판단
- 터미널: `sed`, `find`, `rg`, `git status`, Skill 검증 스크립트
- `apply_patch`: Skill 본문 수정, 중복 Skill 제거, AI 활용 로그 작성

산출물:

- `.codex/skills/blog-ui-publisher/SKILL.md`
- `.codex/skills/blog-ui-publisher/agents/openai.yaml`
- 삭제: `.codex/skills/frontend-publishing/SKILL.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `blog-ui-publisher` Skill을 `quick_validate.py`로 검증했다.
- `npm run format:check`와 `git diff --check`로 문서 포맷과 whitespace를 확인했다.

선택 이유:

- 하나의 Skill 안에서 블로그 전용 UI 맥락과 React/Next.js 퍼블리싱 기준을 함께 관리하면, 실제 작업에서 기준 선택 비용이 줄고 유지보수가 쉬워진다.

배운 점:

- 범용 규칙과 프로젝트 전용 규칙이 겹칠 때는 더 구체적인 프로젝트 Skill을 남기고, 범용 기준을 그 안의 체크리스트로 흡수하는 편이 실행 흐름이 단순하다.

---

## Semantic Tag 글과 접근성 글을 분리한 작업

상황 / 문제:

- `content/blog/semantic-html.md` 안에 HTML 문서 구조, semantic tag, 접근성, ARIA 설명이 함께 섞여 있었다.
- 사용자는 태그 글은 태그 중심으로 보완하고, 접근성 글은 별도 글로 분리해 관리하길 원했다.

내가 한 판단 / 작업:

- 사용자는 “태그 따로 접근성 따로”라는 기준을 제시해 글의 책임을 분리했다.
- 접근성 섹션에서 CSS 성격이 강한 항목은 제외하고, HTML/ARIA/키보드/스크린 리더 중심으로 정리하길 원했다.

Codex가 한 작업:

- `content/blog/semantic-html.md`를 HTML 문서 뼈대, semantic tag 역할, `section`/`article` 선택 기준, 이 블로그의 실제 구조 중심으로 재작성했다.
- 새 글 `content/blog/web-accessibility-basics.md`를 추가해 키보드 탐색, 스크린 리더 탐색, accessible name, `aria-current`, `aria-label`, `aria-hidden`, `aria-live`, skip link를 정리했다.
- 후속 요청에 따라 두 글을 정의 나열보다 정보 공유형 글에 가깝게 다시 다듬고, 이 블로그를 만들며 실제로 질문했던 “왜 필요한가”, “어떻게 동작하는가”, “어디에 적용했는가”를 코드 예시와 함께 보강했다.
- MDN과 W3C WAI 문서를 확인해 semantic element, ARIA, Bypass Blocks 설명의 기준을 맞췄다.
- 예시 링크가 실제 slug와 맞지 않는 부분을 확인하고 `/blog/web-accessibility-basics`로 수정했다.

프롬프트 원문 / 핵심 질문:

```txt
태그글 있잔아 그거 보완하고 접근성 글 별도로 작성해줘 태그 따로 접근성 따로

내용 보완해줘 정보 공유 느낌으로 이 블로그 만들면서 적용한것들도 예시를 넣으면서 단순히 했다가 아니라 왜 이게 필요한지 자세한 부분들이 중요해
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 먼저 접근성 체크리스트를 구현/문서화하라고 요청했다.
- 이후 CSS 관련 내용은 제거하라고 정정했고, 마지막에 semantic tag 글과 접근성 글을 분리하라고 범위를 다시 좁혔다.
- Codex는 기존 `semantic-html.md`의 접근성 내용을 줄이고, 접근성 전용 글을 새로 만드는 방식으로 요구사항을 반영했다.
- 사용자는 결과물이 단순 체크리스트처럼 보이지 않도록, 실제 블로그 구현 사례와 기본 원리를 설명하는 정보 공유형 글로 보완하라고 다시 요청했다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 블로그 글이 목록/상세 구조와 프로젝트 방향에 맞는지 확인하기 위해 사용
- `ai-usage-recorder`: 콘텐츠 구조 분리 작업을 AI 활용 기록으로 남길 가치가 있는지 판단하고 형식을 맞추기 위해 사용
- 웹 검색: MDN HTML elements reference, MDN ARIA/ARIA attributes, W3C WAI WCAG 2.4.1 Bypass Blocks 확인
- 터미널: `sed`, `rg`, frontmatter 확인 스크립트, `npm run lint`, `npm run type-check`, `npm run format:check`, `npm run build`
- `apply_patch`: Markdown 글과 AI 활용 기록 수정

산출물:

- `content/blog/semantic-html.md`
- `content/blog/web-accessibility-basics.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `content/blog/*.md` frontmatter가 필요한 필드를 갖는지 확인했다.
- `rg`로 새 글 slug와 예시 링크를 확인하고, 잘못된 `/blog/accessibility` 예시를 실제 slug로 수정했다.
- `npm run lint`, `npm run type-check`, `npm run format:check`, `npm run build`로 검증했다.

선택 이유:

- 한 글에 태그와 접근성을 모두 넣으면 학습 범위가 흐려지므로, 글의 책임을 나누는 편이 구조와 유지보수에 유리하다.
- semantic tag 글은 HTML 구조 판단 기준을 빠르게 참고하게 하고, 접근성 글은 ARIA와 키보드 탐색 기준을 별도로 확장할 수 있게 만든다.

배운 점:

- semantic HTML은 접근성의 출발점이지만 접근성 전체를 대체하지 않는다.
- 글 주제가 넓어질 때는 하나의 긴 글로 유지하기보다, 독자가 다시 찾아볼 기준이 다른 부분을 별도 글로 분리하는 편이 낫다.

---

## Agent Skill 작성을 위한 Skill을 만든 작업

상황 / 문제:

- 사용자는 Agent Skills를 만드는 방법에 대한 긴 글을 바탕으로, 앞으로 다른 Skill을 만들 때 재사용할 수 있는 Skill 자체를 만들고자 했다.
- 기존 `skill-creator`는 범용 생성 가이드였지만, 이 저장소에서 반복적으로 쓰는 `.codex/skills` 구조와 한국어 프로젝트 문서 기록 기준까지 반영한 로컬 Skill이 필요했다.

내가 한 판단 / 작업:

- 사용자는 제공한 글에서 좋은 Skill의 조건, `description` 작성법, `SKILL.md` 구조, 예제/스크립트, 검증과 반복 개선 흐름을 핵심 자료로 제공했다.
- Codex는 기존 프로젝트 Skill들이 `.codex/skills`에 있으므로 새 Skill도 같은 위치에 두는 것으로 판단했다.

Codex가 한 작업:

- `skill-creator` 지침에 따라 `agent-skill-builder` 이름을 정하고 `init_skill.py`로 기본 Skill 폴더를 생성했다.
- `SKILL.md`를 반복 업무 정의, 트리거 예시 수집, 이름/위치 결정, 리소스 판단, frontmatter 작성, 본문 작성, `agents/openai.yaml`, validation, 실제 사용 후 개선 흐름으로 구성했다.
- `agents/openai.yaml`에는 UI에서 볼 수 있는 표시 이름, 짧은 설명, 기본 프롬프트를 추가했다.
- `docs/04-ai-usage-log.md`의 등록된 AI 자동화 목록에 `agent-skill-builder`를 추가했다.

프롬프트 원문 / 핵심 질문:

```txt
이걸읽고 에이전트 skills를 만들기위한 스킬스를 만들어줘
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 별도 세부 경로를 지정하지 않았지만, 현재 작업 저장소의 기존 Skill 구조가 `.codex/skills`에 있었기 때문에 프로젝트 로컬 Skill로 만들었다.
- Codex는 제공된 글의 내용을 그대로 문서화하지 않고, 실제 Codex가 따라야 할 실행 절차와 검증 기준으로 압축했다.

사용한 AI 하네스 / 도구:

- `skill-creator`: Skill 폴더 구조, frontmatter, `agents/openai.yaml`, validation 기준을 확인하기 위해 사용
- `ai-usage-recorder`: Skill 생성 작업이 기록할 가치가 있는 AI 활용 사례인지 판단하고 로그 형식을 맞추기 위해 사용
- 터미널: `find`, `sed`, `rg`, `init_skill.py`, `quick_validate.py`
- 임시 venv: 전역 Python 환경에 `PyYAML`이 없어 `/tmp/codex-skill-validate-venv`의 Python으로 validator 실행
- `apply_patch`: `SKILL.md`와 AI 활용 기록 수정

산출물:

- `.codex/skills/agent-skill-builder/SKILL.md`
- `.codex/skills/agent-skill-builder/agents/openai.yaml`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- 전역 Python에서 `quick_validate.py` 실행 시 `PyYAML`이 없어 실패했다.
- 기존 임시 venv `/tmp/codex-skill-validate-venv`에 `PyYAML`이 있어 해당 Python으로 다시 실행했고 `Skill is valid!`를 확인했다.

선택 이유:

- Skill 생성 기준을 매번 대화로 다시 설명하기보다 로컬 Skill로 남기면 반복 작업의 일관성과 유지보수성이 좋아진다.
- 제공된 글은 정보 공유용 글이었기 때문에 그대로 붙이지 않고, Codex가 실제로 실행할 수 있는 절차와 검증 체크리스트로 바꾸는 편이 Skill 목적에 맞다.

배운 점:

- 좋은 Skill은 긴 설명보다 정확한 trigger description과 실행 가능한 규칙이 중요하다.
- Skill도 코드처럼 실제 사용 후 activation 실패, 과한 활성화, 모호한 출력 같은 문제를 관찰하고 지속적으로 수정해야 한다.

---

## 웹 접근성 기본 글 최종본을 보완한 작업

상황 / 문제:

- `content/blog/web-accessibility-basics.md` 초안에는 키보드 탐색, accessible name, ARIA 속성, skip link 설명이 있었지만, 사용자가 정리한 학습 로드맵의 고민과 실제 적용 기준이 글 전체에 충분히 자연스럽게 녹아 있지 않았다.
- 사용자는 체크리스트가 아니라 기술 블로그 최종본처럼, 만들면서 겪은 고민과 궁금증, 적용한 것과 보류한 것을 자세히 담기를 원했다.

내가 한 판단 / 작업:

- 사용자는 `웹 접근성 기본: 키보드, 스크린 리더, ARIA` 글을 최종본 수준으로 보완하라고 요청했다.
- 접근성 글에 포함할 학습 내용으로 keyboard navigation, screen reader 탐색, `focus-visible`, accessible name, `aria-current`, `aria-label`, `aria-hidden`, `aria-live`, skip link, 실제 Header/Blog/Resume 적용 사례를 제공했다.

Codex가 한 작업:

- 기존 접근성 글을 전체 재구성해, 접근성을 이름, 역할, 상태 관점으로 설명하고 HTML 기본 동작을 먼저 쓰는 기준을 정리했다.
- 키보드 탐색, focus 표시, 스크린 리더가 이해하는 구조, accessible name, `aria-label`, `aria-current`, `aria-hidden`, `aria-live`, skip link를 이 블로그 코드 예시와 연결해 다시 작성했다.
- 적용한 것과 일부러 보류한 것을 분리해, ARIA를 많이 붙이는 것이 아니라 필요한 정보만 보완한다는 기준을 글 안에 남겼다.
- W3C WAI와 MDN 공식 문서를 확인해 접근성, `focus-visible`, ARIA 속성, Bypass Blocks 설명의 근거를 맞췄다.

프롬프트 원문 / 핵심 질문:

```txt
웹 접근성 기본: 키보드, 스크린 리더, ARIA

이거 블로그글 전체적으로 빠진것들 보완해주고

위 내용에 없는 내용이더라도 보완해주고 만들면서 겪은 고민들과 궁금증들 자세합ㄴ보본들 적용한것들 이런것들 자연스럽게 기술블로그처럼 최종본으로 적어줘
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 단순히 접근성 개념을 추가하라는 요청이 아니라, 학습 로드맵에서 정리한 항목과 실제 블로그 구현 과정의 고민을 함께 반영하라고 요구했다.
- Codex는 기존 초안의 항목 나열식 흐름을 줄이고, “왜 필요한가”, “어떤 코드에 적용했는가”, “왜 일부는 보류했는가”를 중심으로 글 구조를 다시 잡았다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 블로그 글이 이 프로젝트의 semantic HTML, 접근성, Blog detail 기준과 맞는지 확인하기 위해 사용
- `ai-usage-recorder`: 이번 글 보완 작업이 기록할 가치가 있는 AI 활용 사례인지 판단하고 기록 형식을 맞추기 위해 사용
- 웹 공식 문서 확인: W3C WAI Introduction to Web Accessibility, WCAG 2.4.1 Bypass Blocks, WCAG 4.1.2 Name Role Value, MDN ARIA, MDN `:focus-visible`, MDN ARIA attribute 문서
- 터미널: `sed`, `rg`, `wc`, `git status`로 기존 글, 코드 예시, 변경 상태 확인
- `apply_patch`: 접근성 글과 AI 활용 기록 수정

산출물:

- `content/blog/web-accessibility-basics.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `npx prettier --check content/blog/web-accessibility-basics.md docs/04-ai-usage-log.md`로 Markdown 포맷을 확인했다.
- `npm run build`로 Next.js production build와 Markdown 기반 블로그 페이지 생성을 확인했다.

선택 이유:

- 사용자가 이미 학습 로드맵에 정리한 내용을 바탕으로 글을 완성해야 했기 때문에, AI를 사용해 구조와 흐름을 빠르게 재배치하는 편이 속도와 일관성 면에서 유리했다.
- 공식 문서 확인과 프로젝트 코드 예시를 함께 사용하면, 접근성 글이 추상 설명에 머물지 않고 실제 유지보수 가능한 기준으로 남는다.

배운 점:

- 접근성 글은 ARIA 속성 설명만 나열하면 실무 적용 기준이 약해진다.
- 실제 코드에서 무엇을 적용했고 무엇을 보류했는지 함께 남기면, 다음에 검색, 폼, 에러 메시지 같은 기능을 추가할 때 같은 기준으로 확장하기 쉽다.

---

## 프론트엔드 퍼블리싱/설계 커리큘럼을 로드맵에 통합한 작업

상황 / 문제:

- 사용자는 CSS 기본기, 반응형, React 전역 세팅, 컴포넌트 패턴, 애니메이션, 아키텍처까지 포함된 긴 커리큘럼을 제공했다.
- 기존 `docs/02-study-blogging-roadmap.md`에도 이미 HTML/CSS, React, 상태관리, 성능, 테스트 섹션이 있었기 때문에 내용을 그대로 붙이면 중복과 과한 범위가 생길 수 있었다.

내가 한 판단 / 작업:

- 사용자는 “적용하면서 공부할 것”을 로드맵에 넣고, 빠진 내용이 있으면 보완해 달라고 요청했다.
- 제공한 커리큘럼은 개념 설명이 많았지만, 로드맵에는 실제 블로그 프로젝트에 적용하고 검증할 수 있는 체크리스트가 필요하다고 판단했다.

Codex가 한 작업:

- 기존 로드맵 목차를 확인하고 CSS/반응형, React/Next 전역 세팅, 컴포넌트 설계, 상태관리, API 상태, 성능, 테스트 섹션에 내용을 분산해 추가했다.
- Vite, React Router 예시는 현재 프로젝트 구조와 다르므로 Next App Router 기준의 `layout.tsx`, `page.tsx`, provider, `NEXT_PUBLIC_` 환경변수 항목으로 바꿨다.
- CSS 변수, flex/grid 실전 패턴, `auto-fill`/`auto-fit`, stacking context, container query, responsive image, motion 성능, `will-change`, `useReducer`, TanStack Query, 테스트 전략처럼 기존 로드맵에서 약했던 항목을 보완했다.
- 후순위 TODO에는 전역 상태 라이브러리를 실제 문제 없이 프로덕션에 도입하지 않는 기준을 추가했다.

프롬프트 원문 / 핵심 질문:

```txt
이런것들도 프로젝트 로드맵에 추가해줘 적용하면서 공부할거야 빠진것들있다면 추가해주라
```

커뮤니케이션 / 프롬프트 개선 과정:

- 사용자는 긴 커리큘럼을 한 번에 제공했지만, 현재 블로그는 Next.js App Router 기반이므로 일부 예시는 프로젝트 맥락에 맞게 조정해야 했다.
- Codex는 새 목차를 별도로 만들지 않고 기존 로드맵의 학습 흐름에 흡수하는 방식으로 중복을 줄였다.

사용한 AI 하네스 / 도구:

- `blog-ui-publisher`: 이 블로그의 Next.js, Tailwind, 접근성, 반응형 기준에 맞춰 로드맵 항목을 조정하기 위해 사용
- `ai-usage-recorder`: 로드맵 구조 보강 작업을 AI 활용 기록으로 남길 가치가 있는지 판단하기 위해 사용
- 터미널: `sed`, `rg`, `git status`
- `apply_patch`: 로드맵과 AI 활용 기록 수정

산출물:

- `docs/02-study-blogging-roadmap.md`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- `docs/02-study-blogging-roadmap.md`의 기존 목차와 중복되는 내용을 확인한 뒤 필요한 항목만 추가했다.
- `npm run format:check`와 `git diff --check`로 문서 포맷과 whitespace를 확인했다.

선택 이유:

- 긴 커리큘럼을 별도 문서로 복사하면 유지보수하기 어렵기 때문에, 기존 로드맵의 적용 단위에 맞춰 흡수하는 편이 구조와 일관성 면에서 낫다.

배운 점:

- 학습 로드맵은 개념 목록보다 “어디에 적용하고 무엇을 검증할지”가 드러날 때 실제 프로젝트 경험으로 이어진다.

---

## 블로그 전용 퍼블리싱 Skill과 범용 Publishing Skill을 분리한 작업

상황 / 문제:

- `blog-ui-publisher` 안에 Next.js 구조, semantic HTML, 접근성 기본, 문서 작성 톤, CSS/반응형/시각 스타일 기준이 섞여 있었다.
- 사용자는 CSS 레이아웃과 반응형은 별도 학습 후 Skill에 반영하고, 우선 블로그 전용 Skill에는 CSS 세부 규칙을 빼길 원했다.
- 동시에 HTML/CSS 퍼블리싱 전반에 사용할 별도 `publishing` Skill 기준을 제공했다.

내가 한 판단 / 작업:

- 사용자는 블로그 전용 Skill과 CSS 포함 퍼블리싱 Skill의 책임을 분리하라고 지시했다.
- CSS 세부 규칙은 범용 `publishing` Skill에 두고, `blog-ui-publisher`는 Next.js App Router 구조, semantic HTML, 접근성 기본, 기본기 가이드형 글쓰기 검수에 집중하도록 방향을 정했다.

Codex가 한 작업:

- `blog-ui-publisher`에서 CSS layout, responsive styling, Tailwind token, visual design 규칙을 out-of-scope로 분리했다.
- `blog-ui-publisher`에 Next.js가 기본 처리하는 것과 프로젝트가 직접 정하는 것을 구분하는 규칙을 추가했다.
- 사용자가 제공한 HTML/CSS 퍼블리싱 기준을 바탕으로 `.codex/skills/publishing/SKILL.md`와 `agents/openai.yaml`을 추가했다.
- AI 활용 자동화 목록에 `publishing` Skill을 등록했다.

프롬프트 원문 / 핵심 질문:

```txt
저 내용들을 스킬에 반영해줘 퍼블리싱 스킬 css관련은 빼고 css공부하고나서 그다음 skills에 반영할거야

퍼블리싱 스킬스 적용해줘
```

커뮤니케이션 / 프롬프트 개선 과정:

- 처음에는 `blog-ui-publisher`에 CSS 관련 기준이 함께 들어가 있었지만, 사용자는 CSS 학습 전에는 블로그 전용 Skill에서 CSS 세부 규칙을 빼야 한다고 정정했다.
- 이어서 사용자는 별도 `publishing` Skill 초안을 제공했고, Codex는 이를 프로젝트 로컬 Skill로 분리해 작성했다.

사용한 AI 하네스 / 도구:

- `agent-skill-builder`: Skill 책임 분리, frontmatter, body 구조, validation 기준을 맞추기 위해 사용
- `ai-usage-recorder`: Skill 분리 작업이 기록할 가치가 있는지 판단하고 로그 형식을 맞추기 위해 사용
- 터미널: `sed`, `find`, `rg`, `git status`, `quick_validate.py`
- 임시 venv: 전역 Python에 `PyYAML`이 없어 `/tmp/codex-skill-validate-venv`의 Python으로 Skill validator 실행
- `apply_patch`: Skill 파일과 AI 활용 기록 수정

산출물:

- `.codex/skills/blog-ui-publisher/SKILL.md`
- `.codex/skills/blog-ui-publisher/agents/openai.yaml`
- `.codex/skills/publishing/SKILL.md`
- `.codex/skills/publishing/agents/openai.yaml`
- `docs/04-ai-usage-log.md`

검증 / 수정:

- 처음 작성한 `publishing` Skill frontmatter에서 콜론이 포함된 긴 description 때문에 YAML 파싱 오류가 발생했다.
- `description: >` block scalar로 수정한 뒤 `quick_validate.py`에서 `Skill is valid!`를 확인했다.
- `blog-ui-publisher`도 같은 validator로 다시 검증했다.
- `npx prettier --check`로 Skill Markdown과 YAML 포맷을 확인했다.

선택 이유:

- 블로그 전용 Next.js 구조 검수와 범용 HTML/CSS 퍼블리싱 기준을 분리하면 Skill 활성화 범위가 명확해지고 유지보수가 쉬워진다.
- CSS 학습 전 기준과 학습 후 기준을 분리해두면, 나중에 CSS 레이아웃/반응형 학습 결과를 `publishing` Skill에 확장하기 쉽다.

배운 점:

- Skill은 관련 지식을 한곳에 많이 넣는 것보다 반복 작업의 책임 경계를 선명하게 나누는 편이 실행 품질이 높다.
- YAML frontmatter에는 콜론이 포함된 긴 설명을 넣을 때 block scalar를 쓰는 편이 안전하다.
