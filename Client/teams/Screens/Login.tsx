import React, {useEffect} from 'react';
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
import FormLogin from '../Components/login/FormLogin';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParams} from '../Navigation/StackNavigator';

export type LoginProps = NativeStackScreenProps<RootStackParams, 'Login'>;

const Login = ({navigation, route}: LoginProps) => {
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
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 20}>
        <Animated.View style={{height: headerHeight}}>
          <RegisterHeader />
        </Animated.View>
        <FormLogin navigation={navigation} route={route} />
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
