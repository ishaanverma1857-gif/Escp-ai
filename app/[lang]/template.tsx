"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { introState, isIntro } from "@/components/motion";
import { Knot } from "@/components/brand";

/*
 * The intro curtain plays only when the homepage is loaded fresh (first visit or a reload).
 * Moving between pages inside the site never shows it: the next page simply fades in.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const intro = isIntro(pathname);

  useEffect(() => {
    introState.first = false;
  }, []);

  return (
    <>
      {/* Pure CSS, so the page can never get stuck behind the curtain if scripts fail. */}
      {intro && (
        <div aria-hidden="true" className="curtain curtain--intro">
          <Knot draw gap="var(--color-ink)" className="curtain-mark" />
          <span className="curtain-word">ESCP | AI</span>
        </div>
      )}
      <div className={intro ? "page-enter page-enter--intro" : "page-enter"}>{children}</div>
    </>
  );
}
