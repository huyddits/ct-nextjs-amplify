import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.cheer.lifts',
  appName: 'Cheer Trainer',
  webDir: 'www',
  server: {
    url: 'https://staging.d1xu0qw1fwot4p.amplifyapp.com', // URL PWA
    // url: 'http://localhost:3001',
    cleartext: true,
  },
  ios: {
    contentInset: 'never',
    // backgroundColor: '#257951',
  },
};

export default config;
