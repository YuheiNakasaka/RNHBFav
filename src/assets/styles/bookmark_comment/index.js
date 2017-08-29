import { nightModeStyle } from '../night_mode';
import { mainColor } from '../constant';

export function styles(type = false) {
  const baseStyle = {
    header: {
      backgroundColor: mainColor,
    },
    headerTitle: {
      color: '#fff',
    },
    headerIcon: {
      fontSize: 30,
      color: '#fff',
    },
    content: {
      backgroundColor: '#fff',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
