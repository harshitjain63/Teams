import {View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Images} from '../constants/Image';

const LoginIcons = () => {
  return (
    <View style={styles.icon}>
      <TouchableOpacity>
        <Image style={styles.img} source={Images.goofleicon} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={styles.img} source={Images.facebookicon} />
      </TouchableOpacity>

      <TouchableOpacity>
        <Image style={styles.img} source={Images.twittericon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    flexDirection: 'row',
    gap: 35,
    padding: 10,
    justifyContent: 'center',
    margin: 8,
  },
  img: {
    height: 38,
    width: 38,
  },
});

export default LoginIcons;
