/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';


import { AuthNavigator, AppNavigator } from './navigation';
import store from './redux/store';
import { Provider, useSelector } from 'react-redux';


const Temp = () => {

  const { err, message, success, token } = useSelector((state) => state.auth);
  return (
    <NavigationContainer>
      {!token ? <AuthNavigator /> : < AppNavigator />}
    </NavigationContainer>
  )
}

function App() {

  return (
    <Provider store={store}>
      <Temp />
      <Toast />
    </Provider>
  );
}



export default App;
