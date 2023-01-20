import React from 'react';

import {
    NavigationContainer
} from '@react-navigation/native';

import {
    createNativeStackNavigator
} from '@react-navigation/native-stack';

import LoginPage from './src/screen/stack/LoginPage';
import OrderPage from './src/screen/stack/OrderPage';
import InfoPage from './src/screen/stack/InfoPage';

const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={LoginPage}>
                <Stack.Screen
                    name="Login"
                    options={{ title: 'Login page', headerShown: false }}
                    component={LoginPage}
                />

                <Stack.Screen
                    name="Order"
                    options={{ title: 'Order page', headerShown: false }}
                    component={OrderPage}
                />

                <Stack.Screen
                    name="Info"
                    options={{ title: 'Info page', headerShown: false }}
                    component={InfoPage}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
