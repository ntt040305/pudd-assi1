import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, style, textStyle }) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles.button, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#38BDF8',
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderRadius: 999, // Pill shape
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
    shadowColor: '#38BDF8',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 6,
  },
  text: {
    color: '#0F172A',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
