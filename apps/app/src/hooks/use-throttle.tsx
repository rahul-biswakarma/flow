import { useCallback, useEffect, useRef } from "react";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function useThrottle<T extends (...args: any[]) => any>(
  callback: T,
  delay: number,
): T {
  const lastCall = useRef<number>(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return useCallback(
    ((...args) => {
      const now = Date.now();
      const timeSinceLastCall = now - lastCall.current;

      if (timeSinceLastCall >= delay) {
        callback(...args);
        lastCall.current = now;
      } else {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          callback(...args);
          lastCall.current = Date.now();
        }, delay - timeSinceLastCall);
      }
    }) as T,
    [callback, delay],
  );
}
