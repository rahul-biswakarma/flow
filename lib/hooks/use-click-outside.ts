import { useCallback, useEffect, useMemo, useRef } from 'react';

interface Props {
  onTriggered: (e: Event) => void;
  disableClick?: boolean;
  disableTouch?: boolean;
  disableKeys?: boolean;
  allowAnyKey?: boolean;
  triggerKeys?: string[];
}

type ClickOrTouchListener = (e: MouseEvent | TouchEvent) => void;
type KeyListener = (e: KeyboardEvent) => void;
type EventConfigItem = [boolean | undefined, string, (e: Event) => void];

export function useClickOutside<T extends HTMLElement>({
  onTriggered,
  disableClick,
  disableTouch,
  disableKeys,
  allowAnyKey,
  triggerKeys,
}: Props) {
  const ref = useRef<T | null>(null);

  const keyListener = useCallback<KeyListener>(
    (e) => {
      if (allowAnyKey) {
        onTriggered(e);
      } else if (triggerKeys && triggerKeys.includes(e.key)) {
        onTriggered(e);
      } else if (e.key === 'Escape') {
        onTriggered(e);
      }
    },
    [allowAnyKey, triggerKeys, onTriggered],
  );

  const clickOrTouchListener = useCallback<ClickOrTouchListener>(
    (e) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onTriggered(e);
      }
    },
    [onTriggered],
  );

  const eventsConfig: EventConfigItem[] = useMemo(
    () => [
      [disableClick, 'click', clickOrTouchListener as unknown as (e: Event) => void],
      [disableTouch, 'touchstart', clickOrTouchListener as unknown as (e: Event) => void],
      [disableKeys, 'keyup', keyListener as unknown as (e: Event) => void],
    ],
    [disableClick, disableTouch, disableKeys, clickOrTouchListener, keyListener],
  );

  useEffect(() => {
    eventsConfig.forEach(([isDisabled, eventName, listener]) => {
      if (!isDisabled) {
        document.addEventListener(eventName, listener);
      }
    });

    return () => {
      eventsConfig.forEach(([isDisabled, eventName, listener]) => {
        if (!isDisabled) {
          document.removeEventListener(eventName, listener);
        }
      });
    };
  }, [eventsConfig]);

  return ref;
}
