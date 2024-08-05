import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { IconBox, IconBrush, IconFiles, IconLayoutSidebarRightCollapse, IconSettings } from '@tabler/icons-react';
import { Avatar, Box, Flex, Separator } from '@radix-ui/themes';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

import styles from './styles/collapsed-left-panel.module.css';
import { ComponentsWidget, PagesWidget, ThemeOptionRenderer } from './widgets';
import { ProjectSettingsWidget } from './widgets/project-settings-widget';

export const CollapsedLeftPanel = ({
  setIsLeftPanelCollapsed,
}: {
  setIsLeftPanelCollapsed: (value: boolean) => void;
}) => {
  const session = useSession();

  const userName = session?.data?.user?.name || 'User';
  const userAvatar = session?.data?.user?.image || '';

  return (
    <Box
      p="10px"
      style={{
        position: 'absolute',
        top: '5px',
        left: '5px',
      }}
    >
      <NavigationMenu.Root className={styles.NavigationMenuRoot} orientation="vertical">
        <NavigationMenu.List className={styles.NavigationMenuList}>
          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <IconFiles size="22px" />
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

          <Separator
            style={{
              background: 'var(--gray-4)',
              margin: '4px 0',
              width: '100%',
            }}
          />

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <IconBrush size="22px" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ContentWrapper>
                <Flex direction="column" gap="10px" p="10px">
                  <ThemeOptionRenderer />
                </Flex>
              </ContentWrapper>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <IconSettings size="22px" />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ContentWrapper>
                <Flex direction="column" gap="10px" p="10px">
                  <ProjectSettingsWidget />
                </Flex>
              </ContentWrapper>
            </NavigationMenu.Content>
          </NavigationMenu.Item>

          <Separator
            style={{
              background: 'var(--gray-4)',
              margin: '4px 0',
              width: '100%',
            }}
          />

          <NavigationMenu.Item>
            <NavigationMenu.Trigger
              className={styles.NavigationMenuTrigger}
              onClick={() => setIsLeftPanelCollapsed(false)}
            >
              <IconLayoutSidebarRightCollapse size="22px" />
            </NavigationMenu.Trigger>
          </NavigationMenu.Item>

          <NavigationMenu.Item>
            <NavigationMenu.Trigger className={styles.NavigationMenuTrigger}>
              <Avatar
                fallback={userName[0] ?? 'U'}
                size="1"
                src={userAvatar}
                style={{
                  borderRadius: 'var(--radius-6)',
                }}
              />
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className={styles.NavigationMenuContent}>
              <ContentWrapper>Session</ContentWrapper>
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
        maxHeight: '800px',
        minHeight: '200px',
      }}
    >
      {children}
    </Box>
  );
};
