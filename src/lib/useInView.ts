"use client";

import { useEffect, useRef, useState } from "react";

/** Becomes true once the element gets within `rootMargin` of the viewport (and stays true). */
export function useInView<T extends Element>(enabled = true, rootMargin = "200px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(!enabled);

  useEffect(() => {
    if (!enabled || inView) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [enabled, inView, rootMargin]);

  return { ref, inView };
}
