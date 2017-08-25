import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const styles = {
  slideView: {
    flex: 1,
    backgroundColor: '#000',
  },
  dotColor: {
    backgroundColor: 'rgba(255,255,255,.8)',
  },
  lastSlideView: {
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: windowHeight,
  },
  lastImageJpg: {
    width: windowWidth,
    height: windowHeight,
  },
  iconView: {
    position: 'absolute',
    top: (windowHeight / 2) - 60,
    backgroundColor: '#00A5DE',
  },
  icon: {
    fontSize: 120,
    color: '#fff',
  },
  metaBtnView: {
    position: 'absolute',
    top: windowHeight - 150,
    alignItems: 'center',
    width: windowWidth,
  },
  metaBtnText: {
    color: '#00A5DE',
    fontWeight: 'bold',
  },
  metaTermView: {
    position: 'absolute',
    top: windowHeight - 75,
    alignItems: 'center',
    width: windowWidth,
    backgroundColor: '#00A5DE',
  },
  metaTermText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  btn: {
    width: windowWidth - 20,
    backgroundColor: '#ffffff',
  },
};
