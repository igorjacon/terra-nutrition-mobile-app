import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.terra.app',
  appName: 'terra-nutri',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
