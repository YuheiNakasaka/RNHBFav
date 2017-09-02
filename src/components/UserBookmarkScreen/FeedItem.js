import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';
import { ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink';

import { fetchBookmarkInfo } from '../../models/api';
import { entryObject, validCount } from '../../libs/utils';

import { styles } from '../../assets/styles/user_bookmark/feed_item';

class FeedItem extends Component {
  starComponent() {
    const { stars, colored_stars } = this.props.item;
    const starCount = validCount(stars);
    const colorStarCount = validCount(colored_stars);
    const totalStar = starCount + colorStarCount;
    if (totalStar === 0) {
      return null;
    }
    return (
      <View style={styles(this.props.isNightMode).rightTopUserStars}>
        <MaterialIcon name="star" style={styles(this.props.isNightMode).rightTopUserStarsIcon} />
        <Text style={styles(this.props.isNightMode).rightTopUserStarsText}>{ totalStar }</Text>
      </View>
    );
  }

  descriptionComponent(text) {
    if (text !== '') {
      return (
        <Hyperlink
          linkStyle={styles(this.props.isNightMode).descriptionLink}
          onPress={(urlText) => {
            fetchBookmarkInfo(urlText).then((resp) => {
              Actions.modalEntry({ item: entryObject(resp, urlText) });
            }).catch((e) => {
              console.log(e);
            });
          }}
        >
          <Text style={styles(this.props.isNightMode).descriptionText}>{ text }</Text>
        </Hyperlink>
      );
    }
    return null;
  }

  render() {
    const { title, description, userName, userIcon, date } = this.props.item;
    return (
      <ListItem
        transparent
        onPress={() => {
          Actions.bookmark({ item: this.props.item });
        }}
        style={styles(this.props.isNightMode).feedListItem}
      >
        <View style={styles(this.props.isNightMode).left}>
          <View style={styles(this.props.isNightMode).leftInner}>
            <Image style={styles(this.props.isNightMode).userIcon} source={{ uri: userIcon }} />
          </View>
        </View>
        <View style={styles(this.props.isNightMode).right}>
          <View style={styles(this.props.isNightMode).rightTop}>
            <View style={styles(this.props.isNightMode).rightTopUserName}>
              <Text style={styles(this.props.isNightMode).rightTopUserNameText}>{ userName }</Text>
              { this.starComponent() }
            </View>
            <View style={styles(this.props.isNightMode).rightTopCreatedAt}>
              <Text style={styles(this.props.isNightMode).rightTopCreatedAtText}>{ date }</Text>
            </View>
          </View>
          { this.descriptionComponent(description) }
          <Text style={styles(this.props.isNightMode).articleTitle}>{ title }</Text>
        </View>
      </ListItem>
    );
  }
}

FeedItem.propTypes = {
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
)(FeedItem);
