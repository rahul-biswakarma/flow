import React from 'react';

import ResponsiveDropdown from '@/libs/components/ui/responsive-dropdown';
import { SettingUnit, settingUnitsOptions } from '@/libs/schemas';

type UnitType = SettingUnit;

interface UnitRendererProps {
  value?: UnitType;
  onChange: (value: UnitType) => void;
}

export const UnitRenderer: React.FC<UnitRendererProps> = ({ value, onChange }) => {
  const unitValues = settingUnitsOptions.map((unit) => unit);

  return (
    <ResponsiveDropdown<UnitType>
      showTriggerIcon
      hasValue={value ? 'true' : 'false'}
      menuItems={unitValues}
      textTransform="lowercase"
      triggerContent={value ?? '-'}
      onChange={onChange}
    />
  );
};
