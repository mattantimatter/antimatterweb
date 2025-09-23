"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function ScrollRestoration() {
  const pathname = usePathname();
  const lenis = useLenis();

  // useEffect(() => {
  //   if (!lenis) return;

  //   const key = `scroll-${pathname}`;

  //   // save scroll on unload
  //   const saveScroll = () => {
  //     sessionStorage.setItem(key, String(lenis.scroll));
  //   };

  //   window.addEventListener("beforeunload", saveScroll);
  //   return () => {
  //     saveScroll();
  //     window.removeEventListener("beforeunload", saveScroll);
  //   };
  // }, [pathname, lenis]);

  useEffect(() => {
    if (!lenis) return;

    // const saved = sessionStorage.getItem(`scroll-${pathname}`);

    lenis.scrollTo(0, { immediate: true });
  }, [pathname, lenis]);

  return null;
}
