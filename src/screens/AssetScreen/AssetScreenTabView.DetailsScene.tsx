import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const AssetScreenTabViewDetailsScene = () => {
  return (
    <View style={{ flexGrow: 1 }}>
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
    </View>
  );
};

const styles = StyleSheet.create({
  dummy: {
    margin: 20,
    backgroundColor: 'red',
    height: 200,
  },
});

export default AssetScreenTabViewDetailsScene;
