import React, { Component } from 'react';
import { Linking, Text, View, StatusBar } from 'react-native';
import {
  Container,
  Header,
  Footer,
  FooterTab,
  Left,
  Body,
  Right,
  Title,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Share from 'react-native-share';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import WKWebView from 'react-native-wkwebview-reborn';

import { fetchBookmarkInfo } from '../../models/api';
import { entryObject } from '../../libs/utils';

import { styles } from '../../assets/styles/entry/index';

class Entry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {},
      webview: null,
      canGoBack: false,
      isLoading: true,
    };
    this.currentUrl = this.props.item.link;
  }

  componentDidMount() {
    this.fetchCurrentPageInfo();
  }

  // fetch current page information to bookmark the article you are reading now
  fetchCurrentPageInfo() {
    fetchBookmarkInfo(this.currentUrl).then((resp) => {
      this.setState({ item: entryObject(resp, this.currentUrl) });
    }).catch((e) => {
      console.log(e);
    });
  }

  headerComponent() {
    return (
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
        <Body style={styles(this.props.isNightMode).headerBody}>
          <Title style={styles(this.props.isNightMode).headerTitle}>{ this.state.item.title }</Title>
        </Body>
        <Right>
          <Button
            transparent
            onPress={() => {
              Linking.openURL(this.currentUrl);
            }}
          >
            <MaterialIcon name="open-in-new" style={styles(this.props.isNightMode).headerRightIcon} />
          </Button>
        </Right>
      </Header>
    );
  }

  webviewComponent() {
    const { link } = this.state.item;
    if (link === undefined || link === null) return <View style={styles(this.props.isNightMode).wkWebview} />;
    return (
      <WKWebView
        ref={(ref) => { this.state.webview = ref; }}
        source={{ uri: link }}
        startInLoadingState={this.state.isLoading}
        onError={() => {
          console.log('error');
          this.setState({ isLoading: false });
        }}
        onLoadStart={() => {
          console.log('load start');
          this.setState({ isLoading: true });
        }}
        onLoadEnd={() => {
          console.log('load end');
          this.setState({ isLoading: false });
          this.fetchCurrentPageInfo();
        }}
        renderError={() => {
          console.log('renderError');
        }}
        onNavigationStateChange={(event) => {
        // set current url to bookmark the article which you are reading now
          this.currentUrl = event.url;
          this.setState({ canGoBack: event.canGoBack });
        }}
        style={styles(this.props.isNightMode).wkWebview}
      />
    );
  }

  footerComponent() {
    return (
      <Footer style={styles(this.props.isNightMode).footer}>
        <FooterTab>
          { this.webviewBackButtonComponent() }
          { this.refreshButtonComponent() }
          { this.bookmarkButtonComponent() }
          { this.shareButtonComponent() }
          { this.bookmarkCountButtonComponent() }
        </FooterTab>
      </Footer>
    );
  }

  webviewBackButtonComponent() {
    const footerBackIconStyle = this.state.canGoBack ? styles(this.props.isNightMode).footerBackIcon : styles(this.props.isNightMode).footerBackIconDisabled;
    return (
      <Button
        disabled={!this.state.canGoBack}
        onPress={() => {
          this.state.webview.goBack();
        }}
        style={styles(this.props.isNightMode).footerBackButton}
      >
        <MaterialIcon name="chevron-left" style={footerBackIconStyle} />
      </Button>
    );
  }

  refreshButtonComponent() {
    return (
      <Button
        transparent
        onPress={() => {
          this.state.webview.reload();
        }}
      >
        <MaterialIcon name="refresh" style={styles(this.props.isNightMode).footerRefreshButtonIcon} />
      </Button>
    );
  }

  bookmarkButtonComponent() {
    return (
      <Button
        transparent
        onPress={() => {
          Actions.bookmarkEdit({ item: this.state.item });
        }}
      >
        <MaterialIcon name="pencil-box-outline" style={styles(this.props.isNightMode).footerBookmarkButtonIcon} />
      </Button>
    );
  }

  shareButtonComponent() {
    return (
      <Button
        transparent
        onPress={() => {
          Share.open({ url: this.state.item.link }).catch((err) => { console.log(err); });
        }}
      >
        <MaterialIcon name="share-variant" style={styles(this.props.isNightMode).footerShareButtonIcon} />
      </Button>
    );
  }

  bookmarkCountButtonComponent() {
    const { bookmarkCount } = this.state.item;
    if (bookmarkCount === 0) {
      return (
        <Button
          transparent
          disabled
          style={styles(this.props.isNightMode).footerBackButton}
        >
          <Text style={styles(this.props.isNightMode).bookmarkCountText}>{ bookmarkCount } users</Text>
        </Button>
      );
    }
    return (
      <Button
        transparent
        onPress={() => {
          Actions.bookmarkComment({ item: this.state.item });
        }}
      >
        <Text style={styles(this.props.isNightMode).bookmarkCountText}>{ bookmarkCount } users</Text>
      </Button>
    );
  }

  render() {
    return (
      <Container>
        <StatusBar networkActivityIndicatorVisible={this.state.isLoading} />
        { this.headerComponent() }
        { this.webviewComponent() }
        { this.footerComponent() }
      </Container>
    );
  }
}

Entry.propTypes = {
  item: PropTypes.object.isRequired,
  isNightMode: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

export default connect(
  mapStateToProps,
)(Entry);
