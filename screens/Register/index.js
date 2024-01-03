import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View, SafeAreaView } from 'react-native';
import Toast from 'react-native-toast-message';
import { Text } from 'react-native-paper';
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from '@react-navigation/native';


import { TextInput, Button, Background, Loading, Header } from "../../components"
import { UserRegistration, SetState } from "../../redux/slices/auth-slice";
import styles from './styles';

const Register = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { err, message, success, loading } = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState({});

  const handleChageUserRegister = (text, name) => {
    setUserDetails((preVal) => ({
      ...preVal,
      [name]: text
    }))
  }

  const handleSubmitUserRegister = () => {
    dispatch(UserRegistration(userDetails))
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

    <Background>
      <Header>Create Account</Header>
      <Text >UserName:</Text>
      <TextInput value={userDetails?.userName} onChangeText={(text) => handleChageUserRegister(text, "userName")} />

      <Text >Email:</Text>
      <TextInput value={userDetails?.email} onChangeText={(text) => handleChageUserRegister(text, "email")} />

      <Text >Password:</Text>
      <TextInput value={userDetails?.password} onChangeText={(text) => handleChageUserRegister(text, "password")} />

      <Button mode="contained" onPress={handleSubmitUserRegister} >Register</Button>

      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>

      {loading && <Loading animating />}
    </Background>
  );
}
export default Register