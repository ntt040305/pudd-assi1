import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import Svg, { Path } from 'react-native-svg';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');
const SVG_VIEWBOX = `0 0 ${width} 800`;

export default function HomeScreen({ navigation }) {
  const [drawings, setDrawings] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const loadDrawings = async () => {
        try {
          const data = await AsyncStorage.getItem('drawings');
          setDrawings(data ? JSON.parse(data).reverse() : []);
        } catch (error) {
          console.error('Failed to load drawings on Home', error);
        }
      };

      loadDrawings();
    }, [])
  );

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
                strokeWidth={p.width * 2}
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </Svg>
        ) : (
          <Text style={styles.thumbnailEmptyText}>Empty</Text>
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
          <Text style={styles.emptyTitle}>No gallery yet</Text>
          <Text style={styles.emptySubText}>Start drawing to create your first gallery item.</Text>
        </View>
      ) : (
        <FlatList
          data={drawings}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Bắt đầu vẽ"
          onPress={() => navigation.navigate('Draw')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  listContainer: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 120,
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
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingHorizontal: 24,
  },
  emptyTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#F8FAFC',
    marginBottom: 6,
  },
  emptySubText: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  thumbnailEmptyText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F8FAFC',
  },
  buttonContainer: {
    position: 'absolute',
    left: 20,
    right: 20,
    bottom: 20,
  },
});
