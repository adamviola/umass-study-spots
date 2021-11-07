import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Location from 'expo-location';
import HomeScreen from './screens/HomeScreen';
import BuildingScreen from './screens/BuildingScreen';
import RoomScreen from './screens/RoomScreen';
import { DBContext, DBProvider } from './components/DBProvider';
import { AntDesign } from '@expo/vector-icons'; 

const RootStack = createStackNavigator();

export default function App() {
  Location.requestForegroundPermissionsAsync();
  return (
    <DBProvider>
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Group screenOptions={{ headerShown: false }}>
            <RootStack.Screen name="Home" component={HomeScreen} options={{ title: "" }} />
          </RootStack.Group>
          <RootStack.Group screenOptions={{ presentation: 'modal' }}>
            <RootStack.Screen
              name="Building"
              component={BuildingScreen}
              options={({navigation, route} : {navigation: any, route: any}) => {
                return {
                  title: route.params.building,
                  headerRight: () => (
                    <AntDesign style={{marginRight: '5%'}} name="star" size={24} color="#ffd700" onPress={() => console.log('lmao')} />
                  ),
                }
              }}
            />
            <RootStack.Screen
              name="Room"
              component={RoomScreen}
              options={({navigation, route} : {navigation: any, route: any}) => {
                return {
                  title: route.params.building + ', ' + route.params.room,
                  // headerRight: () => (
                  //   <AntDesign style={{marginRight: '5%'}} name="star" size={24} color="#ffd700" onPress={() => console.log('lmao')} />
                  // ),
                }
              }}
            />
          </RootStack.Group>
        </RootStack.Navigator>
      </NavigationContainer>
    </DBProvider>
  );
}
