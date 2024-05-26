import '@/lib/styles/globals.css';
import { Metadata, Viewport } from 'next';
import clsx from 'clsx';

import { siteConfig } from '@/lib/config/site';
import { fontSans } from '@/lib/config/fonts';
import { NextAuthProvider, ThemeProvider } from '@/lib/components';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <NextAuthProvider>
      <html suppressHydrationWarning lang="en">
        <head />
        <body className={clsx('min-h-screen bg-background font-sans antialiased', fontSans.variable)}>
          <ThemeProvider enableSystem attribute="class" defaultTheme="system">
            <div className="relative flex h-screen flex-col">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </NextAuthProvider>
  );
}
