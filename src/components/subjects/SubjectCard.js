import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';
import { GradientProgressBar } from '../shared/GradientProgressBar';
import { CardButton } from '../shared/CardButton';

export function SubjectCard({ subject, onPress }) {
  const { colors, radii, spacing, typography } = useTheme();
  const accentKey = subject.accentKey ?? 'primary';
  const accent = colors[accentKey] ?? colors.primary;
  const gradientStart = applyAlpha(accent, 0.12);
  const gradientEnd = applyAlpha(accent, 0.02);

  return (
    <Pressable
      onPress={() => onPress?.(subject)}
      style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}
    >
      <View
        style={{
          borderRadius: radii.xl,
          borderWidth: 2,
          borderColor: colors.border,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={[gradientStart, gradientEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{ padding: spacing.lg }}
        >
          <View style={styles.headerRow}>
            <Text
              style={{
                fontSize: 18,
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                color: colors.foreground,
              }}
            >
              {subject.name}
            </Text>
            <View
              style={{
                backgroundColor: applyAlpha(colors.primary, 0.12),
                borderRadius: radii.md,
                paddingHorizontal: 8,
                paddingVertical: 4,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.family,
                  fontWeight: typography.weightBold,
                  fontSize: 12,
                  color: colors.primary,
                }}
              >
                {subject.progress}%
              </Text>
            </View>
          </View>
          <Text
            style={{
              marginTop: 6,
              fontFamily: typography.family,
              fontSize: 13,
              color: colors.mutedForeground,
            }}
          >
            {subject.topics} topics available
          </Text>

          <View style={{ marginTop: spacing.md }}>
            <GradientProgressBar value={subject.progress} accentKey={accentKey} height={8} />
          </View>

          <View style={{ marginTop: spacing.md }}>
            <CardButton variant="outline" size="sm" onPress={() => onPress?.(subject)}>
              Learn
            </CardButton>
          </View>
        </LinearGradient>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
