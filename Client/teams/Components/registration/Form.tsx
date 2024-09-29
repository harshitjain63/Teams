import {View, StyleSheet, Text, Alert} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';
import LoginIcons from '../LoginIcons';
import Buttons from '../Button';
import axiosInstance from '../../middleware/axiosConfig/axiosConfig';
import {RegisterProp} from '../../Screens/Register';
import {z} from 'zod';
import {useTranslation} from 'react-i18next';

interface RegisterLoginProps extends RegisterProp {
  translations: any; // Define the type for translations
}

const Form = ({navigation, translations}: RegisterLoginProps) => {
  const {t} = useTranslation('auth');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordShown, setPasswordShown] = useState<boolean>(false);
  const [passwordErrors, setPAsswordErrors] = useState<string>('');
  const [emailErrors, setEmailError] = useState<string>('');

  const EmailFormSchema = z.object({
    email: z.string().email('Invalid email format').trim(),
    password: z
      .string()
      .min(8, 'The password must be at least 8 characters long')
      .max(32, 'The password must be a maximum of 32 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&*-])[A-Za-z\d!@#$%&*-]{8,}$/,
        'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character , and must be at least 8 characters long',
      ),
  });

  type EmailForm = z.infer<typeof EmailFormSchema>;

  const validateAddress = (formData: EmailForm) => {
    try {
      const parsedAddress = EmailFormSchema.parse(formData);
      console.log('Validation passed: ', parsedAddress);
      postApiData();
      setPassword('');
      setEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach(issue => {
          const field = issue.path[0];
          const message = issue.message;

          switch (field) {
            case 'password':
              setPAsswordErrors(message);
              break;
            case 'email':
              setEmailError(message);
              break;
            default:
              break;
          }
        });
      } else {
        console.error('Unexpected error: ', error);
      }
    }
  };

  const handleSubmit = () => {
    const formData = {password, email};
    validateAddress(formData);
  };

  const onPressHandler = () => {
    setEmail('');
    setName('');
    setPassword('');
    setPasswordShown(false);
    navigation.navigate('Login');
  };

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  const postApiData = async () => {
    try {
      const data = await axiosInstance.post('/auth/register', {
        name: name,
        email: email,
        password: password,
        designation: 'Tech',
      });
      if (data.data) {
        Alert.alert('Registration', 'User Registered successfully', [
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
        label={t('name_placeholder')}
        value={name}
        onChangeText={setName}
        mode="outlined"
        autoComplete="name"
        outlineColor={'blue'}
        activeOutlineColor="blue"
        style={styles.input}
      />
      {emailErrors.length > 0 && (
        <Text style={styles.error}>{emailErrors}</Text>
      )}
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
      {passwordErrors.length > 0 && (
        <Text style={styles.error}>{passwordErrors}</Text>
      )}
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
          handleSubmit();
        }}
      />
      <Text style={styles.txt}>
        {t('already_have_account')}{' '}
        <Text onPress={() => navigation.navigate('Login')} style={styles.txt2}>
          {' '}
          {t('login_button_text')}
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
    marginTop: '8%',
  },
  txt2: {
    color: 'blue',
  },
  formContainer: {
    padding: 20,
    marginTop: '3%',
    width: '100%',
  },
  input: {
    marginBottom: '3%',
    width: '100%',
  },
  custom_button: {
    alignSelf: 'center',
    marginTop: '3%',
  },
  error: {
    color: 'red',
  },
});

export default Form;
