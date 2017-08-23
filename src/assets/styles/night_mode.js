const navColor = '#1B2737';
const baseColor = '#151E29';
const linkColor = '#2d6bc4';// Twitterの本家リンク色は強すぎかも '#1D8DEE';
const textColor = '#ffffff';
const grayColor = '#677483';
const dividerColor = '#000000';

export const nightModeStyle = {
  container: {
    backgroundColor: baseColor,
  },
  content: {
    backgroundColor: baseColor,
  },
  header: {
    backgroundColor: navColor,
    borderBottomColor: navColor,
  },
  headerTitle: {
    color: textColor,
  },
  headerBackIcon: {
    fontSize: 30,
    color: textColor,
  },
  headerUserIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  headerLoginIcon: {
    fontSize: 24,
    color: textColor,
  },
  headerRightIcon: {
    paddingTop: 5,
    fontSize: 24,
    color: textColor,
  },
  textColor: {
    color: textColor,
  },
  list: {
    backgroundColor: baseColor,
    borderBottomColor: dividerColor,
  },
  listItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: navColor,
    borderBottomColor: baseColor,
  },
  footer: {
    height: 40,
    justifyContent: 'flex-end',
    backgroundColor: navColor,
    borderTopColor: navColor,
  },

  // root
  feedListItem: {
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: baseColor,
    borderBottomColor: dividerColor,
  },
  listItemDivider: {
    backgroundColor: baseColor,
  },
  rightTopUserNameText: {
    fontWeight: 'bold',
    color: textColor,
  },
  rightTopCreatedAtText: {
    color: grayColor,
    fontSize: 12,
    paddingTop: 2,
  },
  descriptionText: {
    flexWrap: 'wrap',
    marginBottom: 5,
    color: textColor,
  },
  articleTitle: {
    flexWrap: 'wrap',
    color: linkColor,
  },

  // bookmark detail screen
  userBar: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomColor: navColor,
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
    color: textColor,
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 4,
  },
  entryTitle: {
    flexWrap: 'wrap',
    fontSize: 16,
    color: linkColor,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  entryText: {
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    fontSize: 12,
    color: grayColor,
  },
  entryLinkText: {
    fontSize: 12,
    color: grayColor,
  },
  entryDateText: {
    fontSize: 12,
    color: grayColor,
  },
  bookmarkCount: {
    flexWrap: 'wrap',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    paddingTop: 10,
    paddingBottom: 10,
    borderTopColor: navColor,
    borderTopWidth: 1,
    borderBottomColor: navColor,
    borderBottomWidth: 1,
  },
  bookmarkCountText: {
    fontSize: 16,
    color: linkColor,
  },
  footerBookmarkButtonIcon: {
    fontSize: 24,
    color: textColor,
  },
  footerShareButtonIcon: {
    fontSize: 20,
    color: textColor,
  },

  // bookmark comment
  listWrapPopularComments: {
    padding: 5,
    backgroundColor: grayColor,
  },
  listWrapPopularCommentsText: {
    color: textColor,
  },
  listWrapAllComments: {
    padding: 5,
    backgroundColor: grayColor,
  },
  listWrapAllCommentsText: {
    color: textColor,
  },
  commentText: {
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 5,
    color: textColor,
  },
  bookmarkCommentListItem: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: 0,
    paddingLeft: 15,
    backgroundColor: navColor,
    borderBottomColor: baseColor,
  },
};
