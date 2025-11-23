import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../theme';
import { Header } from '../components/navigation/Header';
import { ChatMessages } from '../components/tutor/ChatMessages';
import { TutorQuickActions } from '../components/tutor/QuickActions';
import { ChatInput } from '../components/tutor/ChatInput';

const INITIAL_MESSAGE = {
  id: '1',
  role: 'assistant',
  content: "Hi! I'm your AI tutor. I can help you with any subject - just ask me a question!",
  timestamp: Date.now(),
};

export function TutorScreen() {
  const { colors } = useTheme();
  const [messages, setMessages] = React.useState([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const typingTimeout = React.useRef(null);

  const pushMessage = React.useCallback((message) => {
    setMessages((prev) => [...prev, message]);
  }, []);

  const simulateResponse = React.useCallback(() => {
    typingTimeout.current = setTimeout(() => {
      pushMessage({
        id: `${Date.now()}-assistant`,
        role: 'assistant',
        content:
          "That's a great question! Let me explain this in detail...\n\n**Key Points:**\n• First important concept\n• Second important concept\n• Third important concept\n\nWould you like me to dive deeper into any of these points?",
        timestamp: Date.now(),
      });
      setIsTyping(false);
    }, 1500);
  }, [pushMessage]);

  const handleSend = React.useCallback(
    (text) => {
      const trimmed = text.trim();
      if (!trimmed || isTyping) {
        return;
      }

      pushMessage({
        id: `${Date.now()}-user`,
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      });
      setInputValue('');
      setIsTyping(true);

      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }

      simulateResponse();
    },
    [isTyping, pushMessage, simulateResponse],
  );

  React.useEffect(() => {
    return () => {
      if (typingTimeout.current) {
        clearTimeout(typingTimeout.current);
      }
    };
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Header title="Ask Your Tutor" subtitle="Offline SLM - Always Available" showSettings={false} />
      <View style={{ flex: 1 }}>
        <ChatMessages messages={messages} isTyping={isTyping} />
        {messages.length === 1 ? (
          <TutorQuickActions onSelect={handleSend} />
        ) : null}
      </View>
      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        isLoading={isTyping}
      />
    </View>
  );
}
