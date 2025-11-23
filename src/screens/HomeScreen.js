import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { WelcomeBanner } from '../components/home/WelcomeBanner';
import { QuickActions } from '../components/home/QuickActions';
import { FeaturedTopics } from '../components/home/FeaturedTopics';

export function HomeScreen() {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation();

  const handleQuickAction = (key) => {
    if (key === 'subjects') {
      navigation.getParent()?.navigate('Subjects');
      return;
    }

    const map = {
      quiz: 'Quiz',
      tutor: 'Tutor',
      progress: 'Progress',
    };

    const target = map[key];
    if (target) {
      navigation.navigate(target);
    }
  };

  const handleProfilePress = () => {
    const parent = navigation.getParent();
    const root = parent?.getParent() ?? parent;
    root?.navigate('Profile');
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Header
        title="EduTutor"
        showSettings
        showProfileButton
        onProfilePress={handleProfilePress}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl }}
      >
        <View style={{ paddingVertical: spacing.lg }}>
          <WelcomeBanner name="Alex" streak={12} />
        </View>
        <View style={{ marginBottom: spacing.xl }}>
          <QuickActions onSelect={handleQuickAction} />
        </View>
        <FeaturedTopics onSelect={() => {}} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
