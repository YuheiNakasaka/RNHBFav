import React, { Component } from 'react';
import { View, Dimensions } from 'react-native';
import { Spinner } from 'native-base';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class MySpinner extends Component {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          width: windowWidth,
          height: windowHeight - 64,
          zIndex: 100,
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
