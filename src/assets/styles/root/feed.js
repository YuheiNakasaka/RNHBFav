import { Dimensions } from 'react-native';
import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    feedList: {
      backgroundColor: '#fff',
      height: (Dimensions.get('window').height - 64),
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
