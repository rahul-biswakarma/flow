'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button, Flex, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

import styles from './right-panel.module.css';

import { useRightPanel } from '@/lib/context';
import { SettingsRightPanel } from '@/lib/framework';

export const RightPanel = () => {
  const { isOpen, closePanel, data, mode } = useRightPanel();

  const noModeRenderer = (
    <Flex>
      <Text>No Mode Found</Text>
    </Flex>
  );

  const rightPanelContext = (
    <>
      <div className={styles.rightPanelHeader}>
        <Text>{data?.title}</Text>
        <Button color="gray" variant="ghost" onClick={closePanel}>
          <Cross2Icon />
        </Button>
      </div>
      <div
        style={{
          overflowY: 'auto',
        }}
      >
        {mode === 'settings' && <SettingsRightPanel />}
      </div>
    </>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div className={styles.rightPanelContainer} transition={{ duration: 0.5 }}>
          {mode === null ? noModeRenderer : rightPanelContext}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
