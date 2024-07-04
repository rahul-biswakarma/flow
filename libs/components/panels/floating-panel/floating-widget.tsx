'use client';

import React, { useEffect, useState, useRef } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Button, Flex, ScrollArea, Text } from '@radix-ui/themes';
import 'react-resizable/css/styles.css';
import clsx from 'clsx';
import { IconSettings, IconX } from '@tabler/icons-react';

import { FloatingWidgetContent } from './floating-panel-widgets';

import styles from '@/libs/styles/floating-widget.module.css';
import { useFloatingWidget } from '@/libs/context';

export const FloatingWidget = () => {
  const { isOpen, closePanel, data, mode } = useFloatingWidget();

  const screenPadding = 10;
  const maxWidth = 370;

  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 500);
  const maxHeight = screenHeight - 2 * screenPadding;

  const [position, setPosition] = useState({ x: window.innerWidth - maxWidth - screenPadding, y: screenPadding });
  const [size, setSize] = useState({ width: maxWidth, height: maxHeight });

  const draggableRef = useRef<HTMLDivElement>(null);

  // Load the size and position from localStorage
  useEffect(() => {
    const storedPosition = localStorage.getItem('floatingWidgetPosition');
    const storedSize = localStorage.getItem('floatingWidgetSize');

    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }
    if (storedSize) {
      setSize(JSON.parse(storedSize));
    }
  }, []);

  // Update size when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenHeight = window.innerHeight;

      setScreenHeight(newScreenHeight);

      if (size.height > newScreenHeight - 2 * screenPadding) {
        const newSize = { width: maxWidth, height: newScreenHeight - 2 * screenPadding };

        setSize(newSize);
        localStorage.setItem('floatingWidgetSize', JSON.stringify(newSize));
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size.height, screenPadding]);

  // Save the size and position to localStorage
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };

    setPosition(newPosition);
    localStorage.setItem('floatingWidgetPosition', JSON.stringify(newPosition));
  };

  const handleResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newSize = { width: maxWidth, height: data.size.height };

    setSize(newSize);
    localStorage.setItem('floatingWidgetSize', JSON.stringify(newSize));
  };

  if (!mode || !isOpen) return null;

  return (
    <Draggable
      bounds={{
        top: screenPadding,
        left: screenPadding,
        right: window.innerWidth - maxWidth - screenPadding,
        bottom: screenHeight - size.height - screenPadding,
      }}
      handle=".handle"
      nodeRef={draggableRef}
      position={position}
      onStop={handleDragStop}
    >
      <div ref={draggableRef} className={styles.floatingWidget}>
        <ResizableBox
          height={size.height}
          maxConstraints={[maxWidth, maxHeight]}
          minConstraints={[maxWidth, 100]}
          resizeHandles={['s']}
          width={maxWidth}
          onResizeStop={handleResizeStop}
        >
          <Flex direction="column" style={{ height: '100%' }}>
            <Flex
              align="center"
              className={clsx('handle', styles.floatingWidgetHandler)}
              gap="4"
              justify="between"
              style={{ padding: '12px 16px' }}
            >
              <Flex align="center" gap="2">
                <IconSettings size="18px" />
                <Text>{data?.title}</Text>
              </Flex>
              <Button color="gray" variant="ghost" onClick={closePanel}>
                <IconX size="18px" />
              </Button>
            </Flex>
            <ScrollArea className={styles.scrollArea}>
              <FloatingWidgetContent data={data} mode={mode} />
            </ScrollArea>
          </Flex>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
