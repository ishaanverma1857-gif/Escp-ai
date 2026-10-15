"use client";

import { useEffect } from "react";
import { introState } from "@/components/motion";
import { Knot } from "@/components/brand";

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
        <Knot draw gap="var(--color-ink)" className="curtain-mark" />
        <span className="curtain-word">ESCP | AI</span>
      </div>
      <div className={intro ? "page-enter page-enter--intro" : "page-enter"}>{children}</div>
    </>
  );
}
