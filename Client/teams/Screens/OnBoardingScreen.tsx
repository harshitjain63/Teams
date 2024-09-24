import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import MovingArrowButton from '../Components/onboarding/MovingArrow';
import {Images} from '../constants/Image';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {useAppDispatch, useAppSelector} from '../redux/hooks/customHook';
import {fetchToken} from '../redux/services/auth/authSlice';

type OnboardingProp = NativeStackScreenProps<RootStackParams, 'OnBoarding'>;

const OnBoardingScreen = ({navigation}: OnboardingProp) => {
  const dispatch = useAppDispatch();
  const {loginDetails, loading} = useAppSelector(state => state.auth);
  const [move, setMove] = useState<boolean>(false);

  useEffect(() => {
    dispatch(fetchToken());
  }, [dispatch]);

  console.log('token:', loginDetails.token);

  useEffect(() => {
    if (move) {
      if (!loading) {
        if (loginDetails.token && loginDetails.token.length > 0) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      }
    }
  }, [loading, loginDetails, move, navigation]);

  return (
    <LinearGradient colors={['#00FFFF', '#8A2BE2']} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.txt}>Choose Language</Text>
        <Image style={styles.img} source={Images.chaticon} />
        <MovingArrowButton
          title="English"
          onPress={() => {
            setMove(true);
          }}
          containerStyles={styles.customButtonStyles}
          textStyles={styles.text}
        />

        <MovingArrowButton
          title="Hindi"
          onPress={() => {
            setMove(true);
          }}
          containerStyles={styles.customButtonStyles}
        />
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
    height: '20%',
    width: '40%',
    marginBottom: '20%',
  },
  txt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 28,
    marginBottom: '20%',
  },
  text: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
  },
  customButtonStyles: {
    width: '58%',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    elevation: 8,
    shadowOffset: {width: 0, height: 4},
    shadowRadius: 8,
    marginBottom: '12%',
  },
});

export default OnBoardingScreen;
