import '@radix-ui/themes/styles.css';
import '@/lib/styles/globals.css';

import { Metadata, Viewport } from 'next';
import { Theme } from '@radix-ui/themes';

import styles from '@/lib/styles/page.module.css';
import { siteConfig } from '@/lib/config/site';
import { fontSans } from '@/lib/config/fonts';
import { NextAuthProvider } from '@/lib/context';

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
        <body className={fontSans.variable}>
          <Theme
            accentColor="indigo"
            appearance="dark"
            grayColor="slate"
            panelBackground="translucent"
            radius="medium"
            scaling="100%"
          >
            <div className={styles.page}>{children}</div>
            {/* <ThemePanel /> */}
          </Theme>
        </body>
      </html>
    </NextAuthProvider>
  );
}
