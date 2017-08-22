import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import CommentItem from './CommentItem';
import { fetchBookmarkInfo, getBookmarkStar } from '../../models/api';
import { bookmarkCommentUrl } from '../../libs/utils';
import MySpinner from '../CommonComponent/Spinner';
import { styles } from '../../assets/styles/bookmark_comment/comment';

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      link: this.props.link,
      entry: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetchBookmarkInfo(this.state.link).then((info) => {
      this.assignStarsToBookmarkInfo(info);
    });
  }

  validCount(obj) {
    if (obj === undefined) return 0;
    return obj.length;
  }

  assignStarsToBookmarkInfo(info) {
    // generate bookmark comment uri
    const query = info.bookmarks.map((bookmark) => {
      const bCommentUrl = encodeURIComponent(bookmarkCommentUrl(info.eid, bookmark.user, bookmark.timestamp));
      return `uri=${bCommentUrl}`;
    });

    // fetch bookmark stars and asign the star infomartion to each comment info
    getBookmarkStar(query).then((stars) => {
      info.bookmarks.map((bookmark, i) => {
        stars.entries.map((entry) => {
          if (bookmark.user === entry.name) {
            info.bookmarks[i].stars = this.validCount(entry.stars);
            info.bookmarks[i].colored_stars = this.validCount(entry.colored_stars);
          }
        });
      });
    }).then(() => {
      this.setState({ entry: info, isLoading: false });
    }).catch((e) => {
      console.log(e);
    });
  }

  popularCommentsComponent() {
    if (this.state.entry !== null) {
      // fetch top 10 starred bookmarks
      const bookmarks = this.state.entry.bookmarks
        .filter(bm => bm.comment !== '' && (bm.stars + bm.colored_stars) > 0)
        .sort((a, b) => (b.stars + b.colored_stars) - (a.stars + a.colored_stars))
        .slice(0, 10);

      if (bookmarks.length === 0) return null;
      return (
        <View>
          <View style={styles.listWrapPopularComments}>
            <Text style={styles.listWrapPopularCommentsText}>人気</Text>
          </View>
          <FlatList
            style={styles.list}
            data={bookmarks}
            renderItem={({ item }) => (
              <CommentItem item={item} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
    return null;
  }

  commentsComponent() {
    if (this.state.entry !== null) {
      return (
        <View>
          <View style={styles.listWrapAllComments}>
            <Text style={styles.listWrapAllCommentsText}>全て</Text>
          </View>
          <FlatList
            style={styles.list}
            data={this.state.entry.bookmarks}
            renderItem={({ item }) => (
              <CommentItem item={item} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
    return null;
  }

  spinnerComponent() {
    if (this.state.isLoading) {
      return (
        <MySpinner isLoading={this.state.isLoading} />
      );
    }
    return null;
  }

  render() {
    return (
      <View style={styles.listWrap}>
        { this.spinnerComponent() }
        { this.popularCommentsComponent() }
        { this.commentsComponent() }
      </View>
    );
  }
}

Comment.propTypes = {
  link: PropTypes.string.isRequired,
};

export default Comment;
