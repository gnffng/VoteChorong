import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking, ImageBackground, processColor } from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';

import { styles, baseColor, subColor } from './styles/CommonStyle';
import Theme from './utilities/Demensions';

import { setIsInitAction } from "./utilities/Redux/Reducers/Main/Actions"
import { connect, useSelector, useDispatch } from 'react-redux';

import StorageManager from './utilities/StorageManager';

const DetailScreen = ({ navigation, route }) => {
  //Redux : Action에 dispatch하는 함수 선언
  const dispatch = useDispatch();

  const setIsInit = (isInit) => {
    dispatch(setIsInitAction(isInit));
  };

  const description = {
    text: route.params.title,
    textSize: 15,
    textColor: processColor('darkgray'),
  };

  const legend = {
    enabled: true,
    textSize: 15,
    form: 'CIRCLE',

    horizontalAlignment: "RIGHT",
    verticalAlignment: "CENTER",
    orientation: "VERTICAL",
    wordWrapEnabled: true
  };

  const highlights = [{x:2}];

  console.log(JSON.stringify(route.params.data));

  //렌더링
  return (
    <SafeAreaView style={[{flex:1}]}>
      <View style={[{flex:1, backgroundColor:baseColor}]}>
        <View style={[{flex:1}]} />
        <Text style={[{flex:2, color:'white', textAlign:'center', textAlignVertical:'center', fontSize:Theme.fontSizes.fontSizes16, fontWeight:'900'}]}>투표 결과</Text>
        <Text style={[{flex:5, color:'white', textAlign:'center', textAlignVertical:'center', fontSize:Theme.fontSizes.fontSizes22, fontWeight:'900'}]}>{route.params.title}</Text>
        <View style={[{flex:1}]} />
        
      </View>

      <View style={[{flex:2}]}>
        <PieChart
          style={[{flex:1}]}
          logEnabled={true}
          chartBackgroundColor={processColor('white')}
          chartDescription={description}
          data={route.params.data}
          legend={legend}
          highlights={highlights}

          extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

          entryLabelColor={processColor(subColor)}
          entryLabelTextSize={20}
          drawEntryLabels={true}

          rotationEnabled={true}
          rotationAngle={45}
          usePercentValues={true}
          styledCenterText={{text:'투표 결과', color: processColor(subColor), size: 20}}
          centerTextRadiusPercent={100}
          holeRadius={40}
          holeColor={processColor('#f0f0f0')}
          transparentCircleRadius={45}
          transparentCircleColor={processColor('#f0f0f088')}
          maxAngle={350}/>
        
      </View>

      <View style={[{
          flex:2,
          backgroundColor:
            route.params.agree>route.params.oppose ? '#8CEAFF' : 
            route.params.agree<route.params.oppose ? '#FF8C9D' : '#AAAAAA'
        }]}>
        <Text style={[{
            flex:1,
            textAlign : 'center',
            textAlignVertical:'center',
            fontSize : Theme.fontSizes.fontSizes22 * 1.5,
            fontWeight : '900'
          }]}>
          {route.params.agree>route.params.oppose &&
            <Text>투표가 가결되었습니다!</Text>
          }
          {route.params.agree<route.params.oppose &&
            <Text>투표가 부결되었습니다!</Text>
          }
          {route.params.agree==route.params.oppose &&
            <Text>동표입니다.</Text>
          }
        </Text>
      </View>
      <View style={[styles.verticalLayout,{flex:1, backgroundColor:baseColor}]}>
          <View style={[{flex:1}]} />
          <View style={[{flex:10}]}>
            <View style={[{flex:1}]} />
            <TouchableOpacity
              style={[{flex:10, borderRadius:10, backgroundColor:'#666', borderColor:'#888', borderWidth:3}]}
              onPress={() => { 
                navigation.navigate("MAIN");
              }}>
              <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>메인화면</Text>
            </TouchableOpacity>
            <View style={[{flex:1}]} />
          </View>
          <View style={[{flex:1}]} />
          <View style={[{flex:10}]}>
            <View style={[{flex:1}]} />
            <TouchableOpacity 
              style={[{flex:10, borderRadius:10, backgroundColor:'#F22', borderColor:'#F55', borderWidth:3}]}
              onPress={() => { 
                  StorageManager.readData().then((data) => {
                    const newData = [];

                    for(const value of data){
                      if(value.id!=route.params.id){
                        newData.push(value);
                      }
                    }

                    StorageManager.storeData(newData).then(() => {
                      setIsInit(true);
                      navigation.navigate("MAIN");
                    })
                  });
              }}>
            <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>결과 삭제</Text>
            </TouchableOpacity>
            <View style={[{flex:1}]} />
          </View>
          <View style={[{flex:1}]} />
        </View>
      
    </SafeAreaView>
  );
}

export default DetailScreen;
