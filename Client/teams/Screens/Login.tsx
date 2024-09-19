import {View, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import RegisterHeader from '../Components/registration/RegisterHeader';
import FormLogin from '../Components/login/FormLogin';

const Login = () => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <RegisterHeader />
        <FormLogin />
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
});

export default Login;
