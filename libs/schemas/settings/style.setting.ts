type StyleType = 'string' | 'number' | 'stringWithUnit' | 'enum' | 'color';

interface Style {
  label: string;
  name: string;
  type: StyleType;
  required?: boolean;
  options?: string[];
}

export const webNodeStyles: Style[] = [
  {
    label: 'Width',
    name: 'width',
    type: 'stringWithUnit',
  },
  {
    label: 'Height',
    name: 'height',
    type: 'stringWithUnit',
  },
  {
    label: 'Display',
    name: 'display',
    type: 'enum',
    options: ['flex', 'grid', 'block', 'inline-block', 'inline', 'none'],
  },
  {
    label: 'Position',
    name: 'position',
    type: 'enum',
    options: ['absolute', 'relative', 'fixed', 'sticky', 'static'],
  },
  {
    label: 'Margin',
    name: 'margin',
    type: 'stringWithUnit',
  },
  {
    label: 'Padding',
    name: 'padding',
    type: 'stringWithUnit',
  },
  {
    label: 'Background Color',
    name: 'backgroundColor',
    type: 'color',
  },
  {
    label: 'Font Color',
    name: 'color',
    type: 'color',
  },
  {
    label: 'Font Size',
    name: 'fontSize',
    type: 'stringWithUnit',
  },
  {
    label: 'Font Weight',
    name: 'fontWeight',
    type: 'enum',
    options: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  },
  {
    label: 'Text Align',
    name: 'textAlign',
    type: 'enum',
    options: ['left', 'center', 'right', 'justify'],
  },
  //   {
  //     label: 'Border',
  //     name: 'border',
  //     type: 'stringWithUnit',
  //   },
  {
    label: 'Flex Direction',
    name: 'flexDirection',
    type: 'enum',
    options: ['row', 'column', 'row-reverse', 'column-reverse'],
  },
  {
    label: 'Justify Content',
    name: 'justifyContent',
    type: 'enum',
    options: ['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'],
  },
  {
    label: 'Align Items',
    name: 'alignItems',
    type: 'enum',
    options: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
  },
  //   {
  //     label: 'Background Image',
  //     name: 'background-image',
  //     type: 'string',
  //   },
  {
    label: 'Opacity',
    name: 'opacity',
    type: 'number',
  },
  {
    label: 'z-Index',
    name: 'zIndex',
    type: 'number',
  },
  //   {
  //     label: 'Box Shadow',
  //     name: 'box-shadow',
  //     type: 'string',
  //   },
  {
    label: 'Overflow',
    name: 'overflow',
    type: 'enum',
    options: ['visible', 'hidden', 'scroll', 'auto'],
  },
];
