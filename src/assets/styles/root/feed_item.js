import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    left: {
      width: 50,
    },
    right: {
      flex: 1,
    },
    leftInner: {
      flex: 1,
      flexDirection: 'column',
    },
    userIcon: {
      width: 40,
      height: 40,
      borderRadius: 4,
    },
    rightTop: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 5,
    },
    rightTopUserName: {
      flex: 1,
      alignItems: 'flex-start',
    },
    rightTopCreatedAt: {
      flex: 1,
      alignItems: 'flex-end',
    },
    rightTopUserNameText: {
      fontWeight: 'bold',
    },
    rightTopCreatedAtText: {
      color: '#999',
      fontSize: 12,
      paddingTop: 2,
    },
    description: {
      flexWrap: 'wrap',
      marginBottom: 5,
    },
    articleTitle: {
      flexWrap: 'wrap',
      color: '#2d6bc4',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
