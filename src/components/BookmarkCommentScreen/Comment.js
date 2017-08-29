import React from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
      entryText: this.props.entryText,
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
    if (info === undefined) return;
    const query = info.bookmarks.map((bookmark) => {
      const bCommentUrl = encodeURIComponent(bookmarkCommentUrl(info.eid, bookmark.user, bookmark.timestamp));
      return `uri=${bCommentUrl}`;
    });

    // fetch bookmark stars and asign the star infomartion to each comment info
    getBookmarkStar(query).then((stars) => {
      info.bookmarks.map((bookmark, i) => {
        stars.entries.map((entry) => {
          if (bookmark.user === entry.name) {
            info.bookmarks[i].stars = entry.stars || [];
            info.bookmarks[i].colored_stars = entry.colored_stars || [];
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
        .filter(bm => bm.comment !== '' && (bm.stars.length + bm.colored_stars.length) > 0)
        .sort((a, b) => (b.stars.length + b.colored_stars.length) - (a.stars.length + a.colored_stars.length))
        .slice(0, 10);

      if (bookmarks.length === 0) return null;
      return (
        <View>
          <View style={styles(this.props.isNightMode).listWrapPopularComments}>
            <Text style={styles(this.props.isNightMode).listWrapPopularCommentsText}>人気</Text>
          </View>
          <FlatList
            style={styles(this.props.isNightMode).list}
            data={bookmarks}
            renderItem={({ item }) => (
              <CommentItem item={item} entry={this.state.entry} entryText={this.state.entryText} />
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
          <View style={styles(this.props.isNightMode).listWrapAllComments}>
            <Text style={styles(this.props.isNightMode).listWrapAllCommentsText}>全て</Text>
          </View>
          <FlatList
            style={styles(this.props.isNightMode).list}
            data={this.state.entry.bookmarks}
            renderItem={({ item }) => (
              <CommentItem item={item} entry={this.state.entry} entryText={this.state.entryText} />
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
      <View style={styles(this.props.isNightMode).listWrap}>
        { this.spinnerComponent() }
        { this.popularCommentsComponent() }
        { this.commentsComponent() }
      </View>
    );
  }
}

Comment.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  entryText: PropTypes.string.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Comment);
