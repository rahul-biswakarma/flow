import "@v1/ui/globals.css";
import { cn } from "@v1/ui/cn";
import { ThemeProvider } from "@v1/ui/theme-provider";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create v1",
  description: "Production ready Next.js app",
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)" },
    { media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        `${GeistSans.variable} ${GeistMono.variable}`,
        "antialiased",
      )}
    >
      <body>
        <ThemeProvider
          accentColor="indigo"
          appearance="dark"
          grayColor="slate"
          panelBackground="translucent"
          radius="medium"
          scaling="100%"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
