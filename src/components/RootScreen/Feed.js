import React from 'react';
import {
  View,
  FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import FeedItem from './FeedItem';
import { fetchFavoriteFeed, fetchMyBookmarkFeed, updateLoading } from '../../actions/root';
import MySpinner from '../CommonComponent/Spinner';

import { styles } from '../../assets/styles/root/feed';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      offset: 0,
      refreshing: false,
    };
    this.fetchFavoriteFeed = this.props.fetchFavoriteFeed;
    this.fetchMyBookmarkFeed = this.props.fetchMyBookmarkFeed;
    this.updateLoading = this.props.updateLoading;
  }

  componentDidMount() {
    this.fetchLatestData();
  }

  onRefreshHandler() {
    if (this.state.refreshing === true || this.props.loading === true) return;
    this.setState({ refreshing: true });
    this.fetchLatestData();
  }

  onEndReachedHandler() {
    if (this.props.loading === true || this.state.refreshing === true) return;
    this.updateLoading(true);
    let newOffset = 0;
    switch (this.props.feedType) {
      case 'myBookmark':
        newOffset = this.state.offset + 20;
        this.fetchMyBookmarkFeed(this.state.user.url_name, newOffset).then(() => {
          this.setState({ offset: newOffset, refreshing: false });
          this.updateLoading(false);
        });
        break;
      default:
        newOffset = this.state.offset + 25;
        this.fetchFavoriteFeed(this.state.user.url_name, newOffset).then(() => {
          this.setState({ offset: newOffset, refreshing: false });
          this.updateLoading(false);
        });
    }
  }

  spinnerComponent() {
    if (this.props.loading) {
      return (
        <MySpinner isLoading={this.props.loading} />
      );
    }
    return null;
  }

  fetchLatestData() {
    this.updateLoading(true);
    switch (this.props.feedType) {
      case 'myBookmark':
        this.fetchMyBookmarkFeed(this.state.user.url_name, 0).then(() => {
          this.setState({ refreshing: false, offset: 0 });
          this.updateLoading(false);
        });
        break;
      default:
        this.fetchFavoriteFeed(this.state.user.url_name, 0).then(() => {
          this.setState({ refreshing: false, offset: 0 });
          this.updateLoading(false);
        });
    }
  }

  render() {
    return (
      <View>
        { this.spinnerComponent() }
        <FlatList
          style={styles(this.props.isNightMode).list}
          keyExtractor={(item, i) => `${item.uid}_${i}`}
          data={this.props.items}
          extraData={this.props.items}
          renderItem={({ item }) => (
            <FeedItem item={item} />
          )}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefreshHandler.bind(this)}
          onEndReached={this.onEndReachedHandler.bind(this)}
          onEndReachedThreshold={0.5}
        />
      </View>
    );
  }
}

Feed.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  feedType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchFavoriteFeed: PropTypes.func.isRequired,
  fetchMyBookmarkFeed: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { rootData, styleData } = state;
  return {
    items: rootData.items,
    feedType: rootData.feedType,
    loading: rootData.loading,
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteFeed: (userId, offset) => dispatch(fetchFavoriteFeed(userId, offset)),
    fetchMyBookmarkFeed: (userId, offset) => dispatch(fetchMyBookmarkFeed(userId, offset)),
    updateLoading: loading => dispatch(updateLoading(loading)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
