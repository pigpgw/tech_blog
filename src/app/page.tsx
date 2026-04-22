export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-4xl flex-col justify-center px-6 py-20">
      <p className="text-sm font-medium text-zinc-500">Tech Blog</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-zinc-950">
        기술 블로그 프로젝트
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
        프론트엔드 학습 과정과 구현 경험을 코드와 글로 정리하는 개인 기술
        블로그입니다.
      </p>
    </main>
  );
}
