import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    container: {
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#00A5DE',
    },
    headerTitle: {
      color: '#fff',
    },
    headerIcon: {
      fontSize: 30,
      color: '#fff',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
