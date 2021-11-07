import React from 'react';
import * as Location from 'expo-location';
import { DBProvider } from './providers/DBProvider';
import { FavoritesProvider } from './providers/FavoritesProvider';
import Screens from './screens/Screens';

export default function App() {
  Location.requestForegroundPermissionsAsync();

  return (
    <DBProvider>
      <FavoritesProvider>
        <Screens />
      </FavoritesProvider>
    </DBProvider>
  );
}
