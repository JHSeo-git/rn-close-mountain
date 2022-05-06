import AsyncStorage from '@react-native-async-storage/async-storage';

const sessionKey = '@session';

const sessionStorage = {
  async set(value: string) {
    await AsyncStorage.setItem(sessionKey, value);
  },

  async get() {
    return await AsyncStorage.getItem(sessionKey);
  },

  async clear() {
    await AsyncStorage.removeItem(sessionKey);
  },
};

export default sessionStorage;
