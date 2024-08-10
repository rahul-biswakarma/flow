import React, { useEffect, useState } from 'react';

import { getHandlerElement } from '../../utils';
import { ConnectionType } from '../../types';

import { Edge } from './edge';

import styles from '@/libs/styles/framework.module.css';

interface ConnectionProps {
  connection: ConnectionType | null;
  scale: number;
  translate: { x: number; y: number };
}

export const Connection: React.FC<ConnectionProps> = React.memo(({ connection, scale, translate }) => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (connection?.from) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [connection, scale, translate]);

  if (!connection?.from || !mousePosition) {
    mousePosition !== null && setMousePosition(null);

    return null;
  }

  const fromHandlerElement = getHandlerElement(connection.from);

  if (!fromHandlerElement) return null;

  const fromPosition = fromHandlerElement.getBoundingClientRect();
  const fromX = fromPosition.left + fromPosition.width / 2;
  const fromY = fromPosition.top + fromPosition.height / 2;

  return (
    <Edge
      className={styles.connection}
      fromX={fromX}
      fromY={fromY}
      scale={scale}
      toX={mousePosition.x}
      toY={mousePosition.y}
    />
  );
});

Connection.displayName = 'Connection';
