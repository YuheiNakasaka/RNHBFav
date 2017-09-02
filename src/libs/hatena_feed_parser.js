import {
  parseString,
} from 'react-native-xml2js';

import {
  bookmarkRss,
} from './response/bookmark_rss';

export function feedItems(xml) {
  return new Promise((resolve, reject) => {
    // convert xml to object
    parseString(xml, (err, result) => {
      if (err !== null) {
        reject(err);
      }

      const items = result['rdf:RDF'].item;
      // 取得するitemがもう無い時は空のarray返す
      if (items === undefined) {
        return resolve([]);
      }

      const res = items.map((item) => {
        try {
          return bookmarkRss(item);
        } catch (e) {
          console.log(e);
          return null;
        }
      }).filter(resp => resp !== null);
      return resolve(res);
    });
  });
}
