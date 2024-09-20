import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {Images} from '../constants/Image';
import LinearGradient from 'react-native-linear-gradient';
import {useAppDispatch, useAppSelector} from '../redux/hooks/customHook';
import {fetchToken} from '../redux/services/auth/authSlice';

type SplashProp = NativeStackScreenProps<RootStackParams, 'Splash'>;

const TeamsSplashscreen = ({navigation}: SplashProp) => {
  const dispatch = useAppDispatch();
  const {loginDetails, loading} = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  console.log(''.length);
  console.log('<<<>>>', loginDetails.token);

  useEffect(() => {
    setTimeout(() => {
      if (!loading) {
        if (loginDetails.token && loginDetails.token.length > 0) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      }
    }, 5000);
  }, [loading, loginDetails, navigation]);

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
