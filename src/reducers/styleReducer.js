import { UPDATE_STYLE_TYPE } from '../constants/style';

const initialState = {
  isNightMode: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_STYLE_TYPE: {
      return {
        ...state,
        isNightMode: action.isNightMode,
      };
    }
    default:
      return state;
  }
}
