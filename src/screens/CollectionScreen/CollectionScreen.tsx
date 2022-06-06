import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import type { HomeStackScreenProps } from '../types';
import CollectionScreenView from './CollectionScreenView';
import CollectionScreenTabView from './CollectionScreenTabView';
import CollectionScreenCustomTabView from './CollectionScreenCustomTabView';
import CollectionScreenHeader from './CollectionScreenHeader';
import useSkeletonItems from '../../hooks/useSkeletonItems';

type CollectionScreenProps = HomeStackScreenProps<'Collection'>;

const CollectionScreen = observer(({ navigation, route }: CollectionScreenProps) => {
  const { collectionStore } = useStore();
  const { retrieveCollection, retrieveSelectedCollections } = collectionStore;

  useEffect(() => {
    retrieveCollection({ connection_slug: route.params.collectionSlug });
    retrieveSelectedCollections();
  }, []);

  const items = useSkeletonItems();

  return (
    <CollectionScreenView>
      <CollectionScreenCustomTabView />
    </CollectionScreenView>
    // <View style={{ flex: 1 }}>
    //   <CollectionScreenHeader />
    //   <FlatList data={items} renderItem={({ item, index }) => <View style={styles.dummy} />} />
    // </View>
  );
});

const styles = StyleSheet.create({
  main: {
    marginTop: 20,
  },
  dummy: {
    marginVertical: 20,
    paddingHorizontal: 20,
    height: 100,
    backgroundColor: 'red',
  },
});

export default CollectionScreen;
