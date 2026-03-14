import { useMemo } from 'react';
import { VisionCameraProxy } from 'react-native-vision-camera';
import type { Frame } from 'react-native-vision-camera';

const LINKING_ERROR = `Can't load plugin scanText. Try cleaning cache or reinstall plugin.`;

type CreateObjectDetectionPluginReturnType = {
  detectObject: (frame: Frame) => Text;
};

export function createObjectDetectionPlugin(
  _options?: Object
): CreateObjectDetectionPluginReturnType {
  const plugin = VisionCameraProxy.initFrameProcessorPlugin(
    'detectObjectInFrame',
    {}
  );

  if (!plugin) {
    throw new Error(LINKING_ERROR);
  }
  return {
    detectObject: (frame: Frame): Text => {
      'worklet';

      return plugin.call(frame) as Text;
    },
  };
}

export function useObjectDetection(options?: Object) {
  return useMemo(() => createObjectDetectionPlugin(options), [options]);
}
