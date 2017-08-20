import React from 'react';
import {
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
} from 'native-base';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import Comment from './Comment';
import { styles } from '../../assets/styles/bookmark_comment/index';

class BookmarkComment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: this.props.item,
    };
  }

  render() {
    return (
      <Container>
        <Header style={styles.header}>
          <Left>
            <Button
              transparent
              onPress={() => {
                Actions.pop();
              }}
            >
              <MaterialIcon name="window-close" style={styles.headerIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTitle}>{ this.state.item.bookmarkCount } users</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <Comment link={this.state.item.link} />
        </Content>
      </Container>
    );
  }
}

BookmarkComment.propTypes = {
  item: PropTypes.object.isRequired,
};

export default BookmarkComment;
