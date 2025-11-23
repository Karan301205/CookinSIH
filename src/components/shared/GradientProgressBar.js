import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme';

export function GradientProgressBar({ value = 0, height = 8, accentKey = 'primary' }) {
  const { colors, radii } = useTheme();

  const percentage = Math.min(Math.max(value, 0), 100);
  const accent = colors[accentKey] ?? colors.primary;
  const secondary = accentKey === 'primary' ? colors.secondary : colors.accent;

  return (
    <View
      style={[
        styles.track,
        {
          height,
          borderRadius: radii.full,
          backgroundColor: colors.border,
        },
      ]}
    >
      <LinearGradient
        colors={[accent, secondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          width: `${percentage}%`,
          height,
          borderRadius: radii.full,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    width: '100%',
    overflow: 'hidden',
  },
});
