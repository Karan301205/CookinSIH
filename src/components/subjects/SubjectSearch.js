import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Search } from 'lucide-react-native';
import { useTheme } from '../../theme';

export function SubjectSearch({ value, onChangeText, placeholder = 'Search subjects...' }) {
  const { colors, spacing, radii } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: radii.lg,
          backgroundColor: colors.card,
        },
      ]}
    >
      <Search size={20} color={colors.mutedForeground} style={styles.icon} />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedForeground}
        style={{
          flex: 1,
          paddingVertical: spacing.sm,
          color: colors.foreground,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    paddingHorizontal: 16,
  },
  icon: {
    marginRight: 12,
  },
});
