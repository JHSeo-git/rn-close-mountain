import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { isKeyboardFrameT } from './DismissKeyboard.types';

type DismissKeyboardProps = {
  children: React.ReactNode;
  setKeyboardHeight?: (height: number) => void;
};

const DismissKeyboard = ({ children, setKeyboardHeight }: DismissKeyboardProps) => {
  const handleKeyboardWillShowHide = (frame: Object, show: boolean) => {
    if (isKeyboardFrameT(frame)) {
      if (setKeyboardHeight) {
        setKeyboardHeight(show ? frame.endCoordinates.height : 0);
      }
    }
  };

  return (
    <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps="handled"
        onKeyboardWillShow={frame => handleKeyboardWillShowHide(frame, true)}
        onKeyboardWillHide={frame => handleKeyboardWillShowHide(frame, false)}
        contentContainerStyle={{ flex: 1 }}
      >
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
};

export default DismissKeyboard;
