import React, { Component } from 'react';
import { Dimensions, Keyboard, Text } from 'react-native';
import {
  Container,
  Content,
  Header,
  Left,
  Body,
  Right,
  Item,
  Button,
  Input,
} from 'native-base';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchMyBookmark, postMyBookmark, deleteMyBookmark } from '../../models/api';
import { truncate, alert } from '../../libs/utils';

import MySpinner from '../CommonComponent/Spinner';

import { styles, grayColor } from '../../assets/styles/bookmark_edit/index';

class BookmarkEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmarkTargetUrl: (this.props.item.link || this.props.link),
      autoFocus: false,
      isBookmarked: true,
      textInputHeight: { height: 140 },
      isLoading: false,
      commentText: '', // postMyBookmark param
      isPrivate: false, // postMyBookmark param
      isTweeted: false, // postMyBookmark param
    };
  }

  componentDidMount() {
    // resize input text component
    Keyboard.addListener('keyboardWillShow', (e) => {
      const keyboardHeight = e.endCoordinates.height;
      const { height } = Dimensions.get('window');
      const headerHeight = 64;
      const textInputBarnHeight = 46;
      const textInputHeight = height - (keyboardHeight + headerHeight + textInputBarnHeight);
      this.setState({ textInputHeight: { height: textInputHeight } });
    });

    // check whether the entry is bookmarked by myself
    fetchMyBookmark(this.state.bookmarkTargetUrl).then((resp) => {
      if (resp.message === undefined) {
        this.setState({
          isBookmarked: true,
          commentText: resp.comment_raw,
          isPrivate: resp.private,
        });
      } else {
        this.setState({
          isBookmarked: false,
        });
      }
    }).catch((e) => {
      alert('Error occured', `${e}`);
    });
  }

  postMyBookmark() {
    this.setState({ isLoading: true });
    postMyBookmark(
      this.state.bookmarkTargetUrl,
      this.state.commentText,
      this.state.isPrivate,
      this.state.isTweeted,
    ).then(() => {
      Actions.pop();
    }).catch((e) => {
      console.log(e);
    });
  }

  deleteMyBookmark() {
    this.setState({ isLoading: true });
    deleteMyBookmark(this.state.bookmarkTargetUrl).then(() => {
      Actions.pop();
    }).catch((e) => {
      console.log(e);
    });
  }

  headerComponent() {
    if (this.props.item === null) return null;
    return (
      <Header style={styles(this.props.isNightMode).header}>
        <Left>
          <Button
            transparent
            onPress={() => {
              Actions.pop();
            }}
          >
            <MaterialIcon name="window-close" style={styles(this.props.isNightMode).headerIcon} />
          </Button>
        </Left>
        <Body>
          <Text style={styles(this.props.isNightMode).headerBodyText}>{ truncate(this.props.item.title) }</Text>
        </Body>
        { this.crudButtonComponent() }
      </Header>
    );
  }

  crudButtonComponent() {
    if (this.state.isBookmarked) {
      return (
        <Right>
          <Button
            transparent
            onPress={() => {
              this.deleteMyBookmark();
            }}
          >
            <Text style={styles(this.props.isNightMode).deleteButtonText}>削除</Text>
          </Button>
          <Button
            transparent
            onPress={() => {
              this.postMyBookmark();
            }}
          >
            <Text style={styles(this.props.isNightMode).editButtonText}>編集</Text>
          </Button>
        </Right>
      );
    }
    return (
      <Right>
        <Button
          transparent
          onPress={() => {
            this.postMyBookmark();
          }}
        >
          <Text style={styles(this.props.isNightMode).addButtonText}>追加</Text>
        </Button>
      </Right>
    );
  }

  inputBarComponent() {
    return (
      <Item>
        <Left>
          { this.twitterButtonComponent() }
        </Left>
        <Right>
          { this.privacyButtonComponent() }
        </Right>
      </Item>
    );
  }

  twitterButtonComponent() {
    const iconStyle = this.state.isTweeted ? styles(this.props.isNightMode).twitterIconClicked : styles(this.props.isNightMode).twitterIcon;
    return (
      <Button
        transparent
        onPress={() => {
          this.setState({ isTweeted: !this.state.isTweeted });
        }}
      >
        <MaterialIcon style={iconStyle} name="twitter" />
      </Button>
    );
  }

  privacyButtonComponent() {
    const iconType = this.state.isPrivate ? 'account-key' : 'account';
    const privacyText = this.state.isPrivate ? '非公開' : '公開';
    return (
      <Button
        transparent
        onPress={() => {
          this.setState({ isPrivate: !this.state.isPrivate });
        }}
      >
        <MaterialIcon style={styles(this.props.isNightMode).accountIcon} name={iconType} />
        <Text style={styles(this.props.isNightMode).privacyText}>{ privacyText }</Text>
      </Button>
    );
  }

  spinnerComponent() {
    if (this.state.isLoading) {
      return (
        <MySpinner isLoading={this.state.isLoading} />
      );
    }
    return null;
  }

  render() {
    return (
      <Container style={styles(this.props.isNightMode).container}>
        { this.headerComponent() }
        { this.spinnerComponent() }
        <Content
          keyboardShouldPersistTaps="always"
        >
          <Item>
            <Input
              multiline
              autoFocus
              placeholder="コメントを追加"
              style={[styles(this.props.isNightMode).commentInput, this.state.textInputHeight]}
              placeholderTextColor={grayColor}
              onChangeText={text => this.setState({ commentText: text })}
              value={this.state.commentText}
            />
          </Item>
          { this.inputBarComponent() }
        </Content>
      </Container>
    );
  }
}

BookmarkEdit.defaultProps = {
  item: {},
  link: '',
};

BookmarkEdit.propTypes = {
  isNightMode: PropTypes.bool.isRequired,
  item: PropTypes.object,
  link: PropTypes.string,
};

function mapStateToProps(state) {
  const { styleData } = state;
  return {
    isNightMode: styleData.isNightMode,
  };
}

export default connect(
  mapStateToProps,
)(BookmarkEdit);
