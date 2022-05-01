import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: undefined;
  Main: undefined;
  Sample: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type SampleStackParamList = {
  SampleHome: undefined;
  SampleGIF: undefined;
  SampleBottomSheet: undefined;
  SampleBottomSheetModal: undefined;
  SampleMobx: undefined;
};

export type SampleStackScreenProps<T extends keyof SampleStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<SampleStackParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
