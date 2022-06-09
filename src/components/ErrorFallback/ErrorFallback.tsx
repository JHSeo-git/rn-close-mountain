import { View, Text } from 'react-native';
import React from 'react';
import type { FallbackProps } from 'react-error-boundary';

type ErrorFallbackProps = FallbackProps;

const ErrorFallback = ({ error }: ErrorFallbackProps) => {
  return (
    <View style={{ flex: 1 }}>
      <Text>{JSON.stringify(error.message, null, 2)}</Text>
    </View>
  );
};

export default ErrorFallback;
