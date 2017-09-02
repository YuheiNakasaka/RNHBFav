import React from 'react';
import { View, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchHotEntryFeed, updateLoading } from '../../actions/root';

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
    this.updateLoading = this.props.updateLoading;
  }

  componentDidMount() {
    this.updateLoading(true);
    this.fetchLatestData();
  }

  onRefreshHandler() {
    if (this.state.refreshing === true || this.props.loading === true) return;
    this.setState({ refreshing: true });
    this.fetchLatestData();
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
    switch (this.props.feedType) {
      case 'newEntry':
        this.fetchNewEntry('social').then(() => {
          this.setState({ refreshing: false });
          this.updateLoading(false);
        }).catch(() => {
          this.updateLoading(false);
        });
        break;
      default:
        this.fetchHotEntryFeed('social').then(() => {
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
  user: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  feedType: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  fetchHotEntryFeed: PropTypes.func.isRequired,
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
    updateLoading: loading => dispatch(updateLoading(loading)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Entry);
