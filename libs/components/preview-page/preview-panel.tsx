import React, { useEffect, useState } from 'react';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Box, Text } from '@radix-ui/themes';

import { Preview } from './preview';

const MIN_WIDTH = 300;
const MIN_HEIGHT = 300;
const LOCAL_STORAGE_KEY = 'preview_panel_size';

export const PreviewPanel = ({ style, panelMargin }: { style?: React.CSSProperties; panelMargin: number }) => {
  const [screenWidth, setScreenWidth] = useState(window?.innerWidth ?? 500);
  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 500);

  const maxHeight = screenHeight - 2 * panelMargin;
  const maxWidth = screenWidth - 2 * panelMargin;

  const [size, setSize] = useState({ width: (maxWidth * 40) / 100, height: maxHeight });

  // Load the size and position from localStorage
  //   useEffect(() => {
  //     const storedSize = localStorage.getItem(LOCAL_STORAGE_KEY);

  //     if (storedSize) {
  //       setSize(JSON.parse(storedSize));
  //     }
  //   }, []);

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
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSize));
      }

      if (size.height > newScreenHeight - 2 * panelMargin) {
        const newSize = { width: screenWidth, height: newScreenHeight - 2 * panelMargin };

        setSize(newSize);
        // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSize));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size.height, panelMargin]);

  const handleResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newSize = { width: data.size.width, height: data.size.height };

    setSize(newSize);
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newSize));
  };

  return (
    <ResizableBox
      height={size.height}
      maxConstraints={[maxWidth, maxHeight]}
      minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
      resizeHandles={['s', 'w']}
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        right: panelMargin + 'px',
        top: panelMargin + 'px',
        border: '1px solid var(--gray-4)',
        borderRadius: 'var(--radius-4)',
        backgroundColor: 'var(--gray-surface)',
        paddingBottom: '1px',
        overflow: 'hidden',
        backdropFilter: 'blur(8px)',
        ...style,
      }}
      width={size.width}
      onResizeStop={handleResizeStop}
    >
      <Box
        style={{
          padding: '8px 16px',
          borderBottom: '1px solid var(--gray-4)',
          backgroundColor: 'var(--gray-3)',
        }}
      >
        <Text>Preview</Text>
      </Box>
      <Box
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        <Preview />
      </Box>
    </ResizableBox>
  );
};
