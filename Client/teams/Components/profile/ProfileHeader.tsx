import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Images} from '../../constants/Image';

const ProfileHeader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={Images.profileicon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
});

export default ProfileHeader;
