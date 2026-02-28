import { Tabs } from 'expo-router'

import { HapticTab } from '@/src/components/haptic-tab'
import { IconSymbol } from '@/src/components/ui/icon-symbol'
import { Colors } from '@/src/constants/theme'
import { useColorScheme } from '@/src/hooks/use-color-scheme'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol size={28} name="house.fill" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="playscreenroute"
                options={{
                    title: 'Play',
                    tabBarIcon: ({ color }) => (
                        <IconSymbol
                            size={28}
                            name="play.square.fill"
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    )
}
