import AsyncStorage from '@react-native-async-storage/async-storage';

type KeyType = 'biometric';

const appSettingKey = '@appSetting';
const makeKey = (key: KeyType) => `${appSettingKey}_${key}`;
const allKey: KeyType[] = ['biometric'];

const AppSettingStorage = {
  async set(key: KeyType, value: boolean) {
    await AsyncStorage.setItem(makeKey(key), JSON.stringify(value));
  },

  async get(key: KeyType) {
    const value = await AsyncStorage.getItem(makeKey(key));
    return value ? (JSON.parse(value) as boolean) : false;
  },

  async clear(key: KeyType) {
    await AsyncStorage.removeItem(makeKey(key));
  },

  async clearAll() {
    await Promise.all(allKey.map(async key => await this.clear(key)));
  },
};

export default AppSettingStorage;
