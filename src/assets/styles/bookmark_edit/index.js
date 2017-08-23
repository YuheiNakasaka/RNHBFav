import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    container: {
      backgroundColor: '#fff',
    },
    header: {
      backgroundColor: '#00A5DE',
    },
    headerIcon: {
      fontSize: 30,
      color: '#fff',
    },
    headerBodyText: {
      color: '#fff',
    },
    keyboardView: {
      backgroundColor: '#fff',
    },
    commentInput: {
      color: '#000',
    },
    placeholderTextColor: {
      color: '#999',
    },
    addButtonText: {
      color: '#fff',
    },
    editButtonText: {
      color: '#fff',
    },
    deleteButtonText: {
      color: '#fff',
    },
    twitterIcon: {
      fontSize: 24,
      color: '#aaa',
    },
    twitterIconClicked: {
      fontSize: 24,
      color: '#1da1f2',
    },
    accountIcon: {
      fontSize: 24,
    },
    privacyText: {
      marginLeft: 5,
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
