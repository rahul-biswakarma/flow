import React from 'react';
import { ResizeHandle } from 'react-resizable';

import { DecorativeBox } from './ui/decorative-box';

const HANDLER_SIZE = 10;

type ResizeHandlerProps = {
  resizeHandler: ResizeHandle;
  handleAxis?: string;
  onMouseDown?: (e: React.MouseEvent) => void;
  onTouchStart?: (e: React.TouchEvent) => void;
};

export const ResizeHandler = ({ resizeHandler, handleAxis, onMouseDown, onTouchStart }: ResizeHandlerProps) => {
  let styles = {};

  if (resizeHandler === 's' || resizeHandler === 'n') {
    styles = {
      height: HANDLER_SIZE + 'px',
      width: '100%',
      ...(resizeHandler === 's' ? { bottom: 0 } : { top: 0 }),
      cursor: 'ns-resize',
    };
  } else if (resizeHandler === 'w' || resizeHandler === 'e') {
    styles = {
      height: '100%',
      width: HANDLER_SIZE + 'px',
      ...(resizeHandler === 'e' ? { right: 0 } : { left: 0 }),
      cursor: 'ew-resize',
    };
  } else {
    styles = {
      height: HANDLER_SIZE + 'px',
      width: HANDLER_SIZE + 'px',
      cursor: 'nwse-resize',
    };
  }

  return (
    <div
      className={`react-resizable-handle react-resizable-handle-${resizeHandler}`}
      style={{
        position: 'absolute',
        ...styles,
      }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <DecorativeBox
        style={{
          backgroundColor: 'var(--gray-3)',
          height: '100%',
          width: '100%',
        }}
      />
    </div>
  );
};
