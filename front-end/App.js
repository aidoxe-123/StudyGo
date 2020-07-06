import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import LoginStack from './src/navigations/LoginStack'
import {useFonts} from '@use-expo/font'
import {AppLoading} from 'expo'

export default function App() {
  let [fontsLoaded] = useFonts({
    'raleway-medium': require('./assets/fonts/Raleway-Medium.ttf'),
    'raleway-bold': require('./assets/fonts/Raleway-Bold.ttf'),
    'sourcesanspro-regular': require('./assets/fonts/SourceSansPro-Regular.ttf'),
    'sourcesanspro-semibold': require('./assets/fonts/SourceSansPro-SemiBold.ttf'),
  })
  if (!fontsLoaded) {
    return <AppLoading/>
  } else {
    return (
      <NavigationContainer>
         <LoginStack />
      </NavigationContainer>
    )
  }
}