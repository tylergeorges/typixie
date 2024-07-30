import type { Metadata } from 'next';
import './globals.css';
import '../styles/themes.css';
import { siteConfig } from '@config/site';
import { fontMono, fontSans } from '@lib/fonts';
import { cn } from '@utils/cn';
import { ThemeProvider } from 'next-themes';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  authors: [
    {
      name: 'Tyler Georges',
      url: 'https://github.com/tylergeorges'
    }
  ],

  creator: 'Tyler Georges'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />

      <body className={cn('font-sans', fontMono.variable, fontSans.variable)}>
        <ThemeProvider defaultTheme="theme0" themes={['theme0', 'theme1', 'theme2', 'theme3']}>
          <main className="flex h-full w-full flex-col overflow-auto">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
