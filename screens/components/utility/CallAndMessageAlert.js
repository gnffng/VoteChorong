import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';

import Theme from '../../utilities/Demensions';

import { styles, subColor } from '../../styles/CommonStyle';
import { utilityStyles } from '../../styles/UtilityStyle';

const CallAndMessageAlert = (props) => {

    const [selectedNumber, setSelectedNumber] = React.useState(props.selectedNumbers[0].number);

    const doSubmit = () => {
        props.funcSubmit();
        if (props.iconType == 'call') {
            Linking.openURL('tel:' + selectedNumber);
        }
        if (props.iconType == 'message') {
            Linking.openURL('sms:' + selectedNumber);
        }
    };

    const doCancel = () => {
        props.funcCancel();
    };

    return (
        <View style={[utilityStyles.backPannel]}>
            <View style={[styles.whiteBackground, utilityStyles.callAndMessagePannel]}>
                <View style={[{ flex: 1 }]} />
                <View style={[styles.verticalLayout, { flex: 3 }]}>
                    <View style={[{ flex: 3 }]} />
                    <View style={[utilityStyles.icon]} >

                        {props.iconType == 'call' &&
                            <Image style={{ width: Theme.width * 50, height: Theme.width * 50 }} resizeMode='stretch' source={require('../../../resource/image/button/call.png')} />
                        }

                        {props.iconType == 'message' &&
                            <Image style={{ width: Theme.width * 50, height: Theme.width * 50 }} resizeMode='stretch' source={require('../../../resource/image/button/message.png')} />
                        }
                    </View>
                    <View style={[{ flex: 3 }]} />
                </View>
                <View style={[{ flex: 1 }]} />
                <View style={[{ flex: 1 }]}>
                    <Text style={[utilityStyles.mainText]}>{props.mainText}</Text>
                </View>
                <View style={[{ flex: 1 }]} />
                <View style={[{ flex: 10 }, styles.verticalLayout]}>
                    <View style={[{ flex: 1 }]} />
                    <View style={[{ flex: 12, backgroundColor: '#EEE', padding: 10, borderRadius: 7 }]} >
                        <ScrollView style={[{ flex: 1 }]}>
                            {
                                props.selectedNumbers.map((number, idx) => {
                                    if ((props.iconType == 'message' && number.label == 'mobile') || props.iconType != 'message') {
                                        const addtionStyle = {};
                                        if (number.number == selectedNumber) {
                                            addtionStyle['backgroundColor'] = "#CCC";
                                        }
                                        return (
                                            <TouchableOpacity
                                                onPress={() => { setSelectedNumber(number.number); }}>
                                                <Text style={[{ flex: 1, fontSize: Theme.fontSizes.fontSizes22 }, addtionStyle]}>{number.number}</Text>
                                            </TouchableOpacity>
                                        );
                                    }
                                })
                            }
                        </ScrollView>
                    </View>
                    <View style={[{ flex: 1 }]} />
                </View>
                <View style={[{ flex: 1.5 }]} />
                <View style={[styles.verticalLayout, { flex: 2.5 }]}>
                    <View style={[{ flex: 2 }]} />

                    <TouchableOpacity style={[{ flex: 15 }]} onPress={doSubmit}>
                        <View style={[styles.centerLayout, styles.subBackground, { flex: 1, borderRadius: 10 }]}>
                            <View style={[{ flex: 1 }]} />
                            <Text style={[{ flex: 1, fontSize: Theme.fontSizes.fontSizes12, fontWeight: '800', color: 'white' }]}>확인</Text>
                            <View style={[{ flex: 1 }]} />
                        </View>
                    </TouchableOpacity>

                    <View style={[{ flex: 1 }]} />
                    <TouchableOpacity style={[{ flex: 15 }]} onPress={doCancel}>
                        <View style={[styles.centerLayout, { flex: 1, borderRadius: 10, backgroundColor: '#E2E4F0' }]}>
                            <View style={[{ flex: 1 }]} />
                            <Text style={[{ flex: 1, fontSize: Theme.fontSizes.fontSizes12, fontWeight: '800', color: 'black' }]}>취소</Text>
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

export default CallAndMessageAlert;

