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
        <View style={[styles.centerLayout, styles.verticalLayout, { height: 100 }]}>

            <View style={[{ flex: 1 }]} />

            <View style={[styles.verticalLayout, styles.centerLayout, { flex: 3 }]}>
                <View style={[{ flex: 1 }]} />
                <TouchableOpacity style={[{ flex: 5 }]} onPress={props.saveContact}>
                    <Image style={{ width: null, height: 70 }} resizeMode='stretch' source={require('../../../resource/image/button/save.png')} />
                </TouchableOpacity>
                <View style={[{ flex: 1 }]} />
            </View>

            <View style={[{ flex: 1 }]} />

            <View style={[styles.verticalLayout, styles.centerLayout, { flex: 3 }]}>
                <View style={[{ flex: 1 }]} />
                <TouchableOpacity style={[{ flex: 5 }]} onPress={() => props.navigation.navigate("CAMERA", { selectedId: props.selectedId })}>
                    <Image style={{ width: null, height: 70 }} resizeMode='stretch' source={require('../../../resource/image/button/reshot.png')} />
                </TouchableOpacity>
                <View style={[{ flex: 1 }]} />
            </View>

            <View style={[{ flex: 1 }]} />

            <View style={[styles.verticalLayout, styles.centerLayout, { flex: 3 }]}>
                <View style={[{ flex: 1 }]} />
                <TouchableOpacity style={[{ flex: 5 }]} onPress={() => { props.navigation.goBack(); }}>
                    <Image style={{ width: null, height: 70 }} resizeMode='stretch' source={require('../../../resource/image/button/cancel.png')} />
                </TouchableOpacity>
                <View style={[{ flex: 1 }]} />
            </View>

            <View style={[{ flex: 1 }]} />

        </View>
    )
}

export default Footer;