// components/Providers.tsx
"use client";

import ReactLenis from "lenis/react";
import { ScrollRestoration } from "@/utils/scrollRestoration";
import PageTransition from "./ui/PageTransition";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Lenis for smooth scrolling */}
      <ReactLenis root options={{ duration: 1.5 }}>
        <PageTransition>
          <main>{children}</main>
        </PageTransition>
      </ReactLenis>

      {/* Custom scroll restoration */}
      <ScrollRestoration />
    </>
  );
}
