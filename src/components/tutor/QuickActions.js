import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Lightbulb, Book, Sparkles, HelpCircle } from 'lucide-react-native';
import { useTheme } from '../../theme';

const ACTIONS = [
  { icon: Lightbulb, label: 'Generate Example', prompt: 'Can you give me an example of this concept?' },
  { icon: Book, label: 'Explain Simply', prompt: 'Can you explain this in simpler terms?' },
  { icon: Sparkles, label: 'Create Quiz', prompt: 'Can you create a quiz question about this?' },
  { icon: HelpCircle, label: 'Ask Question', prompt: 'How do I solve this problem?' },
];

export function TutorQuickActions({ onSelect }) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View style={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }}>
      <Text
        style={{
          fontSize: 12,
          fontFamily: typography.family,
          fontWeight: typography.weightMedium,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          color: colors.mutedForeground,
          marginBottom: spacing.sm,
        }}
      >
        Try asking about:
      </Text>
      <View style={styles.grid}>
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Pressable
              key={action.label}
              onPress={() => onSelect?.(action.prompt)}
              style={({ pressed }) => [
                styles.card,
                {
                  borderRadius: radii.lg,
                  borderWidth: 2,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  padding: spacing.md,
                  opacity: pressed ? 0.85 : 1,
                },
              ]}
            >
              <Icon size={18} color={colors.primary} style={{ marginBottom: 6 }} />
              <Text
                style={{
                  fontFamily: typography.family,
                  fontSize: 13,
                  color: colors.foreground,
                  fontWeight: typography.weightMedium,
                }}
              >
                {action.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
