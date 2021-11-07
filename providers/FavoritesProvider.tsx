import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as FileSystem from 'expo-file-system';

async function readFavorites() {
  if ((await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'favorites.txt')).exists)
    return JSON.parse(await FileSystem.readAsStringAsync(FileSystem.documentDirectory + 'favorites.txt'));
}

export const FavoritesContext = React.createContext<[string[], (building: string, room: string) => boolean, (building: string, room: string) => void]>([[], (building, room) => false, (building, room) => {}]);

export const FavoritesProvider = ({ children } : { children: any }) => {
  const [favorites, setFavorites] = React.useState<string[]>(['Integ. Learning Center;S211']);

  useEffect(() => {
    readFavorites().then(favorites => { 
      if (favorites)
        setFavorites(favorites);
    });
  }, []);

  const isFavorite = (building: string, room: string) => favorites.includes(`${building};${room}`);

  const toggleFavorite = (building: string, room: string) => {
    const value = `${building};${room}`;
    const index = favorites.indexOf(value);
    let newFavorites;
    if (index === -1) {
      newFavorites = [...favorites, value];
    } else {
      newFavorites = favorites.filter((favorite) => favorite !== value)
    }
    FileSystem.writeAsStringAsync(FileSystem.documentDirectory + 'favorites.txt', JSON.stringify(newFavorites));
    setFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={[favorites, isFavorite, toggleFavorite]}>
    	{ children }
    </FavoritesContext.Provider>
  )
}

