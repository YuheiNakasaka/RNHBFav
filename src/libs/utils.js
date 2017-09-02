import { Alert } from 'react-native';
import moment from 'moment';

export function isUrl(text) {
  return text.match(/^http[s]*:\/\/.+/);
}

export function bookmarkCommentUrl(eid, user, timestamp) {
  const date = timestamp.split(' ')[0].replace(/\//g, '');
  return `http://b.hatena.ne.jp/${user}/${date}#bookmark-${eid}`;
}

export function profileIcon(creatorName) {
  return `http://cdn1.www.st-hatena.com/users/${creatorName.slice(0, 2)}/${creatorName}/profile.gif`;
}

export function readableDate(date) {
  const relativeTime = moment(date, 'YYYYMMDDHHmmss').startOf('second').fromNow();
  return relativeTime;
}

export function truncate(title, pos = 10) {
  if (title === undefined) return '';
  if (title.length < pos) return title;
  return `${title.slice(0, pos)}...`;
}

// まれにキャッシュかなにかの問題でstarの結果とbookmarkの結果の個数が違うことがあるので
// 確認を入念にする
export function validCount(item) {
  if (item) {
    return item.length;
  }
  return 0;
}

// match interface with rss response
export function itemObject(response, url) {
  if (response === null) {
    return {
      title: url,
      link: url,
      bookmarkCount: 0,
    };
  }

  return {
    title: response.title,
    link: url,
    bookmarkCount: response.count,
  };
}

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function alert(title = '', msg = '') {
  Alert.alert(
    title,
    msg,
    [
      { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
      { text: 'OK', onPress: () => console.log('OK Pressed') },
    ],
    { cancelable: false },
  );
}
