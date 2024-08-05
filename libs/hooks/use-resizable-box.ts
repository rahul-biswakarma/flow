import { useEffect, useState } from 'react';
import { ResizeCallbackData } from 'react-resizable';

export const useResizableBox = ({
  storageKey,
  panelMargin,
  isPreserveEnabled = false,
}: {
  storageKey?: string;
  panelMargin: number;
  isPreserveEnabled: boolean;
}) => {
  const [screenWidth, setScreenWidth] = useState(window?.innerWidth ?? 500);
  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 500);

  const maxWidth = screenWidth - 2 * panelMargin;
  const maxHeight = screenHeight - 2 * panelMargin;

  const [size, setSize] = useState({ width: (maxWidth * 40) / 100, height: maxHeight });

  // Load the size and position from localStorage
  useEffect(() => {
    if (isPreserveEnabled && storageKey) {
      const storedSize = localStorage.getItem(storageKey);

      if (storedSize) setSize(JSON.parse(storedSize));
    }
  }, []);

  // Update size when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenWidth = window.innerWidth;
      const newScreenHeight = window.innerHeight;

      setScreenWidth(newScreenWidth);
      setScreenHeight(newScreenHeight);

      if (size.width > newScreenWidth - 2 * panelMargin) {
        const newSize = { width: newScreenWidth - 2 * panelMargin, height: screenHeight };

        setSize(newSize);
        if (isPreserveEnabled && storageKey) localStorage.setItem(storageKey, JSON.stringify(newSize));
      }

      if (size.height > newScreenHeight - 2 * panelMargin) {
        const newSize = { width: size.width, height: newScreenHeight - 2 * panelMargin };

        setSize(newSize);
        if (isPreserveEnabled && storageKey) localStorage.setItem(storageKey, JSON.stringify(newSize));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size.height, panelMargin]);

  const handleResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newSize = { width: data.size.width, height: data.size.height };

    setSize(newSize);
    if (isPreserveEnabled && storageKey) localStorage.setItem(storageKey, JSON.stringify(newSize));
  };

  return { size, handleResizeStop, maxHeight, maxWidth };
};
