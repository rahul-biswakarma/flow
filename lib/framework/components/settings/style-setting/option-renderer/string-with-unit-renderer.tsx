import React from 'react';
import { Grid, Text, TextField } from '@radix-ui/themes';
import { z } from 'zod';

import styles from '../../setting.module.css';

import { UnitRenderer } from './unit-renderer';

import { stringWithUnitSchema, unitSchema } from '@/lib/framework/schemas/setting.schema';
import { useProjectContext } from '@/lib/context';

interface StringRendererProps {
  label: string;
  value?: z.infer<typeof stringWithUnitSchema>;
  onChange: (value: z.infer<typeof stringWithUnitSchema>) => void;
}

export const StringWithUnitRenderer: React.FC<StringRendererProps> = ({ label, value, onChange }) => {
  const { projectConfig } = useProjectContext();
  const defaultUnit = projectConfig?.defaultUnit;

  const handleValueChange = (newValue: string) => {
    onChange({ value: newValue, unit: value?.unit ?? defaultUnit });
  };

  const handleUnitChange = (newUnit: z.infer<typeof unitSchema>) => {
    onChange({ value: value?.value ?? '', unit: newUnit });
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
          radius="small"
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
