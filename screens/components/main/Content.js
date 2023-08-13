import React, { Component } from 'react';
import { View, Text, TextInput, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableHighlight, Linking, BackHandler, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/Ionicons'
import RNExitApp from 'react-native-exit-app';
import RNFS from 'react-native-fs';
import ImageModal from 'react-native-image-modal';

import Theme from '../../utilities/Demensions';
import CustomAlert from '../utility/CustomAlert';

import { styles, baseColor, subColor, selectedColor } from '../../styles/CommonStyle';
import { mainStyles } from '../../styles/MainStyle';

const Content = (props) => {
    let agree = 0;
    let oppose = 0;
    let abstention = 0;
    
    for(const value of props.data.data.dataSets[0].values){
        if(value.label.slice(0,2)=="찬성"){
            agree = value.value;
        }
        else if(value.label.slice(0,2)=="반대"){
            oppose = value.value;
        }
        else if(value.label.slice(0,2)=="기권"){
            abstention = value.value;
        }
    }

    const approval = (agree>oppose) ? "가결" : (agree<oppose) ? "부결" : "동결";

    return (
        <TouchableHighlight style={[{marginTop:30}]} onPress={() => { 
            props.navigation.navigate("DETAIL", {
                id : props.data.id,
                title : props.data.title,
                data : props.data.data,
                agree : agree,
                oppose : oppose,
                abstention : abstention
            });
            }}>
            <View style={[styles.verticalLayout, { height:130}]}>
                <View style={[styles.verticalLayout, { flex: 1, backgroundColor: 'white' }]}>

                    <View style={[{ flex: 4 }]}>
                        <View style={[styles.subBackground, {height:80, justifyContent:'center'}]}>
                            <Text style={[{flex:1, textAlign:'center', textAlignVertical:'center', color:'white', fontWeight:'600'}]}>{props.data.title}</Text>
                        </View>
                        <View style={[{height:50, justifyContent:'center', backgroundColor: approval=="가결" ? '#8CEAFF' : approval=="부결" ? '#FF8C9D' : '#AAAAAA'}]}>
                            <Text style={[{flex:1, textAlign:'center', textAlignVertical:'center', color:subColor, fontWeight:'600'}]}>
                                {approval}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={[{ flex: 1 }, styles.centerLayout, styles.verticalLayout]} onPress={() => {
                            props.setSelectedId(props.data.id);
                            props.setIsDeleteAlert(true);
                        }}>
                        <Image style={{ width: 80, height: 80 }} resizeMode='stretch' source={require('../../../resource/image/icon/delete.png')} />
                    </TouchableOpacity>


                </View>

            </View>
        </TouchableHighlight>
    );
}

export default Content;

