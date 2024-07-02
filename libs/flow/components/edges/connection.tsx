import { useEffect, useState } from 'react';

import { getHandlerElement } from '../../utils';
import { ConnectionType } from '../../types';

import { Edge } from './edge';

export const Connection = ({ connection }: { connection: ConnectionType }) => {
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
  }, [connection, setMousePosition]);

  if (!connection?.from || !mousePosition) {
    mousePosition !== null && setMousePosition(null);

    return null;
  }

  const fromHandlerElement = getHandlerElement(connection.from);

  if (!fromHandlerElement) return null;

  const fromPosition = fromHandlerElement.getBoundingClientRect();
  const fromX = fromPosition.left + fromPosition.width / 2;
  const fromY = fromPosition.top + fromPosition.height / 2;

  return <Edge fromX={fromX} fromY={fromY} toX={mousePosition.x} toY={mousePosition.y} />;
};
