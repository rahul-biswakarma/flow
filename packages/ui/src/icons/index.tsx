import {
  IconAdjustments,
  IconAdjustmentsOff,
  IconAffiliate,
  IconAlertTriangle,
  IconAlignCenter,
  IconAlignLeft,
  IconAlignRight,
  IconAppWindow,
  IconArrowBarToRight,
  IconArrowDown,
  IconArrowLeft,
  IconArrowNarrowRight,
  IconArrowRight,
  IconAward,
  IconBolt,
  IconBorderBottom,
  IconBorderCorners,
  IconBorderLeft,
  IconBorderRight,
  IconBorderSides,
  IconBorderTop,
  IconBox,
  IconBoxAlignBottom,
  IconBoxAlignLeft,
  IconBoxAlignRight,
  IconBoxAlignTop,
  IconBoxMargin,
  IconBoxPadding,
  IconBrandGithub,
  IconBrush,
  IconBulb,
  IconCalendar,
  IconCheck,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconChevronUp,
  IconCircle,
  IconCircleHalf2,
  IconComet,
  IconComponents,
  IconCopy,
  IconCross,
  IconDatabase,
  IconEyeCode,
  IconFile,
  IconFileTypeDoc,
  IconFileTypography,
  IconGitMerge,
  IconGlobe,
  IconGolf,
  IconHash,
  IconHeart,
  IconInfoCircle,
  IconLayout,
  IconLayoutAlignBottom,
  IconLayoutAlignCenter,
  IconLayoutAlignLeft,
  IconLayoutAlignMiddle,
  IconLayoutAlignRight,
  IconLayoutAlignTop,
  IconLayoutDistributeHorizontal,
  IconLayoutDistributeVertical,
  IconLayoutGridAdd,
  IconLayoutOff,
  IconLayoutSidebar,
  IconLineDashed,
  IconLineDotted,
  IconLink,
  IconList,
  IconLoader,
  IconLogout,
  IconMaximize,
  IconMilitaryAward,
  IconMoodWrrr,
  IconMoon,
  IconPhoto,
  IconPhotoScan,
  IconPlus,
  IconPuzzle,
  IconRadiusBottomLeft,
  IconRadiusBottomRight,
  IconRadiusTopLeft,
  IconRadiusTopRight,
  IconSchema,
  IconSearch,
  IconSend,
  IconSend2,
  IconSettings,
  IconSitemap,
  IconSparkles,
  IconSun,
  IconSunMoon,
  IconThumbUp,
  IconToggleLeft,
  IconTopologyStar3,
  IconTrash,
  IconUser,
  IconWand,
  IconWorld,
  IconX,
} from "@tabler/icons-react";

import type { IconProps } from "@tabler/icons-react";

const IconWrapper = (Icon: React.ComponentType<IconProps>) => {
  return (props: IconProps) => <Icon {...props} size={props.size ?? 16} />;
};

export const Icons = {
  Bolt: IconWrapper(IconBolt),
  Adjustments: IconWrapper(IconAdjustments),
  AdjustmentsOff: IconWrapper(IconAdjustmentsOff),
  PhotoScan: IconWrapper(IconPhotoScan),
  LayoutSidebar: IconWrapper(IconLayoutSidebar),
  Award: IconWrapper(IconAward),
  MoodWrr: IconWrapper(IconMoodWrrr),
  MilitaryAward: IconWrapper(IconMilitaryAward),
  EyeCode: IconWrapper(IconEyeCode),
  ThumbsUp: IconWrapper(IconThumbUp),
  GitMerge: IconWrapper(IconGitMerge),
  FileTypeDoc: IconWrapper(IconFileTypeDoc),
  CircleHalf2: IconWrapper(IconCircleHalf2),
  Circle: IconWrapper(IconCircle),
  Brush: IconWrapper(IconBrush),
  LayoutGridAdd: IconWrapper(IconLayoutGridAdd),
  World: IconWrapper(IconWorld),
  Sitemap: IconWrapper(IconSitemap),
  Bulb: IconWrapper(IconBulb),
  Layout: IconWrapper(IconLayout),
  LayoutOff: IconWrapper(IconLayoutOff),
  BoxMargin: IconWrapper(IconBoxMargin),
  BoxPadding: IconWrapper(IconBoxPadding),
  BorderTop: IconWrapper(IconBorderTop),
  BorderRight: IconWrapper(IconBorderRight),
  BorderBottom: IconWrapper(IconBorderBottom),
  BorderLeft: IconWrapper(IconBorderLeft),
  LineDashed: IconWrapper(IconLineDashed),
  LineDotted: IconWrapper(IconLineDotted),
  Hash: IconWrapper(IconHash),
  Maximize: IconWrapper(IconMaximize),
  BorderCorners: IconWrapper(IconBorderCorners),
  BorderSides: IconWrapper(IconBorderSides),
  AlignLeft: IconWrapper(IconAlignLeft),
  AlignRight: IconWrapper(IconAlignRight),
  AlignCenter: IconWrapper(IconAlignCenter),
  BoxAlignTop: IconWrapper(IconBoxAlignTop),
  BoxAlignBottom: IconWrapper(IconBoxAlignBottom),
  BoxAlignRight: IconWrapper(IconBoxAlignRight),
  BoxAlignLeft: IconWrapper(IconBoxAlignLeft),
  User: IconWrapper(IconUser),
  TopologyStar3: IconWrapper(IconTopologyStar3),
  AlertTriangle: IconWrapper(IconAlertTriangle),
  ToggleLeft: IconWrapper(IconToggleLeft),
  Calendar: IconWrapper(IconCalendar),
  Link: IconWrapper(IconLink),
  List: IconWrapper(IconList),
  Box: IconWrapper(IconBox),
  FileTypography: IconWrapper(IconFileTypography),
  Photo: IconWrapper(IconPhoto),
  File: IconWrapper(IconFile),
  Send: IconWrapper(IconSend),
  Send2: IconWrapper(IconSend2),
  ArrowDown: IconWrapper(IconArrowDown),
  LayoutDistributeVertical: IconWrapper(IconLayoutDistributeVertical),
  LayoutDistributeHorizontal: IconWrapper(IconLayoutDistributeHorizontal),
  LayoutAlignLeft: IconWrapper(IconLayoutAlignLeft),
  LayoutAlignRight: IconWrapper(IconLayoutAlignRight),
  LayoutAlignMiddle: IconWrapper(IconLayoutAlignMiddle),
  LayoutAlignTop: IconWrapper(IconLayoutAlignTop),
  LayoutAlignBottom: IconWrapper(IconLayoutAlignBottom),
  LayoutAlignCenter: IconWrapper(IconLayoutAlignCenter),
  RadiusTopLeft: IconWrapper(IconRadiusTopLeft),
  RadiusTopRight: IconWrapper(IconRadiusTopRight),
  RadiusBottomRight: IconWrapper(IconRadiusBottomRight),
  RadiusBottomLeft: IconWrapper(IconRadiusBottomLeft),
  Wand: IconWrapper(IconWand),
  ChevronUp: IconWrapper(IconChevronUp),
  ChevronDown: IconWrapper(IconChevronDown),
  Trash: IconWrapper(IconTrash),
  InfoCircle: IconWrapper(IconInfoCircle),
  X: IconWrapper(IconX),
  Cross: IconWrapper(IconCross),
  AppWindow: IconWrapper(IconAppWindow),
  Settings: IconWrapper(IconSettings),
  Affiliate: IconWrapper(IconAffiliate),
  Globe: IconWrapper(IconGlobe),
  Components: IconWrapper(IconComponents),
  SignOut: IconWrapper(IconLogout),
  Schema: IconWrapper(IconSchema),
  Golf: IconWrapper(IconGolf),
  BrandGithub: IconWrapper(IconBrandGithub),
  Database: IconWrapper(IconDatabase),
  ArrowBarToRight: IconWrapper(IconArrowBarToRight),
  Copy: IconWrapper(IconCopy),
  Check: IconWrapper(IconCheck),
  Loader: IconWrapper(IconLoader),
  Plus: IconWrapper(IconPlus),
  ChevronLeft: IconWrapper(IconChevronLeft),
  ChevronRight: IconWrapper(IconChevronRight),
  ArrowNarrowRight: IconWrapper(IconArrowNarrowRight),
  ArrowRight: IconWrapper(IconArrowRight),
  Comet: IconWrapper(IconComet),
  Puzzle: IconWrapper(IconPuzzle),
  ArrowLeft: IconWrapper(IconArrowLeft),
  Heart: IconWrapper(IconHeart),
  Search: IconWrapper(IconSearch),
  Sun: IconWrapper(IconSun),
  Moon: IconWrapper(IconMoon),
  SunMoon: IconWrapper(IconSunMoon),
  Sparkles: IconWrapper(IconSparkles),
};
