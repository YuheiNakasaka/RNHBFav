import { nightModeStyle } from '../night_mode';
import { mainColor } from '../constant';

export function styles(type = false) {
  const baseStyle = {
    header: {
      backgroundColor: mainColor,
    },
    headerTitle: {
      color: '#fff',
    },
    headerBackIcon: {
      fontSize: 30,
      color: '#fff',
    },
    content: {
      backgroundColor: '#fff',
    },
    userBar: {
      flex: 1,
      flexDirection: 'row',
      marginBottom: 10,
      paddingTop: 10,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 10,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
    userBarLeft: {
      width: 50,
    },
    userBarRight: {
      flex: 1,
    },
    userBarRightInner: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    userBarRightInnerText: {
      fontWeight: 'bold',
    },
    userIcon: {
      width: 40,
      height: 40,
      borderRadius: 4,
    },
    description: {
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    descriptionLink: {
      color: '#2d6bc4',
    },
    entryTitle: {
      flexWrap: 'wrap',
      fontSize: 16,
      color: '#2d6bc4',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
    },
    entryWrap: {
      flex: 1,
      flexDirection: 'row',
    },
    entryLeft: {
      flex: 0.8,
    },
    entryLeftNonImg: {
      flex: 1,
    },
    entryRight: {
      flex: 0.2,
    },
    entryText: {
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      fontSize: 12,
      color: '#777',
    },
    entryImage: {
      width: 60,
      height: 60,
    },
    entryLink: {
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 5,
    },
    entryLinkText: {
      fontSize: 12,
      color: '#777',
    },
    entryMeta: {
      flex: 1,
      flexDirection: 'row',
    },
    entryDate: {
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      flexDirection: 'row',
    },
    entryDateText: {
      fontSize: 12,
      color: '#777',
    },
    entryStars: {
      flexDirection: 'row',
    },
    entryStarsIcon: {
      color: '#F5AC0F',
      fontSize: 12,
      paddingTop: 2,
    },
    entryStarsText: {
      color: '#F5AC0F',
      fontSize: 12,
      paddingTop: 1,
    },
    bookmarkCount: {
      flexWrap: 'wrap',
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderTopColor: '#eee',
      borderTopWidth: 1,
      borderBottomColor: '#eee',
      borderBottomWidth: 1,
    },
    bookmarkCountText: {
      fontSize: 16,
      color: '#2d6bc4',
    },
    footer: {
      height: 40,
      justifyContent: 'flex-end',
    },
    footerBookmarkButtonIcon: {
      fontSize: 24,
      color: '#2d6bc4',
    },
    footerShareButtonIcon: {
      fontSize: 20,
      color: '#2d6bc4',
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
