import { Button, DropdownMenu, Flex, Text } from '@radix-ui/themes';

import { styleSettingSchema } from '@/lib/framework/schemas';
import { extractSchemaInfo } from '@/lib/framework/utils';

export const PositionRenderer = () => {
  const positionSchema = styleSettingSchema.shape.position;
  const positionSchemaInfo = extractSchemaInfo(positionSchema);

  return (
    <Flex gap="2">
      <Text>Position</Text>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Button variant="soft">
            Options
            <DropdownMenu.TriggerIcon />
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {positionSchemaInfo.values.map((value: string) => {
            return (
              <DropdownMenu.Item key={value} style={{ textTransform: 'capitalize' }}>
                {value}
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Flex>
  );
};
