import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const STORAGE_KEY = 'access';
const STORAGE_ID = '1';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: true,
});

export function saveAccessData(data) {
  return storage.save({
    key: STORAGE_KEY,
    id: STORAGE_ID,
    data,
  });
}

export function getAccessData() {
  return storage.load({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  }).then(res => res).catch(() => ({}));
}

export function deleteAccessData() {
  return storage.remove({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  });
}
