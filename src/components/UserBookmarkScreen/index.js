import React from 'react';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Feed from './Feed';
import { styles } from '../../assets/styles/user_bookmark/index';

class UserBookmark extends React.Component {
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
        <Body>
          <Title style={styles(this.props.isNightMode).headerTitle}>{ this.props.title }</Title>
        </Body>
        <Right />
      </Header>
    );
  }

  feedComponent() {
    if (this.props.title !== '') {
      return (
        <Feed userName={this.props.title} />
      );
    }
    return null;
  }

  render() {
    return (
      <Container style={styles(this.props.isNightMode).container}>
        { this.headerComponent() }
        { this.feedComponent() }
      </Container>
    );
  }
}

UserBookmark.propTypes = {
  title: PropTypes.string.isRequired,
  isNightMode: PropTypes.bool.isRequired,
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
)(UserBookmark);
