import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { trackObject } from 'react-native-vision-camera-object-tracker';
import { Worklets } from 'react-native-worklets-core';

export default function App() {
  const device = useCameraDevice('back');
  const { hasPermission, requestPermission } = useCameraPermission();
  const [coords, setCoords] = useState({ x: 0, y: 0, detected: false });

  // 1. This function sends data from the high-speed "Worklet" back to the UI
  const updateUI = Worklets.createRunOnJS((result: any) => {
    setCoords(result);
  });

  // 2. The Frame Processor: This is where your Native Plugin is called
  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';

    // We look for a specific Hue (e.g., 100 for Green or 0 for Red)
    // In a real session, these values come from your Calibration mapping
    const result = trackObject(frame, { h: 100, s: 150, v: 150 });

    if (result.detected) {
      updateUI(result);
    }
  }, []);

  // 3. Permission Handling
  React.useEffect(() => {
    requestPermission();
  }, []);

  if (!hasPermission) return <ActivityIndicator />;
  if (!device) return <Text>No Camera Device Found</Text>;

  return (
    <View style={styles.container}>
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        pixelFormat="yuv" // Matches your Native Plugin logic
      />

      {/* Crosshair Overlay to show where the object is detected */}
      {coords.detected && (
        <View
          style={[
            styles.dot,
            { left: coords.x * 100 + '%', top: coords.y * 100 + '%' },
          ]}
        />
      )}

      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>
          {coords.detected
            ? `Object at: ${coords.x.toFixed(2)}, ${coords.y.toFixed(2)}`
            : 'Searching for color...'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'black' },
  dot: {
    position: 'absolute',
    width: 20,
    height: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  labelContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    padding: 10,
    borderRadius: 8,
  },
  labelText: { color: 'white', fontWeight: 'bold' },
});
