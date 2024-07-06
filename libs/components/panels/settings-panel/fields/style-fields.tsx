import React from 'react';

import { ColorRenderer, EnumRenderer, StringRenderer, StringWithUnitRenderer } from '../../../field-renderer';

import { webNodeStyles } from '@/libs/schemas';

type StyleFieldType = {
  getStyleValue: (attrName: string) => any;
  updateStyleConfig: (attrName: string, value: any) => void;
};

export const StyleFields = ({ getStyleValue, updateStyleConfig }: StyleFieldType) => {
  return (
    <>
      {webNodeStyles.map((style) => {
        const commonProps = {
          label: style.label,
          value: getStyleValue(style.name),
          onChange: (value: any) => updateStyleConfig(style.name, value),
        };

        switch (style.type) {
          case 'string':
          case 'number':
            return <StringRenderer key={style.name} {...commonProps} />;
          case 'color':
            return <ColorRenderer key={style.name} {...commonProps} />;
          case 'stringWithUnit':
            return <StringWithUnitRenderer key={style.name} {...commonProps} />;
          case 'enum':
            return <EnumRenderer {...commonProps} options={style.options ?? []} />;
          default:
            return null;
        }
      })}
    </>
  );
};
