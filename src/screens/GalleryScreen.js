import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

const SVG_VIEWBOX = `0 0 ${width} 800`;

export default function GalleryScreen() {
  const [drawings, setDrawings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadDrawings = async () => {
        try {
          const data = await AsyncStorage.getItem('drawings');
          if (data) {
             // Show newest drawings at top
            setDrawings(JSON.parse(data).reverse());
          } else {
            setDrawings([]);
          }
        } catch (error) {
          console.error('Failed to load drawings', error);
        }
      };
      loadDrawings();
    }, [])
  );

  const clearGallery = async () => {
    try {
      await AsyncStorage.setItem('drawings', JSON.stringify([]));
      setDrawings([]);
    } catch (error) {
      console.error('Failed to clear gallery', error);
      Alert.alert('Error', 'Failed to delete gallery.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.thumbnailContainer}>
        {item.paths && item.paths.length > 0 ? (
          <Svg width="100%" height="100%" viewBox={SVG_VIEWBOX}>
            {item.paths.map((p, index) => (
              <Path
                key={index}
                d={p.path}
                stroke={p.color}
                strokeWidth={p.width * 2} // visually boost thickness for the mini thumbnail
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </Svg>
        ) : (
          <Text style={styles.emptyText}>Empty</Text>
        )}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.cardId}>Canvas #{item.id.slice(-5)}</Text>
        <Text style={styles.cardDetail}>
          Color: <Text style={styles.mainColorText}>{item.mainColor}</Text>
        </Text>
        <Text style={styles.cardDetail}>Thickness: {item.strokeWidth}</Text>
        <Text style={styles.cardDetail}>Total Strokes: {item.strokeCount}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {drawings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your gallery is empty.</Text>
          <Text style={styles.emptySubText}>Draw something beautiful!</Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={drawings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {drawings.length > 0 && (
        <View style={styles.footer}>
          <CustomButton
            title="Delete Gallery"
            onPress={clearGallery}
            style={styles.wipeButton}
            textStyle={styles.wipeButtonText}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  list: {
    flex: 1,
  },
  listContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#1E293B',
    borderRadius: 24,
    marginBottom: 20,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 5,
  },
  thumbnailContainer: {
    width: 120,
    height: 140,
    backgroundColor: '#0F172A',
    borderRightWidth: 1,
    borderColor: '#334155',
  },
  detailsContainer: {
    flex: 1,
    padding: 18,
    justifyContent: 'center',
  },
  cardId: {
    fontSize: 18,
    color: '#F8FAFC',
    fontWeight: '900',
    marginBottom: 10,
    letterSpacing: 0.5,
  },
  cardDetail: {
    fontSize: 14,
    color: '#94A3B8',
    marginBottom: 6,
    fontWeight: '600',
  },
  mainColorText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 15,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 5,
  },
  emptySubText: {
    fontSize: 15,
    color: '#64748B',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    paddingTop: 4,
  },
  wipeButton: {
    backgroundColor: '#EF4444',
    shadowColor: '#EF4444',
  },
  wipeButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
});
