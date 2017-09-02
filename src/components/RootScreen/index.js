import React from 'react';
import {
  AppState,
  StatusBar,
  Clipboard,
  Image,
  Text,
} from 'react-native';
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

import { saveAccessData, getAccessData } from '../../models/accessStorage';
import { getUserData } from '../../models/userStorage';
import { getStyleData } from '../../models/styleStorage';
import { saveUrlData, getUrlData } from '../../models/urlStorage';
import { profileIcon, entryObject, truncate, isUrl, alert } from '../../libs/utils';
import { fetchBookmarkInfo } from '../../models/api';
import { updateUser } from '../../actions/root';
import { updateStyleType } from '../../actions/style';

import Feed from './Feed';
import Entry from './Entry';
import MessageBar from '../CommonComponent/MessageBar';

import { styles } from '../../assets/styles/root/index';

class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // bookmark with url in input
      urlBoxOpen: false,
      urlText: '',
      urlLoading: false,
      // bookmark with url in clipboard
      clipboardText: '',
      showMessageBar: false,
      appState: AppState.currentState,
    };
    this.updateUser = this.props.updateUser;
    this.updateStyleType = this.props.updateStyleType;

    // 初回起動か否か
    getAccessData().then((res) => {
      if (res.firstAccess !== false) {
        saveAccessData({ firstAccess: false }).then(() => {
          Actions.tour();
        });
      } else {
        // ユーザーデータをstateにロード
        getUserData().then((userData) => {
          this.updateUser(userData);
        }).catch(() => {
          console.log('no user data');
          Actions.auth();
        });

        // styleデータをstateにロード
        getStyleData().then((resp) => {
          this.updateStyleType(resp.isNightMode);
        }).catch(() => {
          console.log('no style data');
        });
      }
    });
  }

  componentDidMount() {
    this.showBookmarkNoticeFromClipboard();
    AppState.addEventListener('change', this.handleAppStateChange.bind(this));
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange.bind(this));
  }

  // urlかどうか確かめてurlならwebviewでページに飛ばす
  onSubmitEditingHandler() {
    const urlText = this.state.urlText || this.state.clipboardText;
    if (isUrl(urlText)) {
      this.setState({ urlLoading: true });
      fetchBookmarkInfo(urlText)
        .then(resp => Actions.entry({ item: entryObject(resp, urlText) }))
        .catch(() => alert('Network Error', 'ネット環境をご確認ください'))
        .then(() => this.setState({ urlLoading: false }));
    } else {
      alert('入力エラー', '正しいURLを入力してください');
    }
  }

  // URLを検知してブックマークを促す
  showBookmarkNoticeFromClipboard() {
    Clipboard.getString().then((text) => {
      // urlじゃないならMessageBarを出さない
      if (isUrl(text)) {
        getUrlData().then((urls) => {
          // urlキャッシュが無い === 新しいurlの場合
          if (urls.indexOf(text) === -1) {
            // urlキャッシュに新たにurlを追加して再度保存
            console.log('Save additional url');
            urls.push(text);
            saveUrlData(urls).then(() => {
              this.setState({ showMessageBar: true, clipboardText: text });
            });
          } else {
            console.log('Already Cached');
            this.setState({ showMessageBar: false });
          }
        }).catch((e) => {
          // 初期値 or Expiredしてデータが無い時
          console.log(e);
          saveUrlData([text]).then(() => {
            this.setState({ showMessageBar: true, clipboardText: text });
          });
        });
      }
    });
  }

  // アプリ起動ごとにClipboardのテキストをチェック
  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.showBookmarkNoticeFromClipboard();
    }
    this.setState({ appState: nextAppState });
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
      if (this.props.feedType.match(/hotEntry/)) {
        return (
          <Entry user={this.props.user} />
        );
      }
      return (
        <Feed user={this.props.user} />
      );
    }
    return null;
  }

  messageBarComponent() {
    if (this.state.showMessageBar) {
      return (
        <MessageBar
          show={this.state.showMessageBar}
          text={truncate(this.state.clipboardText, 70)}
          onPress={this.onSubmitEditingHandler.bind(this)}
          onHide={() => {
            this.setState({ showMessageBar: false });
          }}
          backgroundColor="#0086d9"
          textColor="#fff"
        />
      );
    }
    return null;
  }

  render() {
    // status barの色は白。ここで設定すればあとは全部白になる
    StatusBar.setBarStyle('light-content', true);
    return (
      <Container style={styles(this.props.isNightMode).container}>
        <StatusBar networkActivityIndicatorVisible={this.state.urlLoading} />
        { this.messageBarComponent() }
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
  feedType: PropTypes.string.isRequired,
  user: PropTypes.object,
  updateUser: PropTypes.func.isRequired,
  updateStyleType: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { rootData, styleData } = state;
  return {
    feedType: rootData.feedType,
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
