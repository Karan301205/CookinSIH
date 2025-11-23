import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BookOpen, Target, Clock } from 'lucide-react-native';
import { useTheme } from '../../theme';

const DEFAULT_STATS = [
  { icon: BookOpen, label: 'Total Quizzes', value: '42', unit: 'completed' },
  { icon: Clock, label: 'Study Hours', value: '24.5', unit: 'this month' },
  { icon: Target, label: 'Accuracy', value: '78%', unit: 'overall' },
];

export function ProfileStats({ stats = DEFAULT_STATS }) {
  const { colors, spacing, radii, typography } = useTheme();

  return (
    <View>
      <Text
        style={{
          fontFamily: typography.family,
          fontSize: 12,
          fontWeight: typography.weightMedium,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          color: colors.mutedForeground,
          marginBottom: spacing.sm,
        }}
      >
        Statistics
      </Text>
      <View>
        {stats.map((item, index) => {
          const isLast = index === stats.length - 1;
          const Icon = item.icon;
          return (
            <View
              key={item.label}
              style={[
                styles.card,
                {
                  borderRadius: radii.xl,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  padding: spacing.md,
                  marginBottom: isLast ? 0 : spacing.sm,
                },
              ]}
            >
              <View
                style={{
                  backgroundColor: colors.muted,
                  borderRadius: radii.md,
                  padding: 12,
                  marginRight: spacing.md,
                }}
              >
                <Icon size={20} color={colors.primary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: typography.family,
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                    color: colors.mutedForeground,
                    marginBottom: 4,
                  }}
                >
                  {item.label}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                  <Text
                    style={{
                      fontFamily: typography.family,
                      fontWeight: typography.weightBold,
                      fontSize: 20,
                      color: colors.foreground,
                      marginRight: 8,
                    }}
                  >
                    {item.value}
                  </Text>
                  <Text
                    style={{
                      fontFamily: typography.family,
                      fontSize: 12,
                      color: colors.mutedForeground,
                    }}
                  >
                    {item.unit}
                  </Text>
                </View>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
