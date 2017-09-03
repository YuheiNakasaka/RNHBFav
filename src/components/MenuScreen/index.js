import React, { Component } from 'react';
import {
  Container,
  Header,
  Content,
  Left,
  Body,
  Right,
  List,
  ListItem,
  Button,
  Title,
  Text,
  Icon,
  Radio,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  fetchMyBookmarkFeed,
  fetchFavoriteFeed,
  fetchHotEntryFeed,
  updateUser,
  updateLoading,
  updateFeedType,
} from '../../actions/root';
import { updateStyleType } from '../../actions/style';
import { deleteUserData } from '../../models/userStorage';
import { entryCategories } from '../../constants/categories';

import { styles } from '../../assets/styles/menu/index';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.fetchFavoriteFeed = this.props.fetchFavoriteFeed;
    this.fetchMyBookmarkFeed = this.props.fetchMyBookmarkFeed;
    this.fetchHotEntryFeed = this.props.fetchHotEntryFeed;
    this.updateUser = this.props.updateUser;
    this.updateLoading = this.props.updateLoading;
    this.updateStyleType = this.props.updateStyleType;
    this.updateFeedType = this.props.updateFeedType;
  }

  nightModeComponent() {
    const rightIcon = this.props.isNightMode ? <Radio selected /> : null;
    return (
      <ListItem
        onPress={() => {
          this.updateStyleType(!this.props.isNightMode);
        }}
        style={styles(this.props.isNightMode).listItem}
      >
        <Left>
          <Text style={styles(this.props.isNightMode).textColor}>ナイトモードにする</Text>
        </Left>
        <Right>
          { rightIcon }
        </Right>
      </ListItem>
    );
  }

  entryListComponent() {
    return entryCategories.map(category => (
      <ListItem
        key={category[0]}
        onPress={() => {
          this.updateLoading(true);
          this.fetchHotEntryFeed(category[0]);
          Actions.pop();
        }}
        style={styles(this.props.isNightMode).listItem}
      >
        <Left>
          <Text style={styles(this.props.isNightMode).textColor}>{ category[1] }</Text>
        </Left>
        <Right>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    ));
  }

  render() {
    const appVersion = DeviceInfo.getVersion();
    return (
      <Container style={styles(this.props.isNightMode).container}>
        <Header style={styles(this.props.isNightMode).header}>
          <Left />
          <Body>
            <Title style={styles(this.props.isNightMode).headerTitle}>
              id: { this.props.userName }
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <MaterialIcon name="window-close" style={styles(this.props.isNightMode).headerRightIcon} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem itemDivider style={styles(this.props.isNightMode).listItemDivider} />
            <ListItem
              onPress={() => {
                this.updateLoading(true);
                this.fetchFavoriteFeed(this.props.userName, 0);
                Actions.pop();
              }}
              style={styles(this.props.isNightMode).listItem}
            >
              <Left>
                <Text style={styles(this.props.isNightMode).textColor}>ホーム</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                this.updateLoading(true);
                this.fetchMyBookmarkFeed(this.props.userName, 0);
                Actions.pop();
              }}
              style={styles(this.props.isNightMode).listItem}
            >
              <Left>
                <Text style={styles(this.props.isNightMode).textColor}>マイブックマーク</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>

            <ListItem itemDivider style={styles(this.props.isNightMode).listItemDivider} />
            { this.entryListComponent() }

            <ListItem itemDivider style={styles(this.props.isNightMode).listItemDivider} />
            { this.nightModeComponent() }

            <ListItem itemDivider style={styles(this.props.isNightMode).listItemDivider} />
            <ListItem style={styles(this.props.isNightMode).listItem}>
              <Left>
                <Text style={styles(this.props.isNightMode).textColor}>バージョン</Text>
              </Left>
              <Right>
                <Text style={styles(this.props.isNightMode).textColor}>{ appVersion }</Text>
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                Actions.eula();
              }}
              style={styles(this.props.isNightMode).listItem}
            >
              <Left>
                <Text style={styles(this.props.isNightMode).textColor}>利用規約</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                deleteUserData().then(() => {
                  console.log('logout');
                  this.updateUser({});
                  Actions.pop();
                });
              }}
              style={styles(this.props.isNightMode).listItem}
            >
              <Left>
                <Text style={styles(this.props.isNightMode).textColor}>ログアウト</Text>
              </Left>
            </ListItem>

            <ListItem itemDivider style={styles(this.props.isNightMode).listItemDivider} />
          </List>
        </Content>
      </Container>
    );
  }
}

Menu.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  userName: PropTypes.string.isRequired,
  fetchFavoriteFeed: PropTypes.func.isRequired,
  fetchMyBookmarkFeed: PropTypes.func.isRequired,
  fetchHotEntryFeed: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired,
  updateStyleType: PropTypes.func.isRequired,
  updateFeedType: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteFeed: (userId, offset) => dispatch(fetchFavoriteFeed(userId, offset)),
    fetchMyBookmarkFeed: (userId, offset) => dispatch(fetchMyBookmarkFeed(userId, offset)),
    fetchHotEntryFeed: category => dispatch(fetchHotEntryFeed(category)),
    updateUser: user => dispatch(updateUser(user)),
    updateLoading: loading => dispatch(updateLoading(loading)),
    updateStyleType: isNightMode => dispatch(updateStyleType(isNightMode)),
    updateFeedType: feedType => dispatch(updateFeedType(feedType)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
