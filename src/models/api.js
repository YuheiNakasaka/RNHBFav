import { EventEmitter } from 'events';
import {
  feedItems,
} from '../libs/hatena_feed_parser';
import OAuth from '../libs/oauth';
import { CONSUMER_KEY, CONSUMER_SECRET } from '../constants/config';
import { getUserData } from './userStorage';

// Fetch star info separately and reccursively to avoid 414 URL TOO LONG ERROR.
const eventEmitter = new EventEmitter();
let results = [];
function fetchStarReccursively(links, offset, limit) {
  if (offset > links.length) {
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
    fetchStarReccursively(links, newOffset, newLimit);
  }).catch((err) => {
    console.log(err.message);
  });
}

// get star of bookmark commemt
export function getBookmarkStar(links) {
  fetchStarReccursively(links, 0, 50);
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

  return fetch(url, myInit).then(response => feedItems(response._bodyText).then(res => res)).catch((err) => {
    console.log(err.message);
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

  return fetch(url, myInit).then(response => feedItems(response._bodyText).then(res => res)).catch((err) => {
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
