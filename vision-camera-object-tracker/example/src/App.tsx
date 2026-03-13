import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import {
  helloKotlin,
} from 'react-native-vision-camera-object-tracker';

export default function App() {
  const [greeting, setGreeting] = useState('Hello from React!')

  useEffect(() => {
    const greetingFromKotlin = helloKotlin('Aubrey')

    setGreeting(greetingFromKotlin)
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{greeting}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { color: 'red' },
});
