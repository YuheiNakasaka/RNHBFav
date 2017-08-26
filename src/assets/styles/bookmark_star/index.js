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
    bookmarkCommentListItem: {
      flex: 1,
      flexDirection: 'row',
    },
    itemLeft: {
      width: 50,
    },
    itemRight: {
      flex: 1,
    },
    itemLeftInner: {
      flex: 1,
      flexDirection: 'column',
    },
    rightTop: {
      flex: 1,
      flexDirection: 'row',
    },
    rightTopUserName: {
      flex: 1,
      alignItems: 'flex-start',
      flexDirection: 'row',
    },
    rightTopUserNameText: {
      fontWeight: 'bold',
    },
    profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 4,
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
