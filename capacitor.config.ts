import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheer.lifts',
  appName: 'Cheer Trainer',
  webDir: 'www',
  server: {
    url: 'https://staging.d1xu0qw1fwot4p.amplifyapp.com', // URL PWA
    cleartext: true,
  },
};

export default config;
