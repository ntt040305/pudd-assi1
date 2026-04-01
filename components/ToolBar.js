import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function ToolBar({ onColorChange, onClear, colors, selectedColor }) {
  return (
    <View style={styles.toolbarContainer}>
      <View style={styles.colorPicker}>
        {colors.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorBox,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColorBox,
            ]}
            onPress={() => onColorChange(color)}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.clearButton} onPress={onClear}>
        <Text style={styles.clearText}>Clear</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: -10 },
    shadowRadius: 15,
    elevation: 20,
  },
  colorPicker: {
    flexDirection: 'row',
  },
  colorBox: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  selectedColorBox: {
    borderWidth: 3,
    borderColor: '#F8FAFC',
    transform: [{ scale: 1.15 }],
  },
  clearButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  clearText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
});
