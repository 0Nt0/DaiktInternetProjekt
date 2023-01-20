import { StatusBar } from 'expo-status-bar';
import { useEffect, useState,useRef } from "react";
import { StyleSheet, Text, View, Animated  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';

import LogInScreen from './screens/LogInScreen';
import MainScreen from './screens/MainScreen';
import AddScreen from './screens/AddScreen';
import AddDriversOrAdminsScreen from './screens/AddDriversOrAdminsScreen';
import ProfileScreen from './screens/ProfileScreen';
import ItemsScreen from './screens/ItemsScree';
import AddDriverToOrderScreen from './screens/AddDriverToOrderScreen';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabScreens() {

  return (
    <Tab.Navigator >
      <Tab.Screen name="main" 
                  component={MainScreen}
                  options={{headerShown:false, 
                            tabBarShowLabel:false,
                            tabBarIcon:({focused,size})=>(
                              <Animated.View >
                              <Ionicons name={focused? "home":"home-outline"} color={focused? '#FF4B25':'#676766'} size={size} ></Ionicons>
                              </Animated.View>
                            )}}/>  
      <Tab.Screen name="add" 
                  component={AddScreen}
                  options={{headerShown:false, 
                            tabBarShowLabel:false,
                            tabBarIcon:({focused,size})=>(
                              <Animated.View >
                              <Ionicons name={focused?"add-circle-sharp":"add"} color={focused? '#FF4B25':'#676766'} size={size} ></Ionicons>
                              </Animated.View>
                            )}}/>
      <Tab.Screen name="addPerson" 
                  component={AddDriversOrAdminsScreen}
                  options={{headerShown:false, 
                            tabBarShowLabel:false,
                            tabBarIcon:({focused,size})=>(
                              <Animated.View >
                              <Ionicons name={focused?"person-add-sharp":"person-add-outline"} color={focused? '#FF4B25':'#676766'} size={size} ></Ionicons>
                              </Animated.View>
                            )}}/>  
      <Tab.Screen name="profile" 
                  component={ProfileScreen}
                  options={{headerShown:false, 
                            tabBarShowLabel:false,
                            tabBarIcon:({focused,size})=>(
                              <Animated.View >
                              <Ionicons name={focused?"md-person-circle":"md-person-circle-outline"} color={focused? '#FF4B25':'#676766'} size={size} ></Ionicons>
                              </Animated.View>
                            )}}/> 
      <Tab.Screen name="items" 
                  component={ItemsScreen}
                  options={{headerShown:false, 
                            tabBarShowLabel:false,
                            tabBarIcon:({focused,size})=>(
                              <Animated.View >
                              <Ionicons name={focused? "list-circle":"list-circle-outline"} color={focused? '#FF4B25':'#676766'} size={size} ></Ionicons>
                              </Animated.View>
                            )}}/> 
    </Tab.Navigator>
  )
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen 
                    name="login"
                    component={LogInScreen}
                    options={{headerShown:false}}/>
      <Stack.Screen 
                    name="Order"
                    component={AddDriverToOrderScreen}
                    options={{headerShown:false}}/>
      <Stack.Screen 
                    name="TabScreens"
                    component={TabScreens}
                    options={{headerShown:false}}/>
      
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
