import { Loader } from "@/components/loader/loader";
import { cn } from "@v1/ui/cn";
import "@v1/ui/globals.css";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import dynamic from "next/dynamic";
import { Suspense } from "react";

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

const ThemeProvider = dynamic(
  () => import("@v1/ui/theme-provider").then((mod) => mod.ThemeProvider),
  {
    ssr: false,
  },
);

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
        <NextThemeProvider attribute="class" defaultTheme="system">
          <ThemeProvider
            accentColor="indigo"
            grayColor="slate"
            panelBackground="translucent"
            radius="medium"
            scaling="100%"
          >
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </ThemeProvider>
          {/* <div className="noise-bg-container" /> */}
        </NextThemeProvider>
      </body>
    </html>
  );
}
