"use client";

import { useEffect } from "react";
import { introState } from "@/components/motion";

// The first render of the session plays the longer intro; later navigations use a quick wipe.
export default function Template({ children }: { children: React.ReactNode }) {
  const intro = introState.first;
  useEffect(() => {
    introState.first = false;
  }, []);

  return (
    <>
      {/* Pure CSS, so the page can never get stuck behind the curtain if scripts fail. */}
      <div aria-hidden="true" className={`curtain ${intro ? "curtain--intro" : "curtain--nav"}`}>
        <svg viewBox="0 0 28 28" className="curtain-mark">
          <path d="M14 4 L24 21 L4 21 Z" pathLength={1} />
          <circle cx="14" cy="4.5" r="3" />
          <circle cx="23.5" cy="21" r="3" className="curtain-signal" />
          <circle cx="4.5" cy="21" r="3" />
        </svg>
      </div>
      <div className={intro ? "page-enter page-enter--intro" : "page-enter"}>{children}</div>
    </>
  );
}
