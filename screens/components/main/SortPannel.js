import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';

const SortPannel = (props) => {

    return (
        <View style={[mainStyles.sortPannel, { top: Theme.height * (70 + (props.isSearchInputOn ? 40 : 0)) }]}>
            {
                props.orderBy === props.OrderByTypes.DATE_ASC
                    ? (
                        <TouchableOpacity
                            style={[mainStyles.sortPannelItem]}
                            onPress={() => props.sort(props.OrderByTypes.DATE_DESC)}>
                            <Text style={[mainStyles.sortPannelItemText]}>등록일순▼</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[mainStyles.sortPannelItem]}
                            onPress={() => props.sort(props.OrderByTypes.DATE_ASC)}>
                            <Text style={[mainStyles.sortPannelItemText]}>등록일순▲</Text>
                        </TouchableOpacity>
                    )
            }
            {
                props.orderBy === props.OrderByTypes.NAME_ASC
                    ? (
                        <TouchableOpacity
                            style={[mainStyles.sortPannelItem]}
                            onPress={() => props.sort(props.OrderByTypes.NAME_DESC)}>
                            <Text style={[mainStyles.sortPannelItemText]}>이름순▼</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[mainStyles.sortPannelItem]}
                            onPress={() => props.sort(props.OrderByTypes.NAME_ASC)}>
                            <Text style={[mainStyles.sortPannelItemText]}>이름순▲</Text>
                        </TouchableOpacity>
                    )
            }
        </View>
    );
}

export default SortPannel;

