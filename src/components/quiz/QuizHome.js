import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import { SubjectSearch } from '../subjects/SubjectSearch';
import { QuizSubjectCard } from './QuizSubjectCard';

const SUBJECTS = [
  { id: 'math', name: 'Mathematics', icon: '∑', accentKey: 'primary', progress: 67 },
  { id: 'physics', name: 'Physics', icon: '⚡', accentKey: 'secondary', progress: 54 },
  { id: 'english', name: 'English', icon: '📚', accentKey: 'accent', progress: 73 },
  { id: 'coding', name: 'Coding', icon: '{}', accentKey: 'primary', progress: 38 },
  { id: 'history', name: 'History', icon: '🏛', accentKey: 'secondary', progress: 81 },
  { id: 'science', name: 'Science', icon: '🔬', accentKey: 'accent', progress: 45 },
];

export function QuizHome({ onStartQuiz }) {
  const { spacing } = useTheme();
  const [search, setSearch] = React.useState('');

  const filtered = SUBJECTS.filter((subject) => subject.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View>
      <View style={{ marginBottom: spacing.md }}>
        <SubjectSearch value={search} onChangeText={setSearch} placeholder="Search subjects..." />
      </View>
      {filtered.map((subject) => (
        <QuizSubjectCard key={subject.id} subject={subject} onStart={() => onStartQuiz?.(subject)} />
      ))}
    </View>
  );
}
