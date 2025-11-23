import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';

const lightPalette = {
  background: '#FAF9FF',
  foreground: '#1E1F25',
  card: '#FFFFFF',
  cardForeground: '#1E1F25',
  popover: '#FFFFFF',
  popoverForeground: '#1E1F25',
  primary: '#6572FF',
  primaryForeground: '#FFFFFF',
  secondary: '#C7B8FF',
  secondaryForeground: '#1E1F25',
  accent: '#FFB9A3',
  accentForeground: '#1E1F25',
  muted: '#F1F2F8',
  mutedForeground: '#6F7485',
  destructive: '#FF6B6B',
  destructiveForeground: '#FFFFFF',
  border: '#E2E5F3',
  input: '#EDF0FB',
  ring: '#6572FF',
};

const darkPalette = {
  background: '#141625',
  foreground: '#F4F6FF',
  card: '#1C1F32',
  cardForeground: '#F4F6FF',
  popover: '#1C1F32',
  popoverForeground: '#F4F6FF',
  primary: '#8B95FF',
  primaryForeground: '#141625',
  secondary: '#D4C5FF',
  secondaryForeground: '#141625',
  accent: '#FFC8B4',
  accentForeground: '#141625',
  muted: '#2A2D3C',
  mutedForeground: '#8E93A7',
  destructive: '#FF8A8A',
  destructiveForeground: '#1F0D0D',
  border: '#2F3244',
  input: '#2A2D3C',
  ring: '#8B95FF',
};

const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

const radii = {
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  full: 999,
};

const typography = {
  family: 'System',
  weightRegular: '400',
  weightMedium: '600',
  weightBold: '700',
};

const ThemeContext = createContext({
  colors: lightPalette,
  spacing,
  radii,
  typography,
  colorScheme: 'light',
  isDark: false,
  setColorScheme: (_scheme) => {},
  toggleColorScheme: () => {},
});

export function ThemeProvider({ children }) {
  const [systemScheme, setSystemScheme] = useState(Appearance.getColorScheme() ?? 'light');
  const [preference, setPreference] = useState('system');

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (colorScheme) {
        setSystemScheme(colorScheme);
      }
    });

    return () => {
      subscription.remove();
    };
  }, []);

  const resolvedScheme = preference === 'system' ? systemScheme : preference;

  const value = useMemo(() => {
    const palette = resolvedScheme === 'dark' ? darkPalette : lightPalette;

    return {
      colors: palette,
      spacing,
      radii,
      typography,
      colorScheme: resolvedScheme,
      isDark: resolvedScheme === 'dark',
      setColorScheme: (scheme) => {
        setPreference(scheme);
      },
      toggleColorScheme: () => {
        setPreference((prev) => {
          const next = prev === 'system' ? (resolvedScheme === 'dark' ? 'light' : 'dark') : prev === 'dark' ? 'light' : 'dark';
          return next;
        });
      },
    };
  }, [resolvedScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
