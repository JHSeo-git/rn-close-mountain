import { createContext, useContext } from 'react';
import RootStore from '../stores/RootStore';

const StoreContext = createContext<RootStore | null>(null);

type Props = {
  children: React.ReactNode;
};

export function StoreContextProvider({ children }: Props) {
  const store = new RootStore();

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}

export function useStore() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('You have forgotten to use StoreProvider, go fish');
  }

  return store;
}
