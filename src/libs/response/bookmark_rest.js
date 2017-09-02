// はてぶREST APIのレスポンス
export function bookmarkRest(item) {
  const hash = {};
  hash.bookmarks = item.bookmarks;
  hash.count = item.count;
  hash.eid = item.eid;
  hash.entry_url = item.entry_url;
  hash.screenshot = item.screenshot;
  hash.title = item.title;
  hash.url = item.url;
  return hash;
}
