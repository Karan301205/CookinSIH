import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ChevronRight } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';

const TOPICS = [
  {
    id: 1,
    title: 'Algebra Basics',
    subject: 'Mathematics',
    progress: 65,
    accentKey: 'primary',
  },
  {
    id: 2,
    title: 'Photosynthesis',
    subject: 'Biology',
    progress: 42,
    accentKey: 'secondary',
  },
  {
    id: 3,
    title: 'World War II',
    subject: 'History',
    progress: 88,
    accentKey: 'accent',
  },
  {
    id: 4,
    title: 'Python Programming',
    subject: 'Coding',
    progress: 35,
    accentKey: 'primary',
  },
];

export function FeaturedTopics({ onSelect }) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View>
      <Text
        style={{
          fontSize: 13,
          textTransform: 'uppercase',
          letterSpacing: 1.2,
          fontFamily: typography.family,
          fontWeight: typography.weightMedium,
          color: colors.mutedForeground,
          marginBottom: spacing.sm,
        }}
      >
        Featured Topics
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: spacing.md }}
      >
        {TOPICS.map((topic, index) => {
          const accent = colors[topic.accentKey] ?? colors.primary;
          const accentBadge = topic.accentKey === 'accent' ? colors.accentForeground : '#FFFFFF';
          const isLast = index === TOPICS.length - 1;

          return (
            <Pressable key={topic.id} onPress={() => onSelect?.(topic)} style={({ pressed }) => ({ opacity: pressed ? 0.85 : 1 })}>
              <LinearGradient
                colors={[applyAlpha(accent, 0.18), applyAlpha(accent, 0.05)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.card,
                  {
                    borderRadius: radii.xl,
                    borderColor: colors.border,
                    borderWidth: 1,
                    marginBottom: isLast ? 0 : spacing.md,
                  },
                ]}
              >
                <View style={styles.row}>
                  <View style={{ flex: 1, marginRight: spacing.md }}>
                    <View style={styles.subjectRow}>
                      <Text
                        style={{
                          fontFamily: typography.family,
                          fontWeight: typography.weightMedium,
                          fontSize: 11,
                          textTransform: 'uppercase',
                          letterSpacing: 1.1,
                          color: colors.mutedForeground,
                        }}
                      >
                        {topic.subject}
                      </Text>
                      <View
                        style={{
                          backgroundColor: accent,
                          borderRadius: radii.sm,
                          paddingHorizontal: 8,
                          paddingVertical: 4,
                          marginLeft: 8,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: typography.family,
                            fontWeight: typography.weightBold,
                            fontSize: 11,
                            color: accentBadge,
                          }}
                        >
                          {topic.progress}%
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        marginTop: spacing.xs,
                        fontFamily: typography.family,
                        fontWeight: typography.weightBold,
                        fontSize: 16,
                        color: colors.foreground,
                      }}
                    >
                      {topic.title}
                    </Text>
                    <View style={[styles.progressTrack, { backgroundColor: colors.border }]}
                    >
                      <View
                        style={{
                          width: `${topic.progress}%`,
                          backgroundColor: accent,
                          borderRadius: radii.full,
                          height: 6,
                        }}
                      />
                    </View>
                  </View>
                  <View style={{ marginTop: 4 }}>
                    <ChevronRight size={24} color={colors.mutedForeground} />
                  </View>
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  subjectRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressTrack: {
    marginTop: 16,
    height: 6,
    borderRadius: 999,
    overflow: 'hidden',
  },
});
