import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Brain, Mail, Lock, Chrome } from 'lucide-react-native';
import { useTheme } from '../../theme';
import { CardButton } from '../../components/shared/CardButton';
import { LabeledIconInput } from '../../components/shared/LabeledIconInput';

export function LoginScreen() {
  const { colors, radii, spacing, typography } = useTheme();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleLogin = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate('MainTabs');
    }, 800);
  };

  return (
    <LinearGradient
      colors={[colors.muted, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.select({ ios: 'padding', android: undefined })}
        >
          <ScrollView
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: spacing.lg,
              paddingVertical: spacing.xl,
            }}
            keyboardShouldPersistTaps="handled"
          >
            <View
              style={{
                width: '100%',
                maxWidth: 360,
                backgroundColor: colors.card,
                borderRadius: radii.xl,
                padding: spacing.xl,
                borderWidth: 1,
                borderColor: colors.border,
                shadowColor: '#000000',
                shadowOpacity: 0.05,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 4,
              }}
            >
              <View style={{ alignItems: 'center', marginBottom: spacing.xl }}>
                <View
                  style={{
                    backgroundColor: colors.primary,
                    padding: spacing.md,
                    borderRadius: radii.xl,
                    marginBottom: spacing.md,
                  }}
                >
                  <Brain size={32} color={colors.primaryForeground} />
                </View>
                <Text
                  style={{
                    fontFamily: typography.family,
                    fontWeight: typography.weightBold,
                    fontSize: 28,
                    color: colors.foreground,
                  }}
                >
                  Welcome Back
                </Text>
                <Text
                  style={{
                    fontFamily: typography.family,
                    color: colors.mutedForeground,
                    fontSize: 14,
                    marginTop: 4,
                  }}
                >
                  Continue your learning journey
                </Text>
              </View>

              <LabeledIconInput
                label="Email Address"
                icon={Mail}
                value={email}
                onChangeText={setEmail}
                placeholder="you@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <LabeledIconInput
                label="Password"
                icon={Lock}
                value={password}
                onChangeText={setPassword}
                placeholder="••••••••"
                secureTextEntry
              />

              <CardButton
                variant="primary"
                size="lg"
                style={{ marginTop: spacing.sm }}
                disabled={loading || !email || !password}
                onPress={handleLogin}
              >
                {loading ? 'Logging in...' : 'Login'}
              </CardButton>

              <View style={styles.divider}>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
                <Text style={[styles.dividerText, { color: colors.mutedForeground }]}>Or</Text>
                <View style={[styles.dividerLine, { backgroundColor: colors.border }]} />
              </View>

              <CardButton
                variant="outline"
                size="lg"
                onPress={() => {}}
                contentStyle={{ justifyContent: 'center' }}
              >
                <Chrome size={20} color={colors.foreground} />
                Continue with Google
              </CardButton>

              <View style={{ alignItems: 'center', marginTop: spacing.lg }}>
                <Text style={{ color: colors.mutedForeground, fontFamily: typography.family, fontSize: 13 }}>
                  Don't have an account?
                  <Text
                    style={{ color: colors.primary, fontWeight: typography.weightMedium }}
                    onPress={() => navigation.navigate('Signup')}
                  >
                    {' '}Create one
                  </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    marginHorizontal: 12,
    fontSize: 12,
    letterSpacing: 1,
  },
});
