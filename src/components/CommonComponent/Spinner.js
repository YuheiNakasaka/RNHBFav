import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Spinner } from 'native-base';
import PropTypes from 'prop-types';

const windowHeight = Dimensions.get('window').height;

class MySpinner extends Component {
  render() {
    return (
      <View
        style={{
          height: windowHeight - 64,
        }}
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
      </View>
    );
  }
}

MySpinner.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default MySpinner;
