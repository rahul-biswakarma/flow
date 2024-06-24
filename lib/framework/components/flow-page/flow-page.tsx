'use client';

import { Box } from '@radix-ui/themes';
import { useRef } from 'react';

import { ContainerNode } from '../web-nodes';

export const FlowPage: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  return (
    <Box
      position="relative"
      style={{
        padding: '40px',
        height: '100vh',
        width: '100%',
      }}
    >
      <ContainerNode />
    </Box>
  );
};
