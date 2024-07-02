'use client';

import React, { FC } from 'react';
// eslint-disable-next-line unused-imports/no-unused-imports
import { Box, Text, Button } from '@radix-ui/themes';

import { WebNodeToPreview } from '@/lib/framework';
import { NodeType, EdgeType } from '@/lib/types';
import { useProjectContext } from '@/lib/context';

const applyStyles = (styles: Record<string, any>) => {
  const styleObj: React.CSSProperties = {};

  for (const [key, value] of Object.entries(styles)) {
    styleObj[key as keyof React.CSSProperties] = value;
  }

  return styleObj;
};

const NodePreview: FC<{ node: NodeType }> = ({ node }) => {
  const Component = WebNodeToPreview(node.type);

  if (!Component) {
    return null;
  }

  const { styles, attributes } = node.config || {};

  return (
    <Component style={styles ? applyStyles(styles) : {}} {...attributes}>
      {node.name}
    </Component>
  );
};

const buildTree = (nodes: Record<string, NodeType>, edges: EdgeType[]) => {
  const nodeTree: Record<string, NodeType & { children: NodeType[] }> = {};
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

const renderTree = (node: NodeType & { children: NodeType[] }) => {
  return (
    <Box
      key={node.id}
      style={{
        position: 'absolute',
        left: node.position.x,
        top: node.position.y,
      }}
    >
      <NodePreview node={node} />
      {node.children.map((childNode) => renderTree(childNode))}
    </Box>
  );
};

export const Preview = () => {
  const { nodes, edges } = useProjectContext();

  const rootNodes = buildTree(nodes, edges);

  return (
    <Box style={{ position: 'relative', width: '100%', height: '100%' }}>
      {rootNodes.map((rootNode) => renderTree(rootNode))}
    </Box>
  );
};
