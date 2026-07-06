import Link from "next/link";
import { HeaderNav } from "@/components/layout/header/HeaderNav";

export const Header = () => {
  return (
    <header className="flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <Link
        href="/"
        aria-label="Park Geonwoo 홈으로 이동"
        className="inline-flex min-h-11 items-center gap-3 text-sm font-semibold text-slate-950 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500"
      >
        <span
          aria-hidden="true"
          className="inline-flex size-9 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white"
        >
          PG
        </span>
        <span>Park Geonwoo</span>
      </Link>
      <HeaderNav />
    </header>
  );
};
