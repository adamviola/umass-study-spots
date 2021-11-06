import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Map from '../components/Map'

export default function RoomScreen() {
  return (
    <View style={styles.container}>
      <Text>{'room'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  }
});
