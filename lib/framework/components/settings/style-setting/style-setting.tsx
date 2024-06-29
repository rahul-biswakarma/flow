import { Text } from '@radix-ui/themes';
import * as Accordion from '@radix-ui/react-accordion';

import { PositionRenderer } from './option-renderer/position-renderer';

export const StyleSetting = () => {
  return (
    <Accordion.Root collapsible defaultValue="setting" type="single">
      <Accordion.Item value="setting">
        <Accordion.Header>
          <Accordion.Trigger>
            <Text>Styles</Text>
          </Accordion.Trigger>
        </Accordion.Header>
        <Accordion.Content>
          <PositionRenderer />
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
