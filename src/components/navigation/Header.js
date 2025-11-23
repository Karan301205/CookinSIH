import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Settings, Bell, ArrowLeft, UserRound } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';
import { Pressable } from 'react-native';

export function Header({
  title,
  subtitle,
  showSettings = true,
  showNotifications = showSettings,
  showProfileButton = showSettings,
  onSettingsPress,
  onNotificationsPress,
  onProfilePress,
  onBack,
}) {
  const insets = useSafeAreaInsets();
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          paddingTop: insets.top + spacing.lg,
          backgroundColor: colors.card,
          borderBottomColor: colors.border,
        },
      ]}
    >
      <View style={[styles.inner, { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg }]}>
        <View style={styles.titleContainer}>
          <View style={styles.titleRow}>
            {onBack ? (
              <Pressable
                onPress={onBack}
                style={({ pressed }) => [
                  styles.backButton,
                  {
                    borderRadius: 12,
                    backgroundColor: pressed ? colors.muted : 'transparent',
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <ArrowLeft size={22} color={colors.mutedForeground} />
              </Pressable>
            ) : null}
            <Text
              style={[
                styles.title,
                {
                  color: colors.foreground,
                  fontFamily: typography.family,
                  fontWeight: typography.weightBold,
                },
              ]}
            >
              {title}
            </Text>
          </View>
          {subtitle ? (
            <Text
              style={[
                styles.subtitle,
                {
                  color: colors.mutedForeground,
                  fontFamily: typography.family,
                  fontWeight: typography.weightRegular,
                },
              ]}
            >
              {subtitle}
            </Text>
          ) : null}
        </View>

        {showSettings || showNotifications || showProfileButton ? (
          <View style={styles.actions}>
            {showNotifications ? (
              <Pressable
                onPress={onNotificationsPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: pressed ? colors.muted : 'transparent',
                    borderRadius: 12,
                    marginRight: 8,
                  },
                ]}
              >
                <Bell size={22} color={colors.mutedForeground} />
              </Pressable>
            ) : null}
            {showProfileButton ? (
              <Pressable
                onPress={onProfilePress}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: pressed ? colors.muted : 'transparent',
                    borderRadius: 12,
                    marginRight: showSettings ? 8 : 0,
                  },
                ]}
                accessibilityRole="button"
                accessibilityLabel="Open profile"
              >
                <UserRound size={22} color={colors.mutedForeground} />
              </Pressable>
            ) : null}
            {showSettings ? (
              <Pressable
                onPress={onSettingsPress}
                style={({ pressed }) => [
                  styles.iconButton,
                  {
                    backgroundColor: pressed ? colors.muted : 'transparent',
                    borderRadius: 12,
                  },
                ]}
              >
                <Settings size={22} color={colors.mutedForeground} />
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
  },
  backButton: {
    padding: 10,
    marginRight: 8,
  },
  title: {
    fontSize: 26,
    lineHeight: 32,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    padding: 10,
  },
});
