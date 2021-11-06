import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import HomeScreen from './screens/HomeScreen';
import BuildingScreen from './screens/BuildingScreen';
import RoomScreen from './screens/RoomScreen';
import { DBContext, DBProvider } from './components/DBProvider';

const RootStack = createStackNavigator();

export default function App() {
  Location.requestForegroundPermissionsAsync()
  return (
    <DBProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Home" component={HomeScreen} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen name="Building" component={BuildingScreen} />
            <RootStack.Screen name="Room" component={RoomScreen} />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </DBProvider>
  );
}
