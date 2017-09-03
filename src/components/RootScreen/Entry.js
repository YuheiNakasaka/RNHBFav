import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchHotEntryFeed, fetchNewEntryFeed, updateLoading } from '../../actions/root';

import EntryItem from './EntryItem';
import MySpinner from '../CommonComponent/Spinner';

import { styles } from '../../assets/styles/root/feed';

class Entry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      refreshing: false,
    };
    this.fetchHotEntryFeed = this.props.fetchHotEntryFeed;
    this.fetchNewEntryFeed = this.props.fetchNewEntryFeed;
    this.updateLoading = this.props.updateLoading;
  }

  onRefreshHandler() {
    if (this.state.refreshing === true || this.props.loading === true) return;
    this.setState({ refreshing: true });
    this.fetchLatestData();
  }

  entryCategory() {
    return this.props.feedType.replace(/.+:/, '');
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
    if (this.props.feedType.match(/newEntry:/)) {
      this.fetchNewEntryFeed(this.entryCategory()).then(() => {
        this.setState({ refreshing: false });
        this.updateLoading(false);
      }).catch(() => {
        this.updateLoading(false);
      });
    } else {
      this.fetchHotEntryFeed(this.entryCategory()).then(() => {
        this.setState({ refreshing: false });
        this.updateLoading(false);
      }).catch(() => {
        this.updateLoading(false);
      });
    }
  }

  listComponent() {
    if (this.props.items.length === 0) return null;
    return (
      <FlatList
        style={styles(this.props.isNightMode).feedList}
        keyExtractor={(item, i) => `${item.uid}_${i}`}
        data={this.props.items}
        extraData={this.props.items}
        renderItem={({ item }) => (
          <EntryItem item={item} />
        )}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefreshHandler.bind(this)}
      />
    );
  }

  render() {
    return (
      <View>
        { this.spinnerComponent() }
        { this.listComponent() }
      </View>
    );
  }
}

Entry.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  items: PropTypes.array.isRequired,
  feedType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchHotEntryFeed: PropTypes.func.isRequired,
  fetchNewEntryFeed: PropTypes.func.isRequired,
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
    fetchHotEntryFeed: category => dispatch(fetchHotEntryFeed(category)),
    fetchNewEntryFeed: category => dispatch(fetchNewEntryFeed(category)),
    updateLoading: loading => dispatch(updateLoading(loading)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entry);
