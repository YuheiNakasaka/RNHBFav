import {
  parseString,
} from 'react-native-xml2js';
import { readableDate } from './utils';

// normal icon url
function _iconImage(creator) {
  return `http://cdn1.www.st-hatena.com/users/${creator.slice(0, 2)}/${creator}/profile.gif`;
}

// fetch article from <content:encoded />
function _fetchEntry(data) {
  const matchedTags = data.match(/<p>(.+?)<\/p>/g);
  const pTag = matchedTags[matchedTags.length - 3];
  if (pTag === undefined) return ''; // In case no ogp text
  const text = pTag.replace(/<.+?>|<\/.+?>/g, '');
  return text;
}

// fetch entry image from <content:encoded />
// 1. fetch all img tags.
// 2. check whether tag has entry-image class
// 3. fetch url from the matched tag
function _fetchEntryImage(data) {
  const matchedTags = data.match(/<img.+?\/>/g);
  return matchedTags.map((imgTag) => {
    const entryImgTag = imgTag.match(/class="entry-image"/);
    if (entryImgTag) {
      return imgTag.match(/src="(.+?)"/)[1];
    }
    return null;
  }).filter(url => url !== null)[0];
}

export function feedItems(xml) {
  return new Promise((resolve, reject) => {
    // convert xml to object
    parseString(xml, (err, result) => {
      if (err !== null) {
        reject(err);
      }

      const items = result['rdf:RDF'].item;
      const res = items.map((item) => {
        try {
          const hash = {};
          hash.uid = (new Date()).getTime();
          hash.title = item.title[0];
          hash.link = item.link[0];
          hash.bookmarkCount = item['hatena:bookmarkcount'][0];
          hash.description = item.description[0];
          hash.date = readableDate(item['dc:date'][0]);
          hash.creator = item['dc:creator'][0];
          hash.userIcon = _iconImage(hash.creator);
          hash.entry = _fetchEntry(item['content:encoded'][0]);
          hash.entryImage = _fetchEntryImage(item['content:encoded'][0]);
          return hash;
        } catch (e) {
          return null;
        }
      }).filter(resp => resp !== null);
      resolve(res);
    });
  });
}
