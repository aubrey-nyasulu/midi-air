import { StyleSheet, Text, View } from 'react-native'
import { helloKotlin } from 'react-native-vision-camera-object-tracker'

export default function TestObjectDetectorPlugin() {
    return (
        <View style={styles.overlay} pointerEvents="none">
            <Text style={styles.label}>
                MIDIAir Tracking: {helloKotlin('Aubrey')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 50,
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
    },
    label: { color: 'white', fontWeight: 'bold' },
})
