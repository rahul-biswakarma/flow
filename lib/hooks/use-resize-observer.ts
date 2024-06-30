import { useEffect, useState, RefObject } from 'react';

type Rect = {
  left: number;
  top: number;
};

export const useResizeObserver = (ref: RefObject<HTMLElement>) => {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      if (entries.length) {
        const containerRect = ref.current?.getBoundingClientRect();

        containerRect &&
          setRect({
            left: containerRect.left,
            top: containerRect.top,
          });
      }
    };

    const resizeObserver = new ResizeObserver((entries) => handleResize(entries));

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        resizeObserver.unobserve(ref.current);
      }
    };
  }, [ref]);

  return rect;
};
