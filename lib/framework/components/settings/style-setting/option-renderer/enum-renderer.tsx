import React from 'react';
import { Text } from '@radix-ui/themes';
import { ZodEnum, ZodOptional } from 'zod';

import ResponsiveDropdown from '@/lib/components/ui/responsive-dropdown';

interface EnumRendererProps<T> {
  label: string;
  schema: ZodOptional<ZodEnum<any>> | ZodEnum<any>;
  value?: T;
  onChange: (value: T) => void;
}

const EnumRenderer = <T extends string>({ label, schema, value, onChange }: EnumRendererProps<T>) => {
  const enumSchema = schema instanceof ZodOptional ? schema._def.innerType : schema;
  const enumValues = (enumSchema as ZodEnum<any>)._def.values;

  return (
    <>
      <Text>{label}</Text>
      <ResponsiveDropdown<T>
        hasValue={value ? 'true' : 'false'}
        menuItems={enumValues}
        triggerContent={value ?? '-'}
        onChange={(selectedItem: T) => onChange(selectedItem)}
      />
    </>
  );
};

export default EnumRenderer;
