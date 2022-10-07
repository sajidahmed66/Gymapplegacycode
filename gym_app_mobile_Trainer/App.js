import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/routes/AppNavigator'
import { Provider } from 'react-redux';
import { store } from './app/redux/store'

import LogIn from './app/screens/LogInScreen'

export default function App() {
  const [isLogedIn, setIsLogedIn] = useState(false);

  const authHandler = status => {
    setIsLogedIn(status)
  }
  return (
    <Provider store={store} >
      <NavigationContainer>
        <View style={styles.statusbar}></View>
        {isLogedIn ? <AppNavigator changeAuth={authHandler} /> : <LogIn changeAuth={setIsLogedIn} />}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusbar: {
    marginTop: Constants.statusBarHeight,
  }
});
