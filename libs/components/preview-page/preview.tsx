'use client';

import React, { FC, ReactNode } from 'react';
import { Box, Theme } from '@radix-ui/themes';

import { EdgeType, NodeType, useFlowContext } from '@/libs/flow';
import { PreviewScaleType, WebNodeToPreview } from '@/libs/types';
import { useProjectContext } from '@/libs/context';
import { getScaleValue } from '@/libs/utils';

type PreviewNodeType = NodeType & { children: PreviewNodeType[] };

const applyStyles = (styles: Record<string, any>) => {
  const styleObj: React.CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    styleObj[key as keyof React.CSSProperties] = value;
  }

  return styleObj;
};

const NodePreview: FC<{ node: PreviewNodeType; children?: ReactNode }> = ({ node, children }) => {
  const Component = WebNodeToPreview(node.type);

  if (!Component) {
    return null;
  }

  const { styles, attributes } = node.config || {};
  const { children: nodeContent, ...otherAttributes } = attributes || {};

  return (
    <Component style={styles ? applyStyles(styles) : {}} {...otherAttributes}>
      {nodeContent}
      {children}
    </Component>
  );
};

const buildTree = (nodes: Record<string, NodeType>, edges: EdgeType[]): PreviewNodeType[] => {
  const nodeTree: Record<string, PreviewNodeType> = {};
  const rootNodeIds = new Set(Object.keys(nodes));

  // Initialize tree nodes with children array
  for (const nodeId in nodes) {
    nodeTree[nodeId] = { ...nodes[nodeId], children: [] };
  }

  // Build tree structure
  edges.forEach((edge) => {
    const sourceNode = nodeTree[edge.source.nodeId];
    const targetNode = nodeTree[edge.target.nodeId];

    if (sourceNode && targetNode) {
      targetNode.children.push(sourceNode);
      rootNodeIds.delete(sourceNode.id); // Remove from root nodes
    }
  });

  // Return root nodes
  return Array.from(rootNodeIds).map((rootNodeId) => nodeTree[rootNodeId]);
};

const renderTree = (node: PreviewNodeType): JSX.Element => {
  return <NodePreview node={node}>{node.children.map((childNode) => renderTree(childNode))}</NodePreview>;
};

export const Preview = ({ scale }: { scale: PreviewScaleType }) => {
  const { projectConfig, defaultProjectConfig } = useProjectContext();
  const { nodes, edges } = useFlowContext();

  const edgesValues = Object.values(edges);

  const rootNodes = buildTree(nodes, edgesValues);

  return (
    <Theme
      accentColor={projectConfig.accentColor ?? defaultProjectConfig.accentColor}
      appearance={projectConfig.appearance ?? defaultProjectConfig.appearance}
      grayColor={projectConfig.gray ?? defaultProjectConfig.gray}
      panelBackground={projectConfig.panelBackground ?? defaultProjectConfig.panelBackground}
      radius={projectConfig.radius ?? defaultProjectConfig.radius}
      scaling={projectConfig.scale ?? defaultProjectConfig.scale}
      style={{
        width: '100%',
        height: '100%',
        overflow: 'auto',
      }}
    >
      <Box style={{ transform: `scale(${getScaleValue(scale)})`, position: 'relative', width: '100%', height: '100%' }}>
        {rootNodes.map((rootNode) => renderTree(rootNode))}
      </Box>
    </Theme>
  );
};
