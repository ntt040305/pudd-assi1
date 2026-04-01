import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeText}>APP DESIGN</Text>
      </View>
      <Text style={styles.title}>Welcome To</Text>
      <Text style={styles.subtitle}>Studio</Text>
      <Text style={styles.description}>
        An immersive neo-canvas aesthetic to sketch, paint, and save your minimalistic artwork beautifully.
      </Text>
      
      <View style={styles.buttonContainer}>
        <CustomButton
          title="Create New Art"
          onPress={() => navigation.navigate('Draw')}
        />
        <CustomButton
          title="View Gallery"
          onPress={() => navigation.navigate('Gallery')}
          style={styles.galleryButton}
          textStyle={styles.galleryText}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#0F172A',
  },
  badgeContainer: {
    backgroundColor: '#1E293B',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 999,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  badgeText: {
    color: '#38BDF8',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 26,
    fontWeight: '300',
    color: '#94A3B8',
    marginBottom: -5,
  },
  subtitle: {
    fontSize: 56,
    fontWeight: '900',
    color: '#F8FAFC',
    marginBottom: 20,
    letterSpacing: -1,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 50,
    color: '#64748B',
    lineHeight: 26,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    width: '100%',
    gap: 5,
  },
  galleryButton: {
    backgroundColor: '#1E293B',
    shadowColor: 'transparent',
    elevation: 0,
    borderWidth: 1,
    borderColor: '#334155',
  },
  galleryText: {
    color: '#94A3B8',
  },
});
