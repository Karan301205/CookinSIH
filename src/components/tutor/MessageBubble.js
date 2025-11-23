import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../theme';

function renderText(content, { textColor, typography }) {
  return content.split('\n').map((line, index) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith('•');
    const segments = [];

    if (trimmed.includes('**')) {
      const parts = trimmed.split('**');
      parts.forEach((part, idx) => {
        if (part.length === 0) {
          return;
        }
        const isBold = idx % 2 === 1;
        segments.push(
          <Text
            key={`segment-${index}-${idx}`}
            style={isBold ? styles.bold : null}
          >
            {part}
          </Text>,
        );
      });
    } else {
      segments.push(trimmed.length > 0 ? trimmed : ' ');
    }

    return (
      <Text
        key={`line-${index}`}
        style={{
          marginBottom: 4,
          color: textColor,
          fontFamily: typography.family,
          fontSize: 14,
          lineHeight: 20,
          paddingLeft: isBullet ? 12 : 0,
        }}
      >
        {segments}
      </Text>
    );
  });
}

export function MessageBubble({ message }) {
  const { colors, radii, typography } = useTheme();
  const isUser = message.role === 'user';
  const textColor = isUser ? colors.primaryForeground : colors.foreground;

  return (
    <View style={[styles.row, { justifyContent: isUser ? 'flex-end' : 'flex-start' }]}
    >
      <View
        style={[
          styles.bubble,
          {
            borderRadius: radii.xl,
            backgroundColor: isUser ? colors.primary : colors.muted,
            borderBottomLeftRadius: isUser ? radii.xl : radii.md,
            borderBottomRightRadius: isUser ? radii.md : radii.xl,
            maxWidth: '80%',
          },
        ]}
      >
        {renderText(message.content, { textColor, typography })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  bold: {
    fontWeight: '700',
  },
});
