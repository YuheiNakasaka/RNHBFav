import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Spinner } from 'native-base';

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

export default MySpinner;
