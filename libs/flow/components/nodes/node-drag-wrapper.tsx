import React, { ReactNode, useRef } from 'react';
import { useDrag } from 'react-dnd';

import { DragDropItemType } from '../../constant';
import { WebNodeTypesType } from '../../types';

type NodeDragWrapperProps = {
  node: WebNodeTypesType;
  children: ReactNode;
  className?: string;
};

export const NodeDragWrapper = ({ node, children, className }: NodeDragWrapperProps) => {
  const dragRef = useRef(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: DragDropItemType,
    item: { name: node.name, type: node.type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  drag(dragRef);

  return (
    <div ref={dragRef} className={className} role="Handle" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {children}
    </div>
  );
};
