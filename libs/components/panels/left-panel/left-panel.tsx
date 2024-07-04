'use client';

import { Grid } from '@radix-ui/themes';

import { TopSection } from './sections/top-section';
import { SessionControlPanel } from './sections/session-control-panel';
import { BottomSection } from './sections/bottom-section';
import { SectionWrapper } from './sections/section-wrapper';

export const LeftPanel = () => {
  return (
    <Grid
      gap="2"
      rows="1.4fr 1fr auto"
      style={{ padding: '10px', paddingRight: '0px', position: 'relative', width: '370px' }}
    >
      <SectionWrapper>
        <TopSection />
      </SectionWrapper>
      <SectionWrapper>
        <BottomSection />
      </SectionWrapper>
      <SectionWrapper>
        <SessionControlPanel />
      </SectionWrapper>
    </Grid>
  );
};
