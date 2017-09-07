import { nightModeStyle } from '../night_mode';
import { mainColor } from '../constant';

export function styles(type = false) {
  const baseStyle = {
    header: {
      backgroundColor: mainColor,
    },
    headerBody: {
      flex: 0,
      width: 240,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 12,
    },
    headerIcon: {
      fontSize: 30,
      color: '#fff',
    },
    headerRightIcon: {
      paddingTop: 5,
      fontSize: 24,
      color: '#fff',
    },
    content: {
      backgroundColor: '#fff',
    },
    wkWebview: {
      flex: 1,
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
