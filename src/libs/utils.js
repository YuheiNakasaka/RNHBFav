import { Alert } from 'react-native';
import moment from 'moment';

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

export function truncate(title) {
  if (title === undefined) return '';
  if (title.length < 10) return title;
  return `${title.slice(0, 10)}...`;
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
