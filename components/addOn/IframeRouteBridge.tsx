"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function IframeRouteBridge() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // gabungkan path + query
    const query = searchParams?.toString();
    const fullPath = query ? `${pathname}?${query}` : pathname;

    // kirim ke parent (antariks.id)
    window.parent?.postMessage(
      { type: "route", path: fullPath },
      "https://antariks.id"
    );
  }, [pathname, searchParams]);

  return null;
}
