import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';

const SearchPannel = (props) => {
    return (
        <View style={[mainStyles.searchView, styles.verticalLayout]}>
            <View style={[{ flex: 1 }]} />
            <View style={[styles.verticalLayout, styles.centerLayout, mainStyles.searchTextBox, { flex: 12 }]}>
                <TextInput style={[mainStyles.searchText, { flex: 9 }]} onChangeText={(text) => { props.search(text) }} />
                <Image style={[{ flex: 1 }]} resizeMode='center' source={require("../../../resource/image/icon/search.png")} />
                <View style={[{ flex: 0.2 }]} />
            </View>

            <View style={[{ flex: 1 }]} />
        </View>
    );
}

export default SearchPannel;

