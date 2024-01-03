import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-paper';


import { SetState, SignIn } from '../../redux/slices/auth-slice';

import { TextInput, Button, Background, BackButton } from "../../components"

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { err, message, success } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({});


  const handleChageUserLogin = (text, name) => {
    setUserDetails((preVal) => ({
      ...preVal,
      [name]: text
    }))
  }

  const handleSubmitUserLogin = () => {
    dispatch(SignIn(userDetails))
  }

  const showToast = (type, text1) => {
    Toast.show({
      type,
      text1,
    });
  }

  useEffect(() => {
    if (success && !err) {
      showToast("success", message)
      dispatch(SetState({ field: "success", value: false }));
      dispatch(SetState({ field: "message", value: "" }));
    }
  }, [success]);

  useEffect(() => {
    if (err) {
      showToast("error", err)
      dispatch(SetState({ field: "err", value: "" }));
    }
  }, [err]);

  return (
    // <SafeAreaView>
    <Background>
      <Text>Email:</Text>
      <TextInput value={userDetails?.email} onChangeText={(text) => handleChageUserLogin(text, "email")} />

      <Text>Password:</Text>
      <TextInput value={userDetails?.password} onChangeText={(text) => handleChageUserLogin(text, "password")} />

      <Button mode="contained" onPress={handleSubmitUserLogin}>
        Login
      </Button>

    </Background>
    // </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  view: {
    marginStart: 16,
    marginEnd: 16
  },

});

export default Login;