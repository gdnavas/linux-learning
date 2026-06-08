import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.linuxlearning.app",
  appName: "Linux Learning",
  webDir: "dist",
  server: {
    androidScheme: "https",
  },
};

export default config;
