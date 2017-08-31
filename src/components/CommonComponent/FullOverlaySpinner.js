import React, { Component } from 'react';
import { View, Modal } from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

class MySpinner extends Component {
  render() {
    return (
      <Modal
        transparent
        visible={this.props.isLoading}
      >
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spinner color="#aaa" />
        </View>
      </Modal>
    );
  }
}

MySpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MySpinner;
