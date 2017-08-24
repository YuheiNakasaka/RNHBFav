import React, { Component } from 'react';
import { WebView, Text } from 'react-native';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WKWebView from 'react-native-wkwebview-reborn';
import { CONSUMER_KEY, CONSUMER_SECRET } from '../../constants/config';
import OAuth from '../../libs/oauth';
import { saveUserData } from '../../models/userStorage';
import { updateUser } from '../../actions/root';
import { styles } from '../../assets/styles/auth/index';

class Auth extends Component {
  constructor(props) {
    super(props);

    const oauth = new OAuth({
      method: 'POST',
      consumerKey: CONSUMER_KEY,
      consumerSecret: CONSUMER_SECRET,
      requestTokenUrl: 'https://www.hatena.com/oauth/initiate',
      authorizeUrl: 'https://www.hatena.ne.jp/oauth/authorize',
      accessTokenUrl: 'https://www.hatena.com/oauth/token',
      callbackUrl: 'http://dev.local/callback',
    });

    this.state = {
      oauth,
      authorizeUrl: null,
      webview: null,
    };

    this.updateUser = this.props.updateUser;
  }

  componentDidMount() {
    this.state.oauth.getRequestToken().then((url) => {
      this.setState({ authorizeUrl: url });
    });
  }

  headerComponent() {
    return (
      <Header style={styles.header}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <Text style={styles.headerBackButtonText}>閉じる</Text>
          </Button>
        </Left>
        <Body />
        <Right />
      </Header>
    );
  }

  webviewComponent() {
    const { authorizeUrl } = this.state;
    if (authorizeUrl === null) return null;
    return (
      <WKWebView
        ref={(ref) => { this.state.webview = ref; }}
        source={{ uri: authorizeUrl }}
        onNavigationStateChange={(event) => {
        // if user permit to access, try to get access token and save it to AsyncStorage
          if (event.url.match(/oauth_verifier/)) {
            this.state.oauth.getAccessToken(event.url).then((res) => {
              if (res && !res.oauth_problem) {
                this.updateUser(res);
                saveUserData(res).then(() => {
                  console.log('success to authorize');
                  Actions.pop();
                });
              } else {
                console.log('could not get access token');
              }
            });
          }
        }}
      />
    );
  }

  render() {
    return (
      <Container>
        { this.headerComponent() }
        { this.webviewComponent() }
      </Container>
    );
  }
}


Auth.propTypes = {
  updateUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    updateUser: user => dispatch(updateUser(user)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Auth);
