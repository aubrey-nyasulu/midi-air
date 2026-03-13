// import type { Frame } from 'react-native-vision-camera';

export function VisionCameraObjectTrackerFrameProcessor() {
  'worklet';

  try {
    console.log("in VisionCameraObjectTracker worklet")
  } catch (error) {
    console.log('VisionCameraObjectTracker Worklet Error:', error);
  }
}
