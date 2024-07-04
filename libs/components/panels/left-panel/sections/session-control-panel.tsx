import { Avatar, Button, Flex, Text, Tooltip } from '@radix-ui/themes';
import { IconLayoutSidebarLeftCollapseFilled, IconSettings } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';

export const SessionControlPanel = () => {
  const session = useSession();

  const userName = session?.data?.user?.name || 'User';
  const userEmail = session?.data?.user?.email || '';
  const userAvatar = session?.data?.user?.image || '';

  return (
    <Flex align="center" justify="between" p="10px">
      <Flex align="center" gap="2" justify="start">
        <Avatar
          fallback={userName[0] ?? 'U'}
          size="2"
          src={userAvatar}
          style={{
            borderRadius: 'var(--radius-4)',
          }}
        />
        <Flex direction="column">
          <Text
            style={{
              fontSize: '14px',
            }}
          >
            {userName.split(' ')[0] ?? userName}
          </Text>
          {userEmail && (
            <Text
              style={{
                fontSize: '14px',
                color: 'var(--gray-9)',
                marginTop: '-5px',
              }}
            >
              {userEmail}
            </Text>
          )}
        </Flex>
      </Flex>
      <Flex align="center" gap="2" justify="end">
        <Tooltip content="Session Setting">
          <Button color="gray" variant="ghost">
            <IconSettings color="var(--gray-9)" size="20px" />
          </Button>
        </Tooltip>
        <Tooltip content="Toggle Left Panel">
          <Button color="gray" variant="ghost">
            <IconLayoutSidebarLeftCollapseFilled color="var(--gray-9)" size="20px" />
          </Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
};
