"use client";
import { ArrowUpRight } from "lucide-react";
export const PrintResume = () => (
  <button className="small-link print-resume" onClick={() => window.print()}>
    이력서 인쇄 <ArrowUpRight size={15} aria-hidden="true" />
  </button>
);
