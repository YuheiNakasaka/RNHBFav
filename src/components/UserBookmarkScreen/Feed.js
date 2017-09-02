import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { updateLoading } from '../../actions/root';
import { fetchMyBookmarks } from '../../models/api';

import FeedItem from './FeedItem';
import MySpinner from '../CommonComponent/Spinner';

import { styles } from '../../assets/styles/user_bookmark/feed';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      offset: 0,
      refreshing: false,
    };
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
    newOffset = this.state.offset + 20;
    fetchMyBookmarks(this.props.userName, newOffset).then((resp) => {
      this.setState({ items: this.state.items.concat(resp), offset: newOffset, refreshing: false });
      this.updateLoading(false);
    });
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
    fetchMyBookmarks(this.props.userName, 0).then((resp) => {
      this.setState({ items: resp, refreshing: false, offset: 0 });
      this.updateLoading(false);
    });
  }

  render() {
    return (
      <View>
        { this.spinnerComponent() }
        <FlatList
          style={styles(this.props.isNightMode).list}
          keyExtractor={(item, i) => `${item.uid}_${i}`}
          data={this.state.items}
          extraData={this.state.items}
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
  userName: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  updateLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { rootData, styleData } = state;
  return {
    loading: rootData.loading,
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateLoading: loading => dispatch(updateLoading(loading)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Feed);
