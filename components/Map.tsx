import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';

export default function Map() {
    return (
        <MapView
          style={styles.map}
          // provider='google'
          initialRegion={{
            latitude: 42.389749539564725,
            longitude: -72.5282764169471,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0421,
          }}
          showsUserLocation={true}
          showsCompass={true}
          showsPointsOfInterest={false}
          showsBuildings={true}
          showsIndoors={false}
          rotateEnabled={false}
          pitchEnabled={false}
          minZoomLevel={13}
        >
        </MapView>
    );
  }
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});