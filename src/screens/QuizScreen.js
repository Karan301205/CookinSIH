import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { QuizHome } from '../components/quiz/QuizHome';
import { QuizPlay } from '../components/quiz/QuizPlay';
import { QuizResults } from '../components/quiz/QuizResults';

const TOTAL_QUESTIONS = 10;

export function QuizScreen() {
  const { colors, spacing } = useTheme();
  const [state, setState] = React.useState('home');
  const [session, setSession] = React.useState(null);

  const handleStartQuiz = (subject) => {
    const answers = Array(TOTAL_QUESTIONS).fill(null);
    setSession({
      subjectId: subject.id,
      subjectName: subject.name,
      totalQuestions: TOTAL_QUESTIONS,
      currentQuestion: 0,
      answers,
    });
    setState('playing');
  };

  const handleAnswerSelect = (answerIndex) => {
    setSession((prev) => {
      if (!prev) return prev;
      const choice = String.fromCharCode(65 + answerIndex);
      const updated = [...prev.answers];
      updated[prev.currentQuestion] = choice;
      return { ...prev, answers: updated };
    });
  };

  const handleNext = () => {
    setSession((prev) => {
      if (!prev) return prev;
      if (prev.currentQuestion >= prev.totalQuestions - 1) {
        setState('results');
        return prev;
      }
      return { ...prev, currentQuestion: prev.currentQuestion + 1 };
    });
  };

  const handleRetake = () => {
    if (!session) return;
    handleStartQuiz({ id: session.subjectId, name: session.subjectName });
  };

  const handleHome = () => {
    setState('home');
    setSession(null);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Practice Quizzes" showSettings={false} />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, paddingBottom: spacing.xxl }}
        showsVerticalScrollIndicator={false}
      >
        {state === 'home' && <QuizHome onStartQuiz={handleStartQuiz} />}
        {state === 'playing' && session ? (
          <QuizPlay session={session} onAnswerSelect={handleAnswerSelect} onNext={handleNext} />
        ) : null}
        {state === 'results' && session ? (
          <QuizResults session={session} onRetake={handleRetake} onHome={handleHome} />
        ) : null}
      </ScrollView>
    </View>
  );
}
