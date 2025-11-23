import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path, Circle, Line as SvgLine, Text as SvgText } from 'react-native-svg';
import { useTheme } from '../../theme';

const DEFAULT_DATA = [
  { day: 'Mon', minutes: 45 },
  { day: 'Tue', minutes: 60 },
  { day: 'Wed', minutes: 30 },
  { day: 'Thu', minutes: 90 },
  { day: 'Fri', minutes: 75 },
  { day: 'Sat', minutes: 120 },
  { day: 'Sun', minutes: 85 },
];

export function WeeklyLineChart({ data = DEFAULT_DATA, height = 240 }) {
  const { colors, radii } = useTheme();
  const [layoutWidth, setLayoutWidth] = React.useState(0);
  const padding = 32;
  const width = layoutWidth > 0 ? layoutWidth : 320;
  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 1.6;

  const rawMax = Math.max(...data.map((d) => d.minutes));
  const maxValue = Math.max(rawMax, 100);
  const minValue = 0;
  const stepX = chartWidth / Math.max(data.length - 1, 1);

  const points = data.map((item, index) => {
    const x = padding + index * stepX;
    const denominator = maxValue - minValue === 0 ? 1 : maxValue - minValue;
    const y = padding + chartHeight - ((item.minutes - minValue) / denominator) * chartHeight;
    return { x, y };
  });

  const path = points
    .map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x},${point.y}`)
    .join(' ');

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
        <Defs>
          <LinearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor={colors.primary} stopOpacity="1" />
            <Stop offset="100%" stopColor={colors.secondary} stopOpacity="1" />
          </LinearGradient>
        </Defs>

        {/* Grid */}
        {[0.25, 0.5, 0.75].map((ratio) => {
          const y = padding + chartHeight * ratio;
          return (
            <SvgLine
              key={ratio}
              x1={padding}
              y1={y}
              x2={width - padding}
              y2={y}
              stroke={colors.border}
              strokeDasharray="4,6"
              strokeWidth={1}
            />
          );
        })}

        {/* Axes Labels */}
        {data.map((item, index) => {
          const point = points[index];
          return (
            <SvgText
              key={item.day}
              x={point.x}
              y={height - 12}
              fill={colors.mutedForeground}
              fontSize={12}
              fontWeight="600"
              textAnchor="middle"
            >
              {item.day}
            </SvgText>
          );
        })}

        {/* Y axis ticks */}
        {[0, 0.5, 1].map((ratio) => {
          const yValue = Math.round((minValue + (maxValue - minValue) * (1 - ratio)) / 10) * 10;
          const y = padding + chartHeight * (1 - ratio);
          return (
            <SvgText
              key={`y-${ratio}`}
              x={padding - 12}
              y={y + 4}
              fill={colors.mutedForeground}
              fontSize={11}
              textAnchor="end"
            >
              {yValue}
            </SvgText>
          );
        })}

        {/* Clipped area fill */}
        <Path
          d={`${path} L${points[points.length - 1]?.x || padding},${height - padding / 2} L${points[0]?.x || padding},${height - padding / 2} Z`}
          fill={colors.primary}
          opacity={0.08}
        />

        {/* Line path */}
        <Path d={path} fill="none" stroke="url(#lineGradient)" strokeWidth={3} strokeLinecap="round" />

        {/* Dots */}
        {points.map((point, index) => (
          <Circle key={`dot-${index}`} cx={point.x} cy={point.y} r={5} fill={colors.primary} />
        ))}
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 12,
  },
});
