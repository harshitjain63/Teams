import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Keyboard,
  Dimensions,
  Alert,
  BackHandler,
} from 'react-native';
import RegisterHeader from '../Components/registration/RegisterHeader';
import FormLogin from '../Components/login/FormLogin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';
import {useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '../redux/hooks/customHook';
import {
  fetchEnglishTranslations,
  fetchHindiTranslations,
} from '../Components/languages/api';
import {
  fetchLoginTranslationsFromDB,
  insertLoginTranslations,
} from '../Components/database/DatabaseLogin';
import NetInfo from '@react-native-community/netinfo';

export type LoginProps = NativeStackScreenProps<RootStackParams, 'Login'>;

const Login = ({navigation, route}: LoginProps) => {
  const [translations, setTranslations] = useState<any>({});
  const selectedLanguage = useAppSelector(
    state => state.language.selectedLanguage,
  );

  useEffect(() => {
    const fetchData = async () => {
      const isConnected = await NetInfo.fetch().then(
        (state: {isConnected: any}) => state.isConnected,
      );

      try {
        if (isConnected) {
          if (selectedLanguage === 'hi') {
            const data = await fetchHindiTranslations();
            if (data) {
              setTranslations(data.onboarding.auth.login);

              await insertLoginTranslations(
                data.onboarding.auth.login,
                selectedLanguage,
              );
            } else {
              console.warn('Translations not found for the selected language');
            }
          } else {
            const data = await fetchEnglishTranslations();
            if (data) {
              setTranslations(data.onboarding.auth.login);

              await insertLoginTranslations(
                data.onboarding.auth.login,
                selectedLanguage,
              );
            } else {
              console.warn('Translations not found for the selected language');
            }
          }
        } else {
          const translationsFromDB =
            await fetchLoginTranslationsFromDB(selectedLanguage);

          if (translationsFromDB) {
            setTranslations(translationsFromDB);
          } else {
            console.warn(
              'Translations not found for the selected language in local database',
            );
          }
        }
      } catch (error) {
        console.error('Error fetching translations for login:', error);
      }

      //////////
    };
    fetchData();
  }, [selectedLanguage]);

  const backAction = useCallback(() => {
    if (route.name === 'Login') {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    } else {
      return false;
    }
  }, [route.name]);

  useFocusEffect(
    useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', backAction);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', backAction);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [route.name]),
  );

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
        <FormLogin
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

export default Login;
