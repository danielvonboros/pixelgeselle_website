import { useEffect, useState } from "react";

// Steps through 0..count-1 every `interval` ms while `running` is true.
// Used to highlight one item after another until the visitor takes over with the mouse.
export const useAutoCycle = (count: number, interval: number, running: boolean) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!running || count < 2) return;
    const timer = window.setInterval(() => setIndex((current) => (current + 1) % count), interval);
    return () => window.clearInterval(timer);
  }, [count, interval, running]);

  return [index, setIndex] as const;
};
