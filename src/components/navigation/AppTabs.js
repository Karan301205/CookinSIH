import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, BookOpen, Brain, TrendingUp, Trophy } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { BottomTabBar } from './BottomTabBar';
import { HomeScreen } from '../../screens/HomeScreen';
import { QuizScreen } from '../../screens/QuizScreen';
import { TutorScreen } from '../../screens/TutorScreen';
import { ProgressScreen } from '../../screens/ProgressScreen';
import { LeaderboardScreen } from '../../screens/LeaderboardScreen';

const Tab = createBottomTabNavigator();

export function AppTabs() {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, size }) => (
            <Home size={size} color={focused ? colors.primary : colors.mutedForeground} />
          ),
        }}
      />
      <Tab.Screen
        name="Quiz"
        component={QuizScreen}
        options={{
          tabBarLabel: 'Quiz',
          tabBarIcon: ({ focused, size }) => (
            <BookOpen size={size} color={focused ? colors.primary : colors.mutedForeground} />
          ),
        }}
      />
      <Tab.Screen
        name="Tutor"
        component={TutorScreen}
        options={{
          tabBarLabel: 'Tutor',
          tabBarIcon: ({ focused, size }) => (
            <Brain size={size} color={focused ? colors.primary : colors.mutedForeground} />
          ),
        }}
      />
      <Tab.Screen
        name="Progress"
        component={ProgressScreen}
        options={{
          tabBarLabel: 'Progress',
          tabBarIcon: ({ focused, size }) => (
            <TrendingUp size={size} color={focused ? colors.primary : colors.mutedForeground} />
          ),
        }}
      />
      <Tab.Screen
        name="Leaderboard"
        component={LeaderboardScreen}
        options={{
          tabBarLabel: 'Leaderboard',
          tabBarIcon: ({ focused, size }) => (
            <Trophy size={size} color={focused ? colors.primary : colors.mutedForeground} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
