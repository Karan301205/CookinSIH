import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../theme';

const DEFAULT_DATA = [
  { subject: 'Math', accuracy: 82 },
  { subject: 'Physics', accuracy: 75 },
  { subject: 'English', accuracy: 88 },
  { subject: 'Coding', accuracy: 70 },
  { subject: 'History', accuracy: 92 },
];

export function AccuracyBarChart({ data = DEFAULT_DATA, height = 240 }) {
  const { colors, radii, typography } = useTheme();
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const width = layoutWidth > 0 ? layoutWidth : 320;
  const paddingX = 32;
  const chartWidth = width - paddingX * 2;
  const barWidth = Math.max(chartWidth / data.length - 12, 12);

  return (
    <View
      onLayout={({ nativeEvent }) => {
        if (nativeEvent.layout.width !== layoutWidth) {
          setLayoutWidth(nativeEvent.layout.width);
        }
      }}
      style={[
        styles.container,
        {
          borderColor: colors.border,
          borderRadius: radii.xl,
          backgroundColor: colors.card,
        },
      ]}
    >
      <Svg height={height} width={width}>
        <Rect
          x={paddingX}
          y={height - 60}
          width={chartWidth}
          height={1}
          fill={colors.border}
        />
        {data.map((item, index) => {
          const x = paddingX + index * (barWidth + 12);
          const barHeight = (item.accuracy / 100) * (height - 80);
          const y = height - 60 - barHeight;
          const fillPalette = [colors.primary, colors.secondary, colors.accent, colors.primary, colors.secondary];
          const fill = fillPalette[index % fillPalette.length];

          return (
            <React.Fragment key={item.subject}>
              <Rect x={x} y={y} width={barWidth} height={barHeight} rx={8} ry={8} fill={fill} />
              <SvgText
                x={x + barWidth / 2}
                y={y - 8}
                fill={fill}
                fontSize={11}
                fontWeight={typography.weightBold}
                textAnchor="middle"
              >
                {`${item.accuracy}%`}
              </SvgText>
              <SvgText
                x={x + barWidth / 2}
                y={height - 28}
                fill={colors.mutedForeground}
                fontSize={12}
                fontWeight={typography.weightMedium}
                textAnchor="middle"
              >
                {item.subject}
              </SvgText>
            </React.Fragment>
          );
        })}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
});
