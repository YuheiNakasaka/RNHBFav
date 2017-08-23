import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
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
    content: {
      backgroundColor: '#fff',
    },
    footer: {
      height: 40,
    },
    footerBackButton: {
      backgroundColor: 'transparent',
    },
    footerBackIcon: {
      fontSize: 30,
      color: '#2d6bc4',
    },
    footerBackIconDisabled: {
      fontSize: 30,
      color: '#ccc',
    },
    footerRefreshButtonIcon: {
      fontSize: 24,
      color: '#2d6bc4',
    },
    footerBookmarkButtonIcon: {
      fontSize: 24,
      color: '#2d6bc4',
    },
    footerShareButtonIcon: {
      fontSize: 20,
      color: '#2d6bc4',
    },
    bookmarkCountText: {
      color: '#2d6bc4',
      fontWeight: 'bold',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
