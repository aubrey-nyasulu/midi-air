import { useIsFocused } from '@react-navigation/native'
import { useCallback, useState } from 'react'
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native'
import {
    Camera,
    useCameraDevice,
    useCameraPermission,
    useFrameProcessor,
} from 'react-native-vision-camera'
import { Worklets } from 'react-native-worklets-core'

// For TS and Worklet persistence
declare global {
    var lastTimestamp: number | undefined
}

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window')

export default function PlayScreen() {
    const device = useCameraDevice('front')
    const { hasPermission, requestPermission } = useCameraPermission()
    const isFocused = useIsFocused()
    const [activeDrum, setActiveDrum] = useState<string | null>(null)

    // JS function to trigger sound/UI updates
    const onDrumHit = useCallback((side: string) => {
        setActiveDrum(side)
        console.log(`BOOM! ${side} drum hit!`)
        // Logic to play MIDI/Audio goes here
        setTimeout(() => setActiveDrum(null), 100)
    }, [])

    const runOnJSLogFrame = Worklets.createRunOnJS(onDrumHit)

    const frameProcessor = useFrameProcessor(
        frame => {
            'worklet'
            const now = Date.now()
            if (
                global.lastTimestamp === undefined ||
                now - global.lastTimestamp > 80
            ) {
                global.lastTimestamp = now

                // 'vision-camera-hand-detector' here.

                if (frame.width > 0) {
                    // If we detect "movement" in the left 30% of the frame
                    // runOnJSLogFrame('LEFT')
                }
            }
        },
        [runOnJSLogFrame]
    )

    if (!hasPermission)
        return (
            <View style={styles.center}>
                <Button title="Grant Permission" onPress={requestPermission} />
            </View>
        )
    if (!device) return <View style={styles.container} />

    return (
        <View style={styles.container}>
            <Camera
                style={StyleSheet.absoluteFill}
                device={device}
                isActive={isFocused}
                frameProcessor={frameProcessor}
                pixelFormat="yuv"
            />

            {/* Visual Overlays for the User */}
            <View style={styles.overlayContainer}>
                <View
                    style={[
                        styles.drumZone,
                        activeDrum === 'LEFT' && styles.hit,
                    ]}
                >
                    <Text style={styles.label}>SNARE</Text>
                </View>
                <View
                    style={[
                        styles.drumZone,
                        activeDrum === 'RIGHT' && styles.hit,
                    ]}
                >
                    <Text style={styles.label}>KICK</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    overlayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        position: 'absolute',
        bottom: 50,
        width: '100%',
    },
    drumZone: {
        width: 120,
        height: 120,
        borderRadius: 60,
        borderWidth: 3,
        borderColor: 'white',
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    hit: {
        backgroundColor: 'rgba(255, 0, 0, 0.5)',
        transform: [{ scale: 1.2 }],
    },
    label: { color: 'white', fontWeight: 'bold' },
})
