import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetFlatList, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Dimensions, StyleSheet, Text, View, TextInput, FlatList, Keyboard, TouchableNativeFeedback, Pressable } from 'react-native';
import { building_locations } from './Map';
import * as Location from 'expo-location';
import { TouchableHighlight } from 'react-native-gesture-handler';

export default function BottomDrawer({ navigation } : { navigation: any}) {
  const snapPoints = useMemo(() => [40 + 20 + 24, '90%'], []);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [search, setSearch] = useState('');
  const drawerIndex = useRef(0);

  // on search or animate, recompute buildings and order
  const buildings = useRef(Object.keys(building_locations));

  const updateSearch = useCallback((text) => {
    setSearch(text);
    buildings.current = Object.keys(building_locations).filter((b) => b.toLowerCase().includes(text.toLowerCase()));
  }, []);

  const renderItem = ({ item, index } : {item: string, index: number}) => {
    var style = styles.item;
    if (index === 0)
      style = { ...style, ...styles.firstItem };
    if (index === buildings.current.length - 1)
      style = { ...style, ...styles.lastItem,};
    

    return (
      <Pressable onPress={() => navigation.navigate('Building', { building: item })}>
        <View style={style}>
          <Text style={styles.text} >{item}</Text>
        </View>
      </Pressable>
    );
  }

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={drawerIndex.current}
      snapPoints={snapPoints}
      backgroundStyle={{backgroundColor: '#F4F4F4'}}
      onAnimate={(from, to) =>  {
        drawerIndex.current = to;
        if (to === 0)
          Keyboard.dismiss();
      }}
    >
      <View>
        <TextInput
          style={styles.input}
          placeholder='Search for a building'
          onChangeText={updateSearch}
          value={search}
          clearButtonMode='always'
          onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
        />
        <FlatList
          style={styles.list}
          data={buildings.current}
          renderItem={renderItem}
          keyExtractor={(item, index) => item}
          initialNumToRender={20}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '90%',
    marginLeft: '5%',
    marginBottom: 22,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white'
    // backgroundColor: '#f2f2f2',
  },
  item: {
    width: '90%',
    marginLeft: '5%',
    marginBottom: 1,
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white'
  },
  firstItem: {
    // marginTop: Dimensions.get('window').width * 0.05,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
  },
  lastItem: {
    marginBottom: Dimensions.get('window').width * 0.05,
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  text: {
    fontSize: 18,
    padding: 16,
  },
  list: {
    height: Dimensions.get('window').height * 0.9 - 40 - 24 - 20
    // backgroundColor: '#f2f2f2'
  }
});