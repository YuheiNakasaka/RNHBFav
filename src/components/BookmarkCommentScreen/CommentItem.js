import React from 'react';
import {
  View,
  Image,
  Text,
} from 'react-native';
import {
  ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { profileIcon, readableDate } from '../../libs/utils';
import { styles } from '../../assets/styles/bookmark_comment/comment_item';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  starComponent() {
    const { stars, colored_stars } = this.state.item;
    const starCount = stars ? stars.length : 0;
    const colorStarCount = colored_stars ? colored_stars.length : 0;
    const totalStar = starCount + colorStarCount;
    if (totalStar === 0) {
      return null;
    }
    return (
      <View style={styles.rightTopUserStars}>
        <MaterialIcon name="star" style={styles.rightTopUserStarsIcon} />
        <Text style={styles.rightTopUserStarsText}>{ totalStar }</Text>
      </View>
    );
  }

  thumbnailComponent() {
    const { user } = this.state.item;
    return (
      <View style={styles.itemLeftInner}>
        <Image style={styles.profileIcon} source={{ uri: profileIcon(user) }} />
      </View>
    );
  }

  rightTopComponent() {
    const { user, timestamp } = this.state.item;
    return (
      <View style={styles.rightTop}>
        <View style={styles.rightTopUserName}>
          <Text style={styles.rightTopUserNameText}>{ user }</Text>
          { this.starComponent() }
        </View>
        <View style={styles.rightTopCreatedAt}>
          <Text style={styles.rightTopCreatedAtText}>{ readableDate(timestamp) }</Text>
        </View>
      </View>
    );
  }

  commentComponent() {
    const { comment, tags } = this.state.item;
    let joinedTags = '';
    if (tags.length > 0) {
      joinedTags = tags.map(tag => `[${tag}]`).join('');
    }

    return (
      <Text style={styles.commentText}>{ `${joinedTags} ${comment}` }</Text>
    );
  }

  render() {
    return (
      <ListItem style={styles.item}>
        <View style={styles.itemLeft}>
          { this.thumbnailComponent() }
        </View>
        <View style={styles.itemRight}>
          { this.rightTopComponent() }
          { this.commentComponent() }
        </View>
      </ListItem>
    );
  }
}

CommentItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CommentItem;
