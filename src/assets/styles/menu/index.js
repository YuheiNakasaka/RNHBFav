import { nightModeStyle } from '../night_mode';
import { mainColor } from '../constant';

export function styles(type = false) {
  if (type) {
    return nightModeStyle;
  }

  return {
    container: {
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: mainColor,
    },
    headerTitle: {
      color: '#fff',
    },
    headerRightIcon: {
      paddingTop: 5,
      fontSize: 24,
      color: '#fff',
    },
  };
}
