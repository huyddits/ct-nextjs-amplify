import { ToastContainerClient } from './_components';
import { AppConfirm } from '@/components/compose';
import { StripeProvider } from '@/context/StripeContext';
import './globals.css';
import type { Metadata, Viewport } from 'next';
import { SWRProvider } from '@/context/SWRContext';
import { DeepLinkHandler } from './_components';
import NotificationModal from './_components/NotificationModal.client';

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
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        {/* Android */}

        {/* IOS */}
        <link rel="apple-touch-icon" type="image/png" sizes="32x32" href="/ios/32.png" />
        <link rel="apple-touch-icon" type="image/png" sizes="16x16" href="/ios/16.png" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="touch-icon-ipad-retina.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="touch-icon-iphone-retina.png" />

        {/* Font */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&family=Geist:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={`antialiased`}>
        <NotificationModal />
        <StripeProvider>
          <SWRProvider>{children}</SWRProvider>
        </StripeProvider>
        <ToastContainerClient />
        <AppConfirm />
        <DeepLinkHandler />
      </body>
    </html>
  );
}
