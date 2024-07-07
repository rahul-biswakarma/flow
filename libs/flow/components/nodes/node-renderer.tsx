import React, { useState, useEffect, useCallback } from 'react';

import { NodeType } from '../../types';

import styles from '@/libs/styles/framework.module.css';

type NodeRendererProps = {
  node: NodeType;
  getNodeRendererById: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
  updateNodePosition: (
    nodeId: string,
    position: {
      x: number;
      y: number;
    },
  ) => void;
};

export const NodeRenderer = ({ node, updateNodePosition, getNodeRendererById }: NodeRendererProps) => {
  const initialPosition = node.position || { x: 0, y: 0 };

  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState(initialPosition);

  const NodeComponent = getNodeRendererById(node.type);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const onMouseMove = useCallback(
    (e: MouseEvent) => {
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
      className={styles.nodeRenderer}
      style={{
        left: position.x,
        top: position.y,
      }}
    >
      <div
        className={styles.handlerLeft}
        id={node.id + 'left-slot'}
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onMouseDown(e);
        }}
      />
      <div
        className={styles.handlerRight}
        id={node.id + 'right-slot'}
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={(e) => {
          e.stopPropagation();
          onMouseDown(e);
        }}
      />
      <NodeComponent node={node} />
    </div>
  );
};
