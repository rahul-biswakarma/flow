'use client';

import { Grid } from '@radix-ui/themes';

import { SessionPanel, ProjectPanel, ConfigPanel } from './panels';
import { PanelWrapper } from './common/panel-wrapper';

export const LeftPanel = () => {
  return (
    <Grid
      gap="2"
      rows="1.4fr 1fr auto"
      style={{ padding: '10px', paddingRight: '0px', position: 'relative', width: '370px' }}
    >
      <PanelWrapper>
        <ProjectPanel />
      </PanelWrapper>
      <PanelWrapper>
        <ConfigPanel />
      </PanelWrapper>
      <PanelWrapper>
        <SessionPanel />
      </PanelWrapper>
    </Grid>
  );
};
