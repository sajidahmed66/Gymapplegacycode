import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './app/routes/AppNavigation';
import LogIn from './app/screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from "./app/redux/store";
import { navigationRef } from './app/routes/Rootnavigatioon'



export default function App() {

  const [isLogedIn, setIsLogedIn] = useState(false);

  return (
    <Provider store={store} >
      <NavigationContainer >
        <View style={styles.statusBar}></View>
        {isLogedIn ? <AppNavigation changeAuth={setIsLogedIn} /> : <LogIn changeAuth={setIsLogedIn} />}
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    marginTop: Constants.statusBarHeight,
  }
});


// create component like this 
// <StoreProvider><PaperProvider><NavigationContainer><Main>
//ref={navigationRef} 