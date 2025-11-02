import { Image, StyleSheet, Platform ,View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
