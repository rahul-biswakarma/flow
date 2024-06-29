import { Box, Text } from '@radix-ui/themes';

import styles from '../../setting.module.css';

import { styleSettingSchema } from '@/lib/framework';
import { extractSchemaInfo } from '@/lib/framework/utils';
import ResponsiveDropdown from '@/lib/components/ui/responsive-dropdown';
import { StyleSettingType } from '@/lib/framework/node.type';

type OptionsType = Exclude<StyleSettingType['position'], undefined>;

export const PositionRenderer = ({ value, onChange }: { value?: string; onChange: (value: OptionsType) => void }) => {
  const positionSchema = styleSettingSchema.shape.position;
  const positionSchemaInfo = extractSchemaInfo(positionSchema);

  return (
    <Box className={styles.settingFieldContainer}>
      <Text>Position</Text>
      <ResponsiveDropdown<OptionsType>
        hasValue={value ? 'true' : 'false'}
        menuItems={positionSchemaInfo.options}
        triggerContent={value ?? '-'}
        onChange={(selectedItem: OptionsType) => onChange(selectedItem)}
      />
    </Box>
  );
};
