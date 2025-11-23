import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { StatsCards } from '../components/progress/StatsCards';
import { WeeklyLineChart } from '../components/progress/WeeklyLineChart';
import { AccuracyBarChart } from '../components/progress/AccuracyBarChart';
import { AchievementBadges } from '../components/progress/AchievementBadges';

export function ProgressScreen() {
  const { colors, spacing, typography } = useTheme();

  const SectionTitle = ({ children }) => (
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
      {children}
    </Text>
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Your Progress" subtitle="Keep up your learning streak!" showSettings={false} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <StatsCards />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <SectionTitle>This Week</SectionTitle>
          <WeeklyLineChart />
        </View>

        <View style={{ marginBottom: spacing.xl }}>
          <SectionTitle>Subject Performance</SectionTitle>
          <AccuracyBarChart />
        </View>

        <View>
          <SectionTitle>Achievements</SectionTitle>
          <AchievementBadges />
        </View>
      </ScrollView>
    </View>
  );
}
