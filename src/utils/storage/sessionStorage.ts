import AsyncStorage from '@react-native-async-storage/async-storage';
import { SessionInfo } from '../../stores/types';

const sessionKey = '@session';

const sessionStorage = {
  async set(value: SessionInfo) {
    await AsyncStorage.setItem(sessionKey, JSON.stringify(value));
  },

  async get() {
    const value = await AsyncStorage.getItem(sessionKey);
    return value ? (JSON.parse(value) as SessionInfo) : null;
  },

  async clear() {
    await AsyncStorage.removeItem(sessionKey);
  },
};

export default sessionStorage;
