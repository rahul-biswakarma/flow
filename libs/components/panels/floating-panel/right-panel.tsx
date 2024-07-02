'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Button, Flex, Grid, ScrollArea, Text } from '@radix-ui/themes';
import { Cross2Icon } from '@radix-ui/react-icons';

import styles from './right-panel.module.css';

import { useRightPanel } from '@/libs/context';
import { SettingsRightPanel } from '@/libs/framework';

export const RightPanel = () => {
  const { isOpen, closePanel, data, mode } = useRightPanel();

  const nodeId = data?.nodeId;

  const noModeRenderer = (
    <Flex>
      <Text>No Mode Found</Text>
    </Flex>
  );

  const nodeIdNotFound = (
    <Flex align="center" justify="center" p="24px">
      Node Id not found
    </Flex>
  );

  const rightPanelContext = (
    <Grid height="100%" rows="auto 1fr">
      <div className={styles.rightPanelHeader}>
        <Text>{data?.title}</Text>
        <Button color="gray" variant="ghost" onClick={closePanel}>
          <Cross2Icon />
        </Button>
      </div>
      <ScrollArea>{mode === 'settings' && nodeId ? <SettingsRightPanel nodeId={nodeId} /> : nodeIdNotFound}</ScrollArea>
    </Grid>
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
