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

  const dbFile = Asset.fromModule(require('../assets/meetings.db'))
  const path = `${FileSystem.documentDirectory}SQLite/meetings.db`
  const dbCheck = await FileSystem.getInfoAsync(path, { md5: true });
  if (!dbCheck.exists) {
    console.log('db not found')
    await FileSystem.downloadAsync(dbFile.uri, path);
  } else if (dbCheck.md5 !== dbFile.hash) {
    console.log('new db found')
    await FileSystem.deleteAsync(path);
    await FileSystem.downloadAsync(dbFile.uri, path);
  };

  return SQLite.openDatabase('meetings.db');
}

export const DBContext = React.createContext<((q: string, callback: (results: any) => void) => void)>((q, callback) => callback([]));

export const DBProvider = ({ children } : { children: any }) => {
  const [database, setDatabase] = React.useState<WebSQLDatabase>();

  useEffect(() => { openDatabase().then(db => setDatabase(db)); }, []);

  const query = useCallback((q, callback) => {
    if (database) {
      database.transaction((tx: any) => {
        tx.executeSql(q, [], (transaction: any, results: any) => callback(results.rows._array), (tx: any, error: any) => console.log(error));
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