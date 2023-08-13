import React from 'react';
import { StyleSheet } from 'react-native';

import Theme from '../utilities/Demensions';

export const baseColor = '#5270FF';
export const subColor = '#012C7E';
export const selectedColor = '#C4D6F5';

export const styles = StyleSheet.create({
  //디버깅
  debug1: {
    backgroundColor: 'red'
  },
  debug2: {
    backgroundColor: 'green'
  },
  debug3: {
    backgroundColor: 'blue'
  },
  debug4: {
    backgroundColor: 'yellow'
  },

  //레이아웃
  centerLayout: {
    alignItems: "center",
  },

  verticalLayout: {
    flexDirection: "row"
  },

  baseBackground: {
    backgroundColor: baseColor
  },

  subBackground: {
    backgroundColor: subColor
  },

  whiteBackground: {
    backgroundColor: 'white'
  },

  baseFontColor: {
    color: subColor
  },

  subFontColor: {
    color: baseColor
  },

  whiteFontColor: {
    color: 'white'
  },

  //라인
  separator: {
    marginTop: 7,
    marginBottom: 6,
    borderBottomColor: baseColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 4,
  },

  boldSeparator: {
    marginVertical: 5,
    borderBottomColor: subColor,
    borderBottomWidth: StyleSheet.hairlineWidth * 50,
  },

  //풋터
  selectFooter: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    width: Theme.deviceWidth,
    height: Theme.height * 190
  },

  exportFooter: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    width: Theme.deviceWidth,
    height: Theme.height * 308
  },

  searchFooter: {
    position: 'absolute',
    flex: 1,
    bottom: 0,
    left: 0,
    width: Theme.basicDimensions.width * Theme.width + 1,
    height: Theme.height * 85
  }


});