import {Dimensions} from 'react-native';

const basicDimensions = {
  width: 360,
  height: 800,
};

const deviceWidth = Dimensions.get('screen').width;
const deviceHeight = Dimensions.get('screen').height;

const width = (
  deviceWidth * (1 / basicDimensions.width)
).toFixed(2);

const height = (
  deviceHeight * (1 / basicDimensions.height)
).toFixed(2);

const fontSizes = {
  fontSizes16: width * 16,
  fontSizes14: width * 14,
  fontSizes12: width * 12,
  fontSizes22: width * 22,
  fontSizes18: width * 18,
};

// theme 객체에 감싸서 반환한다.
const Theme = {
  deviceWidth : deviceWidth,
  deviceHeight : deviceHeight,
  basicDimensions, 
  fontSizes,
  height,
  width,
};

export default Theme;