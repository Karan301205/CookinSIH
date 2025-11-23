import React from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

export function ToggleSwitch({ value, onValueChange }) {
  const { colors } = useTheme();
  const knobTranslate = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.timing(knobTranslate, {
      toValue: value ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [value, knobTranslate]);

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      onPress={() => onValueChange?.(!value)}
      style={[
        styles.track,
        {
          backgroundColor: value ? colors.primary : colors.muted,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.knob,
          {
            backgroundColor: value ? colors.primaryForeground : '#FFFFFF',
            transform: [
              {
                translateX: knobTranslate.interpolate({
                  inputRange: [0, 1],
                  outputRange: [2, 18],
                }),
              },
            ],
          },
        ]}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  track: {
    width: 42,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
  },
  knob: {
    width: 22,
    height: 22,
    borderRadius: 11,
  },
});
