import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

const MemoryGame = () => {
  const [cards, setCards] = useState<number[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<number[]>([]);
  const [moveCount, setMoveCount] = useState<number>(0);
  const [timer, setTimer] = useState<number>(0);
  const [isGameActive, setIsGameActive] = useState<boolean>(false);

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isGameActive) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isGameActive]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const initializeGame = () => {
    // 1'den 5'e kadar olan sayıları iki kez içeren bir dizi oluştur
    const numbers = [...Array(6)].map((_, index) => index + 1);
    const pairs = [...numbers, ...numbers];
    
    // Kartları karıştır
    const shuffled = pairs.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlippedIndices([]);
    setMatchedPairs([]);
    setMoveCount(0);
    setTimer(0);
    setIsGameActive(true);
  };

  const saveScore = async () => {
    try {
      // Mevcut skorları al
      const scoresString = await AsyncStorage.getItem('memoryGameScores');
      const scores = scoresString ? JSON.parse(scoresString) : [];
      
      // Yeni skoru ekle
      const newScore = {
        moves: moveCount,
        time: timer,
        date: new Date().toISOString(),
      };
      
      // Skorları güncelle ve kaydet
      const updatedScores = [...scores, newScore];
      await AsyncStorage.setItem('memoryGameScores', JSON.stringify(updatedScores));
    } catch (error) {
      console.error('Skor kaydedilirken hata oluştu:', error);
    }
  };

  const handleCardPress = (index: number) => {
    if (flippedIndices.includes(index) || matchedPairs.includes(index)) return;
    
    if (!isGameActive && moveCount === 0) {
      setIsGameActive(true);
    }
    
    setMoveCount(prev => prev + 1);
    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);

    if (newFlippedIndices.length === 2) {
      const [firstIndex, secondIndex] = newFlippedIndices;
      
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedPairs([...matchedPairs, firstIndex, secondIndex]);
        
        // Oyun bitti mi kontrol et
        if (matchedPairs.length + 2 === cards.length) {
          setIsGameActive(false);
          saveScore(); // Skoru kaydet
        }
      }
      
      setTimeout(() => {
        setFlippedIndices([]);
      }, 750);
    }
  };

  const isCardFlipped = (index: number) => {
    return flippedIndices.includes(index) || matchedPairs.includes(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.headerContainer}>
        <View style={styles.statsContainer}>
          <Text style={styles.statText}>Toplam Hamle: {moveCount}</Text>
          <Text style={styles.statText}>Süre: {formatTime(timer)}</Text>
          <TouchableOpacity 
            style={styles.resetButton}
            onPress={initializeGame}
          >
            <Ionicons name="refresh" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.grid}>
        {cards.map((card, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.card,
              isCardFlipped(index) && styles.cardFlipped,
            ]}
            onPress={() => handleCardPress(index)}
          >
            <Text style={styles.cardText}>
              {isCardFlipped(index) ? card : '?'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {matchedPairs.length === cards.length && (
        <View style={styles.winContainer}>
          <Text style={styles.winText}>Tebrikler! Oyunu Kazandınız!</Text>
          <Text style={styles.finalScore}>Toplam {moveCount} hamlede</Text>
          <Text style={styles.finalScore}>Süre {formatTime(timer)}'de tamamladınız!</Text>
          <TouchableOpacity 
            style={styles.restartButton}
            onPress={initializeGame}
          >
            <Text style={styles.restartButtonText}>Yeniden Başlat</Text>
          </TouchableOpacity>
        </View>
      )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    maxWidth: 350,
    alignSelf: 'center',
  },
  statsContainer: {
    gap: 10,
    alignItems: 'center',
  },
  statText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    lineHeight: 24,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
    marginTop: 20,
  },
  card: {
    width: (Dimensions.get('window').width - 60) / 4,
    height: (Dimensions.get('window').width - 60) / 4,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardFlipped: {
    backgroundColor: '#e3f2fd',
  },
  cardText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  winContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  winText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 8,
  },
  finalScore: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  restartButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  restartButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#FF5722',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginTop: 5,
  },
});

export default MemoryGame; 