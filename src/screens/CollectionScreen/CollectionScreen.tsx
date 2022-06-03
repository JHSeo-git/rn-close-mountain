import { StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../components/Header';

const CollectionScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="test" />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CollectionScreen;
