import React, { Component } from 'react';
import { View, Image, Text } from 'react-native';
import { ListItem } from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink';

import { fetchBookmarkInfo } from '../../models/api';
import { profileIcon, readableDate, entryObject, validCount } from '../../libs/utils';

import { styles } from '../../assets/styles/bookmark_comment/comment_item';

class CommentItem extends Component {
  // bookmark詳細で必要なデータ
  bookmarkItem() {
    return {
      // bookmark info
      title: this.props.bookmarkInfo.title,
      link: this.props.bookmarkInfo.url,
      entryImage: this.props.bookmarkInfo.screenshot,
      bookmarkCount: this.props.bookmarkInfo.count,
      // bookmarker info
      description: this.props.bookmarkerInfo.comment,
      userName: this.props.bookmarkerInfo.user,
      userIcon: profileIcon(this.props.bookmarkerInfo.user),
      entry: this.props.bookmarkerInfo.entryText,
      date: readableDate(this.props.bookmarkerInfo.timestamp),
      stars: this.props.bookmarkerInfo.stars,
      colored_stars: this.props.bookmarkerInfo.colored_stars,
    };
  }

  starComponent() {
    const { stars, colored_stars } = this.props.bookmarkerInfo;
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

  thumbnailComponent() {
    const { user } = this.props.bookmarkerInfo;
    return (
      <View style={styles(this.props.isNightMode).itemLeft}>
        <View style={styles(this.props.isNightMode).itemLeftInner}>
          <Image style={styles(this.props.isNightMode).profileIcon} source={{ uri: profileIcon(user) }} />
        </View>
      </View>
    );
  }

  rightTopComponent() {
    const { user, timestamp } = this.props.bookmarkerInfo;
    return (
      <View style={styles(this.props.isNightMode).rightTop}>
        <View style={styles(this.props.isNightMode).rightTopUserName}>
          <Text style={styles(this.props.isNightMode).rightTopUserNameText}>{ user }</Text>
          { this.starComponent() }
        </View>
        <View style={styles(this.props.isNightMode).rightTopCreatedAt}>
          <Text style={styles(this.props.isNightMode).rightTopCreatedAtText}>{ readableDate(timestamp) }</Text>
        </View>
      </View>
    );
  }

  commentComponent() {
    const { comment, tags } = this.props.bookmarkerInfo;
    let joinedTags = '';
    if (tags.length > 0) {
      joinedTags = tags.map(tag => `[${tag}]`).join('');
    }

    return (
      <Hyperlink
        linkStyle={styles(this.props.isNightMode).commentLink}
        onPress={(urlText) => {
          fetchBookmarkInfo(urlText).then((resp) => {
            Actions.entry({ item: entryObject(resp, urlText) });
          }).catch((e) => {
            console.log(e);
          });
        }}
      >
        <Text style={styles(this.props.isNightMode).commentText}>{ `${joinedTags} ${comment}` }</Text>
      </Hyperlink>
    );
  }

  rightComponent() {
    return (
      <View style={styles(this.props.isNightMode).itemRight}>
        { this.rightTopComponent() }
        { this.commentComponent() }
      </View>
    );
  }

  render() {
    return (
      <ListItem
        onPress={() => {
          Actions.bookmark({ item: this.bookmarkItem() });
        }}
        style={styles(this.props.isNightMode).bookmarkCommentListItem}
      >
        { this.thumbnailComponent() }
        { this.rightComponent() }
      </ListItem>
    );
  }
}

CommentItem.defaultProps = {
  bookmarkInfo: {},
};

CommentItem.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  bookmarkerInfo: PropTypes.object.isRequired,
  bookmarkInfo: PropTypes.object,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

export default connect(
  mapStateToProps,
)(CommentItem);
