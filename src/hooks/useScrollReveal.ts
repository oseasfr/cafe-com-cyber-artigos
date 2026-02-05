import { useEffect, useRef, useState } from "react";

interface UseScrollRevealOptions {
  threshold?: number;
  rootMargin?: string;
  delay?: number;
}

export function useScrollReveal({
  threshold = 0.1,
  rootMargin = "0px",
  delay = 0,
}: UseScrollRevealOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer: IntersectionObserver;
    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setIsVisible(true);
        },
        { threshold, rootMargin }
      );
      observer.observe(el);
    }, delay);

    return () => {
      clearTimeout(timer);
      observer?.disconnect?.();
    };
  }, [threshold, rootMargin, delay]);

  return { ref, isVisible };
}
