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
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/root/feed_item';

class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  descriptionComponent(text) {
    if (text !== '') {
      return (
        <Text style={styles.description}>{ text }</Text>
      );
    }
    return null;
  }

  render() {
    const { title, description, creator, userIcon, date } = this.state.item;
    return (
      <ListItem
        onPress={() => {
          Actions.bookmark({ item: this.state.item });
        }}
      >
        <View style={styles.left}>
          <View style={styles.leftInner}>
            <Image style={styles.userIcon} source={{ uri: userIcon }} />
          </View>
        </View>
        <View style={styles.right}>
          <View style={styles.rightTop}>
            <View style={styles.rightTopUserName}>
              <Text style={styles.rightTopUserNameText}>{ creator }</Text>
            </View>
            <View style={styles.rightTopCreatedAt}>
              <Text style={styles.rightTopCreatedAtText}>{ date }</Text>
            </View>
          </View>
          { this.descriptionComponent(description) }
          <Text style={styles.articleTitle}>{ title }</Text>
        </View>
      </ListItem>
    );
  }
}

FeedItem.propTypes = {
  item: PropTypes.object.isRequired,
};

export default FeedItem;
