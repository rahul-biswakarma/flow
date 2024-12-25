"use client";

import { ThemeProvider } from "@ren/ui/components";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { type ReactNode, useEffect, useState } from "react";

export function ClientThemeProvider({ children }: { children: ReactNode }) {
  // Add mounting state to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeProvider
        accentColor="indigo"
        grayColor="slate"
        panelBackground="translucent"
        radius="medium"
        scaling="100%"
      >
        {children}
      </ThemeProvider>
    </NextThemeProvider>
  );
}
