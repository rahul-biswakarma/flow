import { Box } from '@radix-ui/themes';
import { ReactNode } from 'react';

export const WaterMark = ({ watermarks }: { watermarks: ReactNode }) => {
  return (
    <Box
      style={{
        position: 'absolute',
        pointerEvents: 'none',
        userSelect: 'none',
        bottom: '10px',
        right: '10px',
        color: 'var(--gray-8)',
        fontSize: '12px',
      }}
    >
      {watermarks}
    </Box>
  );
};
