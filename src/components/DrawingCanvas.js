import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function DrawingCanvas({ strokeColor, strokeWidth, paths, setPaths }) {
  const [currentPath, setCurrentPath] = useState('');

  // Keep track of latest values using refs to avoid stale closures in PanResponder
  const currentPathRef = useRef('');
  const strokeColorRef = useRef(strokeColor);
  const strokeWidthRef = useRef(strokeWidth);

  // Update refs synchronously every render
  strokeColorRef.current = strokeColor;
  strokeWidthRef.current = strokeWidth;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPath = `M${locationX},${locationY}`;
        currentPathRef.current = newPath;
        setCurrentPath(newPath);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPath = `${currentPathRef.current} L${locationX},${locationY}`;
        currentPathRef.current = newPath;
        setCurrentPath(newPath);
      },
      onPanResponderRelease: () => {
        if (currentPathRef.current.trim() !== '') {
          setPaths((prevPaths) => [
            ...prevPaths,
            { path: currentPathRef.current, color: strokeColorRef.current, width: strokeWidthRef.current },
          ]);
          currentPathRef.current = '';
          setCurrentPath('');
        }
      },
    })
  ).current;

  return (
    <View style={styles.canvasContainer} {...panResponder.panHandlers}>
      <Svg style={styles.svg}>
        {paths.map((p, index) => (
          <Path
            key={index}
            d={p.path}
            stroke={p.color}
            strokeWidth={p.width}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {currentPath !== '' && (
          <Path
            d={currentPath}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  canvasContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  svg: {
    flex: 1,
  },
});
