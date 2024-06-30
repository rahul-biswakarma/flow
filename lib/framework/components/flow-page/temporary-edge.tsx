import { useEffect, useState } from 'react';

import { generateConnectionId, generateHandlerId } from '../../utils';

import { useProjectContext } from '@/lib/context';

export const TemporaryEdge = ({ containerRef }: { containerRef: React.RefObject<HTMLDivElement> }) => {
  const { connection } = useProjectContext();

  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | null>(null);

  const containerElement = containerRef.current;
  const containerPosition = containerElement?.getBoundingClientRect();

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

  if (!connection?.from || !mousePosition || !containerPosition) return null;

  const handlerId = generateHandlerId(connection.from);
  const fromHandlerElement = document.querySelector(`[data-handler-id="${handlerId}"]`);

  if (!fromHandlerElement) return null;

  const fromPosition = fromHandlerElement.getBoundingClientRect();
  const fromX = fromPosition.left + fromPosition.width / 2;
  const fromY = fromPosition.top + fromPosition.height / 2;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <line
        key={generateConnectionId(connection.from)}
        stroke="white"
        strokeWidth="2"
        x1={fromX - containerPosition?.left}
        x2={mousePosition.x - containerPosition?.left}
        y1={fromY - containerPosition?.top}
        y2={mousePosition.y - containerPosition?.top}
      />
    </svg>
  );
};
