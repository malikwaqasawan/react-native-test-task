import React from 'react';
import {
  TextInput,
  Text,
  StyleSheet,
  View,
  Button,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

import { useDispatch } from "react-redux";
import { LogOut } from '../../redux/slices/auth-slice';


const Dashboard = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(LogOut())
  }

  return (
    <SafeAreaView >
      <Text>Dashboard</Text>

      <View >
        <TouchableOpacity onPress={handleLogout}>
          <Text >Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Dashboard