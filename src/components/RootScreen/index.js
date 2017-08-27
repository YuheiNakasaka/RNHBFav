import React from 'react';
import { Image, Text, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Input,
  Icon,
  Item,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './Feed';
import { saveAccessData, getAccessData } from '../../models/accessStorage';
import { getUserData } from '../../models/userStorage';
import { getStyleData } from '../../models/styleStorage';
import { profileIcon, itemObject, alert } from '../../libs/utils';
import { fetchBookmarkInfo } from '../../models/api';
import { updateUser } from '../../actions/root';
import { updateStyleType } from '../../actions/style';
import { styles } from '../../assets/styles/root/index';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlBoxOpen: false,
      urlText: '',
    };
    this.updateUser = this.props.updateUser;
    this.updateStyleType = this.props.updateStyleType;

    // 初回起動か否か
    getAccessData().then((res) => {
      if (res.firstAccess === false) {
        // ユーザーデータをstateにロード
        getUserData().then((userData) => {
          this.updateUser(userData);
        }).catch(() => {
          console.log('no user data');
          this.updateUser({});
          Actions.auth();
        });

        // styleデータをstateにロード
        getStyleData().then((resp) => {
          this.updateStyleType(resp.isNightMode);
        }).catch(() => {
          console.log('no style data');
        });
      } else {
        saveAccessData({ firstAccess: false }).then(() => {
          Actions.tour();
        });
      }
    });
  }

  onSubmitEditingHandler() {
    const urlText = this.state.urlText;
    if (urlText.match(/^http[s]*:\/\/.+/)) {
      fetchBookmarkInfo(urlText).then((resp) => {
        Actions.entry({ item: itemObject(resp, urlText) });
      }).catch((e) => {
        console.log(e);
      });
    } else {
      alert('入力エラー', '正しいURLを入力してください');
    }
  }

  userPresent() {
    return this.props.user !== undefined && Object.keys(this.props.user).length !== 0;
  }

  headerLeftComponent() {
    if (this.userPresent()) {
      const { url_name } = this.props.user;
      return (
        <Button
          transparent
          onPress={() => {
            Actions.menu({ userName: url_name });
          }}
        >
          <Image style={styles(this.props.isNightMode).headerUserIcon} source={{ uri: profileIcon(url_name) }} />
        </Button>
      );
    }

    return (
      <Button
        transparent
        onPress={() => {
          Actions.auth();
        }}
      >
        <MaterialIcon name="login-variant" style={styles(this.props.isNightMode).headerLoginIcon} />
      </Button>
    );
  }

  headerRightComponent() {
    if (this.userPresent()) {
      return (
        <Button
          transparent
          onPress={() => {
            this.setState({ urlBoxOpen: !this.state.urlBoxOpen });
          }}
        >
          <MaterialIcon style={styles(this.props.isNightMode).headerRightIcon} name="plus" />
        </Button>
      );
    }
    return null;
  }

  urlBoxHeaderComponent() {
    return (
      <Header style={styles(this.props.isNightMode).header} searchBar>
        <Item style={styles(this.props.isNightMode).urlBoxLeft}>
          <Icon active name="link" />
          <Input
            placeholder="URLを追加"
            returnKeyType="send"
            onChangeText={(urlText) => {
              this.setState({ urlText });
            }}
            value={this.state.urlText}
            onSubmitEditing={this.onSubmitEditingHandler.bind(this)}
          />
          <Icon
            name="close-circle"
            onPress={() => {
              this.setState({ urlText: '' });
            }}
          />
        </Item>
        <Button
          transparent
          onPress={() => {
            this.setState({ urlBoxOpen: false });
            this.setState({ urlText: '' });
          }}
        >
          <Text style={styles(this.props.isNightMode).urlBoxButtonText}>キャンセル</Text>
        </Button>
      </Header>
    );
  }

  headerComponent() {
    if (this.state.urlBoxOpen) {
      return this.urlBoxHeaderComponent();
    }
    return (
      <Header style={styles(this.props.isNightMode).header}>
        <Left>
          { this.headerLeftComponent() }
        </Left>
        <Body>
          <Title style={styles(this.props.isNightMode).headerTitle}>RNHBFav</Title>
        </Body>
        <Right>
          { this.headerRightComponent() }
        </Right>
      </Header>
    );
  }

  feedComponent() {
    if (this.userPresent()) {
      return (
        <Feed user={this.props.user} />
      );
    }
    return null;
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Container style={styles(this.props.isNightMode).container}>
        { this.headerComponent() }
        { this.feedComponent() }
      </Container>
    );
  }
}

Root.defaultProps = {
  user: {},
};

Root.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
  updateStyleType: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { rootData, styleData } = state;
  return {
    user: rootData.user,
    isNightMode: styleData.isNightMode,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: user => dispatch(updateUser(user)),
    updateStyleType: isNightMode => dispatch(updateStyleType(isNightMode)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
