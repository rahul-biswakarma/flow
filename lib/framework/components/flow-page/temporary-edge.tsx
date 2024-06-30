import { useEffect, useState } from 'react';

import { generateHandlerId } from '../../utils';

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

  // Calculate control points for the cubic Bezier curve
  const controlPointX1 = fromX;
  const controlPointY1 = fromY + (mousePosition.y - fromY) / 2;
  const controlPointX2 = mousePosition.x;
  const controlPointY2 = fromY + (mousePosition.y - fromY) / 2;

  return (
    <svg
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    >
      <path
        d={`M ${fromX - containerPosition.left} ${fromY - containerPosition.top}
           C ${controlPointX1 - containerPosition.left} ${controlPointY1 - containerPosition.top},
             ${controlPointX2 - containerPosition.left} ${controlPointY2 - containerPosition.top},
             ${mousePosition.x - containerPosition.left} ${mousePosition.y - containerPosition.top}`}
        fill="none"
        stroke="white"
        strokeWidth="2"
      />
    </svg>
  );
};
