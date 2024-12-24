import type { Root } from "@radix-ui/react-tabs";
import { Tabs as RadixTabs } from "@radix-ui/react-tabs";
import type { ComponentProps } from "react";
import { Tabs as ShadTab } from "./tab-2";

type CustomTabsProps = {
  tabVariant: 1 | 2;
} & Partial<ComponentProps<typeof Root>>;

export const Tabs = ({ tabVariant, ...props }: CustomTabsProps) => {
  if (tabVariant === 1) {
    return <RadixTabs {...props} />;
  }
  return <ShadTab {...props} />;
};
