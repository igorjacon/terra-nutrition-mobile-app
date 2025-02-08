import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'net.terranutri',
  appName: 'Terra Nutri',
  webDir: 'www/browser',
  server: {
    androidScheme: 'https'
  }
};

export default config;
