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
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: node.position.x, y: node.position.y });

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
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={onMouseDown}
      />
      <div
        className={styles.handlerRight}
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        onMouseDown={onMouseDown}
      />
      <NodeComponent node={node} />
    </div>
  );
};
