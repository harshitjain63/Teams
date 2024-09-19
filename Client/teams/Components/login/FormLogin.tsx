import {View, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import LoginIcons from '../LoginIcons';
import Buttons from '../Button';
import axios from 'axios';

const FormLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axios.post(
        'https://o1kjqrzwxh.sharedwithexpose.com/api/auth/login',
        {
          email: email,
          password: password,
        },
      );
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.formContainer}>
      <TextInput
        label={'Enter Your Email'}
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
      />
      <TextInput
        secureTextEntry={!passwordShown}
        label={'Enter Your Password'}
        value={password}
        onChangeText={setPassword}
        mode="outlined"
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
        txt={'Login'}
        styles={styles.custom_button}
        onpress={postApiData}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    padding: 20,
    marginTop: 20,
    width: '100%',
  },
  input: {
    marginBottom: 15,
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: 20,
  },
});

export default FormLogin;
