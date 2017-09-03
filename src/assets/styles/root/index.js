import { nightModeStyle } from '../night_mode';
import { mainColor } from '../constant';

export function styles(type = false) {
  const baseStyle = {
    container: {
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: mainColor,
    },
    headerBody: {
      flex: 0,
    },
    headerTitle: {
      color: '#fff',
    },
    headerLoginIcon: {
      fontSize: 24,
      color: '#fff',
    },
    headerUserIcon: {
      width: 30,
      height: 30,
      borderRadius: 15,
    },
    headerRightIcon: {
      fontSize: 24,
      color: '#fff',
    },
    headerRightButtonText: {
      color: '#fff',
    },
    urlBoxLeft: {
      backgroundColor: '#fff',
    },
    urlBoxButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
