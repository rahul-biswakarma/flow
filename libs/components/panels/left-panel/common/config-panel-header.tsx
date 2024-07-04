import { Flex } from '@radix-ui/themes';

type TopSectionHeaderProps = {
  label: string;
};

export const ConfigPanelHeader = ({ label }: TopSectionHeaderProps) => (
  <Flex align="center" gap="2" justify="between" p="2">
    <Flex
      align="center"
      gap="1"
      style={{
        color: 'var(--gray-9)',
      }}
    >
      {label}
    </Flex>
  </Flex>
);
