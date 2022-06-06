import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/design-token';
import StatsScreenTabView from './StatsScreenTabView';

const StatsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatsScreenTabView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default StatsScreen;
