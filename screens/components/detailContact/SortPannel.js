import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { detailContactStyles } from '../../styles/DetailContactStyle';

import { mainStyles } from '../../styles/MainStyle';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const SortPannel = (props) => {

    return (
        <View style={[detailContactStyles.additionalPannel, { top: Theme.height * 60 }]}>
            <TouchableOpacity
                style={[detailContactStyles.additionalPannelItem]}
                onPress={props.goEditScreen}>
                <Text style={[detailContactStyles.additionalPannelItemText]}>수정하기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[detailContactStyles.additionalPannelItem]}
                onPress={props.exportPannelOn}>
                <Text style={[detailContactStyles.additionalPannelItemText]}>내보내기</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[detailContactStyles.additionalPannelItem]}
                onPress={props.deletePannelOn}>
                <Text style={[detailContactStyles.additionalPannelItemText]}>삭제하기</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SortPannel;

