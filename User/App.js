import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/loginscreen';
import AdScreen from './screens/adscreen';
import OrderAd from './screens/orderscreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      >
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: "Prisijungimo langas"}}
          />
          <Stack.Screen
            name="AdScreen"
            component={AdScreen}
            options={{title: "Pagrindinis langas"}}
          />
          <Stack.Screen
            name="OrderScreen"
            component={OrderAd}
            options={{title: "Pirkimo langas"}}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/*

*/