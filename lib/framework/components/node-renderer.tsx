import React, { useState, useEffect } from 'react';
import { MoveIcon } from '@radix-ui/react-icons';

import { getWebNode } from '../types';

import styles from '@/lib/styles/framework.module.css';
import { NodeType } from '@/lib/types';
import { useProjectContext } from '@/lib/context';

export const NodeRenderer = ({ node }: { node: NodeType }) => {
  const { updateNodePosition } = useProjectContext();

  const NodeComponent = getWebNode(node.type)?.renderer;
  const [position, setPosition] = useState({ x: node.position.x, y: node.position.y });
  const [dragging, setDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

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
