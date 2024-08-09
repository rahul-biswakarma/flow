import React, { useState, useEffect, useCallback, useRef } from 'react';

import { NodeType } from '../../types';

import styles from '@/libs/styles/framework.module.css';

interface NodeRendererProps {
  node: NodeType;
  panTranslate: { x: number; y: number };
  getNodeRendererById: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
  updateNodePosition: (
    nodeId: string,
    position: {
      x: number;
      y: number;
    },
  ) => void;
  scale: number;
  containerRef: React.RefObject<HTMLDivElement>;
}

export const NodeRenderer: React.FC<NodeRendererProps> = React.memo(
  ({ node, updateNodePosition, getNodeRendererById, scale, panTranslate, containerRef }) => {
    const nodeRef = useRef<HTMLDivElement>(null);

    const [dragging, setDragging] = useState(false);
    const [startPos, setStartPos] = useState({ x: 0, y: 0 });
    const [position, setPosition] = useState(node.position || { x: 0, y: 0 });

    const NodeComponent = getNodeRendererById(node.type);

    const onMouseDown = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setDragging(true);
        setStartPos({
          x: e.clientX - position.x,
          y: e.clientY - position.y,
        });
      },
      [position.x, position.y],
    );

    const onMouseMove = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();
        if (!dragging) return;
        const newX = e.clientX - startPos.x;
        const newY = e.clientY - startPos.y;

        setPosition({ x: newX, y: newY });
        updateNodePosition(node.id, { x: newX, y: newY });
      },
      [dragging, startPos.x, startPos.y, node.id, updateNodePosition],
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
        ref={nodeRef}
        className={styles.nodeRenderer}
        style={{
          transform: `translate(${position.x + panTranslate.x}px, ${position.y + panTranslate.y}px)`,
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
