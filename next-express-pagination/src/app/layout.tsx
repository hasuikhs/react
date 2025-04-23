import { Navbar } from '@/components/Navbar';
import { ThemeProvider } from '@/context/ThemeContext';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "서버 사이드 렌더링 예제",
  description: "Next.js와 Express를 사용한 서버 사이드 렌더링 예제",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
