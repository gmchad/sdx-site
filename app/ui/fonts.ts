import localFont from 'next/font/local';
import { Space_Mono } from 'next/font/google';

export const tiposka = localFont({
  src: '../../public/fonts/tiposka/Tiposka-Regular.ttf',
  variable: '--font-display',
  display: 'swap',
});

export const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
});
