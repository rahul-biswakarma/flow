"use client";

import { Theme, type ThemeProps } from "@radix-ui/themes";

interface ThemeProviderProps extends ThemeProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children, ...props }: ThemeProviderProps) => {
  return <Theme {...props}>{children}</Theme>;
};
