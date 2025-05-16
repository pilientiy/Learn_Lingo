import type { Metadata } from 'next';
import './styles/globals.css';
import { Roboto } from 'next/font/google';
import Header from './components/header';
import AuthProvider from './components/auth-provider';
import clsx from 'clsx';
import StateProvider from './components/state-provider';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'LearnLingo',
  description:
    'LearnLingo - find the perfect foreign language teacher for you. A wide selection of professional teachers, with convenient search options by language, level, and type of lessons. Start your language journey with us today!',
  icons: {
    icon: { url: '/favicon.ico', type: 'image/x-icon' },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(roboto.className)}>
        <AuthProvider>
          <StateProvider>
            <Header />
            <main>{children}</main>
            <div id="modal"></div>
          </StateProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
