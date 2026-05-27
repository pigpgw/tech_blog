import Link from "next/link";

export default function Home() {
  const user = null;
  console.log(user.name);

  return (
    <section>
      <p>Developer Notes</p>
      <h1>박건우 Tech Blog</h1>
      <p>개발하며 마주친 문제와 해결 과정을 기록합니다.</p>

      <ul>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/resume">Resume</Link>
        </li>
      </ul>
    </section>
  );
}
