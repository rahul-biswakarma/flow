export const settingUnitsOptions = [
  'auto',
  'px',
  'em',
  'rem',
  '%',
  'vw',
  'vh',
  'fit-content',
  'min-content',
  'max-content',
  'stretch',
  'unset',
  'initial',
  'inherit',
  'revert',
] as const;

export type SettingUnit = (typeof settingUnitsOptions)[number];
