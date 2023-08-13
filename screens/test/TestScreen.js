// DetailScreen.js
import React, { Component } from 'react';
import { View, ScrollView, Text, Button, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Share from 'react-native-share';

import StorageManager from '../utilities/StorageManager';
import ContactManager from '../utilities/ContactManager';
import ExcelManager from '../utilities/ExcelManager';
import VcardManager from '../utilities/VCardManager';

import { arrData, idGenerator } from '../../resource/data/contactList';

import { styles } from '../styles/CommonStyle';


export default function TestScreen({ navigation, route }) {

  const [dataDatabase, setDataDatabase] = React.useState("");
  const [dataContact, setDataContact] = React.useState("");

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(arrData);
      await AsyncStorage.setItem('@data', jsonValue);
      console.log(jsonValue);

      await AsyncStorage.setItem('@idGenerator', String(arrData.length + 1));
      console.log(idGenerator);
    } catch (e) {
      // saving error
    }
  }

  const storeIdGenerator = async (idGenerator) => {
    try {
      await AsyncStorage.setItem('@idGenerator', idGenerator);
      console.log(idGenerator);
    } catch (e) {
      // saving error
    }
  }

  const print = () => {
    StorageManager.readData().then(function (jsonData) {
      console.log(JSON.stringify(jsonData));
      setDataDatabase(JSON.stringify(jsonData));
    });

    StorageManager.readIdGenerator().then(function (idGenerator) {
      console.log(idGenerator);
    });

  }

  const share = (url) => {
    let option = {
      type: "text/v-card",
      url: "file://" + url
    };
    Share.open(option)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        err && console.log(err);
      });
  }

  //더미데이터
  const newContact = {
    givenName: "고길동",
    phoneNumbers: [
      {
        label: "mobile",
        number: "010-1111-1112"
      },
      {
        label: "work",
        number: "010-1111-1113"
      },
      {
        label: "other",
        number: "010-1111-1114"
      }
    ],
    postalAddresses: [
      {
        label: "work",
        street: "경기도 성남시 분당구 성남대로 393 A205",
      }
    ],
    emailAddresses: [
      {
        label: "work",
        email: "aaa@example.com"
      }
    ],
  };

  const contactData = {
    id: 1,
    givenName: ["테스트1", "TEST1"],
    company: ["Enssel", "inssel"],
    department: ["IT사업부", "AI개발부"],
    emailAddresses: [
      { "email": "test@enssel.com" },
      { "email": "test@test.com" }
    ],
    phoneNumbers: [
      { "label": "mobile", "number": "010-1234-5678" },
      { "label": "mobile", "number": "010-1111-0000" },
      { "label": "work", "number": "031-123-45678" },
      { "label": "work", "number": "031-111-0000" },
      { "label": "other", "number": "031-111-2222" },
      { "label": "other", "number": "031-333-4444" }
    ],
    postalAddresses: [
      { "label": "work", "street": "경기도 성남시 분당구 성남대로 393 A205" },
      { "label": "work", "street": "경기도 성남시 분당구 테스트대로 404-502" }
    ],
    urlAddresses: [
      { "url": "http://www.enssel.com/" },
      { "url": "http://www.test.com" }
    ],
    note: "사람",
    date: new Date().toISOString()
  };

  const csvData = [{ id: '1', name: 'First User' }, { id: '2', name: 'Second User' }, { id: '3', name: '홍길동' }, { id: '4', name: '엔셀테스트' }];

  return (
    <ScrollView>
      <View style={[{ borderWidth: 5 }]}>
        <View>
          <Text style={[{ fontSize: 30, textAlign: 'center', backgroundColor: "#777777", color: "black", fontWeight: "900" }]}>DB테스트</Text>
        </View>
        <View style={[styles.verticalLayout]}>
          <TouchableOpacity onPress={storeData} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>초기화</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={print} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>불러오기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[{ height: 500 }]}>
          <Text>
            {dataDatabase}
          </Text>
        </ScrollView>
      </View>

      <View style={[{ borderWidth: 5 }]}>
        <View>
          <Text style={[{ fontSize: 30, textAlign: 'center', backgroundColor: "#777777", color: "black", fontWeight: "900" }]}>연락처테스트</Text>
        </View>
        <View style={[styles.verticalLayout]}>
          <TouchableOpacity onPress={ContactManager.openForm} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>폼열기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => ContactManager.addContacts(newContact)} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>저장하기</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ContactManager.sync} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>불러오기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[{ height: 500 }]}>
          <Text>
            {dataContact}
          </Text>
        </ScrollView>
      </View>

      <View style={[{ borderWidth: 5 }]}>
        <View>
          <Text style={[{ fontSize: 30, textAlign: 'center', backgroundColor: "#777777", color: "black", fontWeight: "900" }]}>엑셀테스트</Text>
        </View>
        <View style={[styles.verticalLayout]}>
          <TouchableOpacity onPress={() => ExcelManager.exportDataToExcel(csvData)} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>파일생성</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={ExcelManager.takeContactFromDocument} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>파일가져오기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[{ height: 500 }]}>
          <Text>
            {dataContact}
          </Text>
        </ScrollView>
      </View>

      <View style={[{ borderWidth: 5 }]}>
        <View>
          <Text style={[{ fontSize: 30, textAlign: 'center', backgroundColor: "#777777", color: "black", fontWeight: "900" }]}>VCF테스트</Text>
        </View>
        <View style={[styles.verticalLayout]}>
          <TouchableOpacity onPress={() => VcardManager.exportDataToVcf(contactData)} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>파일생성</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={VcardManager.takeContactFromDocument} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>파일가져오기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[{ height: 500 }]}>
          <Text>
            {dataContact}
          </Text>
        </ScrollView>
      </View>

      <View style={[{ borderWidth: 5 }]}>
        <View>
          <Text style={[{ fontSize: 30, textAlign: 'center', backgroundColor: "#777777", color: "black", fontWeight: "900" }]}>내보내기 테스트</Text>
        </View>
        <View style={[styles.verticalLayout]}>
          <TouchableOpacity onPress={() => share(VcardManager.exportDataToVcf(contactData))} style={[{ flex: 1, borderWidth: 1 }]}>
            <Text style={[{ fontSize: 30, textAlign: 'center' }, styles.debug3, styles.whiteFontColor]}>내보내기</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={[{ height: 500 }]}>
          <Text>
            {dataContact}
          </Text>
        </ScrollView>
      </View>

    </ScrollView>
  );
}