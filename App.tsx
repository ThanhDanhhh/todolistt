import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import {colors} from './src/contants/colors';
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/routers/Router';

const App = () => {
  return (
    <>
      {/* <SafeAreaView style={{flex: 1, backgroundColor: colors.bgcolor}}> */}
      <StatusBar barStyle="light-content" backgroundColor={colors.bgcolor} />
      <NavigationContainer>
        <Router />
      </NavigationContainer>
      {/* </SafeAreaView> */}
    </>
  );
};

export default App;
