import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

class MessageBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewTopOffset: 0,
      onPress: this.props.onPress,
      onHide: this.props.onHide,
      // MessageBar style
      durationToShow: this.props.duration || 350,
      durationToHide: this.props.duration || 350,
      fontSize: this.props.fontSize || 12,
      textColor: this.props.textColor || '#000000',
      backgroundColor: this.props.backgroundColor || '#ffffff',
      paddingLeft: this.props.paddingLeft || 5,
      paddingRight: this.props.paddingRight || 5,
      paddingTop: this.props.paddingTop || 7,
      paddingBottom: this.props.paddingBottom || 7,
    };

    this.animatedValue = new Animated.Value(0);
  }

  _showMessageBarAlert() {
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: this.state.durationToShow,
    }).start(this._hideMessageBarAlert());
  }

  _hideMessageBarAlert() {
    setTimeout(() => {
      this._hide();
    }, 6000);
  }

  _hide() {
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: this.state.durationToHide,
    }).start(this.state.onHide());
  }

  _applyAnimation() {
    const animationY = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [windowHeight, 0],
    });
    this.animationTypeTransform = [{ translateY: animationY }];
  }

  render() {
    if (this.props.show) {
      this._showMessageBarAlert();
    }

    this._applyAnimation();
    return (
      <Animated.View
        style={{
          transform: this.animationTypeTransform,
          position: 'absolute',
          bottom: this.state.viewTopOffset,
          width: windowWidth,
          backgroundColor: this.state.backgroundColor,
          paddingTop: this.state.paddingTop,
          paddingLeft: this.state.paddingLeft,
          paddingBottom: this.state.paddingBottom,
          paddingRight: this.state.paddingRight,
          zIndex: 100,
        }}
      >
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={this.state.onPress}
        >
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: this.state.fontSize,
                color: this.state.textColor,
              }}
            >
              コピーしたURLを開く
            </Text>
            <Text
              style={{
                fontSize: this.state.fontSize - 2,
                color: this.state.textColor,
              }}
            >{ this.props.text }</Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

MessageBar.defaultProps = {
  onPress: (() => {}),
  onHide: (() => {}),
  duration: 350,
  fontSize: 11,
  textColor: '#000000',
  backgroundColor: '#ffffff',
  paddingLeft: 5,
  paddingRight: 5,
  paddingTop: 5,
  paddingBottom: 5,
};

MessageBar.propTypes = {
  show: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  onHide: PropTypes.func,
  duration: PropTypes.number,
  fontSize: PropTypes.number,
  textColor: PropTypes.string,
  backgroundColor: PropTypes.string,
  paddingLeft: PropTypes.number,
  paddingRight: PropTypes.number,
  paddingTop: PropTypes.number,
  paddingBottom: PropTypes.number,
};

export default MessageBar;
