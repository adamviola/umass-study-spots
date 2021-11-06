import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const building_locations = {
  'Integ. Learning Center': {
    latitude: 42.39097186929115,
    longitude: -72.52587529127199
  }
}

export default function Map({ openBuilding } : { openBuilding: () => void }) {
  const [showText, setShowText] = useState(true);
  const zoomThreshold = 0.01;

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
        onRegionChange={region => {
          if (showText && region.latitudeDelta > zoomThreshold)
            setShowText(false);
          else if (!showText && region.latitudeDelta <= zoomThreshold)
            setShowText(true);
          }
        }
      >
        {Object.entries(building_locations).map(([building, location], index) => (
          <Marker
            key={index}
            coordinate={location}
            title={building}
            description={'blah'}
            onPress={openBuilding}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '50%' }}></View>
              <Image
                style={styles.markerImage}
                source={{
                  uri: 'https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png',
                }}
              />
              {showText ? <Text style={{ paddingLeft: 5}}>{building}</Text> : null}
              <Callout tooltip={true} /> 
              
            </View>
          </Marker>
        ))}
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
  markerImage: {
    width: 20,
    height: 20,
  },
});
