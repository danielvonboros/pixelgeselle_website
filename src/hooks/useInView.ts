import { useEffect, useRef, useState } from "react";

interface InViewOptions {
  once?: boolean;
  rootMargin?: string;
  threshold?: number;
}

export const useInView = <T extends Element>({
  once = true,
  rootMargin = "0px 0px -12% 0px",
  threshold = 0,
}: InViewOptions = {}) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [once, rootMargin, threshold]);

  return [ref, inView] as const;
};
