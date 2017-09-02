import React from 'react';
import {
  View,
  Text,
  Image,
} from 'react-native';
import {
  ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/root/entry_item';

class EntryItem extends React.Component {
  thumbnailComponent() {
    const { entryImage } = this.props.item;
    if (entryImage === undefined) return null;
    return (
      <View style={styles(this.props.isNightMode).rootEntryRight}>
        <View style={styles(this.props.isNightMode).rootEntryRightInner}>
          <Image
            source={{ uri: entryImage }}
            style={styles(this.props.isNightMode).rootEntryRightInnerImage}
          />
        </View>
      </View>
    );
  }

  render() {
    const { title, domain, date, subject, bookmarkCount, entryFavicon } = this.props.item;
    return (
      <ListItem
        transparent
        onPress={() => {
          console.log(1);
        }}
        style={styles(this.props.isNightMode).feedListItem}
      >
        <View style={styles(this.props.isNightMode).rootEntryLeft}>
          <View style={styles(this.props.isNightMode).rootEntryLeftInner}>
            <View style={styles(this.props.isNightMode).rootEntryLeftInnerTitle}>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerTitleText}>{ title }</Text>
            </View>
            <View style={styles(this.props.isNightMode).rootEntryLeftInnerLink}>
              <View style={styles(this.props.isNightMode).rootEntryLeftInnerLinkImage}>
                <Image
                  style={styles(this.props.isNightMode).rootEntryLeftInnerLinkImageSource}
                  source={{ uri: entryFavicon }}
                />
              </View>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerLinkText}>{ domain }</Text>
            </View>
            <View style={styles(this.props.isNightMode).rootEntryLeftInnerMeta}>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerMetaText}>{ bookmarkCount } users</Text>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerMetaText}>{ '-' }</Text>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerMetaText}>{ date }</Text>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerMetaText}>{ '-' }</Text>
              <Text style={styles(this.props.isNightMode).rootEntryLeftInnerMetaText}>{ subject }</Text>
            </View>
          </View>
        </View>
        { this.thumbnailComponent() }
      </ListItem>
    );
  }
}

EntryItem.propTypes = {
  item: PropTypes.object.isRequired,
  isNightMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

export default connect(
  mapStateToProps,
)(EntryItem);
