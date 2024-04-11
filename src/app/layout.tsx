import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/ThemeProvider';
import Menu from '@/components/Menu';
import Backdrop from '@/components/Backdrop';

const inter = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'A simple todo-list app for testing .Net API',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(inter.className, 'relative flex flex-col sm:flex-row')}
      >
        <ThemeProvider attribute='class' enableSystem disableTransitionOnChange>
          <Menu />
          <Backdrop />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
