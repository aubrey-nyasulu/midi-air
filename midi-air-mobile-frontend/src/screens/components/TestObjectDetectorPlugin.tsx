import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { testAsync } from 'react-native-vision-camera-object-tracker'

export default function TestObjectDetectorPlugin() {
    const [fromAsync, setFromAsync] = useState('default')

    useEffect(() => {
        const run = async () => {
            const value = await testAsync()

            setFromAsync(value)
        }

        run()
    }, [])

    return (
        <View style={styles.overlay} pointerEvents="none">
            <Text style={styles.label}>fromAsync</Text>
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
