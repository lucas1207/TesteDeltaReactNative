import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import firebase from 'firebase';

import Routes from './src/routes';
import store from './src/redux';

export default function App() {
  if (!firebase.apps.length) {
    const firebaseConfig = {
      apiKey: 'AIzaSyBqc9uxBN6iZ--_CZk7vcm5aqHfBqTr4GA',
      authDomain: 'testedeltaglobal.firebaseapp.com',
      databaseURL: 'https://testedeltaglobal-default-rtdb.firebaseio.com',
      projectId: 'testedeltaglobal',
      storageBucket: 'testedeltaglobal.appspot.com',
      messagingSenderId: '478178711512',
      appId: '1:478178711512:web:5a13f9d6a5bc6f9c77c4ad',
      measurementId: 'G-632S0EJJH8',
    };
    firebase.initializeApp(firebaseConfig);
  }

  return (

    <Provider store={store}>
    <NavigationContainer>
    <SafeAreaProvider>
      <Routes />
      <StatusBar
      backgroundColor={'#00000000'}
      style={'light'}>
      </StatusBar>
    </SafeAreaProvider>
    </NavigationContainer>
    </Provider>
  );
}
