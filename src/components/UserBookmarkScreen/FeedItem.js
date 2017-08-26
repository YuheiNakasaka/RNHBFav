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
import { styles } from '../../assets/styles/user_bookmark/feed_item';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  starComponent() {
    const { stars, colored_stars } = this.state.item;
    const starCount = stars || 0;
    const colorStarCount = colored_stars || 0;
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
        <Text style={styles(this.props.isNightMode).descriptionText}>{ text }</Text>
      );
    }
    return null;
  }

  render() {
    const { title, description, creator, userIcon, date } = this.state.item;
    return (
      <ListItem
        transparent
        onPress={() => {
          Actions.bookmark({ item: this.state.item });
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
              <Text style={styles(this.props.isNightMode).rightTopUserNameText}>{ creator }</Text>
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

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeedItem);
