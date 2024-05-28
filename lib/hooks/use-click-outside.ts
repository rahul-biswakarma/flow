import React, { useEffect, useRef } from 'react';

type HandlerType = (event: MouseEvent | TouchEvent) => void;

/**
 * @param ref Reference to the element (or list of elements) on which we want to detect outside click
 * @param handler A callback that will be called if user clicks outside `ref` element
 * @param when If provided, it will only add event listeners when `when` is truthful
 */
export function useOnClickOutside(
  ref: React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[],
  handler: HandlerType,
  when = true,
) {
  const refs = usePropRef(getArrayOfValues(ref));
  const handlerRef = useRef<HandlerType>(() => void 0);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!when) return;

    const listener: HandlerType = (event: MouseEvent | TouchEvent) => {
      if (!refs.current) return;
      const target = event.target as Element;

      // Do nothing if clicking ref's element or descendent elements
      if (refs.current.some((r) => r.current?.contains(target))) {
        return;
      }
      handlerRef.current?.(event);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [refs, when]);
}

function getArrayOfValues<T>(data: T | Array<T>): Array<T> {
  return data !== undefined && data !== null ? (Array.isArray(data) ? data : [data]) : [];
}

function usePropRef<T>(propValue: T) {
  const ref = useRef(propValue);

  useEffect(() => {
    ref.current = propValue;
  }, [propValue]);

  return ref;
}
