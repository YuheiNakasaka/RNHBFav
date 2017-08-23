import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  if (type) {
    return nightModeStyle;
  }

  return {
    container: {
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#00A5DE',
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
