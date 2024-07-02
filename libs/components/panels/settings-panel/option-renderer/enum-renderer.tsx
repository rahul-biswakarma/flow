import React from 'react';
import { Text } from '@radix-ui/themes';

import ResponsiveDropdown from '@/libs/components/ui/responsive-dropdown';

interface EnumRendererProps<T> {
  label: string;
  options: T[];
  value?: T;
  onChange: (value: T) => void;
}

export const EnumRenderer = <T extends string>({ label, options, value, onChange }: EnumRendererProps<T>) => {
  return (
    <>
      <Text>{label}</Text>
      <ResponsiveDropdown<T>
        hasValue={value ? 'true' : 'false'}
        menuItems={options}
        triggerContent={value ?? '-'}
        onChange={(selectedItem: T) => onChange(selectedItem)}
      />
    </>
  );
};
