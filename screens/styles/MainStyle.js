import React from 'react';
import { StyleSheet } from 'react-native';

import Theme from '../utilities/Demensions';
import { baseColor, subColor, selectedColor } from './CommonStyle';

export const mainStyles = StyleSheet.create({

  safeArea: {
    flex: 1,
    backgroundColor: 'white'
  },

  header: {
    padding: Theme.width * 3
  },

  topLogo: {
    fontWeight: '700',
    fontSize: Theme.fontSizes.fontSizes22*1.2
  },

  //검색

  searchView: {
    flex: 4
  },

  searchTextBox: {
    flex: 1,
    borderColor: baseColor,
    borderWidth: 1,
    borderRadius: 7,
    backgroundColor: 'white',
  },

  searchText: {
    fontSize: 9
  },

  searchBtn: {
    backgroundColor: baseColor
  },

  searchBtnHeader: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700'
  },

  searchBackBtn: {
    backgroundColor: baseColor
  },

  searchBackBtnHeader: {
    color: 'white',
    fontSize: 10,
    fontWeight: '700'
  },

  //헤더

  subHeader: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: Theme.fontSizes.fontSizes12 * 0.8,
    color: subColor
  },

  contentsHeader: {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: Theme.fontSizes.fontSizes22,
    backgroundColor: baseColor,
    color: 'white',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5

  },

  sortPannel: {
    position: 'absolute',
    backgroundColor: subColor,
    width: Theme.width * 80,
    height: Theme.height * 70,
    right: 0,
    paddingVertical: 10,
    paddingHorizontal: 5
  },

  sortPannelItem: {
    flex: 1
  },

  sortPannelItemText: {
    color: 'white',
    textAlign: 'center',
    fontSize: Theme.fontSizes.fontSizes12 * 0.9,
    borderBottomColor: baseColor,
    borderBottomWidth: 2
  },

  //콘텐츠
  selectedContent: {
    backgroundColor: selectedColor
  },

  baseContents: {
    textAlign: 'center',
    color: subColor,
    fontWeight: '700'
  },

  contentsName: {
    flex: 3,
    fontSize: 25,
    letterSpacing: 10
  },

  contentsCompany: {
    flex: 1,
    fontSize: 10
  },

});