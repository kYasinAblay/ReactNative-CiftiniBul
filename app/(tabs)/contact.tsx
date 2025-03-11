import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ContactScreen = () => {
  const handleEmailPress = () => {
    Linking.openURL('mailto:kamilyasinablay@hotmail.com');
  };

  const handleGithubPress = () => {
    Linking.openURL('https://github.com/kYasinAblay');
  };

  const handleLinkedInPress = () => {
    Linking.openURL('https://www.linkedin.com/in/kamilyasinablay/');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>İletişim</Text>
      
      <View style={styles.contactContainer}>
        <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="mail" size={28} color="#FF5722" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.contactText}>E-posta</Text>
            <Text style={styles.contactDetail}>kamilyasinablay@hotmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleGithubPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-github" size={28} color="#333" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.contactText}>GitHub</Text>
            <Text style={styles.contactDetail}>@kYasinAblay</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={handleLinkedInPress}>
          <View style={styles.iconContainer}>
            <Ionicons name="logo-linkedin" size={28} color="#0077B5" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.contactText}>LinkedIn</Text>
            <Text style={styles.contactDetail}>Kamil Yasin Ablay</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.aboutContainer}>
        <Text style={styles.aboutTitle}>Hakkında</Text>
        <Text style={styles.aboutText}>
          Bu uygulama React Native ve Expo kullanılarak geliştirilmiştir. 
          Hafıza oyunu olarak tasarlanmış olup, kullanıcıların eğlenceli vakit 
          geçirmesini amaçlamaktadır.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  contactContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  iconContainer: {
    width: 40,
    alignItems: 'center',
    marginRight: 10,
    paddingTop: 3,
  },
  textContainer: {
    flex: 1,
  },
  contactText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  contactDetail: {
    fontSize: 14,
    color: '#666',
  },
  aboutContainer: {
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
});

export default ContactScreen; 