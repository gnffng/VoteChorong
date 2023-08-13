import React, { Component } from 'react';
import { View, ImageBackground, Image, SafeAreaView, ScrollView, TouchableOpacity, Text, AsyncStorageStatic, TextInput, ToastAndroid } from 'react-native';
import CheckBox from '@react-native-community/checkbox';

import { styles, baseColor, subColor, selectedColor } from './styles/CommonStyle';

import Footer from './components/VoteConfig/Footer';
import Theme from './utilities/Demensions';

export default function VoteConfigScreen({ navigation }) {

  //State 선언
  const [title, setTitle] = React.useState("");
  const [numOfPeople, setNumOfPeople] = React.useState("");
  const [isPossibleAbstention, setIsPossibleAbstention] = React.useState(false);

  //렌더링
  return (
    <SafeAreaView style={[styles.whiteBackground, { flex: 1 }]}>
      <ImageBackground source={require("../resource/image/background/vote.png")} resizeMode='cover' style={[{ height: Theme.height * 100 }]} />
      <View style={[styles.verticalLayout, { flex: 3 }]}>
        <ScrollView style={[{ flex: 1, margin: 30 }]}>
          
          <View style={[{ marginBottom: 10, paddingLeft: 10, marginBottom: 10 }]}>
            <Text style={[{ flex: 1, color: subColor, fontWeight: '900', fontSize: Theme.fontSizes.fontSizes22 }]}>투표 안건</Text>
            <TextInput
              style={[{
                flex: 1,
                textAlignVertical: 'top',
                color: 'black',
                fontWeight: '600',
                fontSize: Theme.fontSizes.fontSizes22,
                borderBottomWidth:2, 
                borderColor:subColor
              }]}
              value={title}
              onChangeText={(text) => { setTitle(text) }}
              placeholder="투표 안건을 입력해주세요." />
          </View>



          <View style={[styles.verticalLayout, { marginBottom: 10, marginTop: 70, paddingLeft: 10, marginTop: 70  }]}>

            <View style={[{flex:35}]}>
              <Text style={[{ flex: 1, color: subColor, fontWeight: '900', fontSize: Theme.fontSizes.fontSizes22 }]}>참여 인원수</Text>
              <TextInput
                style={[{
                  flex: 1,
                  textAlignVertical: 'top',
                  textAlign:'center',
                  color: 'black',
                  fontWeight: '600',
                  fontSize: Theme.fontSizes.fontSizes22,
                  borderBottomWidth:2, 
                  borderColor:subColor
                }]}
                value={""+numOfPeople}
                onChangeText={(text) => { setNumOfPeople(text) }}
                placeholder="1" />

            </View>
            
            <View style={[{ marginBottom: 10, paddingLeft: 10 , felx:10}]}>
              <TouchableOpacity
                onPress={(temp) => { setNumOfPeople(""+(Number(numOfPeople)+1)) }}
                style={[styles.centerLayout, { flex: 10 }]} >
                <Image style={{ width: 30, height: 30 }} resizeMode='stretch' source={require('../resource/image/button/plus.png')} />
              </TouchableOpacity>
              <View style={[{flex:999}]} />
              <TouchableOpacity
                onPress={(temp) => { 
                  if(Number(numOfPeople)>1){
                    setNumOfPeople(""+(Number(numOfPeople)-1));
                  }
                }}
                style={[styles.centerLayout, { flex: 10 }]} >
                <Image style={{ width: 30, height: 30 }} resizeMode='stretch' source={require('../resource/image/button/minus.png')} />
              </TouchableOpacity>
            </View>
          </View>


          <View style={[styles.verticalLayout, { marginBottom: 10, marginTop: 70, paddingLeft: 10 }]}>
            <View style={[{flex:30}]} />
            <Text style={[{ flex: 30, textAlign: 'center', color: subColor, fontWeight: '600', fontSize: Theme.fontSizes.fontSizes22 }]}>기권 가능 여부</Text>
            <CheckBox
              disabled={false}
              value={isPossibleAbstention}
              onValueChange={(boolean) => {setIsPossibleAbstention(boolean)}} />
          </View>
          
          

        </ScrollView>
      </View>

      <Footer
        navigation={navigation}
        title={title}
        numOfPeople={numOfPeople}
        isPossibleAbstention={isPossibleAbstention}
        />

    </SafeAreaView>
  );
}
