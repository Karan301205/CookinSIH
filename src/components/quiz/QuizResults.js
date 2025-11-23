import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { Trophy, TrendingUp, Home as HomeIcon } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';
import { CardButton } from '../shared/CardButton';

export function QuizResults({ session, onRetake, onHome }) {
  const { colors, radii, spacing, typography } = useTheme();
  const correctCount = Math.floor(session.totalQuestions * 0.7);
  const scorePercentage = Math.round((correctCount / session.totalQuestions) * 100);

  const suggestions = [
    'Review questions you got wrong',
    'Ask your AI tutor for explanations',
    'Practice similar topics',
  ];

  return (
    <View>
      <LinearGradient
        colors={[applyAlpha(colors.primary, 0.18), applyAlpha(colors.secondary, 0.16)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          borderRadius: radii.xl,
          borderWidth: 2,
          borderColor: applyAlpha(colors.primary, 0.24),
          padding: spacing.xl,
          alignItems: 'center',
          marginBottom: spacing.xl,
        }}
      >
        <Trophy size={48} color={colors.primary} style={{ marginBottom: spacing.md }} />
        <Text
          style={{
            fontFamily: typography.family,
            fontWeight: typography.weightBold,
            fontSize: 36,
            color: colors.foreground,
          }}
        >
          {scorePercentage}%
        </Text>
        <Text
          style={{
            marginTop: spacing.xs,
            fontFamily: typography.family,
            color: colors.mutedForeground,
            fontSize: 14,
          }}
        >
          You got {correctCount} out of {session.totalQuestions} correct
        </Text>
        <Text
          style={{
            marginTop: spacing.sm,
            fontFamily: typography.family,
            fontWeight: typography.weightMedium,
            color: colors.primary,
            fontSize: 15,
          }}
        >
          {scorePercentage >= 80 ? '🎉 Excellent work!' : scorePercentage >= 60 ? '👍 Good job!' : '💪 Keep practicing!'}
        </Text>
      </LinearGradient>

      <View
        style={{
          borderRadius: radii.xl,
          borderWidth: 2,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: spacing.lg,
          marginBottom: spacing.xl,
        }}
      >
        <Svg height={200} width="100%" viewBox="0 0 320 200">
          <Rect x={40} y={40} width={240} height={1} fill={colors.border} />
          {[correctCount, session.totalQuestions - correctCount].map((value, index) => {
            const x = 80 + index * 120;
            const barHeight = (value / session.totalQuestions) * 120;
            const y = 160 - barHeight;
            const fill = index === 0 ? colors.primary : colors.muted;
            const label = index === 0 ? 'Correct' : 'Incorrect';

            return (
              <React.Fragment key={label}>
                <Rect x={x} y={y} width={60} height={barHeight} rx={12} ry={12} fill={fill} />
                <SvgText
                  x={x + 30}
                  y={y - 10}
                  fill={fill}
                  fontSize={14}
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {value}
                </SvgText>
                <SvgText
                  x={x + 30}
                  y={180}
                  fill={colors.mutedForeground}
                  fontSize={13}
                  textAnchor="middle"
                >
                  {label}
                </SvgText>
              </React.Fragment>
            );
          })}
        </Svg>
      </View>

      <View style={{ marginBottom: spacing.xl }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: spacing.sm }}>
          <TrendingUp size={20} color={colors.primary} style={{ marginRight: spacing.sm }} />
          <Text
            style={{
              fontFamily: typography.family,
              fontWeight: typography.weightMedium,
              color: colors.foreground,
              fontSize: 16,
            }}
          >
            How to improve
          </Text>
        </View>
        {suggestions.map((suggestion) => (
          <Text
            key={suggestion}
            style={{
              fontFamily: typography.family,
              color: colors.mutedForeground,
              fontSize: 14,
              marginBottom: spacing.xs,
            }}
          >
            ✓ {suggestion}
          </Text>
        ))}
      </View>

      <View>
        <CardButton
          variant="primary"
          size="lg"
          style={{ marginBottom: spacing.md }}
          onPress={onRetake}
        >
          <Trophy size={20} color={colors.primaryForeground} />
          Retake Quiz
        </CardButton>
        <CardButton variant="outline" size="lg" onPress={onHome}>
          <HomeIcon size={20} color={colors.foreground} />
          Go Home
        </CardButton>
      </View>
    </View>
  );
}
