import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const PanelWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      style={{
        width: '100%',
        backgroundColor: 'var(--gray-surface)',
        backdropFilter: 'blur(8px)',
        borderRadius: 'var(--radius-4)',
        border: '1px solid var(--gray-4)',
        overflow: 'hidden',
      }}
    >
      {children}
    </motion.div>
  );
};
