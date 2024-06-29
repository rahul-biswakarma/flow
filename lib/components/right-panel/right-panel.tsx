'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Button, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

import styles from './right-panel.module.css';

import { useRightPanel } from '@/lib/context';

export const RightPanel = ({ children }: { children: ReactNode }) => {
  const { isOpen, closePanel, data } = useRightPanel();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={styles.rightPanelContainer} transition={{ duration: 0.5 }}>
          <div className={styles.rightPanelHeader}>
            <Text>{data?.title}</Text>
            <Button color="gray" variant="ghost" onClick={closePanel}>
              <Cross2Icon />
            </Button>
          </div>
          <div
            style={{
              padding: '24px 16px',
              overflowY: 'auto',
            }}
          >
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
