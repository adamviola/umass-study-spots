import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import * as SQLite from 'expo-sqlite';
import { WebSQLDatabase } from 'expo-sqlite';

async function openDatabase(): Promise<SQLite.WebSQLDatabase> {
  // Only create document directory if it doesn't already exist
  if (!(await FileSystem.getInfoAsync(FileSystem.documentDirectory + 'SQLite')).exists) {
    await FileSystem.makeDirectoryAsync(FileSystem.documentDirectory + 'SQLite');
  }

  // Only load move database to document directory if it doesn't exist
  if (!(await FileSystem.getInfoAsync(`${FileSystem.documentDirectory}SQLite/meetings.db`)).exists) {
    await FileSystem.downloadAsync(
      Asset.fromModule(require('../assets/meetings.db')).uri,
      FileSystem.documentDirectory + 'SQLite/meetings.db'
    );
  }

  return SQLite.openDatabase('meetings.db');
}

export const DBContext = React.createContext<((q: string, callback: (results: any) => void) => void)>((q, callback) => callback([]));

export const DBProvider = ({ children } : { children: any }) => {
  const [database, setDatabase] = React.useState<WebSQLDatabase>();

  useEffect(() => { openDatabase().then(db => setDatabase(db)); }, []);

  const query = useCallback((q, callback) => {
    if (database) {
      database.transaction((tx: any) => {
        tx.executeSql(q, [], (transaction: any, results: any) => callback(results.rows._array));
      });
    } else {
      callback([]);
    }
  }, [database]);

  return (
    <DBContext.Provider value={query}>
    	{ children }
    </DBContext.Provider>
  )
}