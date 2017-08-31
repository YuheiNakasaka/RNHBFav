import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';

const STORAGE_KEY = 'url';
const STORAGE_ID = '1';

const storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 60 * 60 * 24, // 1日
  enableCache: true,
});

export function saveUrlData(data = {}) {
  return storage.save({
    key: STORAGE_KEY,
    id: STORAGE_ID,
    data,
  });
}

export function getUrlData() {
  return storage.load({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  }).then(res => res);
}

export function deleteUrlData() {
  return storage.remove({
    key: STORAGE_KEY,
    id: STORAGE_ID,
  });
}
