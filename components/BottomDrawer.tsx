import React, { useCallback, useMemo, useRef, useState } from 'react';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

export default function BottomDrawer() {
  const snapPoints = useMemo(() => ['10%', '50%'], []);

  return (
    <BottomSheet
      index={0}
      snapPoints={snapPoints}
    >
      <View style={styles.contentContainer}>
        <Text>{"hello"}</Text>
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