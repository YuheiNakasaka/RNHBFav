import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
} from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Content,
  Title,
  Button,
  ListItem,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { profileIcon } from '../../libs/utils';
import { styles } from '../../assets/styles/bookmark_star/index';

class BookmarkStar extends React.Component {
  itemComponent(star) {
    return (
      <ListItem
        onPress={() => {
          Actions.userBookmark({ title: star.name });
        }}
        style={styles(this.props.isNightMode).bookmarkCommentListItem}
      >
        <View style={styles(this.props.isNightMode).itemLeft}>
          <View style={styles(this.props.isNightMode).itemLeftInner}>
            <Image style={styles(this.props.isNightMode).profileIcon} source={{ uri: profileIcon(star.name) }} />
          </View>
        </View>
        <View style={styles(this.props.isNightMode).itemRight}>
          <View style={styles(this.props.isNightMode).rightTop}>
            <View style={styles(this.props.isNightMode).rightTopUserName}>
              <Text style={styles(this.props.isNightMode).rightTopUserNameText}>{ star.name }</Text>
            </View>
          </View>
        </View>
      </ListItem>
    );
  }

  render() {
    const { stars, colored_stars } = this.props.item;
    const allStars = colored_stars.concat(stars);
    return (
      <Container>
        <Header style={styles(this.props.isNightMode).header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <MaterialIcon name="chevron-left" style={styles(this.props.isNightMode).headerIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles(this.props.isNightMode).headerTitle}>スター</Title>
          </Body>
          <Right />
        </Header>
        <FlatList
          style={styles(this.props.isNightMode).list}
          data={allStars}
          renderItem={({ item }) => (
            this.itemComponent(item)
          )}
          keyExtractor={(star, index) => index}
        />
      </Container>
    );
  }
}

BookmarkStar.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  item: PropTypes.object.isRequired,
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
)(BookmarkStar);
