import { UPDATE_FEED_ITEMS, UPDATE_USER, UPDATE_LOADING } from '../constants/root';
import { fetchFavorites, fetchMyBookmarks } from '../models/api';

export function fetchFavoriteFeed(userId, offset) {
  return fetchFavorites(userId, offset).then(resp => ({
    type: UPDATE_FEED_ITEMS,
    items: resp,
    feedType: 'timeline',
    offset,
    loading: false,
  }));
}

export function fetchMyBookmarkFeed(userId, offset) {
  return fetchMyBookmarks(userId, offset).then(resp => ({
    type: UPDATE_FEED_ITEMS,
    items: resp,
    feedType: 'myBookmark',
    offset,
    loading: false,
  }));
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
