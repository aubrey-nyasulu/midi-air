import { VisionCameraProxy, type Frame } from 'react-native-vision-camera';

export interface TrackingResult {
  x: number;
  y: number;
  width: number;
  height: number;
  detected: boolean;
}

export interface TrackingOptions {
  h: number;
  s: number;
  v: number;
  [key: string]: number;
}

// Added the {} as the second argument
const plugin = VisionCameraProxy.initFrameProcessorPlugin('trackObject', {});

export function trackObject(
  frame: Frame,
  options: TrackingOptions
): TrackingResult {
  'worklet';
  if (plugin == null) throw new Error('Failed to load trackObject plugin!');
  // The options now match the expected Record type
  return plugin.call(frame, options) as unknown as TrackingResult;
}
