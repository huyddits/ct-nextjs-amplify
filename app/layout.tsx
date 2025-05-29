import { Geist, Geist_Mono } from 'next/font/google';
// import { ServiceWorkerRegister } from "./_components";
import { ToastContainerClient } from './_components';
import { AppConfirm } from '@/components/compose';
import { StripeProvider } from '@/context/StripeContext';
import './globals.css';
import type { Metadata, Viewport } from 'next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'My PWA App',
  description: 'My Progressive Web App',
  applicationName: 'My PWA App',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'My PWA App',
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'My PWA App',
    title: {
      default: 'My PWA App',
      template: '%s - My PWA App',
    },
    description: 'My Progressive Web App',
  },
  twitter: {
    card: 'summary',
    title: {
      default: 'My PWA App',
      template: '%s - My PWA App',
    },
    description: 'My Progressive Web App',
  },
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/icons/icon-32x32.jpg', sizes: '32x32', type: 'image/jpeg' },
      { url: '/icons/icon-16x16.jpg', sizes: '16x16', type: 'image/jpeg' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon-cheer-trainer.ico" />
        {/* Android */}

        {/* IOS */}
        <link rel="apple-touch-icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="apple-touch-icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist&family=Geist+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <StripeProvider>{children}</StripeProvider>
        {/* <ServiceWorkerRegister /> */}
        <ToastContainerClient />
        <AppConfirm />
      </body>
    </html>
  );
}
