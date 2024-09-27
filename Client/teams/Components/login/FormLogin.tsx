import {View, StyleSheet, Text} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import LoginIcons from '../LoginIcons';
import Buttons from '../Button';
import {LoginProps} from '../../Screens/Login';
import {Alert} from 'react-native';
import {useAppDispatch} from '../../redux/hooks/customHook';
import {setToken} from '../../redux/services/auth/authSlice';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {useTranslation} from 'react-i18next';

interface FormLoginProps extends LoginProps {
  translations: any; // Define the type for translations
}

const FormLogin = ({navigation, translations}: FormLoginProps) => {
  const {t} = useTranslation('auth');
  console.log('<<<<<<>>>>>>', t('password_placeholder'));
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const onPressHandler = () => {
    setEmail('');
    setPassword('');
    setPasswordShown(false);
    navigation.navigate('Home');
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axiosInstance.post('/auth/login', {
        email: email,
        password: password,
      });
      if (data.data) {
        console.log(data.data);
        dispatch(setToken(data.data.token));
        await AsyncStorage.setItem('token', data.data.token);
        Alert.alert('Login', 'User Logged In successfully', [
          {text: 'OK', onPress: onPressHandler},
        ]);
      }
    } catch (error) {
      console.error((error as any).message);
    }
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        label={t('email_placeholder')}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        autoComplete="email"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
      />

      <TextInput
        secureTextEntry={!passwordShown}
        label={t('password_placeholder')}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
        autoComplete="password"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
        right={
          <TextInput.Icon
            icon={passwordShown ? 'eye-off' : 'eye'}
            onPress={togglePassword}
          />
        }
      />
      <LoginIcons />

      {/* Register Button */}
      <Buttons
        txt={t('submit_button_text')}
        styles={styles.custom_button}
        onpress={() => {
          postApiData();
        }}
      />
      <Text style={styles.txt}>
        {t('dont_have_account')}{' '}
        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.txt2}>
          {' '}
          {t('register_button_text')}
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    color: 'black',
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: '10%',
  },
  txt2: {
    color: 'blue',
  },
  formContainer: {
    padding: 20,
    marginTop: '5%',
    width: '100%',
  },
  input: {
    marginBottom: '6%',
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: '8%',
  },
  error: {
    color: 'red',
    marginBottom: '1%',
  },
});

export default FormLogin;
