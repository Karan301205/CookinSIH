import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Crown, ArrowUpRight, ArrowDownRight, Minus, Flame } from 'lucide-react-native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { applyAlpha } from '../components/shared/colorUtils';

const LEADERBOARD = [
  { id: '1', name: 'Alex Student', points: 2450, streak: 12, change: 2, rank: 1, accentKey: 'primary' },
  { id: '2', name: 'Maya Chen', points: 2230, streak: 9, change: 1, rank: 2, accentKey: 'secondary' },
  { id: '3', name: 'Jordan Lee', points: 2115, streak: 8, change: -1, rank: 3, accentKey: 'accent' },
  { id: '4', name: 'Priya Patel', points: 1980, streak: 6, change: 0, rank: 4 },
  { id: '5', name: 'Diego Rivera', points: 1875, streak: 5, change: 2, rank: 5 },
  { id: '6', name: 'Sofia Rossi', points: 1790, streak: 4, change: -1, rank: 6 },
  { id: '7', name: 'Noah Kim', points: 1705, streak: 3, change: 0, rank: 7 },
];

function TrendIcon({ change, color }) {
  if (change > 0) {
    return <ArrowUpRight size={16} color={color} />;
  }
  if (change < 0) {
    return <ArrowDownRight size={16} color={color} />;
  }
  return <Minus size={16} color={color} />;
}

export function LeaderboardScreen() {
  const { colors, spacing, typography, radii } = useTheme();
  const topThree = LEADERBOARD.slice(0, 3);
  const rest = LEADERBOARD.slice(3);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Leaderboard" subtitle="See how you stack up" showSettings={false} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
      >
        <View style={{ marginBottom: spacing.xl }}>
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
            Top Performers
          </Text>
          {topThree.map((leader) => {
            const accent = leader.accentKey ? colors[leader.accentKey] ?? colors.primary : colors.primary;
            return (
              <LinearGradient
                key={leader.id}
                colors={[applyAlpha(accent, 0.2), applyAlpha(accent, 0.05)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={{
                  borderRadius: radii.xl,
                  padding: spacing.lg,
                  borderWidth: 2,
                  borderColor: applyAlpha(accent, 0.25),
                  marginBottom: spacing.md,
                }}
              >
                <View style={styles.topRow}>
                  <View style={styles.rankBadge}>
                    <Crown size={18} color={accent} />
                  </View>
                  <View style={{ marginLeft: spacing.sm }}>
                    <Text
                      style={{
                        fontFamily: typography.family,
                        fontWeight: typography.weightBold,
                        fontSize: 18,
                        color: colors.foreground,
                      }}
                    >
                      #{leader.rank} {leader.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: typography.family,
                        fontSize: 13,
                        color: colors.mutedForeground,
                        marginTop: 4,
                      }}
                    >
                      {leader.points.toLocaleString()} XP • {leader.streak}-day streak
                    </Text>
                  </View>
                </View>
                  <View style={[styles.trendRow, { marginTop: spacing.md }]}>
                  <TrendIcon change={leader.change} color={accent} />
                  <Text
                    style={{
                      marginLeft: 6,
                      fontFamily: typography.family,
                      fontSize: 13,
                      color: accent,
                      fontWeight: typography.weightMedium,
                    }}
                  >
                    {leader.change > 0 ? `Up ${leader.change}` : leader.change < 0 ? `Down ${Math.abs(leader.change)}` : 'Holding'}
                  </Text>
                </View>
              </LinearGradient>
            );
          })}
        </View>

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
            Global standings
          </Text>
          {rest.map((leader) => {
            const trendColor = leader.change > 0 ? colors.primary : leader.change < 0 ? colors.destructive : colors.mutedForeground;
            return (
              <View
                key={leader.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderWidth: 2,
                  borderColor: colors.border,
                  backgroundColor: colors.card,
                  borderRadius: radii.xl,
                  paddingVertical: spacing.md,
                  paddingHorizontal: spacing.md,
                  marginBottom: spacing.sm,
                }}
              >
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: radii.lg,
                    backgroundColor: colors.muted,
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: spacing.md,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: typography.family,
                      fontWeight: typography.weightBold,
                      color: colors.foreground,
                    }}
                  >
                    {leader.rank}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: typography.family,
                      fontWeight: typography.weightMedium,
                      fontSize: 15,
                      color: colors.foreground,
                    }}
                  >
                    {leader.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 2,
                      fontFamily: typography.family,
                      fontSize: 12,
                      color: colors.mutedForeground,
                    }}
                  >
                    {leader.points.toLocaleString()} XP • {leader.streak}-day streak
                  </Text>
                </View>
                <View style={styles.trendRow}>
                  <TrendIcon change={leader.change} color={trendColor} />
                  <Text
                    style={{
                      marginLeft: 6,
                      fontFamily: typography.family,
                      fontSize: 13,
                      color: trendColor,
                      fontWeight: typography.weightMedium,
                    }}
                  >
                    {leader.change > 0 ? `+${leader.change}` : leader.change < 0 ? `${leader.change}` : '0'}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View
          style={{
            borderRadius: radii.xl,
            borderWidth: 2,
            borderColor: colors.border,
            backgroundColor: colors.card,
            padding: spacing.lg,
            marginTop: spacing.xl,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
            <Flame size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
            <Text
              style={{
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                fontSize: 16,
                color: colors.foreground,
              }}
            >
              Weekly Challenge
            </Text>
          </View>
          <Text
            style={{
              fontFamily: typography.family,
              fontSize: 13,
              color: colors.mutedForeground,
              lineHeight: 20,
            }}
          >
            Complete 5 quizzes this week to earn a 200 XP bonus and climb the leaderboard faster.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.4)',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
