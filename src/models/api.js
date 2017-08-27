import { EventEmitter } from 'events';
import {
  feedItems,
} from '../libs/hatena_feed_parser';
import OAuth from '../libs/oauth';
import { CONSUMER_KEY, CONSUMER_SECRET } from '../constants/config';
import { getUserData } from './userStorage';
import { alert } from '../libs/utils';

// Fetch star info separately and reccursively to avoid 414 URL TOO LONG ERROR.
const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(0);
let results = [];
function _fetchStarReccursively(links, offset, limit) {
  if (offset > links.length) {
    // set name to entry object to use comments feed.
    results = results.map((result) => {
      result.name = result.uri.match(/http:\/\/b\.hatena\.ne\.jp\/(.+)\/.+/)[1];
      return result;
    });

    eventEmitter.emit('onFinishReccursiveFetch');
    return;
  }

  const query = links.slice(offset, limit).join('&');
  const url = `http://s.hatena.com/entry.json?${query}`;

  const myInit = {
    method: 'GET',
    headers: {
      pragma: 'no-cache',
      'cache-control': 'no-cache',
    },
  };

  fetch(url, myInit).then((response) => {
    const newOffset = offset + 50;
    const newLimit = limit + 50;
    results = results.concat(JSON.parse(response._bodyText).entries);
    _fetchStarReccursively(links, newOffset, newLimit);
  }).catch((err) => {
    console.log(err.message);
  });
}

function _assignStarInfoToItems(items) {
  // generate bookmark comment uri
  const query = items.map((item) => {
    const bCommentUrl = encodeURIComponent(item.bookmarkCommentUrl);
    return `uri=${bCommentUrl}`;
  });

  // assign star info to each items
  return getBookmarkStar(query).then(resp => items.map((item) => {
    resp.entries.map((entry) => {
      // ブコメページと違いTLは同一ユーザーもいるのでnameチェックではユニークにならない
      // よってurlで同一性とユニーク性をチェック
      if (entry.uri === item.bookmarkCommentUrl) {
        item.stars = entry.stars ? entry.stars : [];
        item.colored_stars = entry.colored_stars ? entry.colored_stars : [];
      }
    });
    return item;
  }));
}

// get star of bookmark commemt
export function getBookmarkStar(links) {
  if (results.length > 0) results = [];
  _fetchStarReccursively(links, 0, 50);
  return new Promise((resolve, reject) => {
    try {
      eventEmitter.addListener('onFinishReccursiveFetch', () => {
        resolve({ entries: results });
      });
    } catch (e) {
      reject(e);
    }
  });
}

// fetch user favorites feed as xml data
export function fetchFavorites(userId, offset) {
  const myInit = {
    method: 'GET',
    headers: {
      pragma: 'no-cache',
      'cache-control': 'no-cache',
    },
  };

  const url = `http://b.hatena.ne.jp/${userId}/favorite.rss?of=${offset}&with_me=1`;

  return fetch(url, myInit).then(response => feedItems(response._bodyText).then(res => res).then(items => _assignStarInfoToItems(items))).catch((err) => {
    console.log(err.message);
    alert('ネットワークエラー', '電波環境が良くなってから再度お試しください');
    throw err.message;
  });
}

// fetch own bookmars as xml data
export function fetchMyBookmarks(userId, offset) {
  const myInit = {
    method: 'GET',
    headers: {
      pragma: 'no-cache',
      'cache-control': 'no-cache',
    },
  };

  const url = `http://b.hatena.ne.jp/${userId}/rss?of=${offset}`;

  return fetch(url, myInit).then(response => feedItems(response._bodyText).then(res => res).then(items => _assignStarInfoToItems(items))).catch((err) => {
    console.log(err.message);
  });
}

// get bookmark info
export function fetchBookmarkInfo(url) {
  return getUserData().then((res) => {
    const { oauth_token, oauth_token_secret } = res;
    const oauth = new OAuth({
      method: 'GET',
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
    });
    return oauth.request(
      'GET',
      'http://b.hatena.ne.jp/entry/jsonlite/',
      oauth_token,
      oauth_token_secret,
      { url },
    ).then(resp => resp).catch((e) => {
      console.log(e);
    });
  });
}

// get my bookmark
export function fetchMyBookmark(url) {
  return getUserData().then((res) => {
    const { oauth_token, oauth_token_secret } = res;
    const oauth = new OAuth({
      method: 'GET',
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
    });
    return oauth.request(
      'GET',
      'http://api.b.hatena.ne.jp/1/my/bookmark',
      oauth_token,
      oauth_token_secret,
      { url },
    ).then(resp => resp).catch(() => ({}));
  });
}

// post my bookmark
export function postMyBookmark(url, comment, isPrivate = false, postTwitter = false) {
  const params = {
    url,
    comment,
  };

  if (isPrivate) {
    params.private = isPrivate;
  }

  if (postTwitter) {
    params.post_twitter = postTwitter;
  }

  return getUserData().then((res) => {
    const { oauth_token, oauth_token_secret } = res;
    const oauth = new OAuth({
      method: 'POST',
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
    });
    return oauth.request(
      'POST',
      'http://api.b.hatena.ne.jp/1/my/bookmark',
      oauth_token,
      oauth_token_secret,
      params,
    ).then(resp => resp).catch((e) => {
      console.log(e);
    });
  });
}

// delete my bookmark
export function deleteMyBookmark(url) {
  return getUserData().then((res) => {
    const { oauth_token, oauth_token_secret } = res;
    const oauth = new OAuth({
      method: 'DELETE',
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
    });
    return oauth.request(
      'DELETE',
      'http://api.b.hatena.ne.jp/1/my/bookmark',
      oauth_token,
      oauth_token_secret,
      { url },
    ).then(resp => resp).catch((e) => {
      console.log(e);
    });
  });
}
