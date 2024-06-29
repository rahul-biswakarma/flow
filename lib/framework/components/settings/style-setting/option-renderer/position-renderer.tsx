import { Box, Text } from '@radix-ui/themes';

import styles from '../../setting.module.css';

import { styleSettingSchema } from '@/lib/framework/schemas';
import { extractSchemaInfo } from '@/lib/framework/utils';
import ResponsiveDropdown from '@/lib/components/ui/responsive-dropdown';

export const PositionRenderer = ({ value }: { value?: string }) => {
  const positionSchema = styleSettingSchema.shape.position;
  const positionSchemaInfo = extractSchemaInfo(positionSchema);

  return (
    <Box className={styles.settingFieldContainer}>
      <Text>Position</Text>
      <ResponsiveDropdown menuItems={positionSchemaInfo.options} triggerContent={value ?? '-'} />
    </Box>
  );
};
