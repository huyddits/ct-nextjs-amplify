import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheer.lifts',
  appName: 'Cheer Trainer',
  webDir: 'www',
  server: {
    url: 'https://staging.d2gkzv5wx7qsyt.amplifyapp.com', // URL PWA
    cleartext: true,
  },
};

export default config;
