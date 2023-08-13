import * as React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import Navigator from './screens/Navigator';

import {Provider} from 'react-redux';

import Orientation from 'react-native-orientation';
import store from './screens/utilities/Redux/Store';

function App() {
  //시작이미지 구현
  React.useEffect(()=>{
    SplashScreen.hide();
  }, []);

  //세로화면 고정
  React.useEffect(() => {

      Orientation.lockToPortrait();
      Orientation.addOrientationListener(onOrientationDidChange);

      return () => {
          Orientation.unlockAllOrientations();
          Orientation.removeOrientationListener(onOrientationDidChange);
      }
  }, []);

  const onOrientationDidChange = (orientation) => {
      if (orientation === 'PORTRAIT') {
          Orientation.lockToLandscapeLeft();
      }
  }

    return (
      <Provider store={store} >
        <Navigator />
      </Provider>
    );
  }

export default App;