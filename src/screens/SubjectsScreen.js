import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { SubjectSearch } from '../components/subjects/SubjectSearch';
import { SubjectCard } from '../components/subjects/SubjectCard';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', topics: 12, progress: 65, accentKey: 'primary' },
  { id: 'physics', name: 'Physics', topics: 8, progress: 42, accentKey: 'secondary' },
  { id: 'english', name: 'English', topics: 15, progress: 88, accentKey: 'accent' },
  { id: 'coding', name: 'Coding', topics: 10, progress: 35, accentKey: 'primary' },
  { id: 'history', name: 'History', topics: 20, progress: 78, accentKey: 'secondary' },
  { id: 'science', name: 'Science', topics: 18, progress: 55, accentKey: 'accent' },
];

export function SubjectsScreen() {
  const { colors, spacing } = useTheme();
  const navigation = useNavigation();
  const [query, setQuery] = React.useState('');

  const filtered = SUBJECTS.filter((subject) =>
    subject.name.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Subjects" showSettings={false} onBack={() => navigation.goBack()} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: spacing.lg,
          paddingBottom: spacing.xxl,
          paddingTop: spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ marginBottom: spacing.lg }}>
          <SubjectSearch value={query} onChangeText={setQuery} />
        </View>
        {filtered.map((subject) => (
          <View key={subject.id} style={{ marginBottom: spacing.md }}>
            <SubjectCard subject={subject} onPress={() => {}} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
