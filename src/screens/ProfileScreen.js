import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { ProfileHeader } from '../components/profile/ProfileHeader';
import { ProfileStats } from '../components/profile/ProfileStats';
import { ProfileSettings } from '../components/profile/ProfileSettings';

export function ProfileScreen() {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Profile" showSettings={false} onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingTop: spacing.lg,
          paddingBottom: spacing.xxl,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.xl }}>
          <ProfileHeader />
        </View>
        <View style={{ marginBottom: spacing.xl }}>
          <ProfileStats />
        </View>
        <ProfileSettings />
      </ScrollView>
    </View>
  );
}
