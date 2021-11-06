import React from 'react';
import { StyleSheet, View } from 'react-native';
import BottomDrawer from '../components/BottomDrawer';
import Map from '../components/Map'


export default function HomeScreen({ navigation } : { navigation: any }) {
  const openBuilding = () => navigation.navigate('Building');

  return (
    <View style={styles.container}>
      <Map openBuilding={openBuilding} />
      <BottomDrawer navigation={navigation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
