import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { IconBox, IconFileFilled } from '@tabler/icons-react';
import { Box } from '@radix-ui/themes';
import { ReactNode } from 'react';

import styles from './styles/collapsed-left-panel.module.css';
import { ComponentsWidget, PagesWidget } from './widgets';

export const CollapsedLeftPanel = () => {
  return (
    <Box p="10px">
      <NavigationMenu.Root className={styles.NavigationMenuRoot} orientation="vertical">
        <NavigationMenu.List className={styles.NavigationMenuList}>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <IconFileFilled size="22px" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ContentWrapper>
                <PagesWidget />
              </ContentWrapper>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <IconBox size="22px" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ContentWrapper>
                <ComponentsWidget />
              </ContentWrapper>
            </NavigationMenu.Content>
          </NavigationMenu.Item>
        </NavigationMenu.List>

        <div className={styles.ViewportPosition}>
          <NavigationMenu.Viewport className={styles.NavigationMenuViewport} />
        </div>
      </NavigationMenu.Root>
    </Box>
  );
};

const ContentWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Box
      style={{
        width: '350px',
        height: 'fit-content',
        maxHeight: '50vh',
        minHeight: '200px',
      }}
    >
      {children}
    </Box>
  );
};
