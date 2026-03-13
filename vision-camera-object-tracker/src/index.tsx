export * from './VisionCameraObjectTrackerWorklet';

import VisionCameraObjectTracker from './NativeVisionCameraObjectTracker';

export const helloKotlin = (name: string) => {
  return VisionCameraObjectTracker.helloKotlin(name);
};
