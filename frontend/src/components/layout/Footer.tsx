import Link from "next/link";
export const Footer = () => (
  <footer className="site-footer">
    <div className="wrap footer-inner">
      <span className="footer-brand">Stay curious. Keep building.</span>
      <span>© {new Date().getFullYear()} 박건우</span>
      <div className="footer-links">
        <a
          href="https://github.com/pigpgw"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub ↗
        </a>
        <Link href="/resume">About ↗</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </div>
  </footer>
);
