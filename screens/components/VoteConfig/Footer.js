import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';

const Footer = (props) => {
    return (
        <View style={[styles.whiteBackground, { height: 70 }]}>
            <View style={[{ flex: 1 }]} />

            <View style={[styles.verticalLayout, { flex: 5 }]}>
                <View style={[{ width:10 }]} />
                <TouchableOpacity
                    style={[{ flex: 1, justifyContent:'center', backgroundColor: subColor, borderRadius:10 }]}
                    onPress={() => props.navigation.navigate('VOTE', {
                        title : props.title,
                        numOfPeople:props.numOfPeople,
                        isPossibleAbstention:props.isPossibleAbstention
                    })}>
                    <Text style={[{textAlign:'center', color:'white', fontSize:Theme.fontSizes.fontSizes22}]}>
                        투표 설정 완료
                    </Text>
                </TouchableOpacity>
                <View style={[{ width:10 }]} />
            </View>

            <View style={[{ flex: 1 }]} />
        </View>
    )
}

export default Footer;