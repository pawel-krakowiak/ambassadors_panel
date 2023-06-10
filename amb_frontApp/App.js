import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen';
import InfoScreen from './screens/InfoScreen/InfoScreen';
import PointsScreen from './screens/PointsScreen/PointsScreen';

export default function App() {
  const Stack = createNativeStackNavigator()
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Product" component={ProductScreen} options={{
          animation: 'slide_from_right',
        }}/>
        {/* <Stack.Screen name="Info" component={InfoScreen} options={{
          animation: 'slide_from_right',
        }}/> */}
        <Stack.Screen name="Points" component={PointsScreen} options={{
          animation: 'slide_from_right',
        }}/>
      </Stack.Navigator>

    </NavigationContainer>
  );
}


