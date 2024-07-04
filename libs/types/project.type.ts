import { SettingUnit } from '../schemas';

export type ProjectConfig = {
  defaultUnit: SettingUnit;
};

export type LeftPanelTopSectionView = 'pages' | 'components';
export type LeftPanelBottomSectionView = 'config' | 'setting';
export type CanvasViewMode = 'node' | 'preview' | 'node+preview';
