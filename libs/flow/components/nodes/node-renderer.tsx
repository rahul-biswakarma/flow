import React, { useState, useEffect, useCallback } from 'react';

import { NodeType } from '../../types';

import styles from '@/libs/styles/framework.module.css';

interface NodeRendererProps {
  node: NodeType;
  getNodeRendererById: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
  updateNodePosition: (
    nodeId: string,
    position: {
      x: number;
      y: number;
    },
  ) => void;
  scale: number;
}

export const NodeRenderer: React.FC<NodeRendererProps> = React.memo(
  ({ node, updateNodePosition, getNodeRendererById, scale }) => {
    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState(node.position || { x: 0, y: 0 });

    const NodeComponent = getNodeRendererById(node.type);

    const onMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDragging(true);
        setStartPos({
          x: e.clientX / scale - position.x,
          y: e.clientY / scale - position.y,
        });
      },
      [scale, position.x, position.y],
    );

    const onMouseMove = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        if (!dragging) return;
        const newX = e.clientX / scale - startPos.x;
        const newY = e.clientY / scale - startPos.y;

        setPosition({ x: newX, y: newY });
        updateNodePosition(node.id, { x: newX, y: newY });
      },
      [dragging, startPos.x, startPos.y, node.id, updateNodePosition, scale],
    );

    const onMouseUp = useCallback(() => {
      setDragging(false);
    }, []);

    useEffect(() => {
      if (dragging) {
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
      } else {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      }

      return () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };
    }, [dragging, onMouseMove, onMouseUp]);

    if (!NodeComponent) {
      return null;
    }

    return (
      <div
        className={styles.nodeRenderer}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          position: 'absolute',
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className={styles.handlerLeft} id={node.id + 'left-slot'} onMouseDown={onMouseDown} />
        <div className={styles.handlerRight} id={node.id + 'right-slot'} onMouseDown={onMouseDown} />
        <NodeComponent node={node} />
      </div>
    );
  },
);

NodeRenderer.displayName = 'NodeRenderer';
