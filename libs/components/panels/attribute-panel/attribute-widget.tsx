'use client';

import React, { useEffect, useState, useRef, useCallback } from 'react';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { ResizableBox, ResizeCallbackData } from 'react-resizable';
import { Button, Flex, ScrollArea, Text } from '@radix-ui/themes';
import 'react-resizable/css/styles.css';
import clsx from 'clsx';
import { IconSettings, IconX } from '@tabler/icons-react';

import { AttributeContent } from './attribute-panel-widgets';
import styles from './attribute-widget.module.css';

import { useAttribute } from '@/libs/context';

const SCREEN_PADDING = 10;
const MAX_WIDTH = 370;

export const Attribute = () => {
  const { isOpen, closePanel, data, mode } = useAttribute();

  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 500);
  const maxHeight = screenHeight - 2 * SCREEN_PADDING;

  const [position, setPosition] = useState({ x: SCREEN_PADDING, y: SCREEN_PADDING });
  const [size, setSize] = useState({ width: MAX_WIDTH, height: maxHeight });

  const draggableRef = useRef<HTMLDivElement>(null);

  // Update size when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenHeight = window.innerHeight;

      setScreenHeight(newScreenHeight);

      if (size.height > newScreenHeight - 2 * SCREEN_PADDING) {
        const newSize = { width: MAX_WIDTH, height: newScreenHeight - 2 * SCREEN_PADDING };

        setSize(newSize);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [size.height, SCREEN_PADDING]);

  // Save the size and position to localStorage
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };

    setPosition(newPosition);
  };

  const handleResizeStop = (e: React.SyntheticEvent, data: ResizeCallbackData) => {
    const newSize = { width: MAX_WIDTH, height: data.size.height };

    setSize(newSize);
  };

  const onClose = useCallback(() => {
    closePanel();
    setPosition({ x: SCREEN_PADDING, y: SCREEN_PADDING });
    setSize({ width: MAX_WIDTH, height: maxHeight });
  }, [closePanel, maxHeight]);

  if (!mode || !isOpen) return null;

  return (
    <Draggable
      bounds={{
        top: SCREEN_PADDING,
        left: SCREEN_PADDING,
        right: window.innerWidth - MAX_WIDTH - SCREEN_PADDING,
        bottom: screenHeight - size.height - SCREEN_PADDING,
      }}
      handle=".handle"
      nodeRef={draggableRef}
      position={position}
      onStop={handleDragStop}
    >
      <div ref={draggableRef} className={styles.Attribute}>
        <ResizableBox
          height={size.height}
          maxConstraints={[MAX_WIDTH, maxHeight]}
          minConstraints={[MAX_WIDTH, 100]}
          resizeHandles={['s']}
          width={MAX_WIDTH}
          onResizeStop={handleResizeStop}
        >
          <Flex direction="column" style={{ height: '100%' }}>
            <Flex
              align="center"
              className={clsx('handle', styles.AttributeHandler)}
              gap="4"
              justify="between"
              style={{ padding: '12px 16px' }}
            >
              <Flex align="center" gap="2">
                <IconSettings size="18px" />
                <Text>{data?.title}</Text>
              </Flex>
              <Button color="gray" variant="ghost" onClick={onClose}>
                <IconX size="18px" />
              </Button>
            </Flex>
            <ScrollArea className={styles.scrollArea}>
              <AttributeContent data={data} mode={mode} />
            </ScrollArea>
          </Flex>
        </ResizableBox>
      </div>
    </Draggable>
  );
};
