import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Lock } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';

const DEFAULT_BADGES = [
  { id: 1, name: 'Quick Learner', icon: '⚡', unlocked: true, description: 'Complete 5 quizzes in one day' },
  { id: 2, name: 'Streak Master', icon: '🔥', unlocked: true, description: 'Maintain a 7-day streak' },
  { id: 3, name: 'Perfect Score', icon: '💯', unlocked: false, description: 'Score 100% on a quiz' },
  { id: 4, name: 'Night Owl', icon: '🌙', unlocked: true, description: 'Study after 8 PM' },
  { id: 5, name: 'Math Champion', icon: '∑', unlocked: false, description: 'Reach 90% in Math' },
  { id: 6, name: 'All-Rounder', icon: '🎯', unlocked: false, description: 'Reach 80% in all subjects' },
];

export function AchievementBadges({ badges = DEFAULT_BADGES }) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View style={styles.grid}>
      {badges.map((badge) => (
        <View
          key={badge.id}
          style={[
            styles.card,
            {
              borderRadius: radii.xl,
              borderWidth: 2,
              borderColor: badge.unlocked ? applyAlpha(colors.primary, 0.25) : colors.border,
              backgroundColor: badge.unlocked ? applyAlpha(colors.primary, 0.12) : colors.muted,
              opacity: badge.unlocked ? 1 : 0.6,
              padding: spacing.md,
            },
          ]}
        >
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 28, marginBottom: spacing.sm }}>{badge.icon}</Text>
            <Text
              style={{
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                fontSize: 14,
                color: colors.foreground,
                textAlign: 'center',
              }}
            >
              {badge.name}
            </Text>
            <Text
              style={{
                marginTop: 4,
                fontSize: 12,
                color: colors.mutedForeground,
                textAlign: 'center',
              }}
            >
              {badge.description}
            </Text>
            {!badge.unlocked ? (
              <Lock size={16} color={colors.mutedForeground} style={{ marginTop: 6 }} />
            ) : null}
          </View>
        </View>
      ))}
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
