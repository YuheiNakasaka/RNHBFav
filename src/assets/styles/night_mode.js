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
  header: {
    backgroundColor: navColor,
    borderBottomColor: navColor,
  },
  headerTitle: {
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
  description: {
    flexWrap: 'wrap',
    marginBottom: 5,
    color: textColor,
  },
  articleTitle: {
    flexWrap: 'wrap',
    color: linkColor,
  },
};
