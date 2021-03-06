import React, { Component } from 'react';
import {
  Platform,
  StatusBar,
  PushNotificationIOS,
  TouchableWithoutFeedback,
  View,
  Text,
  Image,
} from 'react-native';
import {
  Button,
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import Swiper from 'react-native-swiper';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { styles } from '../../assets/styles/tour/index';

const SCREENSHOT_001 = require('../../assets/images/rnhbfav_screenshot_0001.jpg');
const SCREENSHOT_002 = require('../../assets/images/rnhbfav_screenshot_0002.jpg');
const SCREENSHOT_003 = require('../../assets/images/rnhbfav_screenshot_0003.jpg');
const SCREENSHOT_004 = require('../../assets/images/rnhbfav_screenshot_0004.jpg');
const SCREENSHOT_005 = require('../../assets/images/rnhbfav_screenshot_0005.jpg');
const SCREENSHOT_006 = require('../../assets/images/rnhbfav_screenshot_0006.jpg');

class Tour extends Component {
  componentDidMount() {
    if (Platform.OS === 'ios') {
      // iOSはPushNotification使わないと審査通らないっぽい
      PushNotificationIOS.checkPermissions(() => {
        PushNotificationIOS.requestPermissions();
      });
    }
  }

  render() {
    StatusBar.setBarStyle('light-content', true);
    return (
      <Swiper
        loop={false}
        dotStyle={styles.dotColor}
        activeDotColor="#1D8DEE"
      >
        <View style={styles.slideView}>
          <Image
            source={SCREENSHOT_001}
            style={styles.image}
          />
        </View>
        <View style={styles.slideView}>
          <Image
            source={SCREENSHOT_002}
            style={styles.image}
          />
        </View>
        <View style={styles.slideView}>
          <Image
            source={SCREENSHOT_003}
            style={styles.image}
          />
        </View>
        <View style={styles.slideView}>
          <Image
            source={SCREENSHOT_004}
            style={styles.image}
          />
        </View>
        <View style={styles.slideView}>
          <Image
            source={SCREENSHOT_005}
            style={styles.image}
          />
        </View>
        <View style={[styles.slideView, styles.lastSlideView]}>
          <View>
            <Image
              source={SCREENSHOT_006}
              style={styles.lastImageJpg}
            />
          </View>
          <View style={styles.iconView}>
            <MaterialIcon style={styles.icon} name="bookmark-plus" />
          </View>
          <View style={styles.metaBtnView}>
            <TouchableWithoutFeedback>
              <View>
                <Button
                  full
                  style={styles.btn}
                  onPress={() => {
                    Actions.pop();
                    Actions.auth();
                  }}
                >
                  <Text style={styles.metaBtnText}>利用規約に同意してはじめる</Text>
                </Button>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <View style={styles.metaTermView}>
            <TouchableWithoutFeedback
              onPress={() => {
                Actions.eula();
              }}
            >
              <View>
                <Text style={styles.metaTermText}>利用規約</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </Swiper>
    );
  }
}


export default Tour;
