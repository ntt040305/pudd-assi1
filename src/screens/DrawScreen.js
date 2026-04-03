import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawingCanvas from '../components/DrawingCanvas';
import ToolBar from '../components/ToolBar';
import CustomButton from '../components/CustomButton';

// Modern neon palette targeting dark theme
const COLORS = ['#F8FAFC', '#F43F5E', '#10B981', '#38BDF8', '#F59E0B', '#8B5CF6'];

export default function DrawScreen({ navigation }) {
  const [paths, setPaths] = useState([]);
  const [strokeColor, setStrokeColor] = useState(COLORS[0]);
  const strokeWidth = 6;

  const handleClear = () => {
    setPaths([]);
  };

  const handleSave = async () => {
    if (paths.length === 0) {
      Alert.alert('Empty Canvas', 'Please draw something before saving.');
      return;
    }

    try {
      const newDrawing = {
        id: Date.now().toString(),
        paths: paths,
        mainColor: paths[0].color,
        strokeWidth: strokeWidth,
        strokeCount: paths.length,
      };

      const existingData = await AsyncStorage.getItem('drawings');
      const drawings = existingData ? JSON.parse(existingData) : [];
      drawings.push(newDrawing);

      await AsyncStorage.setItem('drawings', JSON.stringify(drawings));
      
      Alert.alert('Masterpiece Saved!', 'Your drawing is waiting in the gallery.', [
        { text: 'Awesome', onPress: () => navigation.navigate('Tabs', { screen: 'Gallery' }) }
      ]);
      setPaths([]); 
    } catch (error) {
      Alert.alert('Error', 'Failed to save drawing.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.canvasWrapper}>
        <DrawingCanvas
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
          paths={paths}
          setPaths={setPaths}
        />
      </View>
      <View style={styles.bottomControls}>
        <ToolBar
          colors={COLORS}
          selectedColor={strokeColor}
          onColorChange={setStrokeColor}
          onClear={handleClear}
        />
        <View style={styles.saveBtnContainer}>
           <CustomButton
             title="Save & Export"
             onPress={handleSave}
             style={styles.saveButton}
             textStyle={styles.saveButtonText}
           />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  canvasWrapper: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bottomControls: {
    backgroundColor: 'transparent',
  },
  saveBtnContainer: {
    paddingHorizontal: 20,
    backgroundColor: '#0F172A',
    paddingBottom: 25,
  },
  saveButton: {
    marginTop: 0,
    backgroundColor: '#38BDF8',
  },
  saveButtonText: {
    color: '#0F172A',
    fontWeight: '900',
  },
});
