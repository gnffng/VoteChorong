import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, subColor } from '../../styles/CommonStyle';
import { utilityStyles } from '../../styles/UtilityStyle';

const CustomAlert = (props) => {
    return (
        <View style={[utilityStyles.backPannel]}>
            <View style={[styles.whiteBackground, utilityStyles.customPannel]}>
                <View style={[{ flex: 1 }]} />
                <View style={[styles.verticalLayout, { flex: 4 }]}>
                    <View style={[{ flex: 3 }]} />
                    <View style={[utilityStyles.icon]} >
                        {props.iconType == 'delete' &&
                            <Image style={{ width: Theme.width * 50, height: Theme.width * 50 }} resizeMode='stretch' source={require('../../../resource/image/icon/delete.png')} />
                        }

                        {props.iconType == 'config' &&
                            <Image style={{ width: Theme.width * 50, height: Theme.width * 50 }} resizeMode='stretch' source={require('../../../resource/image/icon/config.png')} />
                        }
                    </View>
                    <View style={[{ flex: 3 }]} />
                </View>
                <View style={[{ flex: 1 }]} />
                <View style={[{ flex: 2 }]}>
                    <Text style={[utilityStyles.mainText]}>{props.mainText}</Text>
                </View>
                <View style={[{ flex: 1 }]} />
                <View style={[{ flex: 2 }]}>
                    <Text style={[utilityStyles.subText]}>{props.subText}</Text>
                </View>
                <View style={[{ flex: 1 }]} />
                <View style={[styles.verticalLayout, { flex: 3.5 }]}>
                    <View style={[{ flex: 2 }]} />

                    <TouchableOpacity style={[{ flex: 15 }]} onPress={() => {props.funcSubmit(props.id)}}>
                        <View style={[styles.centerLayout, styles.subBackground, { flex: 1, borderRadius: 10 }]}>
                            <View style={[{ flex: 1 }]} />
                            <Text style={[{ flex: 2, fontSize: Theme.fontSizes.fontSizes12, fontWeight: '800', color: 'white' }]}>확인</Text>
                            <View style={[{ flex: 1 }]} />
                        </View>
                    </TouchableOpacity>

                    <View style={[{ flex: 1 }]} />
                    <TouchableOpacity style={[{ flex: 15 }]} onPress={props.funcCancel}>
                        <View style={[styles.centerLayout, { flex: 1, borderRadius: 10, backgroundColor: '#E2E4F0' }]}>
                            <View style={[{ flex: 1 }]} />
                            <Text style={[{ flex: 2, fontSize: Theme.fontSizes.fontSizes12, fontWeight: '800', color: 'black' }]}>취소</Text>
                            <View style={[{ flex: 1 }]} />
                        </View>
                    </TouchableOpacity>
                    <View style={[{ flex: 2 }]} />
                </View>
                <View style={[{ flex: 1 }]} />
            </View>
        </View>

    );
}

export default CustomAlert;

