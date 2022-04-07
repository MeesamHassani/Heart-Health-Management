import React, {Component} from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import LoginScreen from '../screen/authScreens/LoginScreen';
import SignupScreen from '../screen/authScreens/SignupScreen';

const Stack = createStackNavigator();

class AuthNavigator extends Component {
  render() {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
      </Stack.Navigator>
    );
  }
}

export default AuthNavigator;
