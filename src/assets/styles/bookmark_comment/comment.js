import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    listWrap: {
      flex: 1,
    },
    list: {
      backgroundColor: '#fff',
    },
    listWrapPopularComments: {
      padding: 5,
      backgroundColor: '#aaa',
    },
    listWrapPopularCommentsText: {
      color: '#fff',
    },
    listWrapAllComments: {
      padding: 5,
      backgroundColor: '#aaa',
    },
    listWrapAllCommentsText: {
      color: '#fff',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
