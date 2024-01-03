import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Images } from '../../assets';

export default function Logo() {
  return <Image source={Images.logo} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
});