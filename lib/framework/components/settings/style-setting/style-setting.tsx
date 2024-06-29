import { Box, Flex, Text } from '@radix-ui/themes';

import { PositionRenderer } from './option-renderer/position-renderer';

export const StyleSetting = () => {
  return (
    <Flex direction="column" gap="2">
      <Box
        style={{
          borderBottom: '1px solid var(--gray-4)',
        }}
      >
        <Text>Styles</Text>
      </Box>
      <PositionRenderer />
    </Flex>
  );
};
