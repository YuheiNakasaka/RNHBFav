import React from 'react';
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
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeviceInfo from 'react-native-device-info';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { fetchMyBookmarkFeed, fetchFavoriteFeed, updateUser, updateLoading } from '../../actions/root';
import { deleteUserData } from '../../models/userStorage';
import { styles } from '../../assets/styles/menu/index';

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: this.props.userName,
    };
    this.fetchFavoriteFeed = this.props.fetchFavoriteFeed;
    this.fetchMyBookmarkFeed = this.props.fetchMyBookmarkFeed;
    this.updateUser = this.props.updateUser;
    this.updateLoading = this.props.updateLoading;
  }

  render() {
    const appVersion = DeviceInfo.getVersion();
    return (
      <Container style={styles.container}>
        <Header style={styles.header}>
          <Left />
          <Body>
            <Title style={styles.headerTitle}>
              id: { this.state.userName }
            </Title>
          </Body>
          <Right>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <MaterialIcon name="window-close" style={styles.headerRightIcon} />
            </Button>
          </Right>
        </Header>
        <Content>
          <List>
            <ListItem
              onPress={() => {
                this.updateLoading(true);
                this.fetchFavoriteFeed(this.state.userName, 0);
                Actions.pop();
              }}
            >
              <Left>
                <Text>タイムライン</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                this.updateLoading(true);
                this.fetchMyBookmarkFeed(this.state.userName, 0);
                Actions.pop();
              }}
            >
              <Left>
                <Text>自分のブックマーク</Text>
              </Left>
              <Right>
                <Icon name="ios-arrow-forward" />
              </Right>
            </ListItem>

            <ListItem itemDivider />
            <ListItem>
              <Left>
                <Text>バージョン</Text>
              </Left>
              <Right>
                <Text>{ appVersion }</Text>
              </Right>
            </ListItem>
            <ListItem
              onPress={() => {
                // Actions.eulas();
              }}
            >
              <Left>
                <Text>利用規約</Text>
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
            >
              <Left>
                <Text>ログアウト</Text>
              </Left>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}

Menu.propTypes = {
  userName: PropTypes.string.isRequired,
  fetchFavoriteFeed: PropTypes.func.isRequired,
  fetchMyBookmarkFeed: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  updateLoading: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    fetchFavoriteFeed: (userId, offset) => dispatch(fetchFavoriteFeed(userId, offset)),
    fetchMyBookmarkFeed: (userId, offset) => dispatch(fetchMyBookmarkFeed(userId, offset)),
    updateUser: user => dispatch(updateUser(user)),
    updateLoading: loading => dispatch(updateLoading(loading)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Menu);
