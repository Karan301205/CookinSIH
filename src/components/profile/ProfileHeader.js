import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Edit3, Mail } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { applyAlpha } from '../shared/colorUtils';
import { CardButton } from '../shared/CardButton';
import { GradientProgressBar } from '../shared/GradientProgressBar';

export function ProfileHeader({
  name = 'Alex Student',
  email = 'alex@example.com',
  level = 5,
  xp = 2450,
  nextLevelXp = 550,
  progress = 80,
}) {
  const { colors, radii, spacing, typography } = useTheme();
  const initials = name.charAt(0).toUpperCase();

  return (
    <LinearGradient
      colors={[applyAlpha(colors.primary, 0.18), applyAlpha(colors.secondary, 0.12)]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.wrapper, { borderRadius: radii.xl, borderColor: applyAlpha(colors.primary, 0.2) }]}
    >
      <View
        style={[
          styles.inner,
          {
            borderRadius: radii.xl,
            backgroundColor: applyAlpha(colors.card, 0.76),
          },
        ]}
      >
        <View style={styles.headerRow}>
          <View>
            <View
              style={{
                height: 64,
                width: 64,
                borderRadius: radii.xl,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: spacing.sm,
              }}
            >
              <Text
                style={{
                  fontFamily: typography.family,
                  fontWeight: typography.weightBold,
                  fontSize: 24,
                  color: colors.primaryForeground,
                }}
              >
                {initials}
              </Text>
            </View>
            <Text
              style={{
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                fontSize: 22,
                color: colors.foreground,
              }}
            >
              {name}
            </Text>
            <View style={styles.emailRow}>
              <Mail size={16} color={colors.mutedForeground} style={{ marginRight: 6 }} />
              <Text
                style={{
                  fontFamily: typography.family,
                  fontSize: 13,
                  color: colors.mutedForeground,
                }}
              >
                {email}
              </Text>
            </View>
          </View>
          <CardButton
            variant="primary"
            size="sm"
            onPress={() => {}}
            contentStyle={{ alignItems: 'center' }}
          >
            <Edit3 size={18} color={colors.primaryForeground} />
            Edit
          </CardButton>
        </View>

        <View style={[styles.divider, { borderColor: applyAlpha(colors.primary, 0.2) }]} />

        <View style={styles.levelRow}>
          <View>
            <Text
              style={{
                fontFamily: typography.family,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: colors.mutedForeground,
                marginBottom: 4,
              }}
            >
              Level
            </Text>
            <Text
              style={{
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                fontSize: 22,
                color: colors.primary,
              }}
            >
              Level {level}
            </Text>
          </View>
          <View>
            <Text
              style={{
                fontFamily: typography.family,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: colors.mutedForeground,
                marginBottom: 4,
              }}
            >
              XP Points
            </Text>
            <Text
              style={{
                fontFamily: typography.family,
                fontWeight: typography.weightBold,
                fontSize: 22,
                color: colors.secondary,
              }}
            >
              {xp.toLocaleString()} XP
            </Text>
          </View>
        </View>

        <Text
          style={{
            fontFamily: typography.family,
            fontSize: 12,
            color: colors.mutedForeground,
            marginBottom: spacing.xs,
          }}
        >
          Next level in {nextLevelXp} XP
        </Text>
        <GradientProgressBar value={progress} accentKey="primary" height={10} />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    padding: 6,
  },
  inner: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  emailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  levelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
});
