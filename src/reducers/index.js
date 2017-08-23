import { combineReducers } from 'redux';
import rootData from './rootReducer';
import styleData from './styleReducer';

const rootReducer = combineReducers({
  rootData,
  styleData,
});

export default rootReducer;
