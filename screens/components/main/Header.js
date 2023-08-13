import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';
import SearchPannel from './SearchPannel';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';

const Header = (props) => {
    const Separator = () => (
        <View style={styles.separator} />
    );

    return (
        <View style={[styles.whiteBackground, { height: Theme.height * 90 }]}>

            <View style={[styles.verticalLayout, mainStyles.header, { flex: 3 }]}>
                <View style={[{ flex: 1 }]} />
                <View style={[{ flex: 40 }]}>
                    <Text style={[mainStyles.topLogo, styles.subFontColor, { flex: 220 }]}>조항마을</Text>
                </View>
            </View>

            <Separator />

            <View style={[{ flex: 3 }]}>
                <View style={[styles.verticalLayout, { flex: 3 }]}>
                    <View style={[{ flex: 10 }]} />
                    <Text style={[mainStyles.contentsHeader, { flex: 4 }]}>투표함</Text>
                </View>

                <View style={[{ height: 3, backgroundColor: baseColor }]}></View>
            </View>

        </View>
    );
}

export default Header;