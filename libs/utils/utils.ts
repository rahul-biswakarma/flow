import { PreviewScaleType } from '../types';

export const getScaleValue = (scale: PreviewScaleType) => {
  return parseInt(scale.replace('%', '')) / 100;
};
