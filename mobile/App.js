// rnfes
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Provider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import Login from './screen/Login'
import Register from './screen/Register'
import Landing from './screen/Landing'
import Success from './screen/Success'
import Result from './screen/Result'
import Logout from './screen/Logout'
import reduxStore from './redus/store'
import Exam from './screen/Exam'

const App = () => {
  const Stack = createNativeStackNavigator()
  return <Provider store={reduxStore}>
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='login' component={Login} />
          <Stack.Screen name='register' component={Register} />
          <Stack.Screen name='landing' component={Landing} />
          <Stack.Screen name='exam' component={Exam} />
          <Stack.Screen name='success' component={Success} />
          <Stack.Screen name='result' component={Result} />
          <Stack.Screen name='logout' component={Logout} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  </Provider>
}

export default App

const styles = StyleSheet.create({})