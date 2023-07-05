import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen'
import ProductScreen from './screens/ProductScreen/ProductScreen';
import HistoryScreen from './screens/HistoryScreen/HistoryScreen';
import UpdateScreen from './screens/UpdateScreen/UpdateScreen';
import PurchaseScreen from './screens/PurchaseScreen/PurchaseScreen';

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
        <Stack.Screen name="Purchase" component={PurchaseScreen} options={{
          animation: 'slide_from_right',
        }}/>
        <Stack.Screen name="History" component={HistoryScreen} options={{
          animation: 'slide_from_right',
        }}/>
        <Stack.Screen name="Update" component={UpdateScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}


