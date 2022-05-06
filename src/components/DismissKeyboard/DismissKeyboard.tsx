import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

type DismissKeyboardProps = {
  children: React.ReactNode;
};

const DismissKeyboard = ({ children }: DismissKeyboardProps) => (
  <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  </TouchableWithoutFeedback>
);

export default DismissKeyboard;
