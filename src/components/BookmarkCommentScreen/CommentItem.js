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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Hyperlink from 'react-native-hyperlink';
import { fetchBookmarkInfo } from '../../models/api';
import { profileIcon, readableDate, itemObject } from '../../libs/utils';
import { styles } from '../../assets/styles/bookmark_comment/comment_item';

class CommentItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
      entry: this.props.entry,
      entryText: this.props.entryText,
    };
  }

  validCount(obj) {
    if (obj === undefined) return 0;
    return obj.length;
  }

  starComponent() {
    const { stars, colored_stars } = this.state.item;
    const starCount = this.validCount(stars);
    const colorStarCount = this.validCount(colored_stars);
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
    const { user } = this.state.item;
    return (
      <View style={styles(this.props.isNightMode).itemLeftInner}>
        <Image style={styles(this.props.isNightMode).profileIcon} source={{ uri: profileIcon(user) }} />
      </View>
    );
  }

  rightTopComponent() {
    const { user, timestamp } = this.state.item;
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
    const { comment, tags } = this.state.item;
    let joinedTags = '';
    if (tags.length > 0) {
      joinedTags = tags.map(tag => `[${tag}]`).join('');
    }

    return (
      <Hyperlink
        linkStyle={styles(this.props.isNightMode).commentLink}
        onPress={(urlText) => {
          fetchBookmarkInfo(urlText).then((resp) => {
            Actions.entry({ item: itemObject(resp, urlText) });
          }).catch((e) => {
            console.log(e);
          });
        }}
      >
        <Text style={styles(this.props.isNightMode).commentText}>{ `${joinedTags} ${comment}` }</Text>
      </Hyperlink>
    );
  }

  render() {
    return (
      <ListItem
        onPress={() => {
          // bookmark詳細で必要なデータ
          // TODO: 綺麗にしたい
          const itemData = {
            title: this.state.entry.title,
            description: this.state.item.comment,
            creator: this.state.item.user,
            userIcon: profileIcon(this.state.item.user),
            link: this.state.entry.url,
            entry: this.state.entryText,
            entryImage: this.state.entry.screenshot,
            date: readableDate(this.state.item.timestamp),
            bookmarkCount: this.state.entry.count,
            stars: this.state.item.stars,
            colored_stars: this.state.item.colored_stars,
          };
          Actions.bookmark({ item: itemData });
        }}
        style={styles(this.props.isNightMode).bookmarkCommentListItem}
      >
        <View style={styles(this.props.isNightMode).itemLeft}>
          { this.thumbnailComponent() }
        </View>
        <View style={styles(this.props.isNightMode).itemRight}>
          { this.rightTopComponent() }
          { this.commentComponent() }
        </View>
      </ListItem>
    );
  }
}

CommentItem.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
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
)(CommentItem);
