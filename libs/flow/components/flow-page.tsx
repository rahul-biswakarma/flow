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
  const { containerRef, nodes, setNodes, edges, connection, setConnection, updateNodePosition, updateNodeData } =
    useFlowContext();

  const [scale, setScale] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });

  const lastMousePos = useRef({ x: 0, y: 0 });

  const resizeObserverRect = useResizeObserver(containerRef);

  useEffect(() => {
    if (Object.keys(nodes).length === 0) {
      setNodes(generateMainNodeData({ containerRef }));
    }
  }, [containerRef, setNodes, nodes]);

  const handleDrop = useCallback(
    (item: DropItemType, monitor: DropTargetMonitor) => {
      const clientOffset = monitor.getClientOffset();
      const containerRect = containerRef.current?.getBoundingClientRect();

      if (clientOffset && containerRect) {
        const dropPosition = {
          x: clientOffset.x - containerRect.left,
          y: clientOffset.y - containerRect.top,
        };

        setNodes((prevNodes) => {
          const newNodeId = nanoid();
          const newNodeData = {
            id: newNodeId,
            type: item.type,
            name: item.name,
            position: dropPosition,
            config: {},
            context: {
              applyTranslate: false,
            },
          };

          return {
            ...prevNodes,
            [newNodeId]: newNodeData,
          };
        });
      }
    },
    [containerRef, setNodes, scale, translate],
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

      const containerRect = containerRef.current?.getBoundingClientRect();

      if (containerRect) {
        const mouseX = event.clientX - containerRect.left;
        const mouseY = event.clientY - containerRect.top;

        const scaleChange = newScale - scale;

        const newTranslateX = translate.x - ((mouseX - translate.x) / scale) * scaleChange;
        const newTranslateY = translate.y - ((mouseY - translate.y) / scale) * scaleChange;

        setTranslate({ x: newTranslateX, y: newTranslateY });
      }

      setScale(newScale);
    },
    [scale, translate, containerRef],
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
      <Connection connection={connection} scale={scale} translate={translate} />
      {Object.values(nodes).map((node) => (
        <NodeRenderer
          key={node.id}
          containerRef={containerRef}
          getNodeRendererById={getNodeRendererByType}
          node={node}
          panTranslate={translate}
          scale={scale}
          updateNodeData={updateNodeData}
          updateNodePosition={updateNodeAndEdgesPosition}
        />
      ))}
      <Edges containerPosition={resizeObserverRect} edges={edges} nodes={nodes} scale={scale} translate={translate} />
    </Box>
  );
});

FlowPage.displayName = 'FlowPage';
