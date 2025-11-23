import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Moon, Bell, Globe, ChevronRight, LogOut } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { ToggleSwitch } from '../shared/ToggleSwitch';
import { CardButton } from '../shared/CardButton';

export function ProfileSettings() {
  const { colors, spacing, radii, typography, colorScheme, setColorScheme } = useTheme();
  const [notifications, setNotifications] = React.useState(true);

  const settings = [
    {
      id: 'dark-mode',
      label: 'Dark Mode',
      icon: Moon,
      sublabel: undefined,
      toggle: true,
      value: colorScheme === 'dark',
      onToggle: (next) => {
        setColorScheme(next ? 'dark' : 'light');
      },
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: Bell,
      sublabel: 'Learning reminders',
      toggle: true,
      value: notifications,
      onToggle: (next) => setNotifications(next),
    },
    {
      id: 'language',
      label: 'Language',
      icon: Globe,
      sublabel: 'English',
      toggle: false,
    },
  ];

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
        Settings
      </Text>

      <View
        style={{
          borderRadius: radii.xl,
          borderWidth: 2,
          borderColor: colors.border,
          overflow: 'hidden',
          marginBottom: spacing.lg,
        }}
      >
        {settings.map((setting, index) => {
          const Icon = setting.icon;
          const isLast = index === settings.length - 1;
          return (
            <View
              key={setting.id}
              style={{
                backgroundColor: colors.card,
                borderBottomWidth: isLast ? 0 : StyleSheet.hairlineWidth,
                borderBottomColor: colors.border,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: spacing.lg,
                  paddingVertical: spacing.md,
                }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Icon size={20} color={colors.mutedForeground} style={{ marginRight: spacing.md }} />
                  <View>
                    <Text
                      style={{
                        fontFamily: typography.family,
                        fontWeight: typography.weightMedium,
                        fontSize: 15,
                        color: colors.foreground,
                      }}
                    >
                      {setting.label}
                    </Text>
                    {setting.sublabel ? (
                      <Text
                        style={{
                          fontFamily: typography.family,
                          fontSize: 12,
                          color: colors.mutedForeground,
                          marginTop: 2,
                        }}
                      >
                        {setting.sublabel}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {setting.toggle ? (
                  <ToggleSwitch
                    value={Boolean(setting.value)}
                    onValueChange={(next) => setting.onToggle?.(next)}
                  />
                ) : (
                  <ChevronRight size={20} color={colors.mutedForeground} />
                )}
              </View>
            </View>
          );
        })}
      </View>

      <CardButton
        variant="destructive"
        size="md"
        onPress={() => {}}
        style={{ borderRadius: radii.xl }}
      >
        <LogOut size={20} color={colors.destructiveForeground} />
        Logout
      </CardButton>
    </View>
  );
}
