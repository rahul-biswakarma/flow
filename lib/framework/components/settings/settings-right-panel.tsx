import { Flex } from '@radix-ui/themes';

import { StyleSetting } from './style-setting/style-setting';

export const SettingsRightPanel = () => {
  return (
    <Flex direction="column" gap="2">
      <StyleSetting />
    </Flex>
  );
};
