import React, { useEffect, useState, useRef } from 'react';
import { ResizableBox, ResizeCallbackData, ResizeHandle } from 'react-resizable';
import 'react-resizable/css/styles.css';

type ResizablePanelProps = {
  children: React.ReactNode;
  maxWidth?: number;
  maxHeight?: number;
  localStorageKey: string;
  parentRef: React.RefObject<HTMLDivElement>;
  resizeHandles?: ResizeHandle[];
  disableWidthResize?: boolean;
  disableHeightResize?: boolean;
};

const ResizablePanel = ({
  children,
  localStorageKey,
  parentRef,
  maxWidth,
  maxHeight,
  resizeHandles,
  disableWidthResize,
  disableHeightResize,
}: ResizablePanelProps) => {
  const screenPadding = 10;

  const [screenWidth, setScreenWidth] = useState(window?.innerWidth ?? 0);
  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 0);

  const maxWidthAllowed = maxWidth ?? screenWidth - 2 * screenPadding;
  const maxHeightAllowed = maxHeight ?? screenHeight - 2 * screenPadding;

  const [size, setSize] = useState({ width: 0, height: 0 });
  const resizableRef = useRef(null);

  // Load size from localStorage or use parent size
  useEffect(() => {
    const storedSize = localStorage.getItem(localStorageKey);

    if (storedSize) {
      setSize(JSON.parse(storedSize));
    } else if (parentRef.current) {
      setSize({
        width: parentRef.current.clientWidth,
        height: parentRef.current.clientHeight,
      });
    }
  }, [localStorageKey, parentRef]);

  // Update size when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenHeight = window.innerHeight;
      const newScreenWidth = window.innerWidth;

      setScreenHeight(newScreenHeight);
      setScreenWidth(newScreenWidth);

      if (size.width > maxWidthAllowed) {
        const newSize = { width: maxWidthAllowed, height: size.height };

        setSize(newSize);
        localStorage.setItem('floatingWidgetSize', JSON.stringify(newSize));
      }

      if (size.height > newScreenHeight - 2 * screenPadding) {
        const newSize = { width: maxWidthAllowed, height: newScreenHeight - 2 * screenPadding };

        setSize(newSize);
        localStorage.setItem('floatingWidgetSize', JSON.stringify(newSize));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size.height, screenPadding]);

  // Save size to localStorage
  const handleResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newSize = { width: data.size.width, height: data.size.height };

    setSize(newSize);
    localStorage.setItem(localStorageKey, JSON.stringify(newSize));
  };

  // Determine which resize handles to use
  const handles =
    resizeHandles ??
    ([disableWidthResize ? '' : 'w', disableHeightResize ? '' : 's'].filter(Boolean) as ResizeHandle[]);

  return (
    <ResizableBox
      ref={resizableRef}
      className="resizable-panel"
      height={size.height}
      maxConstraints={[maxWidthAllowed, maxHeightAllowed]}
      minConstraints={[100, 100]}
      resizeHandles={handles}
      width={size.width}
      onResizeStop={handleResizeStop}
    >
      {children}
    </ResizableBox>
  );
};

export default ResizablePanel;
