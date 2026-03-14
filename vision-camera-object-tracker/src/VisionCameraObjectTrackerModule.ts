import { NativeModules } from 'react-native';

export const testAsync = async () => {
  const { VisionCameraObjectTrackerModule } = NativeModules;

  return await VisionCameraObjectTrackerModule.process();
};
