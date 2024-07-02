import React, { useState, useEffect } from 'react';
import { MoveIcon } from '@radix-ui/react-icons';

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

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    const newX = e.clientX - startPos.x;
    const newY = e.clientY - startPos.y;

    setPosition({ x: newX, y: newY });
    updateNodePosition(node.id, { x: newX, y: newY });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

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
        className={styles.nodeMoveHandler}
        style={{
          cursor: dragging ? 'grabbing' : 'grab',
          ...(dragging && { display: 'flex' }),
        }}
        onMouseDown={onMouseDown}
      >
        <MoveIcon />
      </div>
      <NodeComponent node={node} />
    </div>
  );
};
