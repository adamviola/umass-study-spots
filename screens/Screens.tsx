import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import BuildingScreen from './BuildingScreen';
import RoomScreen from './RoomScreen';
import { AntDesign } from '@expo/vector-icons'; 
import { FavoritesContext } from '../providers/FavoritesProvider';

const RootStack = createStackNavigator();

export default function Screens() {
  const [favorites, isFavorite, toggleFavorite] = useContext(FavoritesContext);

  return (
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
              const building = route.params.building;
              const room = route.params.room;
              return {
                title: route.params.building,
                headerRight: () => (
                  <AntDesign style={{marginRight: 12}} name={isFavorite(building, room) ? 'star' : 'staro'} size={24} color="#ffd700" onPress={() => toggleFavorite(building, room)} />
                ),
              }
            }}
          />
          <RootStack.Screen
            name="Room"
            component={RoomScreen}
            options={({navigation, route} : {navigation: any, route: any}) => {
              const building = route.params.building;
              const room = route.params.room;
              return {
                title: route.params.building + ', ' + route.params.room,
                headerRight: () => (
                  <AntDesign style={{marginRight: 12}} name={isFavorite(building, room) ? 'star' : 'staro'} size={24} color="#ffd700" onPress={() => toggleFavorite(building, room)} />
                ),
              }
            }}
          />
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
