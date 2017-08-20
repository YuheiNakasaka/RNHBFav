import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const STORAGE_KEY = 'user';
const STORAGE_ID = '1';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export function saveUserData(data) {
  return storage.save({
    key: STORAGE_KEY,
    id: STORAGE_ID,
    data,
  });
}

export function getUserData() {
  return storage.load({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  }).then(res => res);
}

export function deleteUserData() {
  return storage.remove({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  });
}
