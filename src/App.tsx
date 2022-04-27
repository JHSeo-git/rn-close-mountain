import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Config from 'react-native-config';
import './i18n';

console.log('config', Config.API_URL, Config.NODE_ENV);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#000' : '#fff',
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}
      >
        <View style={backgroundStyle}>
          <Text>App</Text>
        </View>
        <View style={backgroundStyle}>
          <Text>{Config.NODE_ENV ?? 'not get'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
