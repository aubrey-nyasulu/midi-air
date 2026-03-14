import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import {
  useObjectDetection,
  testAsync,
} from 'react-native-vision-camera-object-tracker';

export default function App() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    requestPermission();
  }, [requestPermission]);

  const [fromAsync, setFromAsync] = useState('default');

  useEffect(() => {
    const run = async () => {
      const value = await testAsync();

      setFromAsync(value);
    };

    run();
  }, []);

  const objectDetector = useObjectDetection({
    kindOfObject: 'colorBlob',
    targetColor: 'red', // We'll look for your red-tipped stick
  });

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';

    // 1. Call your TurboModule!
    const result: any = objectDetector.detectObject(frame);

    console.log({ result });
  }, []);

  if (!hasPermission)
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Text style={styles.text}>No Camera Permission</Text>
      </View>
    );

  if (!device)
    return (
      <View
        style={[
          styles.container,
          { alignItems: 'center', justifyContent: 'center' },
        ]}
      >
        <Text>No Device Found</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        pixelFormat="yuv" // Optimized for color tracking
      />

      {/* Visual Overlay to show detection */}
      <View style={styles.overlay} pointerEvents="none">
        <Text style={styles.label}>{fromAsync}</Text>
      </View>

      {/* The "Stick Tip" Visualizer */}
      <View style={styles.dotContainer} pointerEvents="none">
        {/* We can use Reanimated here later for smoother movement */}
        <View
          style={[
            styles.dot,
            { backgroundColor: 'red', left: '50%', top: '50%' },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  overlay: {
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
  },
  label: { color: 'white', fontWeight: 'bold' },
  dotContainer: { ...StyleSheet.absoluteFillObject },
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  text: { color: 'red' },
});
