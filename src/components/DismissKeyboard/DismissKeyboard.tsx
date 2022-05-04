import React from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

type DismissKeyboardProps = {
  children: React.ReactNode;
};

const DismissKeyboard = ({ children }: DismissKeyboardProps) => (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
