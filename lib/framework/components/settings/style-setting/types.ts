import { StyleSettingType } from '@/lib/framework/node.type';

export type PositionOptionType = Exclude<StyleSettingType['position'], undefined>;
export type DisplayOptionType = Exclude<StyleSettingType['display'], undefined>;
export type TextAlignOptionType = Exclude<StyleSettingType['textAlign'], undefined>;
export type FlexDirectionOptionType = Exclude<StyleSettingType['flexDirection'], undefined>;
export type JustifyContentOptionType = Exclude<StyleSettingType['justifyContent'], undefined>;
export type AlignItemsOptionType = Exclude<StyleSettingType['alignItems'], undefined>;
