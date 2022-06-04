import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { COLORS, SPACE } from '../../constants/design-token';
import { useStore } from '../../contexts/StoreContext';
import type { HomeStackScreenProps } from '../types';
import CollectionScreenView from './CollectionScreenView';

type CollectionScreenProps = HomeStackScreenProps<'Collection'>;

const CollectionScreen = observer(({ navigation, route }: CollectionScreenProps) => {
  const { collectionStore } = useStore();
  const { retrieveCollection } = collectionStore;

  useEffect(() => {
    retrieveCollection({ connection_slug: route.params.collectionSlug });
  }, []);

  return (
    <CollectionScreenView>
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
      <View style={styles.dummy} />
    </CollectionScreenView>
  );
});

const styles = StyleSheet.create({
  dummy: {
    height: 300,
    backgroundColor: COLORS.gray10,
    marginTop: 20,
  },
});

export default CollectionScreen;
