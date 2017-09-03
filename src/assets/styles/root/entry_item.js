import { nightModeStyle } from '../night_mode';

export function styles(type = false) {
  const baseStyle = {
    rootEntryLeft: {
      flex: 1,
    },
    rootEntryRight: {
      width: 85,
      paddingLeft: 5,
    },
    rootEntryLeftInnerLink: {
      flexDirection: 'row',
      marginTop: 5,
    },
    rootEntryLeftInnerLinkImage: {
      marginRight: 3,
      paddingTop: 2,
    },
    rootEntryLeftInnerLinkImageSource: {
      width: 12,
      height: 12,
    },
    rootEntryLeftInnerLinkText: {
      color: '#999',
      fontSize: 12,
    },
    rootEntryLeftInnerMeta: {
      marginTop: 5,
      flexDirection: 'row',
    },
    rootEntryLeftInnerMetaText: {
      marginRight: 3,
      color: '#999',
      fontSize: 12,
    },
    rootEntryLeftInnerMetaSubjectText: {
      paddingTop: 1,
    },
    rootEntryRightInner: {
      flex: 1,
      flexDirection: 'column',
    },
    rootEntryRightInnerImage: {
      width: 80,
      height: 60,
    },
  };

  if (type) {
    return Object.assign(baseStyle, nightModeStyle);
  }

  return baseStyle;
}
