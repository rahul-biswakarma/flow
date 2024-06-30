import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Box, Flex, Text, TextField } from '@radix-ui/themes';

import styles from '../../setting.module.css';

interface ColorRendererProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export const ColorRenderer: React.FC<ColorRendererProps> = ({ label, value, onChange }) => {
  return (
    <>
      <Text>{label}</Text>
      <Flex align="center" gap="2" width="100%">
        <Box className={styles.colorPickerContainer}>
          <HexColorPicker color={value ?? '#000000'} onChange={onChange} />
        </Box>
        <TextField.Root
          className={styles.settingTypeInputContainer}
          color="gray"
          placeholder="#000000"
          radius="small"
          size="2"
          value={value ?? ''}
          variant="soft"
          onChange={(e) => onChange(e.target.value)}
        />
      </Flex>
    </>
  );
};
