import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.terra.app',
  appName: 'terra-nutri',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
