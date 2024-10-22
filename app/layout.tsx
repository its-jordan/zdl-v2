import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Navbar from '@/components/standalone/navbar';
import { CategoryProvider } from '@/components/standalone/CategoryContext';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'ZDL - Season 3',
  description: 'ZDL - Season 3',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CategoryProvider>
          <Navbar />
          {children}
        </CategoryProvider>
      </body>
    </html>
  );
}
