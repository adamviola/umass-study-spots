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

  // on search or animate, recompute buildings and order
  const buildings = useRef(Object.keys(building_locations));

  const updateSearch = useCallback((text) => {
    setSearch(text);
    buildings.current = Object.keys(building_locations).filter((b) => b.toLowerCase().includes(text.toLowerCase()));
  }, []);

  const renderItem = ({ item} : {item: string}) => {
    return (
      <Pressable onPress={() => navigation.navigate('Building')}>
        <View style={styles.item}>
          <Text style={styles.text} >{item}</Text>
        </View>
      </Pressable>
    );
  }


  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onAnimate={(from, to) => to == 0 ? Keyboard.dismiss() : undefined}
    >
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder='Search for a building'
          onChangeText={updateSearch}
          value={search}
          clearButtonMode='always'
          onFocus={() => bottomSheetRef.current?.snapToIndex(1)}
        />
        <View style={styles.separator} />
        <FlatList
          style={{ height: '100%'}}
          data={buildings.current}
          renderItem={renderItem}
          keyExtractor={(item, index) => item}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    marginBottom: 22,
    borderWidth: 0,
    padding: 10,
    borderRadius: 8,
    marginTop: 0,
    backgroundColor: '#f3f3f3',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f3f3f3',
  },
  item: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 18,
    padding: 10,
  },
});