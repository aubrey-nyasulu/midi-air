import { Image } from 'expo-image'
import { StyleSheet } from 'react-native'

import { HelloWave } from '@/src/components/hello-wave'
import ParallaxScrollView from '@/src/components/parallax-scroll-view'
import { ThemedText } from '@/src/components/themed-text'
import { ThemedView } from '@/src/components/themed-view'

export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }
        >
            <ThemedView style={styles.titleContainer}>
                <ThemedText onPress={() => console.log('pressed')} type="title">
                    Welcome!
                </ThemedText>
                <HelloWave />
            </ThemedView>
        </ParallaxScrollView>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
})
