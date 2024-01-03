import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';

export default function BackButton() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={navigation.goBack} style={styles.container}>
      <Image style={styles.image} source={Images.arrowBack} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 10 + getStatusBarHeight(),
    left: 4,
  },
  image: {
    width: 24,
    height: 24,
  },
});