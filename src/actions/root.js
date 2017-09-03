import { UPDATE_FEED_ITEMS, UPDATE_USER, UPDATE_LOADING, UPDATE_FEED_TYPE } from '../constants/root';
import { fetchFavorites, fetchMyBookmarks, fetchHotEntry, fetchNewEntry } from '../models/api';

export function fetchFavoriteFeed(userId, offset) {
  return fetchFavorites(userId, offset).then(items => ({
    type: UPDATE_FEED_ITEMS,
    items,
    feedType: 'timeline',
    offset,
    loading: false,
  }));
}

export function fetchMyBookmarkFeed(userId, offset) {
  return fetchMyBookmarks(userId, offset).then(items => ({
    type: UPDATE_FEED_ITEMS,
    items,
    feedType: 'myBookmark',
    offset,
    loading: false,
  }));
}

export function fetchHotEntryFeed(category) {
  return fetchHotEntry(category).then(items => ({
    type: UPDATE_FEED_ITEMS,
    items,
    feedType: `hotEntry:${category}`,
    loading: false,
  }));
}

export function fetchNewEntryFeed(category) {
  return fetchNewEntry(category).then(items => ({
    type: UPDATE_FEED_ITEMS,
    items,
    feedType: `newEntry:${category}`,
    loading: false,
  }));
}

export function updateFeedType(feedType) {
  return {
    type: UPDATE_FEED_TYPE,
    feedType,
  };
}

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}

export function updateLoading(loading) {
  return {
    type: UPDATE_LOADING,
    loading,
  };
}
