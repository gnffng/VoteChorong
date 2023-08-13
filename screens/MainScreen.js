import React from 'react';
import { View, SafeAreaView, ScrollView, BackHandler, Alert, Text, Linking } from 'react-native';
import RNExitApp from 'react-native-exit-app';
import RNFS from 'react-native-fs';
import ImageModal from 'react-native-image-modal';

import Theme from './utilities/Demensions';
import StorageManager from './utilities/StorageManager';

import { styles } from './styles/CommonStyle';

import Header from './components/main/Header';
import Content from './components/main/Content';
import Footer from './components/main/Footer';

import SortPannel from './components/main/SortPannel';
import FooterPannel from './components/main/FooterPannel';
import CustomAlert from './components/utility/CustomAlert';
import CallAndMessageAlert from './components/utility/CallAndMessageAlert';

import { setIsInitAction } from "./utilities/Redux/Reducers/Main/Actions"
import { connect, useSelector, useDispatch } from 'react-redux';
import VcardManager from './utilities/VCardManager';
import { utilityStyles } from './styles/UtilityStyle';
import ContactManager from './utilities/ContactManager';

const MainScreen = ({ navigation, route }) => {

  //Redux : Action에 dispatch하는 함수 선언
  const dispatch = useDispatch();

  const setIsInit = (isInit) => {
    dispatch(setIsInitAction(isInit));
  };

  //Redux : props 받아오기
  const props = useSelector((state) => state.main);

  //State 선언
  const [isSearchInputOn, setIsSearchInput] = React.useState(false);
  const [isSearchOn, setIsSearchOn] = React.useState(false);

  const [isSelectMode, setIsSelectMode] = React.useState(false);
  const [arrSelectedDataId, setArrSelectedDataId] = React.useState([]);

  const [isDeleteAlert, setIsDeleteAlert] = React.useState(false);

  const [originData, setOriginData] = React.useState([]);

  const [data, setData] = React.useState([]);
  const [count, setCount] = React.useState(0);

  const [searchText, setSearchText] = React.useState('');

  const [isSortPannelOn, setIsSortPannelOn] = React.useState(false);

  const [selectedId, setSelectedId] = React.useState(-1);

  const OrderByTypes = {
    DATE_ASC: "DATE_ASC",
    DATE_DESC: "DATE_DESC",
    NAME_ASC: "NAME_ASC",
    NAME_DESC: "NAME_DESC"
  };

  const [orderBy, setOrderBy] = React.useState(OrderByTypes.DATE_DESC);

  //뒤로가기 이벤트 설정
  React.useEffect(() => {
    const backAction = () => {
      if (route.name === "MAIN") {
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
          {
            text: "취소",
            onPress: () => null,
            style: "cancel"
          },
          { text: "종료", onPress: () => RNExitApp.exitApp() }
        ]);
      }
      else {
        navigation.goBack();
      }

      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);


  //Redux에서 받아온 state가 변동될 때마다 초기화
  if (props.isInit) {
    init();
  }

  //초기화
  function init() {
    console.log("initialize...");

    setIsInit(false);

    StorageManager.readData().then(function (jsonData) {
      console.log(JSON.stringify(jsonData));
      if (jsonData === null) {
        StorageManager.storeData([]);
      }

      setOriginData(jsonData);

      setData(jsonData);
      setCount(jsonData.length);

    });

    StorageManager.readIdGenerator().then(function (idGenerator) {
      console.log(JSON.stringify(idGenerator));

      if (idGenerator === null) {
        StorageManager.storeIdGenerator("1");
      }

    });

    setIsSearchInput(false);
    setIsSearchOn(false);

    setIsSelectMode(false);
    setArrSelectedDataId([]);

    setIsDeleteAlert(false);

  }

  //검색
  function search(text) {
    const toSearchText = (text) => {
      return text.replace(/ /gi, "").replace(/-/gi, "").toLowerCase();
    };

    const iSInclude = (text, arr) => {
      for (var i = 0; i < arr.length; i++) {
        if (typeof (arr[i]) == "string" && toSearchText(arr[i]).indexOf(toSearchText(text)) !== -1) {
          return true;
        }
        else if (typeof (arr[i]) == "object" && toSearchText(arr[i].number).indexOf(toSearchText(text)) !== -1) {
          return true;
        }
      }

      return false;
    };

    const newData = [];
    for (var i = 0; i < originData.length; i++) {
      if (iSInclude(text, originData[i].givenName)
        || iSInclude(text, originData[i].company)
        || iSInclude(text, originData[i].department)
        || iSInclude(text, originData[i].phoneNumbers)) {
        newData.push(originData[i]);
      }
    }

    setData(newData);
    setCount(newData.length);

    setSearchText(text);

    if (text.length <= 0) {
      setIsSearchOn(false);
    }
    else {
      setIsSearchOn(true);
    }

  }

  //전체보기(검색 해제)
  function viewAllData() {
    setIsSearchInput(false);
    setIsSearchOn(false);
    setIsSelectMode(false);
    setData(originData);
    setCount(originData.length);
  }

  //선택모드 해제
  function offSelectModeAndSearchInput() {
    setIsSelectMode(false);
    setArrSelectedDataId([]);
    setIsSearchInput(false);
  }

  //해당 연락처가 선택되었는지 확인
  function checkIsSelected(id) {
    return arrSelectedDataId.indexOf(id) >= 0;
  }

  //연락처 터치 이벤트
  function clickContact(idx) {
    if (isSelectMode) {
      const check = checkIsSelected(data[idx].id);

      if (check) {
        arrSelectedDataId.splice(arrSelectedDataId.indexOf(data[idx].id), 1);
      }
      else {
        arrSelectedDataId.push(data[idx].id);
      }

      setArrSelectedDataId([...arrSelectedDataId]);

      if (arrSelectedDataId.length === 0) {
        setIsSelectMode(false);
        setIsExportFooterOn(false);
      }
    }
    else {
      console.log('file://' + RNFS.DocumentDirectoryPath + "/" + data[idx].id + ".png");
      navigation.navigate('DETAILCONTACT', {
        contact: data[idx],
        imageUri: 'file://' + RNFS.DocumentDirectoryPath + "/" + data[idx].id + ".png",
        setIsInit: setIsInit,
        offSelectModeAndSearchInput: offSelectModeAndSearchInput
      });
    }
  }

  //연락처 삭제
  function deleteContact(id) {
    let newData = [];

    for (var i = 0; i < data.length; i++) {
      if (data[i].id!=id) {
        newData.push(data[i]);
      }
    }

    StorageManager.storeData(newData);

    setIsInit(true);

    console.log(data);
  }

  //렌더링
  return (
    <SafeAreaView style={[{ flex: 1 }]}>

      <Header
        count={count}

        searchText={searchText}
        isSearchOn={isSearchOn}
        isSearchInputOn={isSearchInputOn}
        search={search}
        setSearchText={setSearchText}

        viewAllData={viewAllData}

        orderBy={orderBy}
        OrderByTypes={OrderByTypes}
        isSortPannelOn={isSortPannelOn}
        setIsSortPannelOn={setIsSortPannelOn}
      />

      <View style={[{ flex: 500 - (isSearchInputOn ? 40 : 0) }]}>
        <ScrollView style={[styles.baseBackground]}>
          {originData.length == 0 &&
            <View style={[{ height: Theme.deviceHeight * 0.3, justifyContent: 'center' }, styles.centerLayout]}>
              <Text style={[{ color: 'white', fontSize: Theme.fontSizes.fontSizes22 }]}>투표를 시작해보세요!</Text>
            </View>
          }

          {
            data.map(
              function (data, idx) {
                return (
                  <Content
                    key={data.id}
                    navigation={navigation}
                    data={data}
                    setSelectedId={setSelectedId}
                    setIsDeleteAlert={setIsDeleteAlert}
                    />
                );
              }
            )
          }
          {isSelectMode &&
            <View style={[{ height: Theme.height * 130 }]} />
          }
        </ScrollView>
      </View>

      <Footer
        navigation={navigation}
      />

      {isDeleteAlert &&
        <CustomAlert
          iconType='delete'
          funcSubmit={deleteContact}
          funcCancel={() => setIsDeleteAlert(false)}
          id={selectedId}
          mainText="투표결과를 삭제하시겠습니까?"
          subText="선택한 투표결과가 삭제됩니다." />
      }

    </SafeAreaView>
  );
}

export default connect()(MainScreen);