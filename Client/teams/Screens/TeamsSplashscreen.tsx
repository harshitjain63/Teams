import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {Images} from '../constants/Image';
import LinearGradient from 'react-native-linear-gradient';

type SplashProp = NativeStackScreenProps<RootStackParams, 'Splash'>;

const TeamsSplashscreen = ({navigation}: SplashProp) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 3000);
  }, [navigation]);

  return (
    <LinearGradient colors={['#00FFFF', '#8A2BE2']} style={styles.gradient}>
      <View style={styles.container}>
        <Image style={styles.img} source={Images.chaticon} />
        <Text style={styles.txt}>Teams App</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    height: 100,
    width: 100,
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 10,
  },
});

export default TeamsSplashscreen;
