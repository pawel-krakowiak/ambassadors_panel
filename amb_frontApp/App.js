import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated'

import { MotiView, MotiText } from 'moti'

export default function App() {

  return (
    <NavigationContainer>
      <MotiView className="flex-1 bg-gray-200 items-center justify-center"  >
        <MotiText from={{ scale: 0.5 }} animate={{ scale: 1 }} className="text-red-400">Hello world!</MotiText>
        <StatusBar style="auto" />
      </MotiView>
    </NavigationContainer>
  );
}


