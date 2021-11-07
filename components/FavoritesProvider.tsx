// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { Button, StyleSheet, Text, View } from 'react-native';

// import * as FileSystem from 'expo-file-system';
// import { Asset } from 'expo-asset';

// import * as SQLite from 'expo-sqlite';
// import { WebSQLDatabase } from 'expo-sqlite';

// export const FavoritesContext = React.createContext<[() => boolean, (building: string, room: string) => void]>([() => false, (building, room) => {}]);

// export const FavoritesProvider = ({ children } : { children: any }) => {
//   // const [favorites, setFavorites] = React.useState<{ building: string, room: string }[]>({});

//   const isFavorite = useCallback


//   const toggleFavorite = useCallback((building, room) => {
//     for (let i = 0; i < favorites.length; i++) {
//       if (favorites[i].building === building && favorites[i].room === room) {
//         favorites.splice(i, 1);
//         setFavorites([...favorites]);
//         return;
//       }
//     }
//     setFavorites([...favorites, { building, room }]);
//   }, []);

//   return (
//     <FavoritesContext.Provider value={[toggleFavorite]}>
//     	{ children }
//     </FavoritesContext.Provider>
//   )
// }

