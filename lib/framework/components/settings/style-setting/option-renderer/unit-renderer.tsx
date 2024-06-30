import React from 'react';
import { z } from 'zod';

import ResponsiveDropdown from '@/lib/components/ui/responsive-dropdown';
import { unitSchema } from '@/lib/framework/schemas/setting.schema';

type UnitType = z.infer<typeof unitSchema>;

interface UnitRendererProps {
  value?: UnitType;
  onChange: (value: UnitType) => void;
}

export const UnitRenderer: React.FC<UnitRendererProps> = ({ value, onChange }) => {
  const unitValues = unitSchema.options;

  return (
    <ResponsiveDropdown<UnitType>
      hasValue={value ? 'true' : 'false'}
      menuItems={unitValues}
      textTransform="lowercase"
      triggerContent={value ?? '-'}
      onChange={onChange}
    />
  );
};
