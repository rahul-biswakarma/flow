import { Flex, Box, SegmentedControl, ScrollArea, Text, Button } from '@radix-ui/themes';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { IconChevronDown, IconChevronUp, IconSettings } from '@tabler/icons-react';

import { ProjectConfigWidget } from '../widgets';

import { LeftPanelConfigView } from '@/libs/types';
import styles from '@/libs/styles/left-panel.module.css';

export const ConfigPanel = ({
  isCollapsed,
  setIsCollapsed,
}: {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}) => {
  const [view, setView] = useState<LeftPanelConfigView>('config');

  if (isCollapsed) return <CollapsedConfigPanel {...{ setIsCollapsed }} />;

  return (
    <AnimatePresence>
      <Flex
        className={styles.configPanelWrapper}
        direction="column"
        style={{ height: '100%', overflow: 'hidden', position: 'relative' }}
      >
        <Box p="2">
          <SegmentedControl.Root
            defaultValue="pages"
            style={{ width: '100%' }}
            value={view}
            onValueChange={(view: LeftPanelConfigView) => setView(view)}
          >
            <SegmentedControl.Item value="config">Config</SegmentedControl.Item>
            <SegmentedControl.Item value="setting">Setting</SegmentedControl.Item>
          </SegmentedControl.Root>
        </Box>

        <ScrollArea>
          <Box p="3" style={{ flex: 1, overflow: 'auto' }}>
            <Box
              style={{
                display: view === 'config' ? 'block' : 'none',
              }}
            >
              <ProjectConfigWidget />
            </Box>
            <Box
              style={{
                display: view === 'setting' ? 'block' : 'none',
              }}
            >
              Setting
            </Box>
          </Box>

          <CollapsePanelButton {...{ setIsCollapsed }} />
        </ScrollArea>
      </Flex>
    </AnimatePresence>
  );
};

const CollapsePanelButton = ({ setIsCollapsed }: { setIsCollapsed: (value: boolean) => void }) => {
  return (
    <div className={styles.collapsePanelButton}>
      <Flex
        align="center"
        gap="2"
        justify="center"
        style={{
          borderRadius: 'var(--radius-6)',
          padding: '2px 15px',
          color: 'var(--gray-12)',
          background: 'var(--gray-surface)',
          backdropFilter: 'blur(50px)',
          fontSize: '12px',
        }}
        onClick={() => setIsCollapsed(true)}
      >
        <IconChevronDown size="16px" /> Collapse
      </Flex>
    </div>
  );
};

const CollapsedConfigPanel = ({ setIsCollapsed }: { setIsCollapsed: (value: boolean) => void }) => {
  return (
    <Flex
      align="center"
      gap="2"
      justify="between"
      p="3"
      style={{
        minHeight: '57px',
        color: 'var(--gray-9)',
      }}
    >
      <Flex align="center" gap="2" justify="start">
        <IconSettings size="20px" />
        <Text>Project Settings</Text>
      </Flex>
      <Button color="gray" variant="ghost" onClick={() => setIsCollapsed(false)}>
        <IconChevronUp
          size="20px"
          style={{
            color: 'var(--gray-9)',
          }}
        />
      </Button>
    </Flex>
  );
};
