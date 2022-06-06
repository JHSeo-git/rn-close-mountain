import { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../contexts/StoreContext';
import type { HomeStackScreenProps } from '../types';
import CollectionScreenView from './CollectionScreenView';
import CollectionScreenCustomTabView from './CollectionScreenCustomTabView';

type CollectionScreenProps = HomeStackScreenProps<'Collection'>;

const CollectionScreen = observer(({ navigation, route }: CollectionScreenProps) => {
  const { collectionStore } = useStore();
  const { retrieveCollection, retrieveSelectedCollections } = collectionStore;

  useEffect(() => {
    retrieveCollection({ connection_slug: route.params.collectionSlug });
    retrieveSelectedCollections();
  }, []);

  return (
    <CollectionScreenView>
      <CollectionScreenCustomTabView />
    </CollectionScreenView>
  );
});

export default CollectionScreen;
