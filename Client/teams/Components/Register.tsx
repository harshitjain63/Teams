import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import Buttons from '../Components/Button';
import axios from 'axios';
import LoginIcons from './LoginIcons';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../constants/Image';

const {height} = Dimensions.get('window');

const Register = () => {
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axios.post(
        'https://o1kjqrzwxh.sharedwithexpose.com/api/auth/register',
        {
          name: name,
          email: email,
          password: password,
          designation: 'Tech',
        },
      );
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#00FFFF', '#8A2BE2']} // Gradient from cyan to purple
          style={styles.gradientBackground}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>Teams App</Text>

            <View style={styles.iconContainer}>
              <Image style={styles.icon} source={Images.chaticon} />
            </View>
          </View>

          <View style={styles.curvedShape} />
        </LinearGradient>

        <View style={styles.formContainer}>
          <TextInput
            label={'Enter Your Name'}
            value={name}
            onChangeText={setName}
            mode="outlined"
            outlineColor={'blue'}
            activeOutlineColor="blue"
            style={styles.input}
          />
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
            txt={'Register'}
            styles={styles.custom_button}
            onpress={postApiData}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  gradientBackground: {
    width: '100%',
    height: height * 0.3, // 30% of the screen height
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  headerText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  iconContainer: {
    marginTop: 10,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2, // Ensure the icon is above the curved shape
  },
  icon: {
    width: 50,
    height: 50,
  },
  curvedShape: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    zIndex: 1, // Ensure the curved shape is behind the icon and header
  },
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

export default Register;
