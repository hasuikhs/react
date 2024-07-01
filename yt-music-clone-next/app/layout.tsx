import Sidebar from '@/components/Sidebar';
import { sleep } from '@/lib/utils';
import { ThemeProvider } from '@/providers/themeProvider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Clone YT Music',
  description: 'Clone YT Music',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log('before RootLayout sleep ...');
  await sleep(2000)
  console.log('after RootLayout sleep ...');

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Sidebar>{ children }</Sidebar>
        </ThemeProvider>
        </body>
    </html>
  );
}
