import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert, ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';
import RNFS from 'react-native-fs';
import Mailer from 'react-native-mail';
import Toast from 'react-native-easy-toast';

import Theme from '../../utilities/Demensions';

import { styles, baseColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';
import { roundToNearestPixel } from 'react-native/Libraries/Utilities/PixelRatio';
import StorageManager from '../../utilities/StorageManager';
import VcardManager from '../../utilities/VCardManager';



const FooterPannel = (props) => {

    const exportVcfToStorage = (path) => {
        StorageManager.readData().then((jsonData) => {
            const filteredJsonData = jsonData.filter(data => data.id == props.selectedDataId);
            for (const data of filteredJsonData) {
                const filePath = VcardManager.exportDataToVcf(data, path);
            }
            console.log(JSON.stringify(filteredJsonData));
            ToastAndroid.show('\'' + path + '\' 경로에 연락처가 저장되었습니다.', ToastAndroid.SHORT);
        });
    }

    const footerStyle = styles.exportFooter;

    return (
        <View style={[footerStyle]}>

            <View style={[styles.centerLayout, { height: Theme.height * 250 }]}>

                <View style={[styles.verticalLayout, styles.subBackground, styles.centerLayout, { flex: 3, borderTopLeftRadius: 7, borderTopRightRadius: 7 }]} >
                    <View style={[{ flex: 1 }]} />
                    <View style={[styles.verticalLayout, styles.centerLayout, { flex: 1 }]}>
                        <Text style={[{ flex: 2, textAlign: "center", color: "white", fontSize: Theme.fontSizes.fontSizes14, fontWeight: "800" }]}>
                            내보내기
                        </Text>
                        <View style={[{ flex: 1 }]}>
                            <Image style={{ width: 30, height: 30 }} resizeMode='stretch' source={require('../../../resource/image/icon/share.png')} />
                        </View>

                    </View>
                    <View style={[{ flex: 1 }]} />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        VcardManager.exportDataToMessage(RNFS.CachesDirectoryPath, [props.selectedDataId]);
                        props.setIsExportFooterOn(false);
                    }}
                    style={[styles.verticalLayout, styles.baseBackground, styles.centerLayout, { flex: 3, borderBottomWidth: 0.5, borderColor: "white" }]} >
                    <View style={[{ flex: 5 }]} />
                    <View style={[styles.verticalLayout, styles.centerLayout, { flex: 5 }]}>
                        <View style={[{ flex: 1 }]}>
                            <Image style={{ width: 50, height: 50 }} resizeMode='stretch' source={require('../../../resource/image/icon/message.png')} />
                        </View>
                        <Text style={[{ flex: 2, textAlign: "center", color: "white", fontSize: Theme.fontSizes.fontSizes14, fontWeight: "400" }]}>
                            SMS
                        </Text>
                    </View>
                    <View style={[{ flex: 5 }]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        VcardManager.exportDataToMail(RNFS.CachesDirectoryPath, [props.selectedDataId]);
                        props.setIsExportFooterOn(false);
                    }}
                    style={[styles.verticalLayout, styles.baseBackground, styles.centerLayout, { flex: 3, borderTopWidth: 0.5, borderBottomWidth: 0.5, borderColor: "white" }]} >
                    <View style={[{ flex: 5 }]} />
                    <View style={[styles.verticalLayout, styles.centerLayout, { flex: 5 }]}>
                        <View style={[{ flex: 1 }]}>
                            <Image style={{ width: 50, height: 50 }} resizeMode='stretch' source={require('../../../resource/image/icon/email.png')} />
                        </View>
                        <Text style={[{ flex: 2, textAlign: "center", color: "white", fontSize: Theme.fontSizes.fontSizes14, fontWeight: "500" }]}>
                            이메일
                        </Text>
                    </View>
                    <View style={[{ flex: 5 }]} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        exportVcfToStorage(RNFS.DownloadDirectoryPath);
                        props.setIsExportFooterOn(false);
                    }}
                    style={[styles.verticalLayout, styles.baseBackground, styles.centerLayout, { flex: 3, borderTopWidth: 0.5, borderColor: "white" }]} >
                    <View style={[{ flex: 5 }]} />
                    <View style={[styles.verticalLayout, styles.centerLayout, { flex: 5 }]}>
                        <View style={[{ flex: 1 }]}>
                            <Image style={{ width: 50, height: 50 }} resizeMode='stretch' source={require('../../../resource/image/icon/file.png')} />
                        </View>
                        <Text style={[{ flex: 2, textAlign: "center", color: "white", fontSize: Theme.fontSizes.fontSizes14, fontWeight: "500" }]}>
                            내 파일
                        </Text>
                    </View>
                    <View style={[{ flex: 5 }]} />
                </TouchableOpacity>

            </View>

            <TouchableOpacity style={[{ flex: 1, backgroundColor: baseColor }]} onPress={() => props.setIsExportFooterOn(false)}>
                <View style={[styles.centerLayout, { flex: 1, borderTopLeftRadius: 7, borderTopRightRadius: 7, backgroundColor: '#E2E4F0' }]}>
                    <View style={[{ flex: 1 }]} />
                    <Text style={[{ flex: 1, fontSize: Theme.fontSizes.fontSizes14, color: baseColor }]}>뒤로가기</Text>
                    <View style={[{ flex: 1 }]} />
                </View>
            </TouchableOpacity>

        </View>
    );
}

export default FooterPannel;

