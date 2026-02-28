import { useEffect } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'
import { runOnJS } from 'react-native-reanimated'
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from 'react-native-vision-camera'

export default function PlayScreen() {
    const device = useCameraDevice('front')
    const { hasPermission, requestPermission } = useCameraPermission()

    useEffect(() => {
        if (!hasPermission) {
            requestPermission()
        }
    }, [hasPermission])

    const logFrame = (width: number, height: number) => {
        console.log('Frame size:', width, height)
    }

    const frameProcessor = useFrameProcessor(frame => {
        'worklet'
        runOnJS(logFrame)(frame.width, frame.height)
    }, [])

    if (!hasPermission) {
        return (
            <View style={styles.center}>
                <Text>Camera permission required</Text>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        )
    }

    if (!device) return <View style={styles.container} />

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={true}
                frameProcessor={frameProcessor}
                // @ts-ignore
                frameProcessorFps={10}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
})
