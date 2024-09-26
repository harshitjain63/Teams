import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  Dimensions,
} from 'react-native';
import RegisterHeader from '../Components/registration/RegisterHeader';
import Form from '../Components/registration/Form';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {useAppSelector} from '../redux/hooks/customHook';

import {
  fetchEnglishTranslations,
  fetchHindiTranslations,
} from '../Components/languages/api';
import {
  fetchRegisterTranslationsFromDB,
  insertRegisterTranslations,
} from '../Components/database/DatabaseRegister';

export type RegisterProp = NativeStackScreenProps<RootStackParams, 'Register'>;

const Register = ({navigation, route}: RegisterProp) => {
  const [translations, setTranslations] = useState<any>({});
  const selectedLanguage = useAppSelector(
    state => state.language.selectedLanguage,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const translationsFromDB = await fetchRegisterTranslationsFromDB(
          selectedLanguage,
        );
        if (translationsFromDB) {
          // If translations are found in the database
          setTranslations(translationsFromDB);
        } else {
          if (selectedLanguage === 'hi') {
            const data = await fetchHindiTranslations();
            if (data) {
              setTranslations(data.auth.register);
              // Insert the fetched translations into the database
              await insertRegisterTranslations(
                data.auth.register,
                selectedLanguage,
              );
            } else {
              console.warn('Translations not found for the selected language');
            }
          } else {
            const data = await fetchEnglishTranslations();
            if (data) {
              setTranslations(data.auth.register);
              // Insert the fetched translations into the database
              await insertRegisterTranslations(
                data.auth.register,
                selectedLanguage,
              );
            } else {
              console.warn('Translations not found for the selected language');
            }
          }
        }
      } catch (error) {
        console.error('Error fetching translations for register:', error);
      }
    };
    fetchData();
  }, [selectedLanguage]);

  const {height} = Dimensions.get('window');

  const headerHeight = React.useMemo(
    () => new Animated.Value(height * 0.4),
    [height],
  );

  const changeHeaderHeight = React.useCallback(
    (newHeight: number) => {
      Animated.timing(headerHeight, {
        toValue: newHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    },
    [headerHeight],
  );

  const onKeyboardShow = React.useCallback(() => {
    changeHeaderHeight(height * 0.1);
  }, [changeHeaderHeight, height]);

  const onKeyboardHide = React.useCallback(() => {
    changeHeaderHeight(height * 0.4);
  }, [changeHeaderHeight, height]);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      onKeyboardShow,
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      onKeyboardHide,
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [onKeyboardHide, onKeyboardShow]);

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        // eslint-disable-next-line react-native/no-inline-styles
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}>
        <Animated.View style={{height: headerHeight}}>
          <RegisterHeader />
        </Animated.View>
        <Form
          navigation={navigation}
          route={route}
          translations={translations}
        />
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default Register;
