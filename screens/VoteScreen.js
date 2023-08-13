import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, ScrollView, TouchableOpacity, Linking, ImageBackground, processColor } from 'react-native';
import { styles, baseColor, subColor } from './styles/CommonStyle';
import { utilityStyles } from './styles/UtilityStyle';
import Theme from './utilities/Demensions';

const VoteScreen = ({ navigation, route }) => {

  const [countTime, setCountTime] = React.useState(0);

  const [agree, setAgree] = React.useState(0);
  const [oppose, setOppose] = React.useState(0);
  const [abstention, setAbstention] = React.useState(0);

  const [isFinish, setIsFinish] = React.useState(false);

  const [data,setData] = React.useState({
    dataSets: [{
      values: [],
      label: '조항마을 투표결과',
      config: {
        colors: [processColor('#8CEAFF'), processColor('#FF8C9D'), processColor('#AAAAAA')],
        valueTextSize: 20,
        valueTextColor: processColor(baseColor),
        sliceSpace: 3,
        selectionShift: 13,
        // xValuePosition: "OUTSIDE_SLICE",
        // yValuePosition: "OUTSIDE_SLICE",
        valueFormatter: "#.#'%'",
        valueLineColor: processColor('baseColor'),
        valueLinePart1Length: 0.5
      }
    }],
  });

  const recurceCountTime = (time, vote) => {
    setCountTime(time);

    switch(vote){
      case "agree" :
        setAgree(agree+1);
        console.log(agree);
        break;
      case "oppose" :
        setOppose(oppose+1);
        console.log(oppose);
        break;
      case "abstention" :
        setAbstention(abstention+1);
        console.log(abstention);
        break;
      default:
        console.log(vote);
        break;
    }

    console.log("finish");
    
    if(agree+oppose+abstention == route.params.numOfPeople-1){
      if(agree!=0 || vote=="agree"){
        const value = {value: vote=="agree"?agree+1:agree, label: vote=="agree"?'찬성('+(agree+1)+')':'찬성('+agree+')'};
        data.dataSets[0].values.push(value);
      }
      if(oppose!=0 || vote=="oppose"){
        const value = {value: vote=="oppose"?oppose+1:oppose, label: vote=="oppose"?'반대('+(oppose+1)+')':'반대('+oppose+')'};
        data.dataSets[0].values.push(value);
      }
      if(abstention!=0 || vote=="abstention"){
        const value = {value: vote=="abstention"?abstention+1:abstention, label: vote=="abstention"?'기권('+(abstention+1)+')':'기권('+abstention+')'};
        data.dataSets[0].values.push(value);
      }

      setData(data);
      setIsFinish(true);
    }
    else{
      console.log((agree+oppose+abstention)+"="+route.params.numOfPeople);
    }
  }

  //렌더링
  return (
    <SafeAreaView style={[{flex:1}]}>
      <View style={[{flex:1, backgroundColor:baseColor}]}>
        <View style={[{flex:1}]} />
        <Text style={[{flex:2, color:'white', textAlign:'center', textAlignVertical:'center', fontSize:Theme.fontSizes.fontSizes16, fontWeight:'900'}]}>투표 안건</Text>
        <Text style={[{flex:5, color:'white', textAlign:'center', textAlignVertical:'center', fontSize:Theme.fontSizes.fontSizes22, fontWeight:'900'}]}>{route.params.title}</Text>
        <View style={[{flex:1}]} />
      </View>

      <View style={[{flex:3, alignItems: "center"}]}>
        <Image source={require("../resource/image/icon/vote.png")} resizeMode='stretch' style={[{ width:Theme.deviceWidth*0.9, height:Theme.deviceWidth*0.9, marginTop:Theme.deviceWidth*0.05, borderRadius:Theme.deviceWidth*0.45, borderWidth:3, borderColor:subColor }]} />
      </View>

      { !isFinish && route.params.isPossibleAbstention &&
        <View style={[styles.verticalLayout,{flex:2, backgroundColor:baseColor}]}>
        <View style={[{flex:1}]} />
        <View style={[{flex:5}]}>
          <View style={[{flex:1}]} />
          <TouchableOpacity
            style={[{flex:10, borderRadius:10, backgroundColor:'blue', borderColor:'#33F', borderWidth:3}]}
            onPress={() => { 
              recurceCountTime(5, "agree");
            }}>
            <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>찬성</Text>
          </TouchableOpacity>
          <View style={[{flex:1}]} />
        </View>
        <View style={[{flex:1}]} />
        <View style={[{flex:5}]}>
          <View style={[{flex:1}]} />
          <TouchableOpacity 
            style={[{flex:10, borderRadius:10, backgroundColor:'red', borderColor:'#F33', borderWidth:3}]}
            onPress={() => { 
              recurceCountTime(5, "oppose"); 
            }}>
          <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>반대</Text>
          </TouchableOpacity>
          <View style={[{flex:1}]} />
        </View>
        <View style={[{flex:1}]} />
        <View style={[{flex:5}]}>
          <View style={[{flex:1}]} />
          <TouchableOpacity 
            style={[{flex:10, borderRadius:10, backgroundColor:'#666', borderColor:'#888', borderWidth:3}]}
            onPress={() => { 
              recurceCountTime(5, "abstention"); 
            }}>
          <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>기권</Text>
          </TouchableOpacity>
          <View style={[{flex:1}]} />
        </View>
        <View style={[{flex:1}]} />
      </View>
      }

      { !isFinish && !route.params.isPossibleAbstention &&
        <View style={[styles.verticalLayout,{flex:2, backgroundColor:baseColor}]}>
          <View style={[{flex:1}]} />
          <View style={[{flex:5}]}>
            <View style={[{flex:1}]} />
            <TouchableOpacity
              style={[{flex:10, borderRadius:10, backgroundColor:'blue', borderColor:'#33F', borderWidth:3}]}
              onPress={() => { 
                recurceCountTime(5, "agree"); 
              }}>
              <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>찬성</Text>
            </TouchableOpacity>
            <View style={[{flex:1}]} />
          </View>
          <View style={[{flex:1}]} />
          <View style={[{flex:5}]}>
            <View style={[{flex:1}]} />
            <TouchableOpacity 
              style={[{flex:10, borderRadius:10, backgroundColor:'red', borderColor:'#F33', borderWidth:3}]}
              onPress={() => { 
                recurceCountTime(5, "oppose"); 
              }}>
            <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>반대</Text>
            </TouchableOpacity>
            <View style={[{flex:1}]} />
          </View>
          <View style={[{flex:1}]} />
        </View>
      }

      {/* { countTime>0 &&
        <View style={[utilityStyles.backPannel]}>
          <Text style={[utilityStyles.customPannel, {textAlign:'center', textAlignVertical:'center', fontSize:Theme.fontSizes.fontSizes22, fontWeight:'900', color:'black'}]}>
            투표완료......{countTime}
          </Text>
        </View>
      } */}

      { isFinish &&
        <View style={[styles.verticalLayout,{flex:2, backgroundColor:baseColor}]}>
          <View style={[{flex:1}]} />
          <View style={[{flex:10}]}>
            <View style={[{flex:1}]} />
            <TouchableOpacity
              style={[{flex:10, borderRadius:10, backgroundColor:'blue', borderColor:'#33F', borderWidth:3}]}
              onPress={() => {
                navigation.navigate("RESULT", {
                  title : route.params.title,
                  data : data,
                  agree : agree,
                  oppose : oppose,
                  abstention : abstention
                });
              }}>
              <Text style={[{flex:1, color:'white', fontSize:Theme.fontSizes.fontSizes22, textAlign:'center', textAlignVertical:'center'}]}>결과 보기</Text>
            </TouchableOpacity>
            <View style={[{flex:1}]} />
          </View>
          <View style={[{flex:1}]} />
        </View>
      }
      <Text style={[{position:'absolute', right:20, top:20, fontSize:Theme.fontSizes.fontSizes22, fontWeight:'900', color:'white'}]}>{agree+oppose+abstention}/{route.params.numOfPeople}</Text>
    </SafeAreaView>
  );
}

export default VoteScreen;
