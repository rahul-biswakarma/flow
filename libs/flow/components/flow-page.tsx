import React, { ReactNode, useEffect, useCallback, useState, useRef } from 'react';
import { Box } from '@radix-ui/themes';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { nanoid } from 'nanoid';

import { DragDropItemType } from '../constant';
import { DropItemType, NodeType } from '../types';
import { useFlowContext } from '../context/flow.context';
import { generateMainNodeData } from '../utils';

import { NodeRenderer } from './nodes/node-renderer';
import { Connection, Edges } from './edges';
import { WaterMark } from './watermark';

import { useResizeObserver } from '@/libs/hooks';

interface FlowPageProps {
  watermarks?: ReactNode;
  getNodeRendererByType: (nodeId: string) => React.FC<{ node: NodeType }> | undefined;
}

export const FlowPage: React.FC<FlowPageProps> = React.memo(({ watermarks, getNodeRendererByType }) => {
  const {
    updateContainerPosition,
    containerRef,
    nodes,
    setNodes,
    edges,
    connection,
    setConnection,
    updateNodePosition,
  } = useFlowContext();

  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const lastMousePos = useRef({ x: 0, y: 0 });

  const resizeObserverRect = useResizeObserver(containerRef);

  // if no node is present, generate main node
  useEffect(() => {
    if (Object.keys(nodes).length === 0) {
      setNodes(generateMainNodeData({ containerRef }));
    }
  }, [containerRef, setNodes, nodes]);

  const handleDrop = useCallback(
    (item: DropItemType, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();
      const dropTargetRect = containerRef.current?.getBoundingClientRect();

      if (clientOffset && dropTargetRect) {
        const position = {
          x: clientOffset.x - dropTargetRect.left,
          y: clientOffset.y - dropTargetRect.top,
        };

        const newNodeId = nanoid();
        const newNodeData = {
          id: newNodeId,
          type: item.type,
          name: item.name,
          position,
          config: {},
        };

        setNodes((prevNodes) => ({
          ...prevNodes,
          [newNodeId]: newNodeData,
        }));
      }
    },
    [containerRef, scale, translate, setNodes],
  );

  const [{ isOver }, drop] = useDrop(() => ({
    accept: DragDropItemType,
    drop: handleDrop,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  drop(containerRef);

  const updateNodeAndEdgesPosition = useCallback(
    (nodeId: string, position: { x: number; y: number }) => {
      updateNodePosition(nodeId, position);
    },
    [updateNodePosition],
  );

  const handleWheel = useCallback(
    (event: React.WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();

      const zoomSensitivity = 0.001;
      const zoomFactor = event.deltaY;
      const newScale = Math.max(0.1, Math.min(2, scale - zoomFactor * zoomSensitivity));

      setScale(newScale);
    },
    [scale, translate],
  );

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (event.button === 0) {
      setIsPanning(true);
      lastMousePos.current = { x: event.clientX, y: event.clientY };

      if (containerRef.current) {
        containerRef.current.style.cursor = 'grabbing';
      }
    }
  }, []);

  const handleMouseMove = useCallback(
    (event: React.MouseEvent) => {
      if (isPanning) {
        const dx = event.clientX - lastMousePos.current.x;
        const dy = event.clientY - lastMousePos.current.y;

        setTranslate((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
        lastMousePos.current = { x: event.clientX, y: event.clientY };
      }
    },
    [isPanning],
  );

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
    setConnection(null);

    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  }, [setConnection]);

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();

    containerRef.current?.addEventListener('wheel', preventDefault, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      containerRef.current?.removeEventListener('wheel', preventDefault);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseUp]);

  return (
    <Box
      ref={containerRef}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'relative',
        background: isOver ? 'rgba(0, 0, 0, 0.1)' : 'transparent',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseUp}
      onMouseMove={handleMouseMove}
      onWheel={handleWheel}
    >
      <WaterMark watermarks={watermarks} />
      <div
        style={{
          transform: `scale(${scale})`,
        }}
      >
        <Connection connection={connection} scale={scale} translate={translate} />
        {Object.values(nodes).map((node) => (
          <NodeRenderer
            key={node.id}
            containerRef={containerRef}
            getNodeRendererById={getNodeRendererByType}
            node={node}
            panTranslate={translate}
            scale={scale}
            updateNodePosition={updateNodeAndEdgesPosition}
          />
        ))}
        <Edges containerPosition={resizeObserverRect} edges={edges} nodes={nodes} scale={scale} translate={translate} />
      </div>
    </Box>
  );
});

FlowPage.displayName = 'FlowPage';
