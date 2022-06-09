import { View, StyleSheet } from 'react-native';
import React from 'react';
import AssetScreenTabViewSceneView from './AssetScreenTabView.SceneView';

const AssetScreenTabViewDetailsScene = () => {
  return (
    <AssetScreenTabViewSceneView>
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
    </AssetScreenTabViewSceneView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dummy: {
    margin: 20,
    backgroundColor: 'blue',
    height: 200,
  },
});

export default AssetScreenTabViewDetailsScene;
