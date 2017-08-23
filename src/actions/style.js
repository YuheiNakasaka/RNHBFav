import { UPDATE_STYLE_TYPE } from '../constants/style';
import { saveStyleData } from '../models/styleStorage';

export function updateStyleType(isNightMode) {
  return saveStyleData({ isNightMode }).then(() => ({
    type: UPDATE_STYLE_TYPE,
    isNightMode,
  }));
}
