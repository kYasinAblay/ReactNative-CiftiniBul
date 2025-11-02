import React from 'react';
import { Image, StyleSheet, Platform ,View} from 'react-native';

import MemoryGame from '../memory-game';

export default function HomeScreen() {
  return (
   <View style={styles.container}>
      <MemoryGame />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    padding: 20,
    paddingTop:50,
    backgroundColor: '#f5f5f5',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
