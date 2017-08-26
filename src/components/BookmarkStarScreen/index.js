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

import { styles } from '../../assets/styles/bookmark_star/index';

class BookmarkStar extends React.Component {
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
              <MaterialIcon name="chevron-left" style={styles(this.props.isNightMode).headerIcon} />
            </Button>
          </Left>
          <Body>
            <Title style={styles(this.props.isNightMode).headerTitle}>スター</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles(this.props.isNightMode).content} />
      </Container>
    );
  }
}

BookmarkStar.propTypes = {
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
)(BookmarkStar);
