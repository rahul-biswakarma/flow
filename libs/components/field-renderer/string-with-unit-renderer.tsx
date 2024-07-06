import React from 'react';
import { Grid, Text, TextField } from '@radix-ui/themes';

import { UnitRenderer } from './unit-renderer';

import styles from '@/libs/styles/setting.module.css';
import { useProjectContext } from '@/libs/context';
import { SettingUnit } from '@/libs/schemas';

interface StringRendererProps {
  label: string;
  value?: any;
  onChange: (value: any) => void;
}

export const StringWithUnitRenderer: React.FC<StringRendererProps> = ({ label, value, onChange }) => {
  const { projectConfig } = useProjectContext();
  const defaultUnit = projectConfig?.defaultUnit;

  const handleValueChange = (newValue: string) => {
    onChange({ value: newValue, unit: value?.unit ?? defaultUnit });
  };

  const handleUnitChange = (newUnit: SettingUnit) => {
    onChange({ value: value?.value ?? '', unit: newUnit as SettingUnit });
  };

  return (
    <>
      <Text>{label}</Text>
      <Grid columns="1fr auto" gap="2" width="100%">
        <TextField.Root
          className={styles.settingTypeInputContainer}
          color="gray"
          data-hasValue={value?.value ? 'true' : 'false'}
          placeholder="-"
          radius="medium"
          size="2"
          value={value?.value ?? ''}
          variant="soft"
          onChange={(e) => handleValueChange(e.target.value)}
        />
        <UnitRenderer value={value?.unit ?? defaultUnit} onChange={handleUnitChange} />
      </Grid>
    </>
  );
};
