'use client';

import { Box } from '@radix-ui/themes';

import { ContainerNode } from '../web-nodes';

export const FlowPage: React.FC = () => {
  return (
    <Box
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
