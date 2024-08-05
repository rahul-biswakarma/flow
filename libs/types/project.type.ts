import { SettingUnit } from '../schemas';

export type ProjectConfig = {
  defaultUnit: SettingUnit;
};

export type LeftPanelProjectView = 'pages' | 'components';
export type LeftPanelConfigView = 'config' | 'setting';
