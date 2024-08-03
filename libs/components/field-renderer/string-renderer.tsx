import React from 'react';
import { Text, TextField } from '@radix-ui/themes';

import styles from '@/libs/styles/setting.module.css';

interface StringRendererProps {
  label: string;
  value?: string;
  onChange: (value: string) => void;
}

export const StringRenderer: React.FC<StringRendererProps> = ({ label, value, onChange }) => {
  const handleValueChange = (newValue: string) => {
    	onChange(newValue);
  };

  return (
    <>
      <Text>{label}</Text>
      <TextField.Root
        className={styles.settingTypeInputContainer}
        color="gray"
        data-hasValue={value ? 'true' : 'false'}
        placeholder="-"
        radius="small"
        size="2"
        value={value ?? ''}
        variant="soft"
        onChange={(e) => handleValueChange(e.target.value)}
      />
    </>
  );
};
