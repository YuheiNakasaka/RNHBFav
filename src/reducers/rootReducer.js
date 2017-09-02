import { UPDATE_FEED_ITEMS, UPDATE_USER, UPDATE_LOADING, UPDATE_FEED_TYPE } from '../constants/root';

const initialState = {
  user: {},
  items: [],
  feedType: 'timeline',
  offset: 0,
  loading: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_FEED_ITEMS: {
      const items = action.offset > 0 ? state.items.concat(action.items) : action.items;
      return {
        ...state,
        items,
        feedType: action.feedType,
        offset: action.offset,
        loading: action.loading,
      };
    }
    case UPDATE_FEED_TYPE: {
      return {
        ...state,
        feedType: action.feedType,
      };
    }
    case UPDATE_USER: {
      return {
        ...state,
        user: action.user,
      };
    }
    case UPDATE_LOADING: {
      return {
        ...state,
        loading: action.loading,
      };
    }
    default:
      return state;
  }
}
