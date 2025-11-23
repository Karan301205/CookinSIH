import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Flame, BookOpen, Target, Zap } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';

const DEFAULT_STATS = [
  {
    icon: Flame,
    label: 'Current Streak',
    value: '12 days',
    accentKey: 'primary',
  },
  {
    icon: BookOpen,
    label: 'Total Quizzes',
    value: '42',
    accentKey: 'secondary',
  },
  {
    icon: Target,
    label: 'Accuracy',
    value: '78%',
    accentKey: 'accent',
  },
  {
    icon: Zap,
    label: 'Study Hours',
    value: '24.5h',
    accentKey: 'primary',
  },
];

export function StatsCards({ stats = DEFAULT_STATS }) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View style={styles.grid}>
      {stats.map((item) => {
        const Icon = item.icon;
        const accent = colors[item.accentKey] ?? colors.primary;
        return (
          <LinearGradient
            key={item.label}
            colors={[applyAlpha(accent, 0.12), applyAlpha(accent, 0.04)]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.card,
              {
                borderRadius: radii.xl,
                borderWidth: 2,
                borderColor: applyAlpha(accent, 0.2),
                padding: spacing.lg,
              },
            ]}
          >
            <View
              style={{
                backgroundColor: applyAlpha(accent, 0.3),
                borderRadius: radii.md,
                padding: 10,
                width: 44,
                alignItems: 'center',
              }}
            >
              <Icon size={20} color="#FFFFFF" />
            </View>
            <Text
              style={{
                marginTop: spacing.sm,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: colors.mutedForeground,
                fontFamily: typography.family,
                fontWeight: typography.weightMedium,
              }}
            >
              {item.label}
            </Text>
            <Text
              style={{
                marginTop: 6,
                fontSize: 20,
                color: colors.foreground,
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
              }}
            >
              {item.value}
            </Text>
          </LinearGradient>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    marginBottom: 12,
  },
});
