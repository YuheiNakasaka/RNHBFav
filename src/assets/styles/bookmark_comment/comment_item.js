import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
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
    rightTopUserStars: {
      flex: 1,
      flexDirection: 'row',
    },
    rightTopUserStarsIcon: {
      color: '#F5AC0F',
      fontSize: 15,
    },
    rightTopUserStarsText: {
      color: '#F5AC0F',
    },
    rightTopCreatedAt: {
      flex: 1,
      alignItems: 'flex-end',
    },
    profileIcon: {
      width: 40,
      height: 40,
      borderRadius: 4,
    },
    rightTopUserNameText: {
      fontWeight: 'bold',
    },
    rightTopCreatedAtText: {
      color: '#999',
      fontSize: 12,
      paddingTop: 2,
    },
    commentText: {
      flexWrap: 'wrap',
      marginTop: 5,
      marginBottom: 5,
    },
    commentLink: {
      color: '#2d6bc4',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
