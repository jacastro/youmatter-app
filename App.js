import React, {Component} from 'react';
import { KeyboardAvoidingView } from 'react-native';

import Router from './app/router'
import { JoinScreen } from './app/screens/Join'
import { LoginScreen } from './app/screens/Login'
import { AuthLoadingScreen } from './app/screens/AuthLoading'

//import { Login } from "./app/screens/Login";
//import { View } from 'native-base';

//export default Login;

//export default RootApp;

/*export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      userType: ''
    }
  }
  
  render() {
    return <JoinScreen />;
  }
}*/

import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

const AuthStack = createStackNavigator({ SignIn: JoinScreen, LogIn: LoginScreen });

const StartApp = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: Router,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

const App = () => (
  <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
    <StartApp />
  </KeyboardAvoidingView>
)

export default App;