import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';

export function WelcomeBanner({ name = 'Alex', streak = 12 }) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <LinearGradient
      colors={[applyAlpha(colors.primary, 0.2), applyAlpha(colors.secondary, 0.15)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.container, { borderRadius: radii.xl, padding: spacing.xl }]}
    >
      <View
        style={[
          styles.inner,
          {
            borderColor: applyAlpha(colors.primary, 0.2),
            borderRadius: radii.xl,
            padding: spacing.lg,
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <Text
              style={[
                styles.greeting,
                {
                  color: colors.mutedForeground,
                  fontFamily: typography.family,
                  fontWeight: typography.weightMedium,
                },
              ]}
            >
              Welcome back,
            </Text>
            <Text
              style={[
                styles.name,
                {
                  color: colors.foreground,
                  fontFamily: typography.family,
                  fontWeight: typography.weightBold,
                },
              ]}
            >
              {name}!
            </Text>
          </View>
          <View
            style={[
              styles.initialWrapper,
              {
                backgroundColor: applyAlpha(colors.primary, 0.25),
                borderRadius: radii.lg,
              },
            ]}
          >
            <View
              style={[
                styles.initial,
                {
                  backgroundColor: colors.primary,
                  borderRadius: radii.md,
                },
              ]}
            >
              <Text
                style={{
                  color: colors.primaryForeground,
                  fontFamily: typography.family,
                  fontWeight: typography.weightBold,
                  fontSize: 16,
                }}
              >
                {name.slice(0, 1)}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            styles.subtitle,
            {
              color: colors.mutedForeground,
              fontFamily: typography.family,
              fontWeight: typography.weightRegular,
            },
          ]}
        >
          You've learned for {streak} days in a row. Keep it up!
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
  },
  inner: {
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 14,
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
  },
  initialWrapper: {
    padding: 8,
  },
  initial: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 20,
  },
});
