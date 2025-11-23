import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../../theme';

export function LabeledIconInput({
  label,
  icon: Icon,
  secureTextEntry,
  value,
  onChangeText,
  placeholder,
  keyboardType,
  ...rest
}) {
  const { colors, radii, spacing, typography } = useTheme();

  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text
        style={{
          fontFamily: typography.family,
          fontSize: 13,
          color: colors.foreground,
          fontWeight: typography.weightMedium,
          marginBottom: spacing.xs,
        }}
      >
        {label}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderWidth: 2,
          borderColor: colors.border,
          borderRadius: radii.lg,
          backgroundColor: colors.card,
          paddingHorizontal: spacing.md,
        }}
      >
        {Icon ? <Icon size={20} color={colors.mutedForeground} style={{ marginRight: spacing.sm }} /> : null}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.mutedForeground}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={{
            flex: 1,
            paddingVertical: 12,
            color: colors.foreground,
          }}
          {...rest}
        />
      </View>
    </View>
  );
}
