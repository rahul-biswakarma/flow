import React from 'react';
import { Flex, Text, TextArea } from '@radix-ui/themes';

import styles from '@/libs/styles/setting.module.css';

interface TextAreaRendererProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export const TextAreaRenderer: React.FC<TextAreaRendererProps> = ({ label, value, onChange }) => {
  const handleValueChange = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <Flex className="override-grid" direction="column" gap="2">
      <Text>{label}</Text>
      <TextArea
        className={styles.settingTypeInputContainer}
        color="gray"
        data-hasvalue={value ? 'true' : 'false'}
        placeholder="-"
        radius="small"
        size="2"
        value={value ?? ''}
        variant="surface"
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </Flex>
  );
};
