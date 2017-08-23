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
import { connect } from 'react-redux';
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
            <Title style={styles(this.props.isNightMode).headerTitle}>{ this.state.item.bookmarkCount } users</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles(this.props.isNightMode).content}>
          <Comment link={this.state.item.link} />
        </Content>
      </Container>
    );
  }
}

BookmarkComment.propTypes = {
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
)(BookmarkComment);
