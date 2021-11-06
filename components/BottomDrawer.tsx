import React, { useCallback, useContext, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Button, Dimensions, StyleSheet, Text, View } from 'react-native';
import { DBContext } from './DBProvider';

export default function BottomDrawer() {
  const snapPoints = useMemo(() => ['10%', '50%'], []);

  const query = useContext(DBContext);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.contentContainer}>
        <Text>{"hello"}</Text>
        <Button title={'press'} onPress={() => query('SELECT * FROM "meetings" WHERE building = "Skinner Hall"', results => console.log(results))} />
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});