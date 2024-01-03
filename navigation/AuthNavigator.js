import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Register from '../screens/Register';

const AuthStack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerLeft: () => null,
      }}>
      <AuthStack.Screen name="Register" component={Register} />
      <AuthStack.Screen name="Login" component={Login} />
      {/* <AuthStack.Screen name="ResetPassword" component={ResetPassword} /> */}
    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;