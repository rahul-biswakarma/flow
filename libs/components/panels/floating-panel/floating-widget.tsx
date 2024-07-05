'use client';

import React, { useEffect, useState, useRef } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { Button, Flex, ScrollArea, Text } from '@radix-ui/themes';
import { IconSettings, IconX } from '@tabler/icons-react';
import clsx from 'clsx';

import ResizablePanel from '../../ui/resizable-panel';

import { FloatingWidgetContent } from './floating-panel-widgets';

import { useFloatingWidget } from '@/libs/context';
import styles from '@/libs/styles/floating-widget.module.css';

export const FloatingWidget = () => {
  const { isOpen, closePanel, data, mode } = useFloatingWidget();
  const screenPadding = 10;
  const maxWidth = 370;

  const [screenHeight, setScreenHeight] = useState(window?.innerHeight ?? 500);

  const [position, setPosition] = useState({ x: window.innerWidth - maxWidth - screenPadding, y: screenPadding });

  const draggableRef = useRef<HTMLDivElement>(null);
  const parentRef = useRef(null);

  // Load position from localStorage
  useEffect(() => {
    const storedPosition = localStorage.getItem('floatingWidgetPosition');

    if (storedPosition) {
      setPosition(JSON.parse(storedPosition));
    }
  }, []);

  // Update size when window is resized
  useEffect(() => {
    const handleResize = () => {
      const newScreenHeight = window.innerHeight;

      setScreenHeight(newScreenHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Save position to localStorage
  const handleDragStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition = { x: data.x, y: data.y };

    setPosition(newPosition);
    localStorage.setItem('floatingWidgetPosition', JSON.stringify(newPosition));
  };

  if (!mode || !isOpen) return null;

  return (
    <Draggable
      bounds={{
        top: screenPadding,
        left: screenPadding,
        right: window.innerWidth - maxWidth - screenPadding,
        bottom: screenHeight - screenPadding,
      }}
      handle=".handle"
      nodeRef={draggableRef}
      position={position}
      onStop={handleDragStop}
    >
      <div ref={draggableRef} className={styles.floatingWidget}>
        <div ref={parentRef} style={{ width: '100%', height: '100%', position: 'relative' }}>
          <ResizablePanel localStorageKey="floatingWidgetSize" parentRef={parentRef}>
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
          </ResizablePanel>
        </div>
      </div>
    </Draggable>
  );
};
