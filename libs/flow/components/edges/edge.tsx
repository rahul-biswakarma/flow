import React from 'react';
import clsx from 'clsx';

import styles from '@/libs/styles/framework.module.css';

interface EdgeProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  className?: string;
  scale: number;
}

export const Edge: React.FC<EdgeProps> = React.memo(({ fromX, fromY, toX, toY, className, scale }) => {
  const controlPointX1 = fromX;
  const controlPointY1 = fromY + (toY - fromY) / 2;
  const controlPointX2 = toX;
  const controlPointY2 = fromY + (toY - fromY) / 2;

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
        className={clsx(styles.edge, className)}
        d={`M ${fromX} ${fromY}
           C ${controlPointX1} ${controlPointY1},
             ${controlPointX2} ${controlPointY2},
             ${toX} ${toY}`}
        fill="none"
        strokeWidth={2.5 * scale}
      />
    </svg>
  );
});

Edge.displayName = 'Edge';
