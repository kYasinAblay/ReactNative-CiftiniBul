import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Score {
  moves: number;
  time: number;
  date: string;
}

const ScoresScreen = () => {
  const [scores, setScores] = useState<Score[]>([]);

  useEffect(() => {
    loadScores();
  }, []);

  const loadScores = async () => {
    try {
      const scoresString = await AsyncStorage.getItem('memoryGameScores');
      if (scoresString) {
        const scoresData = JSON.parse(scoresString);
        // Skorları hamle sayısına göre sıralayalım
        const sortedScores = scoresData.sort((a: Score, b: Score) => a.moves - b.moves);
        setScores(sortedScores);
      }
    } catch (error) {
      console.error('Skorlar yüklenirken hata oluştu:', error);
    }
  };

  const deleteScore = async (index: number) => {
    try {
      const newScores = scores.filter((_, i) => i !== index);
      await AsyncStorage.setItem('memoryGameScores', JSON.stringify(newScores));
      setScores(newScores);
    } catch (error) {
      console.error('Skor silinirken hata oluştu:', error);
    }
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const renderScoreItem = ({ item, index }: { item: Score; index: number }) => (
    <View style={styles.scoreItem}>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteScore(index)}
      >
        <Ionicons name="close" size={20} color="#FF5722" />
      </TouchableOpacity>
      <Text style={styles.rank}>#{index + 1}</Text>
      <View style={styles.scoreDetails}>
        <Text style={styles.scoreText}>{item.moves} Hamle</Text>
        <Text style={styles.scoreText}>{formatTime(item.time)} Süre</Text>
        <Text style={styles.dateText}>{new Date(item.date).toLocaleDateString('tr-TR')}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skorlarım</Text>
      {scores.length > 0 ? (
        <FlatList
          data={scores}
          renderItem={renderScoreItem}
          keyExtractor={(_, index) => index.toString()}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <Text style={styles.noScoreText}>Henüz skor kaydedilmedi</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop:50,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    alignItems: 'center',
  },
  deleteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    width: 24,
    height: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginRight: 15,
    width: 40,
  },
  scoreDetails: {
    flex: 1,
  },
  scoreText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
  },
  noScoreText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ScoresScreen; 