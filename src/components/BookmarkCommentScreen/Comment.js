import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchBookmarkInfo } from '../../models/api';

import CommentItem from './CommentItem';
import MySpinner from '../CommonComponent/Spinner';

import { styles } from '../../assets/styles/bookmark_comment/comment';

class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkInfo: null,
      isLoading: true,
    };
  }

  componentDidMount() {
    fetchBookmarkInfo(this.props.item.link).then((items) => {
      this.setState({ bookmarkInfo: items, isLoading: false });
    });
  }

  // fetch top 10 starred bookmarks
  calcPopularStar() {
    return this.state.bookmarkInfo.bookmarks
      .filter(bm => bm.comment !== '' && bm.stars && bm.colored_stars && (bm.stars.length + bm.colored_stars.length) > 0)
      .sort((a, b) => (b.stars.length + b.colored_stars.length) - (a.stars.length + a.colored_stars.length))
      .slice(0, 10);
  }

  popularCommentsComponent() {
    if (this.state.bookmarkInfo !== null) {
      const bookmarks = this.calcPopularStar();
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
              <CommentItem bookmarkerInfo={item} bookmarkInfo={this.state.bookmarkInfo} />
            )}
            keyExtractor={(item, index) => index}
          />
        </View>
      );
    }
    return null;
  }

  commentsComponent() {
    if (this.state.bookmarkInfo !== null) {
      return (
        <View>
          <View style={styles(this.props.isNightMode).listWrapAllComments}>
            <Text style={styles(this.props.isNightMode).listWrapAllCommentsText}>全て</Text>
          </View>
          <FlatList
            style={styles(this.props.isNightMode).list}
            data={this.state.bookmarkInfo.bookmarks}
            renderItem={({ item }) => (
              <CommentItem bookmarkerInfo={item} bookmarkInfo={this.state.bookmarkInfo} />
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
  item: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

export default connect(
  mapStateToProps,
)(Comment);
