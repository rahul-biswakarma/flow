import React from 'react';
import clsx from 'clsx';

import { useFlowContext } from '../../context/flow.context';

import styles from '@/libs/styles/framework.module.css';

interface EdgeProps {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  className?: string;
}

export const Edge: React.FC<EdgeProps> = ({ fromX, fromY, toX, toY, className }) => {
  const { containerPosition } = useFlowContext();

  if (!containerPosition) {
    return null;
  }

  const { left, top } = containerPosition;

  // Adjust positions based on the container's position
  const adjustedFromX = fromX - left;
  const adjustedFromY = fromY - top;
  const adjustedToX = toX - left;
  const adjustedToY = toY - top;

  // Calculate control points for the cubic Bezier curve
  const controlPointX1 = adjustedFromX;
  const controlPointY1 = adjustedFromY + (adjustedToY - adjustedFromY) / 2;
  const controlPointX2 = adjustedToX;
  const controlPointY2 = adjustedFromY + (adjustedToY - adjustedFromY) / 2;

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
      <path
        className={clsx(styles.edge, className)}
        d={`M ${adjustedFromX} ${adjustedFromY}
           C ${controlPointX1} ${controlPointY1},
             ${controlPointX2} ${controlPointY2},
             ${adjustedToX} ${adjustedToY}`}
        fill="none"
        strokeWidth="2"
      />
    </svg>
  );
};