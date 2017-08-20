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

  assignStarsToBookmarkInfo(info) {
    // generate bookmark comment uri
    const query = info.bookmarks.map((bookmark) => {
      const bCommentUrl = encodeURIComponent(bookmarkCommentUrl(info.eid, bookmark.user, bookmark.timestamp));
      return `uri=${bCommentUrl}`;
    });

    // fetch bookmark stars and asign the star infomartion to each comment info
    getBookmarkStar(query).then((stars) => {
      for (let i = 0; i < info.bookmarks.length; i++) {
        info.bookmarks[i].stars = stars.entries[i].stars || [];
        info.bookmarks[i].colored_stars = stars.entries[i].colored_stars || [];
      }
    }).then(() => {
      this.setState({ entry: info, isLoading: false });
    });
  }

  popularCommentsComponent() {
    if (this.state.entry !== null) {
      // fetch top 10 starred bookmarks
      const bookmarks = this.state.entry.bookmarks
        .filter(bm => (bm.comment !== '' && bm.stars.length + bm.colored_stars.length) > 0)
        .sort((a, b) => (b.stars.length + b.colored_stars.length) - (a.stars.length + a.colored_stars.length))
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
