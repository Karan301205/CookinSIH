import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { useTheme } from '../../theme';

export function TypingIndicator() {
  const { colors, radii } = useTheme();
  const dots = React.useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;

  React.useEffect(() => {
    const loops = dots.map((value) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(value, {
            toValue: 1,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
        ]),
      ),
    );

    const timeouts = loops.map((anim, index) =>
      setTimeout(() => {
        anim.start();
      }, index * 120),
    );
    return () => {
      loops.forEach((anim) => anim.stop());
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [dots]);

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: colors.muted,
          borderRadius: radii.xl,
          paddingHorizontal: 16,
          paddingVertical: 10,
          flexDirection: 'row',
        }}
      >
        {dots.map((value, index) => (
          <Animated.View
            key={index}
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: colors.mutedForeground,
              marginRight: index === dots.length - 1 ? 0 : 6,
              transform: [
                {
                  translateY: value.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -4],
                  }),
                },
              ],
            }}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    marginTop: 4,
  },
});
