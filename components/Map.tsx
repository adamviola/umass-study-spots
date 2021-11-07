import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View, Image } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';

export const building_locations = {
  '358 North Pleasant St': { latitude: 42.38276595572954, longitude: -72.52081439382047 },
    'Ag. Engin. Bldg Annex B': { latitude: 42.39221267518042, longitude: -72.53104355442055 },
    'Ag. Engineering Bldg': { latitude: 42.391921330363225, longitude: -72.531113169045 }, 
    'Arnold': { latitude: 42.39446716992463, longitude: -72.52608797403809 },
    'Astronomy Building': { latitude: 42.39481473246695, longitude: -72.52977514519507 },
    'Bartlett Hall': { latitude: 42.38803758816218, longitude: -72.52877408128752 },
    'Bowditch Hall': { latitude: 42.3926662505191, longitude: -72.53192159155594 },
    'Boyden': { latitude: 42.386397489490605, longitude: -72.53050608671019 },
    'Bromery Center for Arts': { latitude: 42.38829504122949, longitude: -72.52584091894776 },
    'Campus Center': { latitude: 42.391769971180246, longitude: -72.5269840354808 },
    'Chenoweth Lab': { latitude: 42.39160645047634, longitude: -72.53025298189752 },
    'Chenoweth Lab Addition': { latitude: 42.3921632474961, longitude: -72.5304037628501 },
    'Computer Science Bldg': { latitude: 42.39512500860576, longitude: -72.53119491993716 },
    'Conte Polymer Res Ctr': { latitude: 42.39435280375224, longitude: -72.52798005685115 },
    'Crotty Hall': { latitude: 42.38444723938744, longitude: -72.52167534173321 },
    'Dickinson Hall': { latitude: 42.38907645256476, longitude: -72.53043129248917 },
    'Draper Hall': { latitude: 42.392260437177356, longitude: -72.528377392508 },
    'Du Bois Library': { latitude: 42.38975474645179, longitude: -72.5282720141426 },
    'Duda': { latitude: 42.394435118904795, longitude: -72.5303224329911 },
    'Elm': { latitude: 42.38803963835986, longitude: -72.53009303305971 },
    'Emerson': { latitude: 42.38346122134359, longitude: -72.53115627325268 },
    'Engineering Lab II': { latitude: 42.39434855609958, longitude: -72.53116061839128 },
    'Engineering Laboratory': { latitude: 42.394800300734936, longitude: -72.53039065384223 },
    'Fernald Hall': { latitude: 42.38853447848798, longitude: -72.52237700331821 },
    'Flint Laboratory': { latitude: 42.39168001057879, longitude: -72.52964628035403 },
    'French Hall': { latitude: 42.38992443887728, longitude: -72.52295871638619 },
    'Furcolo Hall': { latitude: 42.39821686599901, longitude: -72.52655162874296 },
    'George Parks Bldg': { latitude: 42.38965891132617, longitude: -72.53066673127101 },
    'Goessmann Lab Addition': { latitude: 42.39330383061884, longitude: -72.52758593816121 },
    'Goessmann Laboratory': { latitude: 42.39287082485644, longitude: -72.5273510187205 },
    'Goodell': { latitude: 42.388732782315834, longitude: -72.52922984120569 },
    'Gunness Laboratory': { latitude: 42.39453365108282, longitude: -72.52964650177654 },
    'Hasbrouck Lab Add': { latitude: 42.39183629941293, longitude: -72.5258154080682 },
    'Hasbrouck Laboratory': { latitude: 42.39213869562465, longitude: -72.52597390330052 },
    'Herter Hall': { latitude: 42.387254708399716, longitude: -72.52715005629506 },
    'Holdsworth Hall': { latitude: 42.392900587385576, longitude: -72.53088478497955 },
    'Honors College Bldg': { latitude: 42.38822292234079, longitude: -72.53054366038461 },
    'Integ. Learning Center': { latitude: 42.39095989701627, longitude: -72.52602903372508 },
    'Integ. Lrng Cntr TV Studio': { latitude: 42.39091136481255, longitude: -72.52563086821537 },
    'Integrated Sciences Bldg': { latitude:  42.39229033483435, longitude: -72.52497441062756 },
    'James House': { latitude: 42.3841471106763, longitude: -72.53119713609684 },
    'John Olver Design Bldg': { latitude: 42.38821534042515, longitude: -72.5234700823853 },
    'Kennedy House': { latitude: 42.38406702477076, longitude: -72.52961797115094 },
    'Lederle Grad Res Ctr': { latitude: 42.39441791843795, longitude: -72.52706943634699 },
    'Lederle Grad Res Tower': { latitude: 42.393879078995035, longitude: -72.52764008731232 },
    'Life Sciences Lab': { latitude: 42.39203533971196, longitude: -72.52376230909692 },
    'Machmer Hall': { latitude: 42.39032411596625, longitude: -72.52894482754586 },
    'Mahar': { latitude: 42.38659860447189, longitude: -72.52423166665847 },
    'Marcus Hall': { latitude: 42.393949093070994, longitude: -72.528580618569 },
    'Marston Hall': { latitude: 42.39399837820451, longitude: -72.52935542319086 },
    'Melville': { latitude: 42.38471088382542, longitude: -72.53080844485473 },
    'Moore House': { latitude: 42.38199982025355, longitude: -72.53078953994826 },
    'Morrill Sci. Ctr. (I)': { latitude: 42.390885757872844, longitude: -72.52417969645941 },
    'Morrill Sci. Ctr. (II)': { latitude: 42.38980525799023, longitude: -72.52447843005028 },
    'Morrill Sci. Ctr. (III)': { latitude: 42.38931366146969, longitude: -72.5243371473531 }, 
    'Morrill Sci. Ctr. (IV)': { latitude: 42.3907722078521, longitude: -72.52466680697306 },
    'New Africa House': { latitude: 42.388929514147144, longitude: -72.52068537876146 },
    'Noah Webster House': { latitude: 42.391513383743806, longitude: -72.51967662276944 },
    'Paige Laboratory': { latitude: 42.39333705881257, longitude: -72.5298725186727 },
    'Pierpont House': { latitude: 42.38140667537193, longitude: -72.53072341614163 },
    'Research & Educ Greenhouse': { latitude: 42.39221533794716, longitude: -72.53186943814265 },
    'School of Management': { latitude: 42.386911066942645, longitude: -72.52490992901433 },
    'Skinner Hall': { latitude: 42.39156727086791, longitude: -72.52480152902646 },
    'South College': { latitude: 42.38955926272055, longitude: -72.52939239529991},
    'Stockbridge Hall': { latitude: 42.39222688932035, longitude: -72.5295120638681 },
    'Studio Arts Building': { latitude: 42.387555197797155, longitude: -72.52270733028975 },
    'Thompson Hall': { latitude: 42.390003626345994, longitude: -72.52996144252779 },
    'Tobin Hall': { latitude: 42.38751299384624, longitude: -72.52956798933934 },
    'Totman Phys. Ed. Bldg.': { latitude: 42.39612299245814, longitude: -72.52596591351633 },
    'Van Meter House': { latitude: 42.38986384938876, longitude: -72.51837958580205 },
    'Wheeler Hall': { latitude: 42.38887465091615, longitude: -72.52130022460402 },
}

export default function Map({ openBuilding } : { openBuilding: (building: string) => void }) {
  const [showText, setShowText] = useState(true);
  const zoomThreshold = 0.008;

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
        minZoomLevel={15}
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
            onPress={() => openBuilding(building)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '50%' }}></View>
              
              {/* <Image
                style={styles.markerImage}
                source={{
                  uri: 'https://www.iconpacks.net/icons/1/free-building-icon-1062-thumb.png',
                }}
              /> */}
              <FontAwesome5 name="building" size={18} color="black" />
              {showText ? <Text style={{ paddingLeft: 5}}>{building}</Text> : null}
            </View>
            <Callout tooltip={true} /> 
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
