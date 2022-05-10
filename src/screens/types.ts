import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  MainTab: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Setting: undefined;
  Sample: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, T>;

export type MainTabParamList = {
  HomeStack: undefined;
  Rankings: undefined;
  Search: undefined;
  Profile: undefined;
  More: undefined;
};

export type MainTabScreenProps<T extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >;

export type HomeStackParamList = {
  Home: undefined;
};

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<HomeStackParamList, T>,
    MainTabScreenProps<keyof MainTabParamList>
  >;

// -------------- SAMPLE ----------------
export type SampleStackParamList = {
  SampleHome: undefined;
  SampleGIF: undefined;
  SampleBottomSheet: undefined;
  SampleBottomSheetModal: undefined;
  SampleMobx: undefined;
  SampleBiometric: undefined;
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
